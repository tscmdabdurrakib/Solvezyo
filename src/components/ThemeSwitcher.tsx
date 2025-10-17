import { Button } from '@/components/ui/button';
import { Cog, Zap, Sparkles } from 'lucide-react';

type MechanicalTheme = 'steampunk' | 'modern' | 'futuristic';

interface ThemeSwitcherProps {
  currentTheme: MechanicalTheme;
  onThemeChange: (theme: MechanicalTheme) => void;
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const themes = [
    { id: 'steampunk' as const, name: 'Steampunk', icon: Cog, color: 'text-amber-600' },
    { id: 'modern' as const, name: 'Modern', icon: Zap, color: 'text-blue-600' },
    { id: 'futuristic' as const, name: 'Futuristic', icon: Sparkles, color: 'text-purple-600' },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-300 dark:border-gray-600" data-testid="theme-switcher">
      <p className="text-sm font-medium mb-3">Mechanical Theme</p>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <Button
              key={theme.id}
              type="button"
              variant={currentTheme === theme.id ? 'default' : 'outline'}
              onClick={() => onThemeChange(theme.id)}
              className="flex flex-col items-center gap-1 h-auto py-3"
              data-testid={`button-theme-${theme.id}`}
            >
              <Icon className={`w-5 h-5 ${currentTheme === theme.id ? '' : theme.color}`} />
              <span className="text-xs">{theme.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
