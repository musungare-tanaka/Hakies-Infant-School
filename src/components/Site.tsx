'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { school } from '@/data/school';
import Image from 'next/image';

export function Header() {
  return <header className="site-header"><div className="nav-wrap">
    <Link href="/" className="brand"><Image className="brand-logo" src="/tinified/logo.png" alt="" width={58} height={44} priority/><span>{school.name}</span></Link>
    <Navigation />
  </div></header>;
}

function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (path !== '/') return;
    const sections = ['home', 'about', 'learning', 'school-life', 'contact'].map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .2, .5, .8] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown); }, [open]);
  const close = () => setOpen(false);
  const links = [{ label: 'Home', id: 'home' }, { label: 'About', id: 'about' }, { label: 'Learning', id: 'learning' }, { label: 'Gallery', id: 'school-life' }, { label: 'Contact', id: 'contact' }];
  return <><button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true">{open ? '×' : '☰'}</i></button>
    <nav id="main-nav" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">{links.map(item => <Link key={item.id} href={`/#${item.id}`} aria-current={path === '/' && active === item.id ? 'location' : undefined} onClick={close}>{item.label}</Link>)}</nav></>;
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
