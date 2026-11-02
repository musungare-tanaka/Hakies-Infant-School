import type { Metadata } from 'next'; import { ContactPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with Hakies Infant School.' }; export default function Page(){return <ContactPage/>}
