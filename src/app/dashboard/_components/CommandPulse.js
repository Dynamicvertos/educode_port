// src/app/dashboard/_components/CommandPulse.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function CommandPulse({ height = 360 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.offsetWidth;
    let h = height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    let t = 0;
    const center = { x: w / 2, y: h / 2 };
    const rings = [60, 100, 140, 180];

    function drawBackground() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(0,229,255,0.18)';
      ctx.lineWidth = 1;

      // crosshair
      ctx.beginPath();
      ctx.moveTo(center.x, 0); ctx.lineTo(center.x, h);
      ctx.moveTo(0, center.y); ctx.lineTo(w, center.y);
      ctx.stroke();

      // rings
      rings.forEach((r) => {
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    function drawSweep() {
      const angle = (t * 0.02) % (Math.PI * 2);
      const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, rings[rings.length - 1] + 20);
      grad.addColorStop(0, 'rgba(0,229,255,0.0)');
      grad.addColorStop(1, 'rgba(0,229,255,0.12)');
      ctx.fillStyle = grad;

      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, rings[rings.length - 1] + 20, -0.2, 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawPulses() {
      for (let i = 0; i < 24; i++) {
        const rr = rings[i % rings.length] + ((i * 7 + t) % 20) - 10;
        const ang = ((i * 0.5) + t * 0.01) % (Math.PI * 2);
        const x = center.x + Math.cos(ang) * rr;
        const y = center.y + Math.sin(ang) * rr;

        ctx.shadowColor = 'rgba(0,255,163,0.7)';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(0,255,163,0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function loop() {
      t += 1;
      drawBackground();
      drawSweep();
      drawPulses();
      raf = requestAnimationFrame(loop);
    }
    let raf = requestAnimationFrame(loop);

    const onResize = () => {
      w = canvas.offsetWidth;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [height]);

  return (
    <canvas
      ref={ref}
      className="w-full rounded-xl border border-cyan-400/20 bg-[#0b0f14]/60"
      style={{ height }}
    />
  );
}