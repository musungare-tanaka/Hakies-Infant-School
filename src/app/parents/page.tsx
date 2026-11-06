import type { Metadata } from 'next'; import { Interior } from '@/components/Pages';
export const metadata: Metadata = { title: 'Parent Information', description: 'Practical information and resources for Hakies Infant School families.' }; export default function Page(){return <Interior page="parents"/>}
