import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MonthNavigator from '@/components/MonthNavigator';
import WeekHeader from '@/components/WeekHeader';
import CalendarGrid from '@/components/CalendarGrid';
import DayDetailModal from '@/components/DayDetailModal';
import { CalendarDay } from '@/utils/lunar';
import { Colors } from '@/constants/theme';

export default function CalendarScreen() {
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <MonthNavigator
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
        <WeekHeader />
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <CalendarGrid
            year={year}
            month={month}
            selectedDate={selectedDate}
            onDayPress={handleDayPress}
          />
        </ScrollView>
      </View>

      <DayDetailModal day={selectedDay} onClose={() => setSelectedDay(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
});
