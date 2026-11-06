import type { Metadata } from 'next';
import { Breadcrumbs, LastUpdated } from '@/components/Shared';
import { getDownloads } from '@/lib/media';
import { school } from '@/data/school';
export const metadata: Metadata = { title: 'Downloads', description: 'School documents and downloads provided by Hakies Infant School.' };
export const dynamic = 'force-static';
export default function Page() { const downloads = getDownloads(); return <main id="main" className="interior"><Breadcrumbs items={[{label:school.contentPages.downloads.title}]}/><section className="interior-hero"><div><span className="eyebrow">For families</span><h1>{school.contentPages.downloads.title}.</h1><p>{school.contentPages.downloads.intro}</p></div></section><div className="downloads-list">{downloads.length ? <ul>{downloads.map((item)=><li key={item.href}><a href={item.href} target="_blank" rel="noreferrer">{item.label}<span>PDF ↗</span></a></li>)}</ul> : <div className="content-empty"><span className="news-icon" aria-hidden="true">⇩</span><div><h2>No documents yet.</h2><p>Approved downloadable documents will appear here when available.</p></div></div>}<LastUpdated/></div></main>; }
