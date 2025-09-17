// src/app/dashboard/_components/LiveLog.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

const seed = [
  '[SSO] OAuth handshake OK (edu.example.edu)',
  '[Proctor] Camera stream started (low-bitrate secure)',
  '[Exam] Lockdown engaged — clipboard/network blocked',
  '[Integrity] VM detection: clean',
  '[AI] Face tracking enabled (noise filter)',
  '[Device] OS/Browser/Hardware validated',
  '[Network] VPN/Proxy: none; TLS1.3 active',
  '[Content] PDF/video compression enabled (−38%)',
  '[Queue] Telemetry ingest steady (2.1k eps)',
  '[Alert] Suspicious window switch — flagged',
  '[Storage] AES-256 at rest, TLS in transit',
  '[Scale] 2,500 concurrent slot — nominal',
];

export default function LiveLog() {
  const [lines, setLines] = useState(seed.slice(0, 7));
  const idxRef = useRef(7);
  const boxRef = useRef(null);

  useEffect(() => {
    const iv = setInterval(() => {
      const next = seed[idxRef.current % seed.length];
      idxRef.current += 1;
      setLines((prev) => {
        const arr = [...prev, `${time()} ${next}`];
        return arr.slice(-10);
      });
      // autoscroll
      requestAnimationFrame(() => {
        if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
      });
    }, 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div ref={boxRef} className="h-40 overflow-hidden rounded-xl bg-[#0b0f14]/70 border border-emerald-400/20 p-3 font-mono text-xs text-emerald-200">
      {lines.map((l, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}

function time() {
  const d = new Date();
  return `[${d.toLocaleTimeString()}]`;
}