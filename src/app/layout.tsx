import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Site';
import { Footer } from '@/components/Shared';
import { isLaunch, school } from '@/data/school';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-school', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(school.siteUrl),
  alternates: { canonical: '/' },
  title: { default: `${school.name} | A Happy Beginning to Learning`, template: `%s | ${school.name}` },
  description: 'Learn about Hakies Junior School, see moments from school life and find contact details.',
  openGraph: { title: school.name, description: school.headline, type: 'website', url: school.siteUrl, siteName: school.name },
  twitter: { card: 'summary', title: school.name, description: school.headline },
  robots: { index: isLaunch, follow: isLaunch, googleBot: { index: isLaunch, follow: isLaunch } },
};

function structuredData() {
  const data: Record<string, unknown> = { '@context': 'https://schema.org', '@type': 'School', name: school.name, url: school.siteUrl };
  if (school.contact.address.value) data.address = { '@type': 'PostalAddress', streetAddress: school.contact.address.value, addressCountry: 'ZW' };
  if (school.contact.phone.value) data.telephone = school.contact.phone.value;
  if (school.contact.email.value) data.email = school.contact.email.value;
  if (school.location.latitude !== null && school.location.longitude !== null) data.geo = { '@type': 'GeoCoordinates', latitude: school.location.latitude, longitude: school.location.longitude };
  const sameAs = Object.values(school.socials).filter((url): url is string => Boolean(url));
  if (sameAs.length) data.sameAs = sameAs;
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={inter.variable}><a className="skip-link" href="#main">Skip to content</a><Header /><div className="page-content">{children}</div><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData() }} /></body></html>;
}
