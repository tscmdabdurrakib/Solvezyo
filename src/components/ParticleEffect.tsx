import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: 'spark' | 'smoke' | 'glow';
}

interface ParticleEffectProps {
  x: number;
  y: number;
  active: boolean;
  type?: 'spark' | 'smoke' | 'glow';
  count?: number;
}

export default function ParticleEffect({ x, y, active, type = 'spark', count = 10 }: ParticleEffectProps) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!active) {
      particlesRef.current = [];
      return;
    }

    // Create particles
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 2 + 1;
      
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 30 + 20,
        size: Math.random() * 3 + 2,
        color: type === 'spark' ? '#FFD700' : type === 'smoke' ? '#888' : '#00FFFF',
        type,
      });
    }

    const animate = () => {
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.vy += 0.1; // Gravity
        return p.life < p.maxLife;
      });

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, x, y, type, count]);

  return (
    <svg ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
      {particlesRef.current.map((particle, i) => (
        <circle
          key={i}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          opacity={1 - particle.life / particle.maxLife}
        />
      ))}
    </svg>
  );
}
