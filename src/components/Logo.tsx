import React from 'react';

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className}
      fill="currentColor"
    >
      <circle cx="250" cy="250" r="240" fill="currentColor"/>
      <path
        d="M250 120
           L180 380
           L250 320
           L320 380
           L250 120"
        fill="white"
      />
      <circle cx="250" cy="220" r="25" fill="white"/>
    </svg>
  );
}