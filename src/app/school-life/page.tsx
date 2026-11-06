import type { Metadata } from 'next'; import { Interior } from '@/components/Pages';
export const metadata: Metadata = { title: 'School Life', description: 'Discover school life and approved activities at Hakies Infant School.' }; export default function Page(){return <Interior page="school-life"/>}
