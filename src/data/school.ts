export type SchoolFact<T> = {
  value: T | null;
  placeholder: string;
};

type SchoolConfig = {
  name: string;
  siteUrl: string;
  headline: string;
  intro: string;
  lastUpdated: SchoolFact<string>;
  contact: { address: SchoolFact<string>; phone: SchoolFact<string>; email: SchoolFact<string>; whatsapp: SchoolFact<string>; officeHours: SchoolFact<string> };
  location: { latitude: number | null; longitude: number | null };
  socials: { facebook: string | null; instagram: string | null; youtube: string | null };
  termDates: { label: string; start: string | null; end: string | null }[];
  events: { title: string; date: string | null; description?: string }[];
  classes: { name: SchoolFact<string>; ageRange: SchoolFact<string> }[];
  fees: { item: string; amount: string | null; notes?: string }[];
  counters: { label: string; value: number }[];
  pages: { staff: boolean; facilities: boolean; downloads: boolean; testimonials: boolean; careers: boolean };
  contentPages: {
    staff: { title: string; intro: string; consentNote?: string };
    facilities: { title: string; intro: string; consentNote?: string };
    downloads: { title: string; intro: string; consentNote?: string };
    testimonials: { title: string; intro: string; consentNote: string };
    careers: { title: string; intro: string; consentNote?: string };
  };
};

export const school: SchoolConfig = {
  name: 'Hakies Junior School',
  siteUrl: 'https://hakies.vercel.app',
  headline: 'A Happy Beginning to a Lifetime of Learning',
  intro: 'Every school journey starts somewhere. We look forward to sharing more about our school, our community and the first steps in learning.',
  lastUpdated: { value: null, placeholder: 'Date to be confirmed' },
  contact: {
    address: { value: null, placeholder: '[School address to be confirmed]' },
    phone: { value: null, placeholder: '[Telephone number to be confirmed]' },
    email: { value: null, placeholder: '[School email to be confirmed]' },
    whatsapp: { value: null, placeholder: '[WhatsApp number to be confirmed]' },
    officeHours: { value: null, placeholder: '[Office hours to be confirmed]' },
  },
  location: { latitude: null, longitude: null },
  socials: { facebook: null, instagram: null, youtube: null },
  termDates: [],
  events: [],
  classes: [],
  fees: [],
  counters: [
    { label: 'Years of learning', value: 10 },
    { label: 'Ways to discover', value: 8 },
    { label: 'Little moments', value: 100 },
  ],
  pages: {
    staff: false,
    facilities: false,
    downloads: false,
    testimonials: false,
    careers: false,
  },
  contentPages: {
    staff: { title: 'Our staff', intro: 'Meet the team at Hakies Junior School.' },
    facilities: { title: 'Facilities', intro: 'Explore school facilities here once the school has provided confirmed information.' },
    downloads: { title: 'Downloads', intro: 'School documents provided by Hakies Junior School.' },
    testimonials: { title: 'Testimonials', intro: 'Parent comments will only be shared here with consent.', consentNote: 'Testimonials require explicit permission from the parent or guardian before publication.' },
    careers: { title: 'Careers', intro: 'Career opportunities and application information will be listed here when confirmed.' },
  },
};

export const isLaunch = process.env.NEXT_PUBLIC_LAUNCH === 'true';
