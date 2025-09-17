// src/app/dashboard/_components/NoiseOverlay.jsx
'use client';

export default function NoiseOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0">
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix type=\'saturate\' values=\'0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(#n)\' opacity=\'0.6\'/></svg>")',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,229,255,0.15),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(0,255,163,0.12),transparent_45%)]" />
    </div>
  );
}