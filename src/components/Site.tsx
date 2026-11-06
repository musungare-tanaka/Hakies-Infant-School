'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { nav } from '@/lib/content';
import { school } from '@/data/school';

export function Header() {
  const path = usePathname();
  return <header className="site-header"><div className="nav-wrap">
    <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">h<span>✳</span></span><span>{school.name.replace(/ Infant School$/, '')} <small>INFANT SCHOOL</small></span></Link>
    <div className="mobile-header-actions" aria-label="Quick actions"><Link href="/contact">Contact</Link><Link href="/calendar">Dates</Link><Link className="button button-small" href="/admissions">Apply</Link></div>
    <Navigation key={path} path={path}/>
  </div></header>;
}

function Navigation({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown); }, [open]);
  const close = () => setOpen(false);
  return <><button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true">{open ? '×' : '☰'}</i></button>
    <nav id="main-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{nav.map(item => <Link key={item.href} href={item.href} aria-current={path === item.href ? 'page' : undefined} onClick={close}>{item.label}</Link>)}<Link href="/contact" aria-current={path === '/contact' ? 'page' : undefined} onClick={close}>Contact</Link><Link href="/calendar" aria-current={path === '/calendar' ? 'page' : undefined} onClick={close}>Term Dates</Link><Link className="button button-small" href="/admissions" aria-current={path === '/admissions' ? 'page' : undefined} onClick={close}>Apply Now <span aria-hidden="true">↗</span></Link></nav></>;
}
export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
 const ref = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const node = ref.current;
  if (!node) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;
  node.classList.add('reveal-ready');
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.add('reveal-visible'); observer.disconnect(); } }, { threshold: .12 });
  observer.observe(node);
  return () => observer.disconnect();
 }, []);
 return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function AtAGlance() {
 const [visible, setVisible] = useState(false);
 const ref = useRef<HTMLElement>(null);
 useEffect(() => { const node = ref.current; if (!node) return; if (!('IntersectionObserver' in window)) { const frame=requestAnimationFrame(()=>setVisible(true)); return ()=>cancelAnimationFrame(frame); } const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: .35 }); observer.observe(node); return () => observer.disconnect(); }, []);
 return <section ref={ref} className="glance-strip" aria-label="At a glance"><div><span className="eyebrow">At a glance</span><span className="glance-note">Illustrative placeholder values</span></div>{school.counters.map((item) => <div className="glance-stat" key={item.label}><AnimatedCounter value={item.value} active={visible}/><span>{item.label}</span></div>)}</section>;
}

function AnimatedCounter({ value, active }: { value: number; active: boolean }) {
 const [count, setCount] = useState(0);
 useEffect(() => { if (!active) return; let frame = 0; if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { frame=requestAnimationFrame(()=>setCount(value)); return ()=>cancelAnimationFrame(frame); } const started = performance.now(); const animate = (now: number) => { const progress = Math.min((now - started) / 750, 1); setCount(Math.round(value * progress)); if (progress < 1) frame = requestAnimationFrame(animate); }; frame = requestAnimationFrame(animate); return () => cancelAnimationFrame(frame); }, [active, value]);
 return <strong aria-label={`${value}, illustrative placeholder`}>{count}<span aria-hidden="true">+</span></strong>;
}

export function EnquiryForm() {
 const [state, setState] = useState<'idle'|'sending'|'error'|'success'>('idle');
 const [error, setError] = useState('');
 async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); const formElement = e.currentTarget; setState('sending'); setError('');
  try {
   const form = new FormData(formElement);
   const response = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form.entries())) });
   const result = await response.json();
   if (!response.ok) throw new Error(result.error || 'We could not send your enquiry. Please try again.');
   setState('success'); formElement.reset();
  } catch (cause) { setError(cause instanceof Error ? cause.message : 'We could not send your enquiry. Please try again.'); setState('error'); }
 }
 return <form className="enquiry-form" onSubmit={submit}>
  <div className="form-note"><span className="status-dot"/> Your message will be sent to the school office.</div>
  <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
  <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Parent or guardian name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label><label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Your phone number" /></label><label>Class or year group of interest <span>(optional)</span><input name="class" maxLength={100} placeholder="If known" /></label><label className="form-wide">How can we help?<textarea name="message" rows={4} required minLength={10} maxLength={3000} placeholder="Tell us a little about your enquiry" /></label></div>
  {state === 'error' && <p className="form-error" role="alert">{error}</p>}
  {state === 'success' && <p className="form-success" role="status">Thank you. Your message has been sent to the school.</p>}
  <button className="button" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
 </form>;
}
