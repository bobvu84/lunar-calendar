import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography, Spacing, AppColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { formatMonthYear, getTodayLunarInfo } from '@/utils/lunar';

interface Props {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function MonthNavigator({ year, month, onPrev, onNext, onToday }: Props) {
  const { Colors } = useTheme();
  const styles = useMemo(() => makeStyles(Colors), [Colors]);
  const lunar = getTodayLunarInfo();
  const isCurrentMonth = year === new Date().getFullYear() && month === new Date().getMonth() + 1;

  return (
    <View style={styles.container}>
      <View style={styles.lunarBadge}>
        <Text style={styles.lunarYear}>Năm {lunar.ganZhiYear} · {lunar.zodiac}</Text>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBtn} onPress={onPrev} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onToday} activeOpacity={0.7}>
          <Text style={styles.monthTitle}>{formatMonthYear(year, month)}</Text>
          {isCurrentMonth && <View style={styles.todayDot} />}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={onNext} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (Colors: AppColors) => StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  lunarBadge: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  lunarYear: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.lg,
  },
  navBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navArrow: {
    fontSize: 24,
    color: Colors.primary,
    lineHeight: 28,
  },
  monthTitle: {
    ...Typography.monthTitle,
    color: Colors.text,
    textAlign: 'center',
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    marginTop: 2,
  },
});
