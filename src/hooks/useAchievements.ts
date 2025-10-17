import { useState, useEffect, useCallback } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (stats: UserStats) => boolean;
  unlocked: boolean;
}

interface UserStats {
  loginCount: number;
  signupCount: number;
  formCompletionTime: number;
  passwordStrength: number;
  socialLoginUsed: boolean;
  twoFactorEnabled: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_login',
    title: 'First Steps',
    description: 'Complete your first login',
    condition: (stats) => stats.loginCount >= 1,
    unlocked: false,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete login in under 10 seconds',
    condition: (stats) => stats.formCompletionTime < 10000,
    unlocked: false,
  },
  {
    id: 'security_expert',
    title: 'Security Expert',
    description: 'Enable two-factor authentication',
    condition: (stats) => stats.twoFactorEnabled,
    unlocked: false,
  },
  {
    id: 'strong_password',
    title: 'Fort Knox',
    description: 'Create a strong password (strength 5/5)',
    condition: (stats) => stats.passwordStrength >= 5,
    unlocked: false,
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Use social login for the first time',
    condition: (stats) => stats.socialLoginUsed,
    unlocked: false,
  },
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : ACHIEVEMENTS;
  });

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const checkAchievements = useCallback((stats: UserStats) => {
    setAchievements((prev) => {
      const updated = prev.map((achievement) => {
        if (!achievement.unlocked && achievement.condition(stats)) {
          setNewAchievement(achievement);
          return { ...achievement, unlocked: true };
        }
        return achievement;
      });
      return updated;
    });
  }, []);

  const clearNewAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  return {
    achievements,
    newAchievement,
    checkAchievements,
    clearNewAchievement,
  };
}
