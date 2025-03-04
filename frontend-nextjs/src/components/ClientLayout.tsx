'use client';

import React from 'react';
import { QueryProvider } from "@/lib/providers/query-provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
} 