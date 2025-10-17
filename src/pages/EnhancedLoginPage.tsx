import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, HelpCircle } from 'lucide-react';
import gsap from 'gsap';

// Advanced Components
import Confetti from '@/components/Confetti';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import ProgressBar from '@/components/ProgressBar';
import SocialLogin from '@/components/SocialLogin';
import EmailVerification from '@/components/EmailVerification';
import TwoFactorAuth from '@/components/TwoFactorAuth';
import BiometricAuth from '@/components/BiometricAuth';
import AnimationSpeedControl from '@/components/AnimationSpeedControl';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TutorialMode from '@/components/TutorialMode';
import AchievementToast from '@/components/AchievementToast';

// Hooks
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useAchievements } from '@/hooks/useAchievements';

type MechanicalTheme = 'steampunk' | 'modern' | 'futuristic';

export default function EnhancedLoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const startTimeRef = useRef(Date.now());

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Advanced Features State
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [mechanicalTheme, setMechanicalTheme] = useState<MechanicalTheme>('modern');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [machineError, setMachineError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Animation refs
  const gear1Ref = useRef<SVGGElement>(null);
  const gear2Ref = useRef<SVGGElement>(null);
  const pulleyRef = useRef<SVGGElement>(null);
  const weightRef = useRef<SVGGElement>(null);
  const leverRef = useRef<SVGGElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);
  const buttonTopRef = useRef<SVGRectElement>(null);

  // Particle effects
  const [gearParticles, setGearParticles] = useState(false);
  const [pulleyParticles, setPulleyParticles] = useState(false);

  // Hooks
  const sounds = useSoundEffects();
  const { achievements, newAchievement, checkAchievements, clearNewAchievement } = useAchievements();
  
  // Auto-save form data
  const { clearSaved, getSaved } = useAutoSave({
    key: 'login-form-draft',
    data: { email, rememberMe },
    enabled: !loading,
  });

  // Load saved draft
  useEffect(() => {
    const saved = getSaved();
    if (saved) {
      setEmail(saved.email || '');
      setRememberMe(saved.rememberMe || false);
      toast({
        title: 'Draft Restored',
        description: 'Your previous form data has been restored',
      });
    }
  }, []);

  // Calculate progress
  const progress = ((email ? 50 : 0) + (password ? 50 : 0));

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    setPasswordStrength(Math.min(score, 5));
  }, [password]);

  // Email animation
  useEffect(() => {
    if (email) {
      setGearParticles(true);
      sounds.playGearSound();
      gsap.to(gear1Ref.current, {
        rotation: 360,
        duration: 2 / animationSpeed,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(gear2Ref.current, {
        rotation: -360,
        duration: 2 / animationSpeed,
        ease: 'linear',
        repeat: -1,
      });
      setTimeout(() => setGearParticles(false), 1000);
    } else {
      gsap.killTweensOf([gear1Ref.current, gear2Ref.current]);
      gsap.to([gear1Ref.current, gear2Ref.current], { rotation: 0, duration: 0.5 });
    }
  }, [email, animationSpeed, sounds]);

  // Password animation
  useEffect(() => {
    if (password && email) {
      setPulleyParticles(true);
      sounds.playPulleySound();
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2 / animationSpeed,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(weightRef.current, {
        y: -60,
        duration: 1.5 / animationSpeed,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
      setTimeout(() => setPulleyParticles(false), 1000);
    } else {
      gsap.killTweensOf([pulleyRef.current, weightRef.current]);
      gsap.to([pulleyRef.current, weightRef.current], { rotation: 0, y: 0, duration: 0.5 });
    }
  }, [password, email, animationSpeed, sounds]);

  // Error animation
  useEffect(() => {
    if (machineError) {
      sounds.playErrorSound();
      gsap.to([gear1Ref.current, gear2Ref.current, pulleyRef.current], {
        rotation: '+=30',
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: 'power2.inOut',
      });
      setTimeout(() => setMachineError(false), 1000);
    }
  }, [machineError, sounds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMachineError(true);
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Kill existing animations
    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, pulleyRef.current, weightRef.current]);

    // Final animation sequence
    const finalTimeline = gsap.timeline();
    finalTimeline.to(leverRef.current, {
      rotation: -35,
      transformOrigin: 'center',
      duration: 0.6 / animationSpeed,
      ease: 'power2.out',
    });
    finalTimeline.to(bottleRef.current, {
      rotation: 60,
      transformOrigin: 'bottom right',
      duration: 0.7 / animationSpeed,
    }, '-=0.2');
    finalTimeline.to(liquidRef.current, {
      opacity: 0.1,
      y: 30,
      duration: 0.8 / animationSpeed,
    }, '-=0.4');
    finalTimeline.to(dropRef.current, {
      opacity: 1,
      y: 25,
      duration: 0.25 / animationSpeed,
      repeat: 4,
      yoyo: true,
    }, '-=0.5');
    finalTimeline.to(buttonTopRef.current, {
      y: 8,
      duration: 0.3 / animationSpeed,
    }, '-=0.2');
    finalTimeline.to([gear1Ref.current, gear2Ref.current, pulleyRef.current], {
      rotation: '+=720',
      duration: 1 / animationSpeed,
      ease: 'power2.out',
    }, '-=0.1');

    setLoading(true);
    try {
      await login(email, password);
      
      const completionTime = Date.now() - startTimeRef.current;
      
      // Check achievements
      checkAchievements({
        loginCount: 1,
        signupCount: 0,
        formCompletionTime: completionTime,
        passwordStrength,
        socialLoginUsed: false,
        twoFactorEnabled: false,
      });

      sounds.playSuccessSound();
      setShowConfetti(true);
      clearSaved();
      
      setTimeout(() => {
        toast({
          title: 'Success!',
          description: 'Logged in successfully',
        });
        setLocation('/');
      }, 2000);
    } catch (error: any) {
      setMachineError(true);
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        variant: 'destructive',
      });
      gsap.to([leverRef.current, bottleRef.current, liquidRef.current, dropRef.current, buttonTopRef.current], {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'twitter') => {
    sounds.playClickSound();
    checkAchievements({
      loginCount: 1,
      signupCount: 0,
      formCompletionTime: 0,
      passwordStrength: 0,
      socialLoginUsed: true,
      twoFactorEnabled: false,
    });
    toast({
      title: 'Social Login',
      description: `Logging in with ${provider}...`,
    });
  };

  const handleBiometric = async () => {
    sounds.playClickSound();
    toast({
      title: 'Biometric Auth',
      description: 'Authenticating...',
    });
  };

  const themeColors = {
    steampunk: { primary: '#8B4513', secondary: '#DAA520', accent: '#CD853F' },
    modern: { primary: '#000000', secondary: '#3B82F6', accent: '#8B5CF6' },
    futuristic: { primary: '#00FFFF', secondary: '#FF00FF', accent: '#7C3AED' },
  };

  const currentColors = themeColors[mechanicalTheme];

  const tutorialSteps = [
    {
      title: 'Welcome!',
      description: 'This interactive login form comes to life as you fill it. Let me show you how!',
      position: { x: '20%', y: '10%' },
    },
    {
      title: 'Email Field',
      description: 'Type your email to activate the gears. Watch them spin!',
      position: { x: '50%', y: '20%' },
    },
    {
      title: 'Password Field',
      description: 'Enter your password to start the pulley system.',
      position: { x: '50%', y: '35%' },
    },
    {
      title: 'Submit Button',
      description: 'Click to trigger the final mechanical sequence!',
      position: { x: '40%', y: '70%' },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 relative">
      {/* Floating Controls */}
      <div className="fixed top-4 right-4 space-y-3 z-30">
        <AnimationSpeedControl speed={animationSpeed} onSpeedChange={setAnimationSpeed} />
        <ThemeSwitcher currentTheme={mechanicalTheme} onThemeChange={setMechanicalTheme} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowTutorial(true)}
          className="w-full"
          data-testid="button-show-tutorial"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Tutorial
        </Button>
      </div>

      {/* Tutorial Mode */}
      {showTutorial && (
        <TutorialMode
          steps={tutorialSteps}
          onComplete={() => setShowTutorial(false)}
          onClose={() => setShowTutorial(false)}
        />
      )}

      {/* Achievement Toast */}
      <AchievementToast achievement={newAchievement} onClose={clearNewAchievement} />

      {/* Confetti */}
      <Confetti active={showConfetti} />

      {/* Email Verification Modal */}
      {showEmailVerification && (
        <EmailVerification
          email={email}
          onVerify={async (code) => {
            console.log('Verified:', code);
            setShowEmailVerification(false);
          }}
          onClose={() => setShowEmailVerification(false)}
        />
      )}

      {/* 2FA Modal */}
      {show2FA && (
        <TwoFactorAuth
          onVerify={async (code) => {
            console.log('2FA verified:', code);
            setShow2FA(false);
          }}
          onClose={() => setShow2FA(false)}
        />
      )}

      <div className="w-full max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enhanced Machine Login
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Experience the future of authentication</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={progress} className="mb-6" />

        <form onSubmit={handleSubmit}>
          <div className="relative border-2 border-black dark:border-white rounded-lg p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-enhanced" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-enhanced)" />
              </svg>
            </div>

            {/* Mechanical Diagram */}
            <svg className="w-full h-[600px]" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
              <g ref={gear1Ref} transform="translate(150, 80)">
                <circle cx="0" cy="0" r="40" fill="none" stroke={currentColors.primary} strokeWidth="3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <rect
                    key={i}
                    x="-3"
                    y="-50"
                    width="6"
                    height="20"
                    fill={currentColors.primary}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="15" fill="white" stroke={currentColors.primary} strokeWidth="3" />
                {gearParticles && (
                  <circle cx="0" cy="0" r="50" fill={currentColors.accent} opacity="0.3">
                    <animate attributeName="r" from="40" to="80" dur="0.5s" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="0.5s" />
                  </circle>
                )}
              </g>

              <g ref={gear2Ref} transform="translate(250, 90)">
                <circle cx="0" cy="0" r="30" fill="none" stroke={currentColors.secondary} strokeWidth="3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <rect
                    key={i}
                    x="-2"
                    y="-38"
                    width="4"
                    height="15"
                    fill={currentColors.secondary}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="10" fill="white" stroke={currentColors.secondary} strokeWidth="3" />
              </g>

              {/* Email Input */}
              <foreignObject x="350" y="40" width="400" height="120">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-email"
                  />
                </div>
              </foreignObject>

              {/* Pulley System */}
              <g ref={pulleyRef} transform="translate(650, 200)">
                <circle cx="0" cy="0" r="35" fill="none" stroke={currentColors.accent} strokeWidth="3" />
                <circle cx="0" cy="0" r="8" fill={currentColors.accent} />
                {pulleyParticles && (
                  <circle cx="0" cy="0" r="40" fill={currentColors.secondary} opacity="0.3">
                    <animate attributeName="r" from="35" to="70" dur="0.5s" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="0.5s" />
                  </circle>
                )}
              </g>

              <g ref={weightRef} transform="translate(650, 280)">
                <rect x="-25" y="0" width="50" height="60" fill="white" stroke={currentColors.primary} strokeWidth="3" />
                <line x1="-15" y1="20" x2="15" y2="20" stroke={currentColors.primary} strokeWidth="2" />
              </g>

              <line x1="650" y1="235" x2="650" y2="280" stroke={currentColors.primary} strokeWidth="3" strokeDasharray="5,5" />

              {/* Password Input */}
              <foreignObject x="350" y="180" width="250" height="120">
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 px-4 pr-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <PasswordStrengthMeter password={password} />
                </div>
              </foreignObject>

              {/* Bottom Mechanism */}
              <g ref={leverRef} transform="translate(120, 400)">
                <line x1="0" y1="0" x2="140" y2="0" stroke={currentColors.primary} strokeWidth="4" />
                <circle cx="70" cy="0" r="8" fill={currentColors.primary} />
              </g>

              <g ref={bottleRef} transform="translate(500, 380)">
                <rect x="0" y="0" width="50" height="80" fill="white" stroke={currentColors.secondary} strokeWidth="3" />
                <path ref={liquidRef} d="M 5 20 L 5 70 L 45 70 L 45 20 Z" fill={currentColors.accent} opacity="0.3" />
              </g>

              <circle ref={dropRef} cx="575" cy="480" r="6" fill={currentColors.accent} opacity="0" />

              <g transform="translate(600, 500)">
                <rect ref={buttonTopRef} x="5" y="0" width="70" height="15" fill="white" stroke={currentColors.primary} strokeWidth="2" />
              </g>

              {/* Remember Me & Submit */}
              <foreignObject x="280" y="480" width="300" height="120">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      data-testid="checkbox-remember-me"
                    />
                    <label htmlFor="remember" className="text-sm cursor-pointer select-none">
                      Remember me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-lg font-semibold"
                    disabled={loading}
                    data-testid="button-login"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <LogIn className="w-5 h-5" />
                        Activate Machine & Login
                      </div>
                    )}
                  </Button>
                </div>
              </foreignObject>
            </svg>

            {/* Social & Biometric Login */}
            <div className="mt-6 space-y-4">
              <SocialLogin onSocialLogin={handleSocialLogin} />
              <BiometricAuth onAuthenticate={handleBiometric} />
            </div>

            {/* Sign up link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/enhanced-signup">
                  <span className="font-semibold text-primary hover:underline cursor-pointer" data-testid="link-signup">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
