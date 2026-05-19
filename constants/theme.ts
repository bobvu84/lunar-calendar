export const Colors = {
  primary: '#C0392B',       // Traditional red
  primaryDark: '#922B21',
  primaryLight: '#F1948A',
  accent: '#E67E22',        // Orange for solar terms
  gold: '#F39C12',          // Gold for festivals
  background: '#FDFCFB',
  backgroundDark: '#1a0533',
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
  shadow: 'rgba(192, 57, 43, 0.15)',
};

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
