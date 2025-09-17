// src/app/dashboard/_components/MatrixBackground.jsx
'use client';

import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 16;
    const columns = Math.floor(w / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = 'アカサタナハマヤラワ0123456789ABCDEF{}[]()<>=+-/*$#%&?_~'.split('');

    function draw() {
      ctx.fillStyle = 'rgba(11,15,20,0.08)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#00ffa3';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.shadowColor = 'rgba(0,255,163,0.35)';
        ctx.shadowBlur = 8;
        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      anim = requestAnimationFrame(draw);
    }

    let anim = requestAnimationFrame(draw);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className="w-full h-full block opacity-40" />;
}