import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/components/Site';
export const metadata: Metadata = { title: { default: 'Hakies Infant School | A Happy Beginning to Learning', template: '%s | Hakies Infant School' }, description: 'Discover Hakies Infant School and find information for families considering an admissions enquiry.', openGraph: { title: 'Hakies Infant School', description: 'A Happy Beginning to a Lifetime of Learning', type: 'website' }, robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Header />{children}<Footer /></body></html>; }
