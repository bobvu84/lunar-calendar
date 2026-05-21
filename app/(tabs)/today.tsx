import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing, AppColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getTodayLunarInfo } from '@/utils/lunar';

const SOLAR_MONTHS = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
  'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
  'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
];
const SOLAR_MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const WEEK_DAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

function InfoCard({ title, children, styles }: { title: string; children: React.ReactNode; styles: ReturnType<typeof makeStyles> }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, value, highlight, styles }: { label: string; value: string; highlight?: boolean; styles: ReturnType<typeof makeStyles> }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, highlight && styles.rowValueHighlight]}>{value}</Text>
    </View>
  );
}

export default function TodayScreen() {
  const { Colors } = useTheme();
  const styles = useMemo(() => makeStyles(Colors), [Colors]);
  const today = new Date();
  const lunar = useMemo(() => getTodayLunarInfo(), []);

  const allFestivals = [...(lunar.festivals ?? []), ...(lunar.solarFestivals ?? [])];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroWeekday}>{WEEK_DAYS[today.getDay()]}</Text>
          <Text style={styles.heroDay}>{today.getDate()}</Text>
          <Text style={styles.heroMonth}>
            {SOLAR_MONTHS[today.getMonth()]} năm {today.getFullYear()}
          </Text>

          <View style={styles.dividerLine} />

          <Text style={styles.heroLunar}>{lunar.lunarFull}</Text>
          <Text style={styles.heroZodiac}>Năm {lunar.ganZhiYear} · {lunar.zodiac}</Text>

          {allFestivals.length > 0 && (
            <View style={styles.festivalBanner}>
              {allFestivals.map((f, i) => (
                <View key={i} style={styles.festivalChip}>
                  <Text style={styles.festivalChipText}>{f}</Text>
                </View>
              ))}
            </View>
          )}

          {lunar.solarTerms.length > 0 && (
            <View style={styles.festivalBanner}>
              {lunar.solarTerms.map((t, i) => (
                <View key={i} style={[styles.festivalChip, styles.solarTermChip]}>
                  <Text style={[styles.festivalChipText, styles.solarTermChipText]}>{t}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.content}>
          <InfoCard title="Dương Lịch · Solar Calendar" styles={styles}>
            <Row label="Năm" value={`${today.getFullYear()}`} styles={styles} />
            <Row label="Tháng" value={`${SOLAR_MONTHS[today.getMonth()]} (${SOLAR_MONTHS_EN[today.getMonth()]})`} styles={styles} />
            <Row label="Ngày" value={`${today.getDate()}`} styles={styles} />
            <Row label="Thứ" value={WEEK_DAYS[today.getDay()]} styles={styles} />
          </InfoCard>

          <InfoCard title="Âm Lịch · Lunar Calendar" styles={styles}>
            <Row label="Năm Can Chi" value={`Năm ${lunar.ganZhiYear}`} highlight styles={styles} />
            <Row label="Con Giáp" value={lunar.zodiac} styles={styles} />
            <Row label="Tháng Âm Lịch" value={lunar.lunarMonthStr} styles={styles} />
            <Row label="Ngày Âm Lịch" value={lunar.lunarDayStr} styles={styles} />
            <Row label="Tháng Can Chi" value={lunar.ganZhiMonth} styles={styles} />
            <Row label="Ngày Can Chi" value={lunar.ganZhiDay} styles={styles} />
            {lunar.isLeapMonth && <Row label="Tháng Nhuận" value="Có" highlight styles={styles} />}
          </InfoCard>

          {allFestivals.length > 0 && (
            <InfoCard title="Lễ Hội · Festivals" styles={styles}>
              {allFestivals.map((f, i) => (
                <Row key={i} label={`Lễ ${i + 1}`} value={f} highlight styles={styles} />
              ))}
            </InfoCard>
          )}

          {lunar.solarTerms.length > 0 && (
            <InfoCard title="Tiết Khí · Solar Terms" styles={styles}>
              {lunar.solarTerms.map((t, i) => (
                <Row key={i} label="Tiết Khí" value={t} styles={styles} />
              ))}
            </InfoCard>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (Colors: AppColors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    backgroundColor: Colors.surface,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  heroWeekday: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  heroDay: {
    color: Colors.primary,
    fontSize: 88,
    fontWeight: '700',
    lineHeight: 96,
    marginTop: 4,
  },
  heroMonth: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '500',
  },
  dividerLine: {
    width: 48,
    height: 1.5,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  heroLunar: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  heroZodiac: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
  },
  festivalBanner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  festivalChip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  festivalChipText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  solarTermChip: {
    borderColor: Colors.accent,
  },
  solarTermChipText: {
    color: Colors.accent,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  rowLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  rowValueHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
