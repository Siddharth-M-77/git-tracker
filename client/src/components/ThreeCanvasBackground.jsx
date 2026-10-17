import React, { useEffect, useRef } from 'react';

/**
 * High-performance 3D Interactive Canvas Background
 * Renders an interactive 3D particle constellation, cybernetic depth grid,
 * and mouse-responsive parallax camera effect.
 */
export default function ThreeCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle 3D node array
    const PARTICLE_COUNT = 75;
    const particles = [];
    const FOV = 400;

    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let cameraX = 0;
    let cameraY = 0;

    // Initialize 3D particles in a cube space
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 800 + 100, // Distance from camera
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.2,
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#06b6d4' : '#a855f7',
      });
    }

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - width / 2) * 0.15;
      mouseY = (e.clientY - height / 2) * 0.15;
      targetCameraX = mouseX;
      targetCameraY = mouseY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.01;
      // Smooth camera interpolation
      cameraX += (targetCameraX - cameraX) * 0.05;
      cameraY += (targetCameraY - cameraY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle 3D Cyber Perspective Grid at bottom
      const horizonY = height * 0.65;
      const vanishingX = width / 2 + cameraX * 0.5;

      ctx.save();
      ctx.lineWidth = 1;

      // Perspective grid lines radiating towards horizon
      const gridLines = 18;
      for (let i = -gridLines; i <= gridLines; i++) {
        const xBottom = width / 2 + (i * width) / (gridLines * 1.1);
        const grad = ctx.createLinearGradient(xBottom, height, vanishingX, horizonY);
        grad.addColorStop(0, 'rgba(99, 102, 241, 0.14)');
        grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.04)');
        grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(xBottom, height);
        ctx.lineTo(vanishingX, horizonY);
        ctx.stroke();
      }

      // Horizontal depth lines on grid
      for (let j = 1; j <= 8; j++) {
        const depth = Math.pow(j / 8, 2.2);
        const y = horizonY + depth * (height - horizonY);
        const gradH = ctx.createLinearGradient(0, y, width, y);
        gradH.addColorStop(0, 'rgba(99, 102, 241, 0)');
        gradH.addColorStop(0.5, `rgba(99, 102, 241, ${0.12 * depth})`);
        gradH.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.strokeStyle = gradH;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Update and Project 3D Particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around bounds
        if (p.x < -900) p.x = 900;
        if (p.x > 900) p.x = -900;
        if (p.y < -700) p.y = 700;
        if (p.y > 700) p.y = -700;
        if (p.z < 50) p.z = 850;
        if (p.z > 850) p.z = 50;

        // 3D perspective projection with camera offset
        const relX = p.x - cameraX;
        const relY = p.y - cameraY;
        const scale = FOV / (FOV + p.z);
        const projX = width / 2 + relX * scale;
        const projY = height / 2 + relY * scale;

        if (projX > -50 && projX < width + 50 && projY > -50 && projY < height + 50) {
          projected.push({
            p,
            projX,
            projY,
            scale,
            alpha: Math.min(1, Math.max(0.1, (850 - p.z) / 700)),
          });
        }
      }

      // 3. Draw Constellation Connections
      ctx.lineWidth = 0.8;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.projX - b.projX;
          const dy = a.projY - b.projY;
          const distSq = dx * dx + dy * dy;

          if (distSq < 13000) {
            const opacity = (1 - distSq / 13000) * 0.22 * Math.min(a.alpha, b.alpha);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.projX, a.projY);
            ctx.lineTo(b.projX, b.projY);
            ctx.stroke();
          }
        }
      }

      // 4. Draw 3D Particle Spheres with Glowing Core
      for (let i = 0; i < projected.length; i++) {
        const { p, projX, projY, scale, alpha } = projected[i];
        const r = Math.max(1, p.radius * scale);

        // Soft halo
        const glow = ctx.createRadialGradient(projX, projY, 0, projX, projY, r * 3);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'transparent');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(projX, projY, r * 3, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(projX, projY, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* 3D Atmospheric Depth Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '35%',
          right: '-10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 65%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
