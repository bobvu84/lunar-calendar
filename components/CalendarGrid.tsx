import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '@/constants/theme';
import { buildCalendarMonth, CalendarDay } from '@/utils/lunar';
import DayCell from './DayCell';

interface Props {
  year: number;
  month: number;
  selectedDate: Date | null;
  onDayPress: (day: CalendarDay) => void;
}

export default function CalendarGrid({ year, month, selectedDate, onDayPress }: Props) {
  const days = useMemo(() => buildCalendarMonth(year, month), [year, month]);

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const isSelected = (day: CalendarDay) => {
    if (!selectedDate) return false;
    return (
      day.solarYear === selectedDate.getFullYear() &&
      day.solarMonth === selectedDate.getMonth() + 1 &&
      day.solarDay === selectedDate.getDate()
    );
  };

  return (
    <View style={styles.grid}>
      {weeks.map((week, wi) => (
        <View key={wi} style={styles.week}>
          {week.map((day, di) => (
            <DayCell
              key={`${day.solarYear}-${day.solarMonth}-${day.solarDay}`}
              day={day}
              onPress={onDayPress}
              isSelected={isSelected(day)}
              columnIndex={di}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  week: {
    flexDirection: 'row',
  },
});
