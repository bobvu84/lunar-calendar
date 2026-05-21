import React, { useMemo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Spacing, AppColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { CalendarDay } from '@/utils/lunar';

interface Props {
  day: CalendarDay;
  onPress: (day: CalendarDay) => void;
  isSelected: boolean;
  columnIndex: number;
}

export default function DayCell({ day, onPress, isSelected, columnIndex }: Props) {
  const { Colors } = useTheme();
  const styles = useMemo(() => makeStyles(Colors), [Colors]);

  const isWeekend = columnIndex === 0 || columnIndex === 6;
  const isDisabled = !day.isCurrentMonth;

  const solarColor = day.isToday
    ? Colors.textOnPrimary
    : isSelected
    ? Colors.text
    : isDisabled
    ? Colors.textMuted
    : isWeekend
    ? Colors.weekend
    : Colors.text;

  const labelColor =
    day.labelType === 'festival' || day.labelType === 'leapMonth'
      ? day.isToday
        ? Colors.textOnPrimary
        : isSelected
        ? Colors.primaryLight
        : isDisabled
        ? Colors.textMuted
        : Colors.festivalText
      : day.labelType === 'solarTerm'
      ? day.isToday
        ? Colors.textOnPrimary
        : isDisabled
        ? Colors.textMuted
        : Colors.solarTermText
      : day.isToday
      ? Colors.textOnPrimary
      : isDisabled
      ? Colors.textMuted
      : Colors.textSecondary;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        day.isToday && styles.todayCell,
        isSelected && !day.isToday && styles.selectedCell,
      ]}
      onPress={() => onPress(day)}
      activeOpacity={0.75}
    >
      <Text style={[styles.solarText, { color: solarColor }]}>{day.solarDay}</Text>
      <Text
        style={[styles.labelText, { color: labelColor }]}
        numberOfLines={1}
        ellipsizeMode="clip"
      >
        {day.displayLabel}
      </Text>
    </TouchableOpacity>
  );
}

const makeStyles = (Colors: AppColors) => StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 0.72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 1,
    marginVertical: 2,
    paddingVertical: Spacing.xs,
  },
  todayCell: {
    backgroundColor: Colors.today,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCell: {
    backgroundColor: Colors.selected,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  solarText: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  },
  labelText: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 1,
    textAlign: 'center',
    maxWidth: 38,
  },
});
