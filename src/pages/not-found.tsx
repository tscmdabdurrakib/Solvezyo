import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Clock } from "lucide-react";

// Creative and interactive 404 Not Found page
export default function NotFound() {
  // State for countdown timer
  const [countdown, setCountdown] = useState(20);
  const [, navigate] = useLocation();

  // Handle home navigation
  const goToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Keyboard event listener for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigate to home when 'h' is pressed
      if (e.key.toLowerCase() === "h") {
        goToHome();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToHome]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown <= 0) {
      goToHome();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, goToHome]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Generate 20 floating bubbles/shapes with random animations */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
            }}
          />
        ))}

        {/* Additional geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute bg-gradient-to-tr from-primary/10 to-transparent"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 180,
              scale: Math.random() * 0.3 + 0.2,
              opacity: Math.random() * 0.3 + 0.1,
              borderRadius: Math.random() > 0.5 ? "30%" : "0%",
            }}
            animate={{
              rotate: 360,
              scale: [
                Math.random() * 0.3 + 0.2,
                Math.random() * 0.4 + 0.3,
                Math.random() * 0.3 + 0.2,
              ],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 text-center px-4 relative">
        {/* Animated 404 text with glitch effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <h1 className="text-9xl md:text-[15rem] font-bold text-primary/10 relative inline-block">
            <span className="sr-only">404</span>
            {/* Base layer */}
            <span className="absolute inset-0 text-9xl md:text-[15rem] font-bold text-primary/50">
              404
            </span>

            {/* Glitch layers */}
            <div>
              <motion.span
                className="absolute inset-0 text-primary text-9xl md:text-[15rem] font-bold"
                style={{ clipPath: "inset(0 0 0 0)" }}
                initial={{ x: 0 }}
                animate={{
                  x: [0, -5, 5, -3, 3, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 5,
                }}
              >
                404
              </motion.span>

              <motion.span
                className="absolute inset-0 text-red-500 text-9xl md:text-[15rem] font-bold opacity-30"
                style={{ clipPath: "inset(0 0 0 0)" }}
                initial={{ x: 0 }}
                animate={{
                  x: [0, 5, -5, 3, -3, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 5,
                  delay: 0.1,
                }}
              >
                404
              </motion.span>

              <motion.span
                className="absolute inset-0 text-blue-500 text-9xl md:text-[15rem] font-bold opacity-30"
                style={{ clipPath: "inset(0 0 0 0)" }}
                initial={{ x: 0 }}
                animate={{
                  x: [0, -5, 5, -3, 3, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 5,
                  delay: 0.2,
                }}
              >
                404
              </motion.span>
            </div>

            <span className="relative text-9xl md:text-[15rem] font-bold text-primary">
              404
            </span>
          </h1>
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-xl md:text-2xl mt-4 mb-8 text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Oops! The page you're looking for has wandered off into the digital void.
        </motion.p>

        {/* SVG Illustration */}
        <motion.div
          className="my-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/70"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8" />
            <path d="M8 9h.01" />
            <path d="M16 9h.01" />
          </svg>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="group transition-all duration-300 hover:border-primary/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Button
            onClick={goToHome}
            size="lg"
            className="group shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
        </motion.div>

        {/* Keyboard shortcut info */}
        <motion.p
          className="text-xs text-muted-foreground mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs">H</kbd> to go home
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>
            Redirecting to home in <span className="text-primary font-medium">{countdown}</span> seconds
          </span>
        </motion.div>
      </div>
    </div>
  );
}
