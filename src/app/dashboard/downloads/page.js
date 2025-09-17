// src/app/dashboard/downloads/page.js
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { detectOSArch } from '../_components/osDetect';

const DOWNLOADS = {
  windows: {
    stable: [
      { id: 'Installation Instruction', label: 'Setup Instruction', href: 'https://docs.google.com/document/d/1SEvi9ASni5sTPSrmBfA3h8xv5he7AzsFf4dgdcWpPu0/edit?usp=sharing' },
      { id: 'windows-x64', label: 'Windows x64 (.exe)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/EduCode-1.0.0-win-x64.exe' },
      // { id: 'windows-zip', label: 'Windows Portable (.zip)', href: 'https://download.theeducode.com/windows/TheEduCode-win-portable.zip' },
    ],
    insiders: [],
  },
  mac: {
    stable: [
      { id: 'mac-zip', label: 'Setup Instruction', href: 'https://docs.google.com/document/d/1eNiFXm-6PlkiAGeH7wyORPCOmX4XYY6b1c35ZGmI5m8/edit?usp=sharing' },
      { id: 'mac-arm64', label: 'macOS Apple Silicon (.dmg)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/EduCode-1.0.0-mac-arm64.dmg.zip' },
      { id: 'mac-x64', label: 'macOS Intel x64 (.dmg)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/EduCode-1.0.0-mac-intel.dmg.zip' },
    ],
    insiders: [],
  },
  linux: {
    stable: [
      { id: 'linux-deb-x64', label: 'Ubuntu24-gnome.deb', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.1.0/EduCode-1.1.0-ubuntu24-gnome.deb' },
      { id: 'linux-deb-arm64', label: 'Linux .deb (ARM64)', href: 'https://download.theeducode.com/linux/TheEduCode-arm64.deb' },
      { id: 'linux-rpm-x64', label: 'Linux .rpm (x64)', href: 'https://download.theeducode.com/linux/TheEduCode-x64.rpm' },
      { id: 'linux-rpm-arm64', label: 'Linux .rpm (ARM64)', href: 'https://download.theeducode.com/linux/TheEduCode-arm64.rpm' },
      { id: 'linux-tar', label: 'Linux .tar.gz (Universal)', href: 'https://download.theeducode.com/linux/TheEduCode-universal.tar.gz' },
      { id: 'linux-appimage', label: 'Linux AppImage', href: 'https://download.theeducode.com/linux/TheEduCode.AppImage' },
    ],
    insiders: [
      { id: 'linux-deb-ins', label: 'Linux .deb — Insiders', href: 'https://download.theeducode.com/insiders/TheEduCode-linux-insiders.deb' },
    ],
  },
};

// Linux version/flavor matrix (your links preserved/added)
const LINUX_MATRIX = {
  '22': {
    options: [
      { key: 'gnome', label: 'Ubuntu 22 — GNOME (.deb)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/Educode-1.0.0-ubuntu22-gnome.deb' },
      { key: 'kde', label: 'Ubuntu 22 — KDE (.deb)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/Educode-1.0.0-ubuntu22-kde.deb' },
    ],
  },
  '24': {
    options: [
      {
        key: 'gnome',
        label: 'Ubuntu 24 — GNOME (.deb)',
        href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.1.0/EduCode-1.1.0-ubuntu24-gnome.deb',
      },
    ],
  },
  '25': {
    options: [
      { key: 'gnome', label: 'Ubuntu 25 — GNOME (.deb)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/EduCode-1.0.0-ubuntu25-gnome.deb' },
      { key: 'kde-wayland', label: 'Ubuntu 25 — KDE (Wayland) (.deb)', href: 'https://github.com/theeducodeofficial-hub/EduCode-Releases/releases/download/v1.0.0/EduCode-1.0.0-ubuntu25-kde-wayland.deb' },
    ],
  },
};

export default function DownloadsPage() {
  const det = detectOSArch();
  const [os, setOs] = useState(det.os);
  const [arch, setArch] = useState(det.arch);
  const [channel, setChannel] = useState('stable');

  // Linux selectors
  const [linuxVersion, setLinuxVersion] = useState('24'); // default to 24 since you have a real link
  const linuxOptions = useMemo(() => LINUX_MATRIX[linuxVersion]?.options || [], [linuxVersion]);
  const [linuxFlavor, setLinuxFlavor] = useState(linuxOptions[0]?.key || 'gnome');

  useEffect(() => {
    setOs(det.os);
    setArch(det.arch);
  }, []);

  useEffect(() => {
    setLinuxFlavor((prev) => {
      const first = linuxOptions[0]?.key;
      return first || prev || 'gnome';
    });
  }, [linuxOptions]);

  const activeList = useMemo(() => DOWNLOADS[os][channel], [os, channel]);

  const primary = useMemo(() => {
    if (os === 'linux') {
      const picked = linuxOptions.find((o) => o.key === linuxFlavor) || linuxOptions[0];
      return picked || { href: '#', label: 'Select a Linux option' };
    }
    const prefId =
      os === 'windows'
        ? `windows-${arch}`
        : os === 'mac'
        ? `mac-${arch}`
        : '';
    return activeList.find((i) => i.id === prefId) || activeList[0];
  }, [os, arch, activeList, linuxOptions, linuxFlavor]);

  const gridItems = os === 'linux' ? linuxOptions : activeList;

  const isDisabled = (href) => !href || href === '#';
  const isInstruction = (item) => item?.href?.includes('docs.google.com') || /instruction/i.test(item?.label || '');

  // T&C modal state
  const [tcOpen, setTcOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const openDirect = (href) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const requestDownload = (item) => {
    if (!item || isDisabled(item.href)) return;
    // Instructions open directly (no modal)
    if (isInstruction(item)) {
      openDirect(item.href);
      return;
    }
    setPendingItem(item);
    setTcOpen(true);
  };

  const startDownload = () => {
    if (!pendingItem?.href) return;
    openDirect(pendingItem.href);
    setTcOpen(false);
    setPendingItem(null);
  };

  // Dynamic System Requirements (changes per OS/version)
  const sysReq = useMemo(
    () => buildSystemRequirements({ os, arch, linuxVersion, linuxFlavor }),
    [os, arch, linuxVersion, linuxFlavor]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mb-24">
      <header className="mt-10 md:mt-16">
        <h1 className="text-4xl font-semibold text-white">Download TheEduCode</h1>
        <p className="text-slate-300 mt-2">
          Auto‑detected: <span className="text-white font-medium">{osLabel(os)} {arch.toUpperCase()}</span>
        </p>
      </header>

      {/* Channel selector (kept exactly as you had) */}
      <div className="mt-6 flex items-center gap-4">
        <Toggle label="Stable" active={channel === 'stable'} onClick={() => setChannel('stable')} />
      </div>

      {/* OS tabs */}
      <div className="mt-6 flex flex-wrap gap-3">
        <OSTab label="Windows" active={os === 'windows'} onClick={() => setOs('windows')} />
        <OSTab label="macOS" active={os === 'mac'} onClick={() => setOs('mac')} />
        <OSTab label="Linux" active={os === 'linux'} onClick={() => setOs('linux')} />
      </div>

      {/* Linux-specific selectors */}
      {os === 'linux' && (
        <>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs text-slate-400">Version:</span>
            <Pill label="22" active={linuxVersion === '22'} onClick={() => setLinuxVersion('22')} />
            <Pill label="24" active={linuxVersion === '24'} onClick={() => setLinuxVersion('24')} />
            <Pill label="25" active={linuxVersion === '25'} onClick={() => setLinuxVersion('25')} />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-slate-400">Desktop:</span>
            {linuxOptions.map((opt) => (
              <Pill
                key={opt.key}
                label={prettyFlavor(opt.key)}
                active={linuxFlavor === opt.key}
                onClick={() => setLinuxFlavor(opt.key)}
              />
            ))}
          </div>
        </>
      )}

      {/* Primary big download */}
      <div className="mt-8">
        {isDisabled(primary?.href) ? (
          <button
            disabled
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-4 bg-white/10 border border-white/10 text-slate-300 cursor-not-allowed"
            title="Link coming soon"
          >
            <span className="text-lg">Download {primary?.label || '—'}</span>
            <span className="text-xs opacity-90">({channel})</span>
          </button>
        ) : (
          <button
            onClick={() => requestDownload(primary)}
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_40px_-10px_rgba(0,255,200,0.6)] hover:scale-[1.02] transition"
          >
            <span className="text-lg">Download {primary.label}</span>
            <span className="text-xs opacity-90">({channel})</span>
          </button>
        )}
      </div>

      {/* All downloads grid */}
      <section className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {gridItems.map((item) => {
          const data = os === 'linux' ? { id: item.key, label: item.label, href: item.href } : item;
          const direct = isInstruction(data);
          return (
            <DownloadCard
              key={os === 'linux' ? item.key : item.id}
              item={data}
              onClick={() => (direct ? openDirect(data.href) : requestDownload(data))}
            />
          );
        })}
      </section>

      {/* System requirements + Network requirements (dynamic) */}
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold mb-1 text-white">System requirements</h3>
          <div className="text-xs text-slate-400 mb-3">
            {sysReq.subtitle}
          </div>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            {sysReq.items.map((line, idx) => <li key={idx}>{line}</li>)}
          </ul>
        </div>

        <div className="rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Internet & Network</h3>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li>Internet speed: minimum 0.5 Mbps stable (2+ Mbps recommended)</li>
            <li>During exams, connect only to your college’s authorized network (campus Wi‑Fi/LAN)</li>
            <li>VPNs, proxies, and mobile hotspots are not allowed during exams</li>
            <li>Close bandwidth-heavy apps (downloads/streaming) during assessments</li>
          </ul>
        </div>
      </section>

      {/* Terms & Conditions Modal */}
      <TermsModal
        open={tcOpen}
        item={pendingItem}
        onClose={() => { setTcOpen(false); setPendingItem(null); }}
        onAccept={startDownload}
        os={os}
        linuxVersion={linuxVersion}
        linuxFlavor={linuxFlavor}
      />

      {/* Hide scrollbars globally and via utility */}
      <style jsx global>{`
        html, body {
          scrollbar-width: none;           /* Firefox */
          -ms-overflow-style: none;        /* IE/Edge */
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          width: 0;
          height: 0;                       /* WebKit */
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}

/* ===== helpers / UI ===== */

function Toggle({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border transition
      ${active ? 'bg-emerald-400/15 border-emerald-400/30 text-emerald-200' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'}
      `}
    >
      {label}
    </button>
  );
}

function OSTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl transition border
      ${active ? 'bg-cyan-400/15 border-cyan-400/30 text-cyan-200' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'}
      `}
    >
      {label}
    </button>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-sm transition border
      ${active ? 'bg-white/20 border-white/25 text-white' : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'}`}
    >
      {label}
    </button>
  );
}

