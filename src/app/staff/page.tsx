import type { Metadata } from 'next';
import { ContentReadyPage } from '@/components/Pages';
export const metadata: Metadata = { title: 'Staff', description: 'School-approved staff information for Hakies Junior School.' };
export default function Page() { return <ContentReadyPage page="staff" />; }
