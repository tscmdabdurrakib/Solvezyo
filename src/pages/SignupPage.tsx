import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import gsap from 'gsap';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation refs
  const armSegment1Ref = useRef<SVGRectElement>(null);
  const armSegment2Ref = useRef<SVGRectElement>(null);
  const switchRef = useRef<SVGRectElement>(null);
  const gear1Ref = useRef<SVGGElement>(null);
  const gear2Ref = useRef<SVGGElement>(null);
  const conveyorRef = useRef<SVGGElement>(null);
  const pulleyRef = useRef<SVGGElement>(null);
  const weightRef = useRef<SVGGElement>(null);
  const leverRef = useRef<SVGGElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);

  // Animation state tracking
  const nameAnimationActive = useRef(false);
  const emailAnimationActive = useRef(false);
  const passwordAnimationActive = useRef(false);

  // Stage 1: Full Name input - Mechanical arm moves smoothly
  useEffect(() => {
    if (fullName && !nameAnimationActive.current) {
      nameAnimationActive.current = true;
      const tl = gsap.timeline();
      
      // Arm segment 1 moves with realistic motion
      tl.to(armSegment1Ref.current, {
        rotation: -30,
        transformOrigin: 'bottom center',
        duration: 0.7,
        ease: 'power2.out',
      })
        // Arm segment 2 follows smoothly
        .to(
          armSegment2Ref.current,
          {
            rotation: -20,
            transformOrigin: 'top center',
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        // Switch slides with satisfying motion
        .to(
          switchRef.current,
          {
            x: 15,
            duration: 0.35,
            ease: 'back.out(2)',
          },
          '-=0.2'
        );
    } else if (!fullName && nameAnimationActive.current) {
      nameAnimationActive.current = false;
      gsap.to([armSegment1Ref.current, armSegment2Ref.current, switchRef.current], {
        rotation: 0,
        x: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      });
    }
  }, [fullName]);

  // Stage 2: Email input - Gears and conveyor activate with visual feedback
  useEffect(() => {
    if (email && fullName && !emailAnimationActive.current) {
      emailAnimationActive.current = true;
      
      // Gear 1 starts with bounce
      gsap.fromTo(gear1Ref.current,
        { scale: 1 },
        { scale: 1.12, duration: 0.35, ease: 'back.out(3)', yoyo: true, repeat: 1 }
      );
      
      // Smooth gear rotations
      gsap.to(gear1Ref.current, {
        rotation: 360,
        duration: 2.8,
        ease: 'power1.inOut',
        repeat: -1,
      });
      gsap.to(gear2Ref.current, {
        rotation: -360,
        duration: 2.3,
        ease: 'power1.inOut',
        repeat: -1,
      });
      
      // Conveyor belt moves smoothly
      gsap.to(conveyorRef.current, {
        x: -100,
        duration: 2.5,
        ease: 'none',
        repeat: -1,
      });
    } else if (!email && emailAnimationActive.current) {
      emailAnimationActive.current = false;
      gsap.killTweensOf([gear1Ref.current, gear2Ref.current, conveyorRef.current]);
      gsap.to([gear1Ref.current, gear2Ref.current, conveyorRef.current], {
        rotation: 0,
        x: 0,
        scale: 1,
        duration: 0.65,
        ease: 'back.out(1.5)',
      });
    }
  }, [email, fullName]);

  // Stage 3: Password input - Pulley system activates with elasticity
  useEffect(() => {
    if (password && email && fullName && !passwordAnimationActive.current) {
      passwordAnimationActive.current = true;
      
      // Pulley activation with elastic bounce
      gsap.fromTo(pulleyRef.current,
        { scale: 1 },
        { scale: 1.18, duration: 0.45, ease: 'elastic.out(1.2, 0.4)', yoyo: true, repeat: 1 }
      );
      
      // Smooth pulley rotation
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2.3,
        ease: 'power1.inOut',
        repeat: -1,
      });
      
      // Weight moves with realistic physics
      gsap.to(weightRef.current, {
        y: -50,
        duration: 1.7,
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
  }, [password, email, fullName]);

  // Final Submit - Complete Animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: 'Error',
        description: 'Please agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, conveyorRef.current, pulleyRef.current, weightRef.current]);

    // Final sequence with smooth, satisfying animations
    const finalTimeline = gsap.timeline();

    // Lever activates with power
    finalTimeline.to(leverRef.current, {
      rotation: -40,
      transformOrigin: 'center',
      duration: 0.6,
      ease: 'power3.out',
    });

    // Bottle tips smoothly
    finalTimeline.to(
      bottleRef.current,
      {
        rotation: 65,
        transformOrigin: 'bottom right',
        duration: 0.9,
        ease: 'power2.inOut',
      },
      '-=0.25'
    );

    // Liquid flows naturally
    finalTimeline.to(
      liquidRef.current,
      {
        opacity: 1,
        scaleY: 1.6,
        duration: 0.7,
        ease: 'sine.in',
      },
      '-=0.45'
    );

    // Drop falls with gravity
    finalTimeline.to(
      dropRef.current,
      {
        y: 120,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      },
      '-=0.55'
    );

    // Celebration - all parts spin with excitement
    finalTimeline.to(
      [gear1Ref.current, gear2Ref.current],
      {
        rotation: '+=1440',
        duration: 1.3,
        ease: 'power3.out',
        scale: 1.15,
      },
      '-=0.15'
    );

    // Pulley celebrates too
    finalTimeline.to(
      pulleyRef.current,
      {
        rotation: '+=900',
        duration: 1.1,
        ease: 'power3.out',
        scale: 1.1,
      },
      '<'
    );

    // Conveyor speeds up
    finalTimeline.to(
      conveyorRef.current,
      {
        x: '-=150',
        duration: 0.8,
        ease: 'power2.out',
      },
      '<'
    );

    setLoading(true);
    try {
      await signup(email, password, fullName);
      toast({
        title: 'Success!',
        description: 'Account created successfully',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
      gsap.to([leverRef.current, bottleRef.current, liquidRef.current, dropRef.current], {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Build and activate your machine step by step</p>
        </div>

        {/* Integrated Animation + Form Container */}
        <div className="relative border-2 border-black dark:border-white rounded-lg p-8 bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit}>
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-signup" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-signup)" />
            </svg>
          </div>

          {/* Mechanical Diagram with Integrated Form */}
          <svg className="w-full h-[700px]" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
            {/* Top - Mechanical arm (Name Trigger) */}
            <g transform="translate(80, 80)">
              <rect ref={armSegment1Ref} x="-5" y="0" width="10" height="60" fill="black" className="dark:fill-white" style={{ transformOrigin: 'bottom center' }} />
              <rect ref={armSegment2Ref} x="-4" y="-50" width="8" height="50" fill="black" className="dark:fill-white" style={{ transformOrigin: 'top center' }} />
              <circle cx="0" cy="60" r="8" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g transform="translate(130, 90)">
              <rect x="0" y="0" width="60" height="30" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-800 dark:stroke-white" />
              <rect ref={switchRef} x="5" y="5" width="20" height="20" fill="black" className="dark:fill-white" />
            </g>

            {/* Full Name Input Field */}
            <foreignObject x="220" y="50" width="350" height="90">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-fullname"
                />
              </div>
            </foreignObject>

            {/* Middle - Gears and Conveyor (Email Trigger) */}
            <g ref={gear1Ref} transform="translate(120, 200)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-45"
                  width="6"
                  height="18"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="12" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={gear2Ref} transform="translate(220, 210)">
              <circle cx="0" cy="0" r="28" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-38"
                  width="6"
                  height="14"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={conveyorRef}>
              <rect x="280" y="190" width="100" height="8" fill="gray" className="dark:fill-gray-600" />
              {[290, 310, 330, 350, 370].map((x, i) => (
                <rect key={i} x={x} y="192" width="8" height="4" fill="darkgray" className="dark:fill-gray-400" />
              ))}
            </g>

            {/* Email Input Field */}
            <foreignObject x="420" y="160" width="400" height="90">
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

            {/* Pulley System (Password Trigger) */}
            <g ref={pulleyRef} transform="translate(750, 330)">
              <circle cx="0" cy="0" r="32" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="8" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <line x1="750" y1="362" x2="750" y2="460" stroke="black" strokeWidth="2" strokeDasharray="8,4" className="dark:stroke-white" />

            <g ref={weightRef} transform="translate(750, 460)">
              <rect x="-22" y="0" width="44" height="38" fill="gray" stroke="black" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-white" />
              <text x="0" y="24" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">W</text>
            </g>

            {/* Password Input Field */}
            <foreignObject x="420" y="300" width="400" height="100">
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

            {/* Bottom - Lever and Bottle */}
            <g ref={leverRef} transform="translate(250, 550)">
              <line x1="-70" y1="0" x2="70" y2="0" stroke="black" strokeWidth="6" strokeLinecap="round" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="10" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={bottleRef} transform="translate(550, 510)">
              <path d="M -18 0 L -18 55 L 18 55 L 18 0 L 14 0 L 14 -18 L -14 -18 L -14 0 Z" fill="none" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <path
                ref={liquidRef}
                d="M -16 28 L -16 53 L 16 53 L 16 28 Z"
                fill="gray"
                opacity="0.6"
                className="dark:fill-gray-600"
              />
            </g>

            <circle ref={dropRef} cx="568" cy="565" r="4" fill="gray" opacity="0" className="dark:fill-gray-400" />

            {/* Connection lines */}
            <path d="M 100 130 Q 180 160, 220 120" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 250 200 Q 350 220, 700 170" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 300 510 Q 400 520, 550 500" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
          </svg>

          {/* Terms Checkbox and Submit Button */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="border-2 border-black dark:border-white"
                data-testid="checkbox-terms"
              />
              <label htmlFor="terms" className="text-sm text-black dark:text-white cursor-pointer">
                I agree to the terms and conditions
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              disabled={loading || !agreeTerms}
              data-testid="button-signup"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Complete Machine & Sign Up
                </div>
              )}
            </Button>
          </div>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-login">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
