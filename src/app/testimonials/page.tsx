import type { Metadata } from 'next';
import { ContentReadyPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Testimonials', description: 'Parent testimonials shared with consent at Hakies Junior School.' };
export default function Page() { return <ContentReadyPage page="testimonials" />; }
