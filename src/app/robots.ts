import type { MetadataRoute } from 'next';
import { isLaunch, school } from '@/data/school';

export default function robots(): MetadataRoute.Robots {
  if (!isLaunch) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${school.siteUrl}/sitemap.xml` };
}
