import type { Metadata } from 'next'; import { Interior } from '@/components/Pages';
export const metadata: Metadata = { title: 'Learning', description: 'Learning information and curriculum guidance for families at Hakies Infant School.' }; export default function Page(){return <Interior page="learning"/>}
