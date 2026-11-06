import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { GalleryPhoto } from '@/components/Gallery';

type CaptionEntry = { caption?: unknown; alt?: unknown; approved?: unknown };

export function getGalleryPhotos(): GalleryPhoto[] {
  const directory = path.join(process.cwd(), 'public', 'gallery');
  const captionsPath = path.join(directory, 'captions.json');
  if (!existsSync(captionsPath)) return [];
  let captions: Record<string, CaptionEntry>;
  try { captions = JSON.parse(readFileSync(captionsPath, 'utf8')) as Record<string, CaptionEntry>; } catch { return []; }
  return readdirSync(directory).filter((file) => /\.(jpe?g|png|webp)$/i.test(file)).flatMap((file) => {
    const entry = captions[file];
    if (entry?.approved !== true || typeof entry.caption !== 'string' || typeof entry.alt !== 'string' || !entry.caption.trim() || !entry.alt.trim()) return [];
    return [{ src: `/gallery/${file}`, caption: entry.caption.trim(), alt: entry.alt.trim() }];
  });
}

export function getDownloads(): { href: string; label: string }[] {
  const directory = path.join(process.cwd(), 'public', 'downloads');
  if (!existsSync(directory)) return [];
  return readdirSync(directory).filter((file) => file.toLowerCase().endsWith('.pdf')).sort().map((file) => ({ href: `/downloads/${encodeURIComponent(file)}`, label: file.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ') }));
}