function DownloadCard({ item, onClick }) {
  const disabled = !item?.href || item.href === '#';
  const handleClick = (e) => {
    if (disabled) return;
    e.preventDefault();
    onClick?.();
  };
  return (
    <a
      href={disabled ? undefined : item.href}
      onClick={handleClick}
      className={`group rounded-2xl border backdrop-blur-xl p-5 transition block
        ${disabled
          ? 'bg-white/5 border-white/10 cursor-not-allowed opacity-60'
          : 'bg-white/5 border border-cyan-400/20 hover:bg-white/10'}
      `}
      title={disabled ? 'Link coming soon' : 'Click to download'}
    >
      <div className="text-white font-medium">{item.label}</div>
      <div className="text-xs text-slate-400 mt-1">{disabled ? 'Coming soon' : 'Click to download'}</div>
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 group-hover:w-24 transition-all"></div>
    </a>
  );
}

function osLabel(os) {
  return os === 'mac' ? 'macOS' : os === 'linux' ? 'Linux' : 'Windows';
}

function prettyFlavor(key) {
  if (key === 'gnome') return 'GNOME';
  if (key === 'kde') return 'KDE';
  if (key === 'kde-wayland') return 'KDE Wayland';
  return key;
}

/* ================= dynamic system req ================= */
function buildSystemRequirements({ os, arch, linuxVersion, linuxFlavor }) {
  if (os === 'windows') {
    return {
      subtitle: 'Target: Windows 10/11 (64‑bit)',
      items: [
        'CPU: Intel Core i3 (any generation) or AMD Ryzen 3 (any generation)',
        'RAM: 4 GB minimum (8 GB recommended)',
        'Storage: ~500 MB free disk space',
        'Camera & microphone required for proctored exams',
        'Allow firewall prompt for telemetry and updates',
      ],
    };
  }

  if (os === 'mac') {
    const isArm = arch === 'arm64';
    return {
      subtitle: `Target: macOS ${isArm ? '15+ (Apple Silicon M1/M2/M3)' : '12+ (Intel x64 supported)'}`,
      items: [
        `Device: ${isArm ? 'Apple Silicon M1 or newer (recommended)' : 'Intel x64 (supported)'} `,
        `OS: ${isArm ? 'macOS 15 or later' : 'macOS 12 or later'}`,
        'RAM: 4 GB minimum (8 GB recommended)',
        'Storage: ~500 MB free disk space',
        'Camera & microphone required for proctored exams',
      ],
    };
  }

  // Linux
  const flavor = prettyFlavor(linuxFlavor);
  const ubuntuName =
    linuxVersion === '22' ? 'Ubuntu 22.04 LTS' :
    linuxVersion === '24' ? 'Ubuntu 24.04 LTS' :
    'Ubuntu 25 (GNOME/KDE)';
  return {
    subtitle: `Target: ${ubuntuName} — ${flavor} (64‑bit)`,
    items: [
      'CPU: Intel Core i3 (any generation) or AMD Ryzen 3 (any generation)',
      'RAM: 4 GB minimum (8 GB recommended)',
      'Desktop: ' + flavor,
      'Camera & microphone required for proctored exams',
      'Tip: if dependencies are missing, run “sudo apt -f install” after installing the .deb',
    ],
  };
}

