import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(100, 'Name must be 100 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  phone: z.string().trim().max(40).optional().default(''),
  class: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(10, 'Please include a little more detail.').max(3000, 'Message must be 3,000 characters or fewer.'),
  website: z.string().max(200).optional().default(''),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryDependencies = {
  isConfigured: () => boolean;
  checkLimit: (key: string) => Promise<boolean>;
  send: (enquiry: Enquiry) => Promise<boolean>;
};

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function createEnquiryHandler(dependencies: EnquiryDependencies) {
  return async function handleEnquiry(request: Request): Promise<Response> {
    let raw: unknown;
    try { raw = await request.json(); } catch { return json({ error: 'Please submit the form again.' }, 400); }
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) return json({ error: 'Check the highlighted details and try again.', fields: parsed.error.flatten().fieldErrors }, 400);
    if (parsed.data.website) return json({ ok: true });

    const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    if (!dependencies.isConfigured()) return json({ error: 'The enquiry service is not configured yet. Please contact the school using the details on this page.' }, 503);
    try {
      if (!(await dependencies.checkLimit(key))) return json({ error: 'Too many enquiries have been sent from this connection. Please try again later.' }, 429);
      if (!(await dependencies.send(parsed.data))) return json({ error: 'We could not send your enquiry. Please try again later.' }, 502);
      return json({ ok: true });
    } catch {
      return json({ error: 'We could not send your enquiry. Please try again later.' }, 502);
    }
  };
}
