import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkColors, LightColors, AppColors } from '@/constants/theme';
import { syncWidgetTheme } from '@/modules/widget-sync';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  Colors: AppColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  Colors: DarkColors,
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    AsyncStorage.getItem('app_theme').then((saved) => {
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    });
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    AsyncStorage.setItem('app_theme', next);
    syncWidgetTheme(next);
  };

  const Colors = useMemo(() => (theme === 'dark' ? DarkColors : LightColors), [theme]);

  const value = useMemo(
    () => ({ theme, Colors, isDark: theme === 'dark', toggleTheme }),
    [theme, Colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
