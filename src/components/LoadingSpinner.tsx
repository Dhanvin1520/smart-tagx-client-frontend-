import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/logos/Smarttagx.png"
        alt="Smarttagx"
        className="h-5 w-auto object-contain opacity-90 rounded-lg animate-smarttagx-bounce"
      />
    </div>
  );
};