/* ================= Terms & Conditions Modal ================= */
function TermsModal({ open, item, onAccept, onClose, os, linuxVersion, linuxFlavor }) {
  const [checked, setChecked] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open) {
      setChecked(false);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden bg-[#0b0f14]/90 border border-cyan-400/20 shadow-[0_0_40px_-10px_rgba(0,255,200,0.5)]">
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Terms & Conditions — Read Carefully</h3>
          <p className="text-slate-400 text-sm mt-1">Review the terms and click Accept to continue.</p>
        </div>

        <div
          ref={boxRef}
          className="max-h-[60vh] overflow-y-auto px-6 py-4 space-y-6 no-scrollbar"
        >
          {/* Terms */}
          <section>
            <h4 className="text-white font-semibold">1) Academic Integrity & Acceptable Use</h4>
            <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
              <li>Use TheEduCode client for legitimate learning and assessments only.</li>
              <li>No cheating, collusion, impersonation, or bypass of exam policies.</li>
              <li>Do not reverse engineer, tamper with, or redistribute the software.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-white font-semibold">2) Proctoring, Privacy & Data</h4>
            <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
              <li>During proctored exams, the client may capture camera, microphone, and screen per institute policy.</li>
              <li>Network metadata and activity logs are recorded for integrity auditing.</li>
              <li>Data is encrypted in transit and at rest; access is restricted to authorized staff.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-white font-semibold">3) System Permissions</h4>
            <ul className="list-disc pl-5 text-slate-300 text-sm space-y-1 mt-2">
              <li>Grant camera/microphone permissions when prompted for proctored exams.</li>
              <li>Allow the app through firewall for secure telemetry and updates.</li>
              <li>Close other development tools during exams to comply with lockdown policy.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-white font-semibold">4) Installation Instructions</h4>
            <div className="text-slate-300 text-sm mt-2 space-y-2">
              {os === 'windows' && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <p className="font-semibold text-white/90">Windows (.exe)</p>
                  <ol className="list-decimal pl-5 space-y-1 mt-1">
                    <li>Download the installer and run as Administrator.</li>
                    <li>Allow firewall prompt when asked.</li>
                    <li>After install, launch TheEduCode and sign in with institute account.</li>
                  </ol>
                </div>
              )}

              {os === 'mac' && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <p className="font-semibold text-white/90">macOS (.dmg)</p>
                  <ol className="list-decimal pl-5 space-y-1 mt-1">
                    <li>Open the .dmg and drag TheEduCode to Applications.</li>
                    <li>If Gatekeeper blocks, right‑click → Open to trust the app.</li>
                    <li>Launch from Applications and sign in with institute account.</li>
                  </ol>
                </div>
              )}

              {os === 'linux' && (
                <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                  <p className="font-semibold text-white/90">Ubuntu {linuxVersion} — {prettyFlavor(linuxFlavor)}</p>
                  <p className="text-slate-400 text-xs">.deb install (requires sudo)</p>
                  <pre className="mt-2 bg-black/40 border border-white/10 rounded-lg p-3 text-[12px] text-emerald-200 overflow-auto no-scrollbar">
                    sudo dpkg -i TheEduCode-{linuxVersion}-{linuxFlavor}.deb
                    {'\n'}sudo apt -f install
                  </pre>
                  <p className="text-xs text-slate-400 mt-2">If dependencies are missing, the second command fixes them.</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h4 className="text-white font-semibold">5) Support</h4>
            <p className="text-slate-300 text-sm mt-2">
              Need help? Email support@theeducode.com or your institute admin.
            </p>
          </section>

          <div className="h-2" />
        </div>

        <div className="px-6 py-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5"
            />
            I accept the Terms & Conditions above.
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition"
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              disabled={!checked}
              className={`px-4 py-2 rounded-xl transition
                ${(!checked)
                  ? 'bg-white/10 border border-white/10 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_24px_-8px_rgba(0,255,200,0.6)] hover:scale-[1.02]'}
              `}
            >
              Accept & Download {item?.label ? `— ${item.label}` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}