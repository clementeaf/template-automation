'use client';

import React from 'react';
import Image from "next/image";
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
          className="dark:invert"
        />
        <span className="text-xl font-semibold">Template</span>
      </div>
      <ThemeToggle />
    </header>
  );
} 