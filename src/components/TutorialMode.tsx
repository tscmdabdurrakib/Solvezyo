import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  position: { x: string; y: string };
}

interface TutorialModeProps {
  steps: TutorialStep[];
  onComplete: () => void;
  onClose: () => void;
}

export default function TutorialMode({ steps, onComplete, onClose }: TutorialModeProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" data-testid="tutorial-overlay" />
      <div
        className="fixed bg-white dark:bg-gray-900 rounded-lg p-6 border-2 border-primary shadow-xl z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4"
        style={{ left: step.position.x, top: step.position.y }}
        data-testid="tutorial-tooltip"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{step.title}</h3>
            <p className="text-xs text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <button onClick={onClose} className="p-1" data-testid="button-close-tutorial">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            data-testid="button-tutorial-prev"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentStep ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleNext}
            data-testid="button-tutorial-next"
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </div>
    </>
  );
}
