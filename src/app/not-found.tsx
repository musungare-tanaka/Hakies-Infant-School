import Link from 'next/link';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Page Not Found', description: 'The page could not be found on the Hakies Junior School website.' };
export default function NotFound() { return <main id="main" className="not-found"><span className="eyebrow">Page not found</span><h1>We can’t find that page.</h1><p>The link may be out of date, or the page may have moved.</p><div className="not-found-actions"><Link className="button" href="/">Back to home</Link><Link className="text-link" href="/contact">Contact the school <span aria-hidden="true">→</span></Link></div></main>; }
