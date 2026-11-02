'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { nav, school } from '@/lib/content';

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="nav-wrap">
    <Link href="/" className="brand" aria-label="Hakies Infant School home"><span className="brand-mark" aria-hidden="true">h<span>✳</span></span><span>Hakies <small>INFANT SCHOOL</small></span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true">{open ? '×' : '☰'}</i></button>
    <nav id="main-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{nav.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined}>{item.label}</Link>)}<Link className="button button-small" href="/admissions">Enquire <span aria-hidden="true">↗</span></Link></nav>
  </div></header></>;
}
export function Footer() { return <footer className="footer"><div className="footer-top"><div><Link href="/" className="brand brand-light"><span className="brand-mark" aria-hidden="true">h<span>✳</span></span><span>Hakies <small>INFANT SCHOOL</small></span></Link><p className="footer-tag">A happy beginning to a lifetime of learning.</p></div><div className="footer-col"><h3>Explore</h3><Link href="/about">About our school</Link><Link href="/learning">Learning</Link><Link href="/school-life">School life</Link><Link href="/gallery">Gallery</Link></div><div className="footer-col"><h3>For families</h3><Link href="/admissions">Admissions</Link><Link href="/parents">Parent information</Link><Link href="/news">News & events</Link><Link href="/contact">Contact</Link></div><div className="footer-col"><h3>Get in touch</h3><p>{school.contact.address}</p><p>{school.contact.phone}</p><p>{school.contact.email}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Hakies Infant School</span><span>Website information is being prepared with the school.</span></div></footer> }

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <div className={`reveal ${className}`}>{children}</div>; }

export function EnquiryForm() {
 const [state, setState] = useState<'idle'|'error'|'success'>('idle');
 function submit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); setState('error'); }
 return <form className="enquiry-form" onSubmit={submit}>
  <div className="form-note"><span className="status-dot"/> Demonstration form · enquiries are not sent yet</div>
  <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required placeholder="Parent or guardian name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label><label>Class or year group of interest<select name="class" defaultValue=""><option value="">Choose if known</option><option>Not sure yet</option><option>Details to be confirmed</option></select></label><label className="form-wide">How can we help?<textarea name="message" rows={4} required placeholder="Tell us a little about your enquiry" /></label></div>
  {state === 'error' && <p className="form-error" role="alert">This demonstration form is not connected to the school. Your message has not been sent. Please use the confirmed school contact details when available.</p>}
  {state === 'success' && <p role="status">Thank you. Your message has been sent.</p>}
  <button className="button" type="submit">Send enquiry <span aria-hidden="true">↗</span></button>
 </form>;
}
