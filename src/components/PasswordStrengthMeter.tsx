import { useEffect, useState } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setLabel('');
      return;
    }

    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    setStrength(Math.min(score, 5));

    if (score <= 2) {
      setLabel('Weak');
      setColor('bg-red-500');
    } else if (score <= 3) {
      setLabel('Fair');
      setColor('bg-yellow-500');
    } else if (score <= 4) {
      setLabel('Good');
      setColor('bg-blue-500');
    } else {
      setLabel('Strong');
      setColor('bg-green-500');
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1" data-testid="password-strength-meter">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= strength ? color : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${color.replace('bg-', 'text-')}`}>{label}</p>
    </div>
  );
}
