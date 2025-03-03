'use client';

import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="container-fluid py-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-foreground">Mi Aplicación</h1>
        <ThemeToggle />
      </header>
      
      <section className="container-fluid py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Bienvenido a Next.js con React Query y TailwindCSS
          </h1>
          <p className="text-lg mb-8 text-muted-foreground">
            Esta es una plantilla moderna que incluye sistema de temas, componentes UI reutilizables y más.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <FeatureCard 
              title="Sistema de Temas" 
              description="Cambia fácilmente entre temas claro y oscuro con un solo clic."
              icon="🌓"
            />
            <FeatureCard 
              title="TailwindCSS" 
              description="Utilidades CSS modernas para un desarrollo rápido y consistente."
              icon="🎨"
            />
            <FeatureCard 
              title="React Query" 
              description="Gestión eficiente del estado del servidor para mejores experiencias."
              icon="🔄"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
} 