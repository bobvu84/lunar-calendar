import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing, AppColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { getTodayLunarInfo } from '@/utils/lunar';

function WidgetPreview({ styles, Colors }: { styles: ReturnType<typeof makeStyles>; Colors: AppColors }) {
  const today = new Date();
  const lunar = getTodayLunarInfo();
  const festivals = [...(lunar.festivals ?? []), ...(lunar.solarFestivals ?? [])];
  const label = lunar.solarTerms[0] ?? festivals[0] ?? lunar.lunarDayStr;

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewTitle}>Widget Preview</Text>

      <View style={styles.previewRow}>
        <View>
          <Text style={styles.previewSizeLabel}>Small</Text>
          <View style={styles.widgetSmall}>
            <Text style={styles.widgetSmallDay}>
              {String(today.getDate()).padStart(2, '0')}/{String(today.getMonth() + 1).padStart(2, '0')}
            </Text>
            <Text style={styles.widgetSmallLunar}>{lunar.lunarDayStr}</Text>
            <Text style={styles.widgetSmallGanzhi}>Năm {lunar.ganZhiYear}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.previewSizeLabel}>Medium</Text>
          <View style={styles.widgetMedium}>
            <View style={styles.widgetMediumLeft}>
              <Text style={styles.widgetMedDay}>{today.getDate()}</Text>
              <Text style={styles.widgetMedMonth}>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][today.getMonth()]}
              </Text>
            </View>
            <View style={styles.widgetMediumRight}>
              <Text style={styles.widgetMedLunarDay}>{lunar.lunarDayStr} {lunar.lunarMonthShort}</Text>
              <Text style={styles.widgetMedGanzhi}>Năm {lunar.ganZhiYear}</Text>
              <Text style={styles.widgetMedZodiac}>{lunar.zodiac}</Text>
              {label && <Text style={styles.widgetMedFestival}>{label}</Text>}
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

        <WidgetPreview styles={styles} Colors={Colors} />

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
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  widgetSmallDay: { fontSize: 36, fontWeight: '700', color: Colors.primary, lineHeight: 40 },
  widgetSmallLunar: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  widgetSmallGanzhi: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  widgetMedium: {
    width: 270,
    height: 130,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  widgetMediumLeft: { alignItems: 'center', minWidth: 60 },
  widgetMedDay: { fontSize: 48, fontWeight: '700', color: Colors.primary, lineHeight: 52 },
  widgetMedMonth: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  widgetMediumRight: { flex: 1, gap: 2 },
  widgetMedLunarDay: { fontSize: 16, color: Colors.text, fontWeight: '600' },
  widgetMedGanzhi: { fontSize: 12, color: Colors.textSecondary },
  widgetMedZodiac: { fontSize: 12, color: Colors.textMuted },
  widgetMedFestival: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
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
