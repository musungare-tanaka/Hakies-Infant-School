import type { Metadata } from 'next';
import { ContentReadyPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Careers', description: 'Career opportunities at Hakies Infant School, when available.' };
export default function Page() { return <ContentReadyPage page="careers" />; }
