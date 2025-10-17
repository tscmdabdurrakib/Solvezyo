import { Button } from '@/components/ui/button';
import { SiGoogle, SiGithub, SiX } from 'react-icons/si';

interface SocialLoginProps {
  onSocialLogin: (provider: 'google' | 'github' | 'twitter') => void;
}

export default function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <div className="space-y-3" data-testid="social-login">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSocialLogin('google')}
          className="w-full"
          data-testid="button-google-login"
        >
          <SiGoogle className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onSocialLogin('github')}
          className="w-full"
          data-testid="button-github-login"
        >
          <SiGithub className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onSocialLogin('twitter')}
          className="w-full"
          data-testid="button-twitter-login"
        >
          <SiX className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
