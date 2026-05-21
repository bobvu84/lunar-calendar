import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing, AppColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getTodayLunarInfo } from '@/utils/lunar';

// Exact colors matching the native widget themes (WidgetTheme in LunarCalendarWidget.swift
// and color values in LunarCalendarWidgetProvider.kt)
const WIDGET_DARK = {
  bg: '#111d36',          // midpoint of #1a2744 → #0a0f1e gradient
  dayColor: '#f5c842',
  lunarColor: 'rgba(255,255,255,0.9)',
  ganZhiColor: 'rgba(255,255,255,0.55)',
  festivalColor: '#f5c842',
  festivalBg: 'rgba(245,200,66,0.15)',
  divider: 'rgba(245,200,66,0.25)',
};

const WIDGET_LIGHT = {
  bg: '#ab3127',          // midpoint of #C0392B → #922B21 gradient
  dayColor: '#ffffff',
  lunarColor: 'rgba(255,255,255,0.9)',
  ganZhiColor: 'rgba(255,255,255,0.65)',
  festivalColor: '#F39C12',
  festivalBg: 'rgba(255,255,255,0.15)',
  divider: 'rgba(255,255,255,0.25)',
};

function WidgetPreview({ isDark, styles, Colors }: { isDark: boolean; styles: ReturnType<typeof makeStyles>; Colors: AppColors }) {
  const today = new Date();
  const lunar = getTodayLunarInfo();
  const festivals = [...(lunar.festivals ?? []), ...(lunar.solarFestivals ?? [])];
  const label = lunar.solarTerms[0] ?? festivals[0] ?? '';
  const wt = isDark ? WIDGET_DARK : WIDGET_LIGHT;

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>Widget Preview</Text>

      <View style={styles.previewRow}>
        <View>
          <Text style={styles.previewSizeLabel}>Small</Text>
          <View style={[styles.widgetSmall, { backgroundColor: wt.bg }]}>
            <Text style={[styles.widgetSmallDay, { color: wt.dayColor }]}>
              {String(today.getDate()).padStart(2, '0')}/{String(today.getMonth() + 1).padStart(2, '0')}
            </Text>
            <Text style={[styles.widgetSmallLunar, { color: wt.lunarColor }]}>{lunar.lunarDayStr} {lunar.lunarMonthShort}</Text>
            <Text style={[styles.widgetSmallGanzhi, { color: wt.ganZhiColor }]}>Năm {lunar.ganZhiYear} · {lunar.zodiac}</Text>
            {label ? (
              <Text style={[styles.widgetSmallFestival, { color: wt.festivalColor, backgroundColor: wt.festivalBg }]}>{label}</Text>
            ) : null}
          </View>
        </View>

        <View>
          <Text style={styles.previewSizeLabel}>Medium</Text>
          <View style={[styles.widgetMedium, { backgroundColor: wt.bg }]}>
            <View style={styles.widgetMediumLeft}>
              <Text style={[styles.widgetMedDay, { color: wt.dayColor }]}>{today.getDate()}</Text>
              <Text style={[styles.widgetMedMonth, { color: wt.lunarColor }]}>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][today.getMonth()]}
              </Text>
              <Text style={[styles.widgetMedYear, { color: wt.ganZhiColor }]}>{today.getFullYear()}</Text>
            </View>
            <View style={[styles.widgetMedDivider, { backgroundColor: wt.divider }]} />
            <View style={styles.widgetMediumRight}>
              <Text style={[styles.widgetMedLunarDay, { color: wt.lunarColor }]}>{lunar.lunarDayStr} {lunar.lunarMonthShort}</Text>
              <Text style={[styles.widgetMedGanzhi, { color: wt.lunarColor }]}>Năm {lunar.ganZhiYear}</Text>
              <Text style={[styles.widgetMedZodiac, { color: wt.ganZhiColor }]}>{lunar.zodiac}</Text>
              {label ? (
                <Text style={[styles.widgetMedFestival, { color: wt.festivalColor, backgroundColor: wt.festivalBg }]}>{label}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function StepCard({ step, title, body, styles }: { step: string; title: string; body: string; styles: ReturnType<typeof makeStyles> }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepBadgeText}>{step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepBody}>{body}</Text>
      </View>
    </View>
  );
}

