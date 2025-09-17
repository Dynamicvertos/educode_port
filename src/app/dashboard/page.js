// src/app/dashboard/page.js
'use client';

import Link from 'next/link';
import Typewriter from './_components/Typewriter';
import GlitchText from './_components/GlitchText';
import CommandPulse from './_components/CommandPulse';
import LiveLog from './_components/LiveLog';
import CICDConsole from './_components/CICDConsole';
import { detectOSArch } from './_components/osDetect';

export default function HomePage() {
  const { os, arch } = detectOSArch();

  const primaryLabel =
    os === 'mac' ? `Download for macOS (${arch})` :
    os === 'linux' ? `Download for Linux (${arch})` :
    `Download for Windows (${arch})`;

  const primaryHref =
    os === 'mac'
      ? (arch === 'arm64' ? '/dashboard/downloads#mac-arm64' : '/dashboard/downloads#mac-x64')
      : os === 'linux'
      ? '/dashboard/downloads#linux'
      : (arch === 'arm64' ? '/dashboard/downloads#windows-arm64' : '/dashboard/downloads#windows-x64');

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero */}
      <section className="mt-10 md:mt-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            <GlitchText>TheEduCode</GlitchText>
          </h1>
          <p className="text-lg md:text-xl text-slate-300/90">
            Enterprise platform for secure programming education and assessment — designed for 20,000+ students with advanced proctoring, a secure browser, and multi‑layered encryption.
          </p>

          <ul className="text-slate-400 text-sm space-y-1">
            <li>• Real‑time learning tools, AI assistance, and professional coding environments.</li>
            <li>• Deep Student Result Analytics for Teachers & Universities.</li>
            <li>• Audit‑first architecture with end‑to‑end encryption.</li>
            <li>• Complete Dual Live Proctoring System.</li>
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              className="rounded-xl px-5 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_40px_-10px_rgba(0,255,200,0.6)] hover:scale-[1.02] transition"
            >
              {primaryLabel}
            </Link>
            <Link
              href="/dashboard/features"
              className="rounded-xl px-5 py-3 bg-white/5 border border-cyan-400/20 text-white hover:bg-white/10 transition"
            >
              Explore enterprise features
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 text-sm text-slate-300/90">
            <Stat label="Student Support Per University" value="20k+"/>
            <Stat label="Content Capability Per Course" value="10+ Hrs"/>
            <Stat label="Courses Per Educational Year" value="10+"/>
            <Stat label="Coding Languages Supported" value="50+"/>
          </div>
        </div>

        {/* Terminal effect card */}
        <div className="rounded-2xl bg-[#0b0f14]/70 border border-emerald-400/20 backdrop-blur-xl p-5 shadow-[0_0_50px_-12px_rgba(0,255,163,0.5)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-red-400/80"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400/80"></div>
            <div className="h-3 w-3 rounded-full bg-green-400/80"></div>
            <span className="ml-auto text-xs text-emerald-300/80">terminal</span>
          </div>
          <Typewriter
            lines={[
              '$ npx @theeducode/cli init campus-suite',
              '✔ Creating secure workspace...',
              '✔ Enabling proctoring (camera + screen)...',
              '✔ Attaching anti-cheat policies...',
              '✔ Connecting to institute SSO...',
              'Done. Run: cd campus-suite && npm run dev',
              '',
              '$ theeducode exams start --lockdown',
              '→ Lockdown enabled, network hardening active',
              '→ Proctor stream OK (secure, low-bitrate)',
              '→ Integrity score: 99.2%',
              'Listening on https://campus.local:443',
            ]}
            speed={22}
            restartDelay={1600}
            className="text-emerald-200"
            loop
          />
        </div>
      </section>

      {/* Command Center (replacement for activity monitor) */}
    

      {/* Deep pillars */}
      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <Card
          title="Institutional Control"
          desc="Institution dashboard, batch lifecycle, course CMS, versioning, and full analytics."
          badge="1"
        />
        <Card
          title="Student & Exams"
          desc="AI assistant, proctored exams (MCQ/coding), locked‑down browser, integrity controls."
          badge="2"
        />
        <Card
          title="Architecture"
          desc="Multi‑tenant cloud/on‑prem, end‑to‑end encryption, performance & observability."
          badge="3"
        />
      </section>

      {/* CTA */}
      <section className="mt-20 mb-28 text-center">
        <h3 className="text-3xl font-semibold">Ready to secure your next exam?</h3>
        <p className="text-slate-400 mt-2">Spin up TheEduCode for your institute today.</p>
        <Link
          href={primaryHref}
          className="inline-block mt-5 rounded-xl px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_40px_-10px_rgba(0,255,200,0.6)] hover:scale-[1.02] transition"
        >
          {primaryLabel}
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-white text-lg font-semibold">{value}</div>
      <div className="text-slate-400">{label}</div>
    </div>
  );
}

function Badge({ label, color = 'emerald' }) {
  const colors = {
    emerald: 'border-emerald-400/30 text-emerald-200',
    cyan: 'border-cyan-400/30 text-cyan-200',
    sky: 'border-sky-400/30 text-sky-200',
    amber: 'border-amber-400/30 text-amber-200',
  }[color] || 'border-cyan-400/30 text-cyan-200';
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${colors} bg-white/5`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
      {label}
    </div>
  );
}

function Card({ title, desc, badge }) {
  return (
    <div className="group rounded-2xl bg-white/[0.04] border border-cyan-400/20 p-6 hover:bg-white/[0.07] transition shadow-[0_0_30px_-10px_rgba(0,229,255,0.3)]">
      <div className="mb-2 inline-flex items-center gap-2 text-xs text-cyan-200/90">
        <span className="h-2 w-2 rounded-full bg-cyan-400/70"></span>
        {badge}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{desc}</p>
      <div className="mt-4 h-1 w-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full group-hover:w-24 transition-all"></div>
    </div>
  );
}