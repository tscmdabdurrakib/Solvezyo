import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import gsap from 'gsap';
import AnimatedLogo from '@/components/AnimatedLogo';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Animation state tracking
  const emailAnimationActive = useRef(false);
  const passwordAnimationActive = useRef(false);

  // Stage 1: Email input animation - Gears rotate with smooth start
  useEffect(() => {
    if (email && !emailAnimationActive.current) {
      emailAnimationActive.current = true;
      
      // Initial bounce to show activation
      gsap.fromTo(gear1Ref.current, 
        { scale: 1 },
        { scale: 1.1, duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }
      );
      
      // Smooth rotation start
      gsap.to(gear1Ref.current, {
        rotation: 360,
        duration: 3,
        ease: 'power1.inOut',
        repeat: -1,
      });
      gsap.to(gear2Ref.current, {
        rotation: -360,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
      });
    } else if (!email && emailAnimationActive.current) {
      emailAnimationActive.current = false;
      gsap.killTweensOf([gear1Ref.current, gear2Ref.current]);
      gsap.to([gear1Ref.current, gear2Ref.current], {
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      });
    }
  }, [email]);

  // Stage 2: Password input animation - Pulley system activates
  useEffect(() => {
    if (password && email && !passwordAnimationActive.current) {
      passwordAnimationActive.current = true;
      
      // Pulley activation with bounce
      gsap.fromTo(pulleyRef.current,
        { scale: 1 },
        { scale: 1.15, duration: 0.4, ease: 'elastic.out(1, 0.5)', yoyo: true, repeat: 1 }
      );
      
      // Smooth pulley rotation
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2.5,
        ease: 'power1.inOut',
        repeat: -1,
      });
      
      // Weight movement with realistic easing
      gsap.to(weightRef.current, {
        y: -60,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    } else if (!password && passwordAnimationActive.current) {
      passwordAnimationActive.current = false;
      gsap.killTweensOf([pulleyRef.current, weightRef.current]);
      gsap.to([pulleyRef.current, weightRef.current], {
        rotation: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.5)',
      });
    }
  }, [password, email]);

  // Stage 3: Submit - Final animation sequence
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Kill existing animations
    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, pulleyRef.current, weightRef.current]);

    // Final animation sequence with smooth transitions
    const finalTimeline = gsap.timeline();

    // Lever activates with realistic physics
    finalTimeline.to(leverRef.current, {
      rotation: -35,
      transformOrigin: 'center',
      duration: 0.5,
      ease: 'power3.out',
    });

    // Bottle tips with smooth motion
    finalTimeline.to(
      bottleRef.current,
      {
        rotation: 60,
        transformOrigin: 'bottom right',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.2'
    );

    // Liquid flows naturally
    finalTimeline.to(
      liquidRef.current,
      {
        opacity: 1,
        scaleY: 1.5,
        duration: 0.6,
        ease: 'sine.in',
      },
      '-=0.4'
    );

    // Drop falls with gravity
    finalTimeline.to(
      dropRef.current,
      {
        y: 100,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
      },
      '-=0.5'
    );

    // Button press with satisfying click
    finalTimeline.to(
      buttonTopRef.current,
      {
        y: 8,
        duration: 0.15,
        ease: 'power2.in',
      },
      '-=0.3'
    );

    // Button release
    finalTimeline.to(
      buttonTopRef.current,
      {
        y: 0,
        duration: 0.2,
        ease: 'elastic.out(2, 0.3)',
      }
    );

    // Celebration - gears spin fast with excitement
    finalTimeline.to(
      [gear1Ref.current, gear2Ref.current],
      {
        rotation: '+=1080',
        duration: 1.2,
        ease: 'power3.out',
        scale: 1.1,
      },
      '-=0.1'
    );

    // Pulley spins fast too
    finalTimeline.to(
      pulleyRef.current,
      {
        rotation: '+=720',
        duration: 1,
        ease: 'power3.out',
      },
      '<'
    );

    // Actual login
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Success!',
        description: 'Logged in successfully',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        variant: 'destructive',
      });
      // Reset animations on error
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <AnimatedLogo />
          <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400">Fill the form to activate the machine</p>
        </div>

        {/* Integrated Animation + Form Container */}
        <form onSubmit={handleSubmit}>
        <div className="relative border-2 border-black dark:border-white rounded-lg p-8 bg-white dark:bg-gray-900">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-login" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-login)" />
            </svg>
          </div>

          {/* Mechanical Diagram with Integrated Form */}
          <svg className="w-full h-[600px]" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Top Section - Gears (Email Trigger) */}
            <g ref={gear1Ref} transform="translate(150, 80)">
              <circle cx="0" cy="0" r="40" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-50"
                  width="6"
                  height="20"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="15" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={gear2Ref} transform="translate(250, 90)">
              <circle cx="0" cy="0" r="30" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-40"
                  width="6"
                  height="15"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="12" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            {/* Email Input Field */}
            <foreignObject x="350" y="40" width="400" height="100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-email"
                />
              </div>
            </foreignObject>

            {/* Connection line */}
            <path d="M 280 90 Q 320 90, 350 80" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />

            {/* Middle Section - Pulley System (Password Trigger) */}
            <g ref={pulleyRef} transform="translate(650, 180)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="25" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="8" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <line x1="650" y1="215" x2="650" y2="320" stroke="black" strokeWidth="2" strokeDasharray="8,4" className="dark:stroke-white" />

            <g ref={weightRef} transform="translate(650, 320)">
              <rect x="-25" y="0" width="50" height="40" fill="gray" stroke="black" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-white" />
              <text x="0" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">W</text>
            </g>

            {/* Password Input Field */}
            <foreignObject x="350" y="160" width="400" height="100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black dark:text-white"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </foreignObject>

            {/* Bottom Section - Lever & Bottle System */}
            <g ref={leverRef} transform="translate(200, 400)">
              <line x1="-80" y1="0" x2="80" y2="0" stroke="black" strokeWidth="6" strokeLinecap="round" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="10" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={bottleRef} transform="translate(500, 380)">
              <path d="M -20 0 L -20 60 L 20 60 L 20 0 L 15 0 L 15 -20 L -15 -20 L -15 0 Z" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <path
                ref={liquidRef}
                d="M -18 30 L -18 58 L 18 58 L 18 30 Z"
                fill="gray"
                opacity="0.6"
                className="dark:fill-gray-600"
              />
            </g>

            <circle
              ref={dropRef}
              cx="520"
              cy="440"
              r="4"
              fill="gray"
              opacity="0"
              className="dark:fill-gray-400"
            />

            {/* Final Button */}
            <g transform="translate(400, 500)">
              <rect x="-80" y="0" width="160" height="50" fill="darkgray" stroke="black" strokeWidth="2" rx="8" className="dark:fill-gray-700 dark:stroke-white" />
              <rect
                ref={buttonTopRef}
                x="-70"
                y="-8"
                width="140"
                height="50"
                fill="gray"
                stroke="black"
                strokeWidth="2"
                rx="8"
                className="dark:fill-gray-600 dark:stroke-white"
              />
            </g>

            {/* Connection lines */}
            <path d="M 280 400 Q 350 410, 480 390" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 520 440 Q 450 460, 400 500" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
          </svg>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              disabled={loading}
              data-testid="button-login"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Complete Machine & Login
                </div>
              )}
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-signup">
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
