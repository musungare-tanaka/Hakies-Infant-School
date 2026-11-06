'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { galleryItems } from '@/lib/content';

export type GalleryPhoto = { src: string; caption: string; alt: string };
type GalleryItem = { type: 'photo'; src: string; title: string; alt: string } | { type: 'illustration'; title: string; category: string; tone: string; art: string };
const tones: Record<string,string> = { yellow:'art-yellow',blue:'art-blue',coral:'art-coral',mint:'art-mint' };
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

export default function Gallery({ photos = [] }: { photos?: GalleryPhoto[] }) {
 const [active, setActive] = useState<number|null>(null);
 const closeRef = useRef<HTMLButtonElement>(null);
 const returnFocus = useRef<HTMLElement|null>(null);
 const items: GalleryItem[] = photos.length ? photos.map((photo) => ({ type: 'photo', src: photo.src, title: photo.caption, alt: photo.alt })) : galleryItems.map((item) => ({ type: 'illustration', ...item }));
 useEffect(()=>{ if(active!==null){closeRef.current?.focus(); const dialog = closeRef.current?.closest('[role="dialog"]'); const oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')setActive((active+items.length)%items.length);if(e.key==='ArrowLeft')setActive((active+items.length-1)%items.length);if(e.key==='Tab'&&dialog){const controls=Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled])'));const first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}};document.addEventListener('keydown',onKey);return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=oldOverflow}}else{returnFocus.current?.focus();}},[active,items.length]);
 const renderArt = (item: GalleryItem, large = false) => item.type === 'photo'
  ? <div className={large ? 'photo-frame photo-frame-large' : 'photo-frame'}><Image src={item.src} alt={item.alt} fill sizes={large ? '(max-width: 700px) 90vw, 70vw' : '(max-width: 600px) 45vw, 30vw'} placeholder="blur" blurDataURL={blurDataURL} /></div>
  : <span className={`gallery-art ${tones[item.tone]}`}><span aria-hidden="true">{item.art}</span><i aria-hidden="true">Hakies</i></span>;
 return <><div className="gallery-grid">{items.map((item,i)=><button className="gallery-item" key={`${item.type}-${item.title}`} onClick={e=>{returnFocus.current=e.currentTarget;setActive(i)}} aria-label={`Open ${item.title}${item.type === 'illustration' ? `, ${item.category}` : ''}`}><span className="gallery-thumb">{renderArt(item)}</span><span className="gallery-caption"><b>{item.title}</b>{item.type === 'illustration' && <small>{item.category}</small>}</span></button>)}</div>{active!==null&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={e=>{if(e.target===e.currentTarget)setActive(null)}}><button className="lightbox-close" ref={closeRef} onClick={()=>setActive(null)} aria-label="Close gallery">×</button><button className="lightbox-prev" onClick={()=>setActive((active+items.length-1)%items.length)} aria-label="Previous image">←</button><div className="lightbox-content">{renderArt(items[active], true)}<div className="lightbox-title">{items[active].title}{items[active].type === 'illustration' && <> <small>· {items[active].category}</small><p>Illustration placeholder · replace with a school-approved photograph</p></>}</div></div><button className="lightbox-next" onClick={()=>setActive((active+1)%items.length)} aria-label="Next image">→</button></div>}</>;
}
