import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, X } from 'lucide-react';

interface TwoFactorAuthProps {
  onVerify: (code: string) => Promise<void>;
  onClose: () => void;
}

export default function TwoFactorAuth({ onVerify, onClose }: TwoFactorAuthProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;

    setLoading(true);
    try {
      await onVerify(code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" data-testid="2fa-modal">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full border-2 border-black dark:border-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
          </div>
          <button onClick={onClose} className="p-1" data-testid="button-close-2fa">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter the 6-digit code from your authenticator app
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="text-center text-2xl font-bold tracking-widest border-2 border-black dark:border-white"
            data-testid="input-2fa-code"
          />

          <Button
            type="submit"
            disabled={code.length !== 6 || loading}
            className="w-full"
            data-testid="button-verify-2fa"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          Can't access your authenticator? <button className="text-primary hover:underline">Use backup code</button>
        </p>
      </div>
    </div>
  );
}
