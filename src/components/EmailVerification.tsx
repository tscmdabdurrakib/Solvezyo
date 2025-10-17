import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onClose: () => void;
}

export default function EmailVerification({ email, onVerify, onClose }: EmailVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    setLoading(true);
    try {
      await onVerify(fullCode);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="email-verification-modal">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full border-2 border-black dark:border-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Verify Email</h2>
          <button onClick={onClose} className="p-1" data-testid="button-close-verification">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        <div className="flex gap-2 mb-6">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-black dark:border-white"
              data-testid={`input-code-${index}`}
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={code.join('').length !== 6 || loading}
          className="w-full"
          data-testid="button-verify-code"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>

        <button className="w-full mt-3 text-sm text-primary hover:underline" data-testid="button-resend-code">
          Resend Code
        </button>
      </div>
    </div>
  );
}
