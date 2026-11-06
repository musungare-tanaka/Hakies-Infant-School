import assert from 'node:assert/strict';
import test from 'node:test';
import { createEnquiryHandler, enquirySchema } from './enquiry';

const valid = { name: 'Parent Example', email: 'parent@example.com', phone: '', class: '', message: 'I would like to learn about admissions.', website: '' };
const post = (body: unknown) => new Request('https://hakies.test/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1' }, body: JSON.stringify(body) });
const dependencies = (overrides: Partial<Parameters<typeof createEnquiryHandler>[0]> = {}) => ({
  isConfigured: () => true,
  checkLimit: async () => true,
  send: async () => true,
  ...overrides,
});

test('valid enquiries pass schema validation and are sent', async () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  let sent = false;
  const response = await createEnquiryHandler(dependencies({ send: async () => { sent = true; return true; } }))(post(valid));
  assert.equal(response.status, 200);
  assert.equal(sent, true);
});

test('invalid fields return validation errors without sending', async () => {
  let sent = false;
  const response = await createEnquiryHandler(dependencies({ send: async () => { sent = true; return true; } }))(post({ ...valid, email: 'bad', message: 'short' }));
  assert.equal(response.status, 400);
  assert.equal(sent, false);
});

test('honeypot submissions are accepted without sending', async () => {
  let sent = false;
  const response = await createEnquiryHandler(dependencies({ send: async () => { sent = true; return true; } }))(post({ ...valid, website: 'bot value' }));
  assert.equal(response.status, 200);
  assert.equal(sent, false);
});

test('rate-limited submissions return 429', async () => {
  const response = await createEnquiryHandler(dependencies({ checkLimit: async () => false }))(post(valid));
  assert.equal(response.status, 429);
});

test('missing server configuration returns a clear 503', async () => {
  const response = await createEnquiryHandler(dependencies({ isConfigured: () => false }))(post(valid));
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /not configured/);
});

test('email delivery errors return 502', async () => {
  const response = await createEnquiryHandler(dependencies({ send: async () => false }))(post(valid));
  assert.equal(response.status, 502);
});
