import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-4 shadow-2xl z-50 max-w-sm transform transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      data-testid="achievement-toast"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white/20 rounded-full">
          <Trophy className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">🎉 Achievement Unlocked!</h4>
          <p className="font-semibold">{achievement.title}</p>
          <p className="text-sm opacity-90">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}
