'use client';

import { config } from '@/lib/config';

export default function EnvBadge() {
  return (
    <span
      className={
        config.isDev
          ? 'px-2 py-1 text-xs rounded-full bg-amber-900/50 text-amber-300 border border-amber-700'
          : 'px-2 py-1 text-xs rounded-full bg-emerald-900/50 text-emerald-300 border border-emerald-700'
      }
    >
      {config.isDev ? 'DEV' : 'PROD'}
    </span>
  );
}
