import React from 'react';

export default function LeafIcon({ className = 'w-12 h-12', rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M3 21c5-6 10-9 18-12-3 8-6 13-12 18-2-3-4-5-6-6z"
        fill="#279A2A"
      />
      <path
        d="M9 11c2-3 5-5 11-8-2 5-4 8-8 11-1-1-2-2-3-3z"
        fill="#60D36B"
        opacity="0.95"
      />
    </svg>
  );
}
