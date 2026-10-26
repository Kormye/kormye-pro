import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frameId = 0;
    let time = 0;

    interface Star {
      x: number;
      y: number;
      r: number;
      a: number;
      v: number;
      s: number;
    }

    let stars: Star[] = [];
    // Colors from the official 6-color system
    let color1 = '#10B981'; // Emerald Green
    let color2 = '#064E3B'; // Forest Green
    let ink = '#0F172A';    // Midnight Slate

    const resize = () => {
      width = cv.width = window.innerWidth;
      height = cv.height = window.innerHeight;
      const count = Math.max(10, Math.round((width * height) / 36000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 5 + Math.random() * 12,
        a: Math.random() * Math.PI * 2,
        v: (Math.random() - 0.5) * 0.004,
        s: 0.08 + Math.random() * 0.18,
      }));
    };

    const updateColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        color1 = '#10B981';
        color2 = '#064E3B';
        ink = '#34D399';
      } else {
        color1 = '#10B981';
        color2 = '#064E3B';
        ink = '#064E3B';
      }
    };

    const drawStar = (cx: number, cy: number, r: number, a: number) => {
      ctx.beginPath();
      for (let i = 0; i < 16; i++) {
        const rad = i % 2 === 0 ? r : r * 0.52;
        const ang = a + (i * Math.PI) / 8;
        const x = cx + Math.cos(ang) * rad;
        const y = cy + Math.sin(ang) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawBlob = (px: number, py: number, r: number, color: string, alpha: number) => {
      const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, `${color}00`);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = grad;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
    };

    const loop = () => {
      if (time % 100 === 0) updateColors();
      ctx.clearRect(0, 0, width, height);
      const maxDim = Math.max(width, height);

      // Subtle ambient soothing glow using Forest Green and Emerald Green
      drawBlob(
        width * (0.25 + 0.08 * Math.sin(time / 300)),
        height * (0.2 + 0.06 * Math.cos(time / 340)),
        maxDim * 0.45,
        color2,
        0.04
      );
      drawBlob(
        width * (0.8 + 0.08 * Math.cos(time / 320)),
        height * (0.65 + 0.08 * Math.sin(time / 280)),
        maxDim * 0.5,
        color1,
        0.035
      );

      // Delicate floating Islamic geometric star particles
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;

      stars.forEach((s) => {
        s.a += s.v;
        s.y -= s.s;
        if (s.y < -30) {
          s.y = height + 30;
          s.x = Math.random() * width;
        }
        drawStar(s.x, s.y, s.r, s.a);
      });

      ctx.globalAlpha = 1;
      time++;
      if (!reducedMotion) {
        frameId = requestAnimationFrame(loop);
      }
    };

    resize();
    updateColors();
    loop();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
};
