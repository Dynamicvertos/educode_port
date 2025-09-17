// src/app/dashboard/_components/CICDConsole.jsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function CICDConsole() {
  const [status, setStatus] = useState('RUNNING'); // RUNNING | SUCCESS | FAILED
  const [duration, setDuration] = useState('00:00');
  const [cycle, setCycle] = useState(0); // force rerun

  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const sec = Math.floor((Date.now() - start) / 1000);
      setDuration(formatTime(sec));
    }, 500);
    return () => clearInterval(iv);
  }, [cycle]);

  return (
    <div className="rounded-2xl relative overflow-hidden bg-[#0b0f14]/70 border border-cyan-400/20 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Build & Test Console</h3>
          
        </div>
        <div className="text-right text-xs text-slate-400">
          <div>Duration: <span className="text-white">{duration}</span></div>
          <div>Status: <StatusChip status={status} /></div>
        </div>
      </div>

      <div className="mt-4 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <PipelineProgress onDone={(ok) => {
            setStatus(ok ? 'SUCCESS' : 'FAILED');
            setTimeout(() => {
              setStatus('RUNNING');
              setCycle((c) => c + 1); // rerun
            }, 1400);
          }} rerunKey={cycle} />

          <BuildLog rerunKey={cycle} />
        </div>

        <div className="space-y-4">
          <TestMatrix rerunKey={cycle} />
          <MetaCard />
        </div>
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const map = {
    RUNNING: 'bg-amber-400/15 text-amber-200 border-amber-400/30',
    SUCCESS: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30',
    FAILED: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
  };
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border ${map[status] || ''}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'SUCCESS' ? 'bg-emerald-400' : status === 'FAILED' ? 'bg-rose-400' : 'bg-amber-400'}`} />
      {status}
    </span>
  );
}

/* ================= PipelineProgress ================= */

function PipelineProgress({ onDone, rerunKey }) {
  const steps = useMemo(() => ([
    { key: 'install', label: 'Install dependencies' },
    { key: 'lint', label: 'Lint' },
    { key: 'type', label: 'Typecheck' },
    { key: 'build', label: 'Build' },
    { key: 'test', label: 'Test' },
    { key: 'pack', label: 'Package artifacts' },
    { key: 'publish', label: 'Publish (dry‑run)' },
  ]), []);

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCurrent(0);
    setProgress(0);

    let ok = true;
    let iv = setInterval(() => {
      setProgress((p) => {
        const inc = 3 + Math.random() * 9;
        const next = Math.min(100, p + inc);
        return next;
      });
    }, 120);

    const tick = setInterval(() => {
      setProgress(100);
      setTimeout(() => {
        setCurrent((c) => {
          if (c + 1 >= steps.length) {
            clearInterval(iv);
            clearInterval(tick);
            onDone?.(ok);
          }
          return Math.min(steps.length - 1, c + 1);
        });
        setProgress(0);
      }, 140);
      // Random tiny chance to “warn/slow” during test step (still succeed)
      if (steps[current]?.key === 'test' && Math.random() < 0.05) {
        // no-op; flavor
      }
    }, 1400);

    return () => {
      clearInterval(iv);
      clearInterval(tick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerunKey]);

  return (
    <div className="rounded-xl bg-white/5 border border-cyan-400/20 p-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <Step key={s.key} label={s.label} state={i < current ? 'done' : i === current ? 'active' : 'todo'} progress={i === current ? progress : i < current ? 100 : 0} />
        ))}
      </div>
    </div>
  );
}

function Step({ label, state, progress }) {
  const bar = state === 'active' ? (
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all" style={{ width: `${progress}%` }} />
    </div>
  ) : state === 'done' ? (
    <div className="h-1.5 w-full bg-emerald-400/30 rounded-full">
      <div className="h-full w-full bg-emerald-400/70 rounded-full" />
    </div>
  ) : (
    <div className="h-1.5 w-full bg-white/10 rounded-full" />
  );

  return (
    <div className="rounded-lg border border-white/10 bg-[#0b0f14]/60 p-3">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="text-slate-300">{label}</span>
        <span className={`h-1.5 w-1.5 rounded-full ${state === 'done' ? 'bg-emerald-400' : state === 'active' ? 'bg-cyan-400' : 'bg-slate-500'}`} />
      </div>
      {bar}
    </div>
  );
}

/* ================= BuildLog ================= */

function BuildLog({ rerunKey }) {
  const boxRef = useRef(null);
  const [lines, setLines] = useState([]);

  const seed = useMemo(() => ([
    '$ npm ci',
    '> added 1458 packages in 23.4s',
    '$ npm run lint',
    '> eslint . --max-warnings=0',
    '✓ 0 problems, 0 warnings',
    '$ npm run typecheck',
    '> tsc -p tsconfig.json',
    'No type errors found',
    '$ npm run build',
    '> next build',
    'info - Using Webpack 5. Compiling...',
    'info - Compiled successfully in 14.8s',
    'info - Collecting page data...',
    'info - Generating static pages (0/6)',
    'info - Generating static pages (6/6)',
    'info - Finalizing page optimization...',
    'Route (app)                Size     First Load',
    '└ /dashboard               63.1 kB  120.9 kB',
    '✓ Build artifacts created: ./.next, dist/',
    '$ npm run test',
    '> jest --runInBand',
    ' PASS  tests/api.spec.ts (12.1 s)',
    ' PASS  tests/exam.e2e.ts (19.8 s)',
    'Test Suites: 2 passed, 2 total',
    'Tests:       54 passed, 54 total',
    'Snapshots:   0 total',
    'Time:        21.01 s',
    '$ npm run package',
    '> node scripts/package.mjs',
    '• zipped web bundle (42.6 MB → 12.4 MB)',
    '• signed installer (win x64, mac arm64/x64, linux deb/rpm)',
    'Done in 00:56',
  ]), []);

  useEffect(() => {
    setLines([]);
    let i = 0;
    const iv = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, stamp(seed[i % seed.length])];
        return next.slice(-120);
      });
      i += 1;
      requestAnimationFrame(() => {
        if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
      });
      if (i >= seed.length) clearInterval(iv);
    }, 400);
    return () => clearInterval(iv);
  }, [rerunKey, seed]);

  return (
    <div className="h-48 overflow-hidden rounded-xl bg-[#0b0f14]/70 border border-emerald-400/20 p-3 font-mono text-xs text-emerald-200" ref={boxRef}>
      {lines.map((l, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="whitespace-pre-wrap">{l}</span>
        </div>
      ))}
    </div>
  );
}

function stamp(line) {
  const d = new Date();
  return `[${d.toLocaleTimeString()}] ${line}`;
}

/* ================= TestMatrix ================= */

function TestMatrix({ rerunKey }) {
  const initial = useMemo(() => ([
    'Auth: SSO handshake',
    'API: Institution CRUD',
    'CMS: Content upload',
    'Exams: Lockdown flow',
    'Proctor: Stream attach',
    'Anti‑tamper: VM detect',
    'Telemetry: ingest',
    'Analytics: reports',
    'UI: Dashboard smoke',
    'E2E: Student journey',
    'E2E: Faculty grading',
    'Compliance: WCAG',
  ]), []);

  const [results, setResults] = useState(initial.map((name) => ({ name, status: 'pending' })));

  useEffect(() => {
    // reset
    setResults(initial.map((n) => ({ name: n, status: 'pending' })));
    // progressively mark as pass/fail with small randomness
    const timers = initial.map((_, i) =>
      setTimeout(() => {
        setResults((prev) => {
          const next = [...prev];
          const rand = Math.random();
          next[i] = { ...next[i], status: rand < 0.92 ? 'pass' : 'fail' };
          return next;
        });
      }, 800 + i * 250)
    );
    return () => timers.forEach(clearTimeout);
  }, [rerunKey, initial]);

  return (
    <div className="rounded-xl bg-white/5 border border-cyan-400/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white">Test Suites</h4>
        <Summary results={results} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {results.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b0f14]/60 px-3 py-2 text-xs">
            <span className="text-slate-300 truncate">{r.name}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border
              ${r.status === 'pass' ? 'border-emerald-400/30 text-emerald-200' :
                r.status === 'fail' ? 'border-rose-400/30 text-rose-200' :
                'border-amber-400/30 text-amber-200'}
            `}>
              <span className={`h-1.5 w-1.5 rounded-full ${r.status === 'pass' ? 'bg-emerald-400' : r.status === 'fail' ? 'bg-rose-400' : 'bg-amber-400'}`} />
              {r.status === 'pass' ? 'PASS' : r.status === 'fail' ? 'FAIL' : 'PENDING'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Summary({ results }) {
  const pass = results.filter((r) => r.status === 'pass').length;
  const fail = results.filter((r) => r.status === 'fail').length;
  return (
    <div className="text-[11px] text-slate-400">
      <span className="text-emerald-300">{pass} pass</span>
      <span className="px-1">·</span>
      <span className={`${fail ? 'text-rose-300' : 'text-slate-400'}`}>{fail} fail</span>
    </div>
  );
}

/* ================= MetaCard ================= */

function MetaCard() {
  return (
    <div className="rounded-xl bg-white/5 border border-cyan-400/20 p-4 text-sm">
      <h4 className="text-sm font-semibold text-white mb-2">Artifact Meta</h4>
      <ul className="text-slate-300 space-y-1">
        <li>Target: win x64, win arm64, mac x64/arm64, linux deb/rpm</li>
        <li>Bundle: 63.1 kB page, 120.9 kB first load</li>
        <li>Compression: −38% (PDF/video/exam assets)</li>
        <li>Signed installers with SHA256</li>
      </ul>
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
    </div>
  );
}

function formatTime(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}