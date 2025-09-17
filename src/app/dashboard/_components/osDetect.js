// src/app/dashboard/_components/osDetect.js
'use client';

import { useEffect, useState } from 'react';

// Backward-compatible sync function you already use
export function detectOSArch() {
  if (typeof window === 'undefined') {
    return { os: 'windows', arch: 'x64' };
  }
  const ua = navigator.userAgent || '';
  const plat = navigator.platform || '';
  const uaData = navigator.userAgentData || null;

  let os = 'windows';
  if (/Mac|Macintosh|MacIntel|Mac OS X/i.test(ua) || /Mac/.test(plat)) os = 'mac';
  if (/Linux/i.test(ua) || /Linux/.test(plat)) os = 'linux';
  if (/Windows|Win32|Win64|WOW64/i.test(ua)) os = 'windows';

  let arch = 'x64';
  const archFromUAData = uaData && uaData.architecture ? uaData.architecture : '';
  if (/arm|aarch64/i.test(ua) || /arm/i.test(archFromUAData)) arch = 'arm64';
  // Apple Silicon heuristic
  if (os === 'mac' && /MacIntel/.test(plat) && navigator.maxTouchPoints > 2) arch = 'arm64';

  return { os, arch };
}

// New: sync best-guess (adds version/distro labels)
export function getPlatformInfoSync() {
  if (typeof window === 'undefined') {
    return {
      os: 'windows',
      arch: 'x64',
      osLabel: 'Windows',
      version: null,
      versionName: null,
      distro: null,
      distroVersion: null,
      distroVersionMajor: null,
      ready: false,
    };
  }

  const ua = navigator.userAgent || '';
  const plat = navigator.platform || '';
  const { os, arch } = detectOSArch();

  let osLabel = os === 'mac' ? 'macOS' : os === 'linux' ? 'Linux' : 'Windows';
  let version = null;
  let versionName = null;
  let distro = null;
  let distroVersion = null;
  let distroVersionMajor = null;

  if (os === 'windows') {
    // Windows NT number (cannot differentiate 10 vs 11 reliably without UA-CH)
    const m = ua.match(/Windows NT (\d+\.\d+)/i);
    if (m) {
      const nt = parseFloat(m[1]);
      versionName = nt >= 10 ? '10/11' : m[1];
      version = m[1];
    }
  }

  if (os === 'mac') {
    const m = ua.match(/Mac OS X ([\d_]+)/i);
    if (m) {
      version = m[1].replace(/_/g, '.'); // e.g., 14_5 -> 14.5
      versionName = version.split('.').slice(0, 2).join('.'); // major.minor
    }
  }

  if (os === 'linux') {
    const dm = ua.match(/(Ubuntu|Fedora|Debian|Arch|Manjaro|Mint|Pop!_?OS|elementary|CentOS|Red Hat)[\/\s]?([\d.]+)?/i);
    if (dm) {
      distro = normalizeName(dm[1]);
      distroVersion = dm[2] || null;
      if (distroVersion) {
        const maj = parseInt(distroVersion.split('.')[0], 10);
        if (!Number.isNaN(maj)) distroVersionMajor = maj;
      }
    } else if (/Ubuntu/i.test(ua)) {
      distro = 'Ubuntu';
    }
  }

  return {
    os,
    arch,
    osLabel,
    version,
    versionName,
    distro,
    distroVersion,
    distroVersionMajor,
    ready: false,
  };
}

// New: high-entropy UA-CH async refinement (Windows 10 vs 11, arch, etc.)
export async function getPlatformInfo() {
  const base = getPlatformInfoSync();
  if (typeof window === 'undefined') return base;

  const uaData = navigator.userAgentData;
  try {
    if (uaData?.getHighEntropyValues) {
      const res = await uaData.getHighEntropyValues([
        'platform',
        'platformVersion',
        'architecture',
        'bitness',
        'model',
      ]);

      // Arch refinement
      let arch = base.arch;
      if (res.architecture) {
        if (/arm/i.test(res.architecture)) arch = 'arm64';
        if (/x86/i.test(res.architecture)) {
          arch = res.bitness === '64' ? 'x64' : 'x86';
        }
      }

      // Windows 10 vs 11 using platformVersion major
      let versionName = base.versionName;
      let version = base.version;
      if (base.os === 'windows' && res.platformVersion) {
        const major = parseInt(String(res.platformVersion).split('.')[0], 10);
        if (!Number.isNaN(major)) {
          if (major >= 13) {
            versionName = '11';
          } else {
            versionName = '10';
          }
          version = res.platformVersion;
        }
      }

      return {
        ...base,
        arch,
        version,
        versionName,
        ready: true,
      };
    }
  } catch {
    // ignore and return base
  }
  return { ...base, ready: true };
}

// New: React hook to use in components
export function usePlatformInfo() {
  const [info, setInfo] = useState(getPlatformInfoSync());
  useEffect(() => {
    let cancelled = false;
    getPlatformInfo().then((i) => {
      if (!cancelled) setInfo(i);
    });
    return () => { cancelled = true; };
  }, []);
  return info;
}

function normalizeName(s) {
  const m = s.toLowerCase();
  if (m.includes('pop')) return 'Pop!_OS';
  if (m.includes('red hat')) return 'Red Hat';
  return s.charAt(0).toUpperCase() + s.slice(1);
}


// // src/app/dashboard/_components/osDetect.js
// 'use client';

// export function detectOSArch() {
//   if (typeof window === 'undefined') {
//     return { os: 'windows', arch: 'x64' };
//   }
//   const ua = navigator.userAgent || '';
//   const plat = navigator.platform || '';
//   const uaData = navigator.userAgentData || null;

//   let os = 'windows';
//   if (/Mac|Macintosh|MacIntel|Mac OS X/i.test(ua) || /Mac/.test(plat)) os = 'mac';
//   if (/Linux/i.test(ua) || /Linux/.test(plat)) os = 'linux';
//   if (/Windows|Win32|Win64|WOW64/i.test(ua)) os = 'windows';

//   let arch = 'x64';
//   const archFromUAData = uaData && uaData.architecture ? uaData.architecture : '';
//   if (/arm|aarch64/i.test(ua) || /arm/i.test(archFromUAData)) arch = 'arm64';
//   if (os === 'mac' && /MacIntel/.test(plat) && navigator.maxTouchPoints > 2) arch = 'arm64';

//   return { os, arch };
// }
