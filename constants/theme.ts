export const DarkColors = {
  primary: '#f5c842',
  primaryDark: '#e6b830',
  primaryLight: '#f9de85',
  accent: '#a8d8ea',
  background: '#0a0f1e',
  surface: '#131b2e',
  surfaceElevated: '#1a2744',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.65)',
  textMuted: 'rgba(255,255,255,0.35)',
  textOnPrimary: '#0a0f1e',
  lunarText: '#f5c842',
  solarTermText: '#a8d8ea',
  festivalText: '#f5c842',
  weekend: '#f5c842',
  today: '#f5c842',
  selected: '#1a2744',
  divider: 'rgba(245,200,66,0.12)',
  border: 'rgba(245,200,66,0.2)',
  shadow: 'rgba(245,200,66,0.2)',
};

export const LightColors = {
  primary: '#C0392B',
  primaryDark: '#922B21',
  primaryLight: '#F1948A',
  accent: '#E67E22',
  background: '#FDFCFB',
  surface: '#FFFFFF',
  surfaceElevated: '#FEF9F9',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  lunarText: '#C0392B',
  solarTermText: '#E67E22',
  festivalText: '#C0392B',
  weekend: '#C0392B',
  today: '#C0392B',
  selected: '#922B21',
  divider: '#E5E7EB',
  border: '#F3F4F6',
  shadow: 'rgba(192,57,43,0.15)',
};

export type AppColors = typeof DarkColors;

// Default export for non-component usage
export const Colors = DarkColors;

export const Typography = {
  solarDay: { fontSize: 18, fontWeight: '600' as const },
  lunarDay: { fontSize: 10, fontWeight: '400' as const },
  solarDaySmall: { fontSize: 15, fontWeight: '600' as const },
  weekHeader: { fontSize: 12, fontWeight: '600' as const },
  monthTitle: { fontSize: 22, fontWeight: '700' as const },
  yearTitle: { fontSize: 14, fontWeight: '400' as const },
  festival: { fontSize: 9, fontWeight: '500' as const },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
