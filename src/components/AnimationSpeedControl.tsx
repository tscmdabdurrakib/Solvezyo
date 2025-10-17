import { Slider } from '@/components/ui/slider';
import { Gauge } from 'lucide-react';

interface AnimationSpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export default function AnimationSpeedControl({ speed, onSpeedChange }: AnimationSpeedControlProps) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-300 dark:border-gray-600" data-testid="animation-speed-control">
      <div className="flex items-center gap-2 mb-3">
        <Gauge className="w-4 h-4" />
        <span className="text-sm font-medium">Animation Speed</span>
      </div>
      <div className="space-y-2">
        <Slider
          value={[speed]}
          onValueChange={(values) => onSpeedChange(values[0])}
          min={0.5}
          max={2}
          step={0.1}
          className="w-full"
          data-testid="slider-animation-speed"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Slow</span>
          <span className="font-bold">{speed}x</span>
          <span>Fast</span>
        </div>
      </div>
    </div>
  );
}
