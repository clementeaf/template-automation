'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className = '', fullWidth = false, ...props }, ref) => {
    const baseClasses = 'px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors';
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const combinedClasses = `${baseClasses} ${stateClasses} ${widthClass} ${className}`;
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input ref={ref} className={combinedClasses} {...props} />
        {error ? (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 