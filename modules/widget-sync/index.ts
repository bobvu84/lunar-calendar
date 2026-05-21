import { NativeModules, Platform } from 'react-native';

export interface WidgetLunarData {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: string;
  lunarMonth: string;
  ganZhiYear: string;
  zodiac: string;
  festival: string;
  solarTerm: string;
  updatedAt: number;
}

const { WidgetSync } = NativeModules;

/**
 * Persist today's lunar data into the shared container (iOS App Group /
 * Android SharedPreferences) so the home-screen widget can read it.
 */
export async function syncWidgetData(data: WidgetLunarData): Promise<void> {
  if (!WidgetSync) return; // not available in Expo Go / web
  try {
    await WidgetSync.updateWidget(JSON.stringify(data));
  } catch {
    // Non-fatal: widget will show stale data until next sync
  }
}

/** Tell WidgetKit / Android to reload the widget timeline now. */
export async function reloadWidget(): Promise<void> {
  if (!WidgetSync) return;
  try {
    await WidgetSync.reloadTimelines();
  } catch {}
}

/** Write the active theme ('dark' | 'light') to shared storage and reload the widget. */
export async function syncWidgetTheme(theme: 'dark' | 'light'): Promise<void> {
  if (!WidgetSync) return;
  try {
    await WidgetSync.setTheme(theme);
  } catch {}
}
