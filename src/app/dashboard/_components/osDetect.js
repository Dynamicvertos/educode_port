// src/app/dashboard/_components/osDetect.js
'use client';

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
  if (os === 'mac' && /MacIntel/.test(plat) && navigator.maxTouchPoints > 2) arch = 'arm64';

  return { os, arch };
}