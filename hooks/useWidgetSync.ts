import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { syncWidgetData, reloadWidget } from '@/modules/widget-sync';
import { getTodayLunarInfo } from '@/utils/lunar';

export function useWidgetSync() {
  useEffect(() => {
    doSync();
    const sub = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') doSync();
    });
    return () => sub.remove();
  }, []);
}

async function doSync() {
  const today = new Date();
  const lunar = getTodayLunarInfo();
  const festivals = [...(lunar.festivals ?? []), ...(lunar.solarFestivals ?? [])];
  const festival = festivals[0] ?? '';
  const solarTerm = lunar.solarTerms[0] ?? '';

  await syncWidgetData({
    solarDay: today.getDate(),
    solarMonth: today.getMonth() + 1,
    solarYear: today.getFullYear(),
    lunarDay: lunar.lunarDayStr,
    lunarMonth: lunar.lunarMonthStr,
    ganZhiYear: lunar.ganZhiYear,
    zodiac: lunar.zodiac,
    festival,
    solarTerm,
    updatedAt: Date.now(),
  });

  await reloadWidget();
}
