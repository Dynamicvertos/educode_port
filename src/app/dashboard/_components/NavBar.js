// src/app/dashboard/_components/NavBar.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const nav = [
  { href: '/dashboard', label: 'Home' },
  { href: '/dashboard/downloads', label: 'Downloads' },
  { href: '/dashboard/features', label: 'Features' },
  { href: '/dashboard/about', label: 'About' },
//   { href: '/dashboard/developers', label: 'Developers' },
  { href: '/dashboard/contact', label: 'Contact Us' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-4 py-3">
      <div className="flex items-center justify-between rounded-2xl bg-[#0b0f14]/70 backdrop-blur-xl border border-cyan-400/20 px-4 py-2 shadow-[0_0_40px_-12px_rgba(0,255,200,0.3)]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <span className="text-slate-100 font-semibold tracking-tight">TheEduCode</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative px-3 py-2 rounded-xl text-sm transition-all
                ${active ? 'text-white' : 'text-slate-300 hover:text-white'}
                `}
              >
                <span className="relative z-10">{n.label}</span>
                {active && (
                  <span className="absolute inset-0 rounded-xl bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_30px_-10px_rgba(34,211,238,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}