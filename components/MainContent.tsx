'use client';

import { useSidebar } from './SidebarContext';
import clsx from 'clsx';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main className={clsx(
      'min-h-screen transition-all duration-300',
      collapsed ? 'lg:ml-16' : 'lg:ml-72'
    )}>
      <div className="max-w-5xl mx-auto px-6 py-10 lg:px-10">
        {children}
      </div>
    </main>
  );
}
