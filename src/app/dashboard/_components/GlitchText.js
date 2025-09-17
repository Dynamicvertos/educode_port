// src/app/dashboard/_components/GlitchText.jsx
'use client';

export default function GlitchText({ children, className = '' }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 text-cyan-400 blur-[1px] translate-x-[2px] translate-y-[-1px] mix-blend-screen opacity-70">{children}</span>
      <span className="absolute inset-0 text-emerald-400 blur-[1px] -translate-x-[2px] translate-y-[1px] mix-blend-screen opacity-70">{children}</span>
    </div>
  );
}