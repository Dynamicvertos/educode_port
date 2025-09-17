// src/app/dashboard/_components/RouteLoader.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('NAVIGATING');
  const seqRef = useRef(0);

  useEffect(() => {
    const seq = ++seqRef.current;
    const target = pickWord(); // e.g., NAVIGATING / COMPILING / ROUTING
    const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()*+-/#$%_';
    const DURATION = 900; // ms
    const FADE_DELAY = 150;

    setVisible(true);

    let raf;
    const start = performance.now();

    const loop = (now) => {
      if (seq !== seqRef.current) return; // canceled by next nav
      const t = Math.min(1, (now - start) / DURATION);
      const reveal = Math.floor(target.length * easeOutCubic(t));

      // Build scrambled string
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          out += ' ';
          continue;
        }
        out += i < reveal ? target[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setText(out);

      if (t < 1) {
        raf = requestAnimationFrame(loop);
      } else {
        // done: brief hold then fade out
        setTimeout(() => {
          if (seq === seqRef.current) setVisible(false);
        }, FADE_DELAY);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => {
      seqRef.current++;
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden
    >
      <div className="relative rounded-full bg-[#0b0f14]/80 border border-cyan-400/30 backdrop-blur-sm px-4 py-2 shadow-[0_0_18px_rgba(0,255,200,0.25)]">
        <span className="font-mono text-[13px] tracking-wide text-slate-200">
          <span className="opacity-60">[</span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400">
            {text}
          </span>{' '}
          <span className="opacity-60">]</span>
          <span className="ml-2 align-middle inline-block h-4 w-px bg-cyan-400/90 animate-caret" />
        </span>

        {/* soft under-glow */}
        <div className="pointer-events-none absolute -inset-x-4 bottom-0 h-3 bg-cyan-400/20 blur-lg" />
      </div>

      <style jsx>{`
        .animate-caret {
          animation: caretBlink 1s steps(1, end) infinite;
        }
        @keyframes caretBlink {
          0%, 45% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-caret { animation: none; }
        }
      `}</style>
    </div>
  );
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function pickWord() {
  // Rotate through a few coding-appropriate labels
  const words = ['NAVIGATING', 'COMPILING', 'RESOLVING', 'ROUTING', 'LINKING', 'DEPLOYING'];
  return words[Math.floor(Math.random() * words.length)];
}