// src/app/dashboard/_components/ActivityNetwork.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function ActivityNetwork({ height = 320 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth;
    let heightPx = canvas.height = height * 2; // high-DPI-ish
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = heightPx * dpr;
    ctx.scale(dpr, dpr);
    heightPx = height;

    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * heightPx,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random(),
    }));

    let t = 0;

    function drawGrid() {
      ctx.strokeStyle = 'rgba(0,229,255,0.08)';
      ctx.lineWidth = 1;
      const gap = 24;
      ctx.beginPath();
      for (let x = 0; x < width; x += gap) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, heightPx);
      }
      for (let y = 0; y < heightPx; y += gap) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // sweeping scanner
      const sweepX = (t * 0.4) % width;
      const grad = ctx.createLinearGradient(sweepX - 40, 0, sweepX + 40, 0);
      grad.addColorStop(0, 'rgba(0,229,255,0)');
      grad.addColorStop(0.5, 'rgba(0,229,255,0.15)');
      grad.addColorStop(1, 'rgba(0,229,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(sweepX - 40, 0, 80, heightPx);
    }

    function connectNodes() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            const alpha = 1 - dist / 110;
            ctx.strokeStyle = `rgba(0,255,163,${0.15 + alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // data packet
            const p = ((t * 0.002) % 1.0);
            const px = a.x + (b.x - a.x) * p;
            const py = a.y + (b.y - a.y) * p;
            ctx.fillStyle = 'rgba(0,255,163,0.9)';
            ctx.shadowColor = 'rgba(0,255,163,0.7)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    function drawNodes() {
      for (const n of nodes) {
        // move
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > heightPx) n.vy *= -1;

        // pulse
        n.pulse += 0.04;
        const scale = 1 + Math.sin(n.pulse) * 0.2;

        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.shadowColor = 'rgba(0,229,255,0.7)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function loop() {
      t += 1;
      ctx.clearRect(0, 0, width, heightPx);
      drawGrid();
      connectNodes();
      drawNodes();
      raf = requestAnimationFrame(loop);
    }
    let raf = requestAnimationFrame(loop);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [height]);

  return <canvas ref={ref} className="w-full rounded-xl border border-cyan-400/20 bg-[#0b0f14]/60" style={{ height }} />;
}