export default function WidgetScreen() {
  const { Colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(Colors), [Colors]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Widget · Lịch Âm</Text>
          <Text style={styles.headerSub}>Thêm Lịch Âm Dương vào màn hình chính</Text>
        </View>

        {/* Theme toggle */}
        <View style={styles.themeCard}>
          <View style={styles.themeCardLeft}>
            <Text style={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</Text>
            <View>
              <Text style={styles.themeLabel}>Giao diện</Text>
              <Text style={styles.themeValue}>{isDark ? 'Tối (Dark)' : 'Sáng (Light)'}</Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#E5E7EB', true: Colors.primary }}
            thumbColor={isDark ? Colors.textOnPrimary : '#ffffff'}
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        <WidgetPreview isDark={isDark} styles={styles} Colors={Colors} />

        <View style={styles.section}>
          <View style={styles.platformBadge}>
            <Text style={styles.platformBadgeText}>🍎 iOS</Text>
          </View>
          <Text style={styles.sectionTitle}>Setup Instructions</Text>
          <StepCard step="1" title="Build with Xcode" body="Run 'expo prebuild' to generate the native iOS project, then open /ios/LunarCalendar.xcworkspace in Xcode." styles={styles} />
          <StepCard step="2" title="Widget Extension is included" body="The LunarCalendarWidget target is already configured. It reads shared data from the app group 'group.com.lunar.calendar.widget'." styles={styles} />
          <StepCard step="3" title="Build & install on device" body="Select the LunarCalendar scheme in Xcode, choose your device, and press Run." styles={styles} />
          <StepCard step="4" title="Add to Home Screen" body="Long-press your home screen → tap '+' → search 'Lunar Calendar' → choose Small or Medium size → tap Add Widget." styles={styles} />
        </View>

        <View style={styles.section}>
          <View style={[styles.platformBadge, styles.androidBadge]}>
            <Text style={styles.platformBadgeText}>🤖 Android</Text>
          </View>
          <Text style={styles.sectionTitle}>Setup Instructions</Text>
          <StepCard step="1" title="Build with Android Studio" body="Run 'expo prebuild' to generate the native Android project, then open /android in Android Studio." styles={styles} />
          <StepCard step="2" title="Widget provider is included" body="LunarCalendarWidgetProvider.kt reads SharedPreferences written by the app." styles={styles} />
          <StepCard step="3" title="Build & install" body="Click Run in Android Studio to install on your device." styles={styles} />
          <StepCard step="4" title="Add to Home Screen" body="Long-press home screen → Widgets → find Lunar Calendar → drag to home screen." styles={styles} />
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (Colors: AppColors) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  headerSub: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  themeCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  themeIcon: {
    fontSize: 28,
  },
  themeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  themeValue: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  previewContainer: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  previewTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  previewSizeLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
  widgetSmall: {
    width: 130,
    height: 130,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    overflow: 'hidden',
  },
  widgetSmallDay: { fontSize: 36, fontWeight: '700', lineHeight: 40 },
  widgetSmallLunar: { fontSize: 13, fontWeight: '500', textAlign: 'center' },
  widgetSmallGanzhi: { fontSize: 10, marginTop: 2, textAlign: 'center' },
  widgetSmallFestival: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  widgetMedium: {
    width: 270,
    height: 130,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  widgetMediumLeft: { alignItems: 'center', width: 80 },
  widgetMedDay: { fontSize: 52, fontWeight: '700', lineHeight: 56 },
  widgetMedMonth: { fontSize: 13, fontWeight: '600' },
  widgetMedYear: { fontSize: 11 },
  widgetMedDivider: { width: 1, height: 70, marginHorizontal: 4 },
  widgetMediumRight: { flex: 1, paddingLeft: 12, gap: 2 },
  widgetMedLunarDay: { fontSize: 16, fontWeight: '600' },
  widgetMedGanzhi: { fontSize: 12 },
  widgetMedZodiac: { fontSize: 12 },
  widgetMedFestival: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  section: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  platformBadge: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  androidBadge: {
    borderColor: Colors.accent,
  },
  platformBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepBadgeText: {
    color: Colors.textOnPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  stepContent: { flex: 1 },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  stepBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  bottomPad: { height: 32 },
});
