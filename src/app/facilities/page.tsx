import type { Metadata } from 'next';
import { ContentReadyPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Facilities', description: 'Information about Hakies Infant School facilities, when confirmed.' };
export default function Page() { return <ContentReadyPage page="facilities" />; }
