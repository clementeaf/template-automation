#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Plantilla para componente funcional
const componentTemplate = (name) => `'use client';

import React from 'react';

interface ${name}Props {
  children?: React.ReactNode;
}

export default function ${name}({ children }: ${name}Props) {
  return (
    <div className="component">
      <h2>${name} Component</h2>
      {children}
    </div>
  );
}
`;

// Pregunta el nombre del componente
rl.question('¿Nombre del componente? ', (name) => {
  if (!name) {
    console.error('Se requiere un nombre para el componente');
    rl.close();
    return;
  }
  
  // Asegura que el nombre comience con mayúscula
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);
  
  rl.question('¿Tipo de componente? (ui/forms/layout) ', (type) => {
    // Validar el tipo de componente
    const validTypes = ['ui', 'forms', 'layout'];
    const componentType = validTypes.includes(type) ? type : 'ui';
    
    // Crear directorio si no existe
    const componentDir = path.join(__dirname, '..', 'src', 'components', componentType);
    const componentPath = path.join(componentDir, `${componentName}.tsx`);
    
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
    
    // Crear el archivo del componente
    fs.writeFileSync(componentPath, componentTemplate(componentName));
    
    console.log(`Componente ${componentName} creado en ${componentPath}`);
    rl.close();
  });
}); 