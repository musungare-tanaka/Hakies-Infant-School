import type { Metadata } from 'next'; import Link from 'next/link';
export const metadata: Metadata = { title: 'News article', description: 'News from Hakies Infant School.' };
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <main id="main" className="interior"><section className="interior-hero"><div><span className="eyebrow">Hakies news</span><h1>Article coming soon.</h1><p>This story has not been published yet: {slug.replaceAll('-',' ')}.</p><Link className="text-link" href="/news">← Back to news</Link></div></section></main>}
