import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const gearsRef = useRef<SVGCircleElement[]>([]);
  const boltsRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate each letter being "built" by mechanical parts
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        // Gears spin in to build the letter
        if (gearsRef.current[index]) {
          tl.fromTo(
            gearsRef.current[index],
            {
              scale: 0,
              rotation: -180,
              opacity: 0,
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 0.15,
              duration: 0.4,
              ease: 'back.out(2)',
            },
            index * 0.08
          );
        }

        // Bolts appear
        if (boltsRef.current[index]) {
          tl.fromTo(
            boltsRef.current[index],
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 0.25,
              duration: 0.3,
              ease: 'elastic.out(1, 0.5)',
            },
            index * 0.08 + 0.15
          );
        }

        // Letter drops into place
        tl.fromTo(
          letter,
          {
            y: -50,
            opacity: 0,
            scale: 0.5,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'bounce.out',
          },
          index * 0.08 + 0.2
        );
      }
    });

    // Final flourish - all gears spin together
    tl.to(
      gearsRef.current,
      {
        rotation: '+=360',
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.05,
      },
      '-=0.3'
    );

    // Subtle continuous rotation for gears
    gsap.to(gearsRef.current, {
      rotation: '+=360',
      duration: 20,
      repeat: -1,
      ease: 'none',
      stagger: {
        each: 0.1,
        repeat: -1,
      },
    });
  }, []);

  const logoText = 'Solvezyo';

  return (
    <div ref={containerRef} className="relative flex items-center justify-center mb-8">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 80"
        style={{ zIndex: 0 }}
      >
        {/* Background gears and mechanical parts */}
        {logoText.split('').map((_, index) => (
          <g key={`mechanical-${index}`}>
            {/* Gear behind each letter */}
            <circle
              ref={(el) => el && (gearsRef.current[index] = el)}
              cx={25 + index * 45}
              cy={40}
              r={15}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/10 dark:text-foreground/10"
            />
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={`tooth-${index}-${angle}`}
                x1={25 + index * 45 + Math.cos((angle * Math.PI) / 180) * 12}
                y1={40 + Math.sin((angle * Math.PI) / 180) * 12}
                x2={25 + index * 45 + Math.cos((angle * Math.PI) / 180) * 18}
                y2={40 + Math.sin((angle * Math.PI) / 180) * 18}
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground/10 dark:text-foreground/10"
                style={{
                  transformOrigin: `${25 + index * 45}px 40px`,
                }}
              />
            ))}
            {/* Center bolt */}
            <circle
              ref={(el) => el && (boltsRef.current[index] = el)}
              cx={25 + index * 45}
              cy={40}
              r={4}
              fill="currentColor"
              className="text-foreground/20 dark:text-foreground/20"
            />
          </g>
        ))}
      </svg>

      {/* Logo text */}
      <div className="relative z-10 flex items-center gap-1">
        {logoText.split('').map((letter, index) => (
          <span
            key={index}
            ref={(el) => el && (lettersRef.current[index] = el)}
            className="text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Decorative connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 80"
        style={{ zIndex: 1 }}
      >
        {logoText.split('').map((_, index) => {
          if (index < logoText.length - 1) {
            return (
              <line
                key={`connector-${index}`}
                x1={40 + index * 45}
                y1={40}
                x2={55 + index * 45}
                y2={40}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3,3"
                className="text-foreground/20 dark:text-foreground/20"
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}
