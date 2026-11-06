'use client';
import dynamic from 'next/dynamic';
import { useSyncExternalStore } from 'react';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

function getCapability() {
  if (typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return window.matchMedia('(min-width: 900px) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && (nav.hardwareConcurrency || 8) >= 4
    && (nav.deviceMemory || 8) >= 4
    && !nav.connection?.saveData;
}

function subscribe(callback: () => void) {
  const queries = [window.matchMedia('(min-width: 900px) and (pointer: fine)'), window.matchMedia('(prefers-reduced-motion: reduce)')];
  queries.forEach((query) => query.addEventListener('change', callback));
  return () => queries.forEach((query) => query.removeEventListener('change', callback));
}

export default function HeroSceneLoader() {
  const enabled = useSyncExternalStore(subscribe, getCapability, () => false);
  return enabled ? <HeroScene /> : <div className="hero-blocks" aria-hidden="true"><span className="hero-block hero-block-one"/><span className="hero-block hero-block-two"/><span className="hero-block hero-block-three"/></div>;
}
