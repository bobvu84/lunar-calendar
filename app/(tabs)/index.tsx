import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthNavigator from '@/components/MonthNavigator';
import WeekHeader from '@/components/WeekHeader';
import CalendarGrid from '@/components/CalendarGrid';
import DayDetailModal from '@/components/DayDetailModal';
import { CalendarDay } from '@/utils/lunar';
import { useTheme } from '@/contexts/ThemeContext';

export default function CalendarScreen() {
  const { Colors } = useTheme();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const handlePrev = useCallback(() => {
    setMonth((m) => {
      if (m === 1) { setYear((y) => y - 1); return 12; }
      return m - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setMonth((m) => {
      if (m === 12) { setYear((y) => y + 1); return 1; }
      return m + 1;
    });
  }, []);

  const handleToday = useCallback(() => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
  }, []);

  const handleDayPress = useCallback((day: CalendarDay) => {
    setSelectedDay(day);
  }, []);

  const selectedDate = selectedDay
    ? new Date(selectedDay.solarYear, selectedDay.solarMonth - 1, selectedDay.solarDay)
    : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <MonthNavigator
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
        <WeekHeader />
        <CalendarGrid
          year={year}
          month={month}
          selectedDate={selectedDate}
          onDayPress={handleDayPress}
        />
      </View>
      <DayDetailModal day={selectedDay} onClose={() => setSelectedDay(null)} />
    </SafeAreaView>
  );
}
