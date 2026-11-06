import type { Metadata } from 'next';
import { CalendarPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Term Dates & Events', description: 'Term dates and event information for Hakies Infant School families.' };
export default function Page() { return <CalendarPage />; }
