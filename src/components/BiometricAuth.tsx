import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint, Scan } from 'lucide-react';

interface BiometricAuthProps {
  onAuthenticate: () => Promise<void>;
}

export default function BiometricAuth({ onAuthenticate }: BiometricAuthProps) {
  const [scanning, setScanning] = useState(false);

  const handleBiometric = async () => {
    setScanning(true);
    // Simulate biometric scan
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await onAuthenticate();
    setScanning(false);
  };

  return (
    <div className="space-y-3" data-testid="biometric-auth">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or use biometric</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleBiometric}
          disabled={scanning}
          className="w-full relative overflow-hidden"
          data-testid="button-fingerprint"
        >
          <Fingerprint className="w-5 h-5" />
          {scanning && (
            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleBiometric}
          disabled={scanning}
          className="w-full relative overflow-hidden"
          data-testid="button-face-id"
        >
          <Scan className="w-5 h-5" />
          {scanning && (
            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
          )}
        </Button>
      </div>
      {scanning && (
        <p className="text-sm text-center text-primary animate-pulse">Scanning...</p>
      )}
    </div>
  );
}
