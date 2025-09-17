// src/app/dashboard/_components/Typewriter.jsx
'use client';

import { useEffect, useState } from 'react';

export default function Typewriter({
  lines = [],
  speed = 28,
  restartDelay = 1200,
  className = '',
  loop = true,
}) {
  const [text, setText] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timer;
    if (lineIdx < lines.length) {
      const current = lines[lineIdx];
      timer = setTimeout(() => {
        setText((prev) => prev + current[charIdx]);
        setCharIdx((c) => c + 1);
        if (charIdx + 1 >= current.length) {
          setText((prev) => prev + '\n');
          setLineIdx((l) => l + 1);
          setCharIdx(0);
        }
      }, speed);
    } else if (loop) {
      timer = setTimeout(() => {
        setText('');
        setLineIdx(0);
        setCharIdx(0);
      }, restartDelay);
    }
    return () => clearTimeout(timer);
  }, [charIdx, lineIdx, lines, speed, restartDelay, loop]);

  return (
    <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${className}`}>
      {text}
      <span className="inline-block w-2 h-4 bg-emerald-300/80 align-middle ml-1 animate-pulse" />
    </pre>
  );
}