import type { MetadataRoute } from 'next';
import { isLaunch, school } from '@/data/school';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLaunch) return [];
  const routes = ['/', '/about', '/learning', '/school-life', '/admissions', '/contact', '/gallery', '/parents', '/news', '/calendar'];
  const optional = Object.entries(school.pages).filter(([, enabled]) => enabled).map(([slug]) => `/${slug}`);
  return [...routes, ...optional].map((route) => ({ url: new URL(route, school.siteUrl).toString(), changeFrequency: 'monthly', priority: route === '/' ? 1 : 0.7 }));
}
