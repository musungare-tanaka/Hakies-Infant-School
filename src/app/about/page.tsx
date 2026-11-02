import type { Metadata } from 'next'; import { Interior } from '@/components/Pages';
export const metadata: Metadata = { title: 'About Our School', description: 'Discover the story, values and welcome of Hakies Infant School.' }; export default function Page(){return <Interior page="about"/>}
