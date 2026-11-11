import Link from 'next/link';
import Image from 'next/image';
import { school } from '@/data/school';

export function Footer() {
  const socials = Object.entries(school.socials).filter((entry): entry is [string, string] => Boolean(entry[1]));
  return <footer className="footer"><div className="footer-top"><div><Link href="/" className="brand brand-light"><Image className="brand-logo" src="/tinified/logo.png" alt="" width={58} height={44}/><span>{school.name}</span></Link><p className="footer-tag">Growing Minds, Shaping Character.</p>{socials.length > 0 && <div className="social-links" aria-label="Social media">{socials.map(([network, url]) => <a key={network} href={url} target="_blank" rel="noreferrer">{network}</a>)}</div>}</div><div className="footer-col"><h3>Explore</h3><Link href="/#about">About our school</Link><Link href="/#learning">Learning</Link><Link href="/#school-life">School life &amp; gallery</Link><Link href="/gallery">All gallery photos</Link><Link href="/#contact">Contact</Link></div><div className="footer-col"><h3>Get in touch</h3><p>{school.contact.address.value ?? school.contact.address.placeholder}</p><p>{school.contact.phone.value ? <a href={`tel:${school.contact.phone.value}`}>{school.contact.phone.value}</a> : school.contact.phone.placeholder}</p><p>{school.contact.email.value ? <a href={`mailto:${school.contact.email.value}`}>{school.contact.email.value}</a> : school.contact.email.placeholder}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {school.name}</span></div></footer>;
}

export function LastUpdated() { return <p className="last-updated">Last updated: {school.lastUpdated.value ?? school.lastUpdated.placeholder}</p>; }

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li>{items.map((item) => <li key={item.label}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>; }
