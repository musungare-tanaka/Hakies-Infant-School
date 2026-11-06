import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { school } from '@/data/school';
import { createEnquiryHandler } from '@/lib/enquiry';

const rateConfigured = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
const redis = rateConfigured ? Redis.fromEnv() : null;
const limiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '10 m'), analytics: false, prefix: 'hakies-enquiry' }) : null;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const recipient = school.contact.email.value;
const configured = Boolean(resend && recipient && process.env.RESEND_FROM_EMAIL && limiter);

const handle = createEnquiryHandler({
  isConfigured: () => configured,
  checkLimit: async (key) => {
    if (!limiter) return false;
    const result = await limiter.limit(key);
    return result.success;
  },
  send: async (enquiry) => {
    if (!resend || !recipient || !process.env.RESEND_FROM_EMAIL) return false;
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: recipient,
      replyTo: enquiry.email,
      subject: `Website enquiry from ${enquiry.name}`,
      text: [`Name: ${enquiry.name}`, `Email: ${enquiry.email}`, `Phone: ${enquiry.phone || 'Not provided'}`, `Class of interest: ${enquiry.class || 'Not provided'}`, '', enquiry.message].join('\n'),
    });
    return !result.error;
  },
});

export const POST = handle;
