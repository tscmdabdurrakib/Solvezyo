import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  vx: number;
  vy: number;
  rotationSpeed: number;
}

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    setPieces(newPieces);

    const interval = setInterval(() => {
      setPieces((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.rotationSpeed,
            vy: p.vy + 0.1,
          }))
          .filter((p) => p.y < window.innerHeight + 50)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            transition: 'all 0.016s linear',
          }}
        />
      ))}
    </div>
  );
}
