// Complex Mechanical SVG Components for Rube Goldberg Machine Animation
// Monochromatic design with black lines on white background

export const Gear = ({ size = 60, className = "", id = "gear1" }: { size?: number; className?: string; id?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    id={id}
  >
    <circle
      cx="50"
      cy="50"
      r="35"
      fill="none"
      stroke="black"
      strokeWidth="3"
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <rect
        key={i}
        x="48"
        y="10"
        width="4"
        height="15"
        fill="black"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="12" fill="white" stroke="black" strokeWidth="3" />
  </svg>
);

export const Pulley = ({ size = 50, className = "", id = "pulley1" }: { size?: number; className?: string; id?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    id={id}
  >
    <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="3" />
    <circle cx="50" cy="50" r="5" fill="black" />
    <line x1="50" y1="20" x2="50" y2="0" stroke="black" strokeWidth="2" />
  </svg>
);

export const Lever = ({ width = 120, className = "", id = "lever1" }: { width?: number; className?: string; id?: string }) => (
  <svg
    width={width}
    height="60"
    viewBox="0 0 120 60"
    className={className}
    id={id}
  >
    {/* Fulcrum */}
    <path d="M 55 50 L 60 60 L 65 50 Z" fill="black" />
    {/* Lever bar */}
    <rect x="10" y="48" width="100" height="4" fill="black" />
    {/* Weight on left */}
    <rect x="12" y="38" width="15" height="10" fill="black" />
    {/* Platform on right */}
    <rect x="85" y="43" width="20" height="5" fill="none" stroke="black" strokeWidth="2" />
  </svg>
);

export const ConveyorBelt = ({ width = 150, className = "", id = "conveyor1" }: { width?: number; className?: string; id?: string }) => (
  <svg
    width={width}
    height="80"
    viewBox="0 0 150 80"
    className={className}
    id={id}
  >
    {/* Belt structure */}
    <ellipse cx="30" cy="50" rx="15" ry="20" fill="none" stroke="black" strokeWidth="3" />
    <ellipse cx="120" cy="50" rx="15" ry="20" fill="none" stroke="black" strokeWidth="3" />
    <line x1="30" y1="30" x2="120" y2="30" stroke="black" strokeWidth="3" />
    <line x1="30" y1="70" x2="120" y2="70" stroke="black" strokeWidth="3" />
    {/* Belt notches */}
    {[40, 60, 80, 100].map((x, i) => (
      <line key={i} x1={x} y1="30" x2={x} y2="70" stroke="black" strokeWidth="2" opacity="0.5" />
    ))}
    {/* Item on belt */}
    <rect x="65" y="25" width="20" height="15" fill="none" stroke="black" strokeWidth="2" id={`${id}-item`} />
  </svg>
);

export const Weight = ({ size = 40, className = "", id = "weight1" }: { size?: number; className?: string; id?: string }) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 40 60"
    className={className}
    id={id}
  >
    {/* Rope */}
    <line x1="20" y1="0" x2="20" y2="25" stroke="black" strokeWidth="2" strokeDasharray="3,3" />
    {/* Weight body */}
    <rect x="8" y="25" width="24" height="30" fill="black" />
    {/* Weight lines */}
    <line x1="8" y1="35" x2="32" y2="35" stroke="white" strokeWidth="1" />
    <line x1="8" y1="45" x2="32" y2="45" stroke="white" strokeWidth="1" />
  </svg>
);

export const Chain = ({ length = 100, className = "", id = "chain1" }: { length?: number; className?: string; id?: string }) => (
  <svg
    width="20"
    height={length}
    viewBox={`0 0 20 ${length}`}
    className={className}
    id={id}
  >
    {Array.from({ length: Math.floor(length / 15) }).map((_, i) => (
      <ellipse
        key={i}
        cx="10"
        cy={7 + i * 15}
        rx="7"
        ry="5"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
    ))}
  </svg>
);

export const Funnel = ({ size = 60, className = "", id = "funnel1" }: { size?: number; className?: string; id?: string }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 60 72"
    className={className}
    id={id}
  >
    {/* Funnel top */}
    <path d="M 10 10 L 50 10 L 35 50 L 25 50 Z" fill="none" stroke="black" strokeWidth="3" />
    {/* Funnel spout */}
    <rect x="28" y="50" width="4" height="20" fill="none" stroke="black" strokeWidth="2" />
    {/* Liquid drops */}
    <circle cx="30" cy="72" r="2" fill="black" id={`${id}-drop`} opacity="0" />
  </svg>
);

export const Button = ({ className = "", id = "button1" }: { className?: string; id?: string }) => (
  <svg
    width="60"
    height="40"
    viewBox="0 0 60 40"
    className={className}
    id={id}
  >
    {/* Button base */}
    <rect x="5" y="25" width="50" height="10" fill="black" />
    {/* Button top */}
    <rect x="20" y="15" width="20" height="15" fill="white" stroke="black" strokeWidth="3" id={`${id}-top`} />
  </svg>
);

export const MechanicalArm = ({ className = "", id = "arm1" }: { className?: string; id?: string }) => (
  <svg
    width="100"
    height="80"
    viewBox="0 0 100 80"
    className={className}
    id={id}
  >
    {/* Base */}
    <rect x="10" y="60" width="20" height="15" fill="black" />
    {/* First segment */}
    <rect x="15" y="35" width="10" height="30" fill="black" transform-origin="20 60" id={`${id}-segment1`} />
    {/* Joint */}
    <circle cx="20" cy="35" r="5" fill="white" stroke="black" strokeWidth="2" />
    {/* Second segment */}
    <rect x="20" y="15" width="8" height="25" fill="black" transform-origin="20 35" id={`${id}-segment2`} />
    {/* Hand */}
    <path d="M 20 10 L 25 5 L 30 10 L 25 15 Z" fill="black" id={`${id}-hand`} />
  </svg>
);

export const Spring = ({ height = 80, className = "", id = "spring1" }: { height?: number; className?: string; id?: string }) => (
  <svg
    width="30"
    height={height}
    viewBox={`0 0 30 ${height}`}
    className={className}
    id={id}
  >
    <path
      d={`M 15 0 ${Array.from({ length: Math.floor(height / 10) }, (_, i) => 
        `L ${i % 2 === 0 ? 5 : 25} ${(i + 1) * 10}`
      ).join(' ')}`}
      fill="none"
      stroke="black"
      strokeWidth="3"
    />
  </svg>
);

export const Bottle = ({ className = "", id = "bottle1" }: { className?: string; id?: string }) => (
  <svg
    width="40"
    height="80"
    viewBox="0 0 40 80"
    className={className}
    id={id}
  >
    {/* Bottle neck */}
    <rect x="15" y="0" width="10" height="20" fill="none" stroke="black" strokeWidth="2" />
    {/* Bottle body */}
    <path d="M 10 20 L 10 60 Q 10 70, 20 70 Q 30 70, 30 60 L 30 20 Z" fill="white" stroke="black" strokeWidth="3" />
    {/* Liquid inside */}
    <path d="M 12 45 L 12 60 Q 12 68, 20 68 Q 28 68, 28 60 L 28 45 Z" fill="black" opacity="0.3" id={`${id}-liquid`} />
  </svg>
);

export const Switch = ({ className = "", id = "switch1" }: { className?: string; id?: string }) => (
  <svg
    width="60"
    height="40"
    viewBox="0 0 60 40"
    className={className}
    id={id}
  >
    {/* Base */}
    <rect x="10" y="25" width="40" height="10" rx="5" fill="white" stroke="black" strokeWidth="3" />
    {/* Toggle */}
    <circle cx="20" cy="30" r="8" fill="black" id={`${id}-toggle`} />
  </svg>
);
