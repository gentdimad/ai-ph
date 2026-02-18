import type { ReactNode } from 'react';

export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  const hasMaxWidth = className.includes('max-w-');
  return (
    <div className={`max-w-full mx-auto px-4 ${!hasMaxWidth ? 'max-w-[1400px]' : ''} ${className}`}>
      {children}
    </div>
  );
}
