import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { CalendarDay } from '@/utils/lunar';

interface Props {
  day: CalendarDay | null;
  onClose: () => void;
}

const SOLAR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]}>{value}</Text>
    </View>
  );
}

export default function DayDetailModal({ day, onClose }: Props) {
  if (!day) return null;

  const { lunar } = day;
  const allFestivals = [...(lunar.festivals ?? []), ...(lunar.solarFestivals ?? [])];

  return (
    <Modal visible={!!day} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.handle} />
          <View style={styles.headerContent}>
            <View style={[styles.dateBadge, day.isToday && styles.dateBadgeToday]}>
              <Text style={[styles.dayNumber, day.isToday && styles.dayNumberToday]}>
                {day.solarDay}
              </Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.fullDate}>
                {SOLAR_MONTHS[day.solarMonth - 1]} {day.solarDay}, {day.solarYear}
              </Text>
              <Text style={styles.lunarFull}>{lunar.lunarFull}</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {/* Solar Section */}
          <Text style={styles.sectionTitle}>Dương Lịch · Solar</Text>
          <View style={styles.card}>
            <InfoRow label="Năm" value={`${day.solarYear}`} />
            <InfoRow label="Tháng" value={`Tháng ${day.solarMonth} (${SOLAR_MONTHS[day.solarMonth - 1]})`} />
            <InfoRow label="Ngày" value={`Ngày ${day.solarDay}`} />
            {lunar.solarFestivals.length > 0 && (
              <InfoRow label="Lễ" value={lunar.solarFestivals.join(', ')} highlight />
            )}
          </View>

          {/* Lunar Section */}
          <Text style={styles.sectionTitle}>Âm Lịch · Lunar</Text>
          <View style={styles.card}>
            <InfoRow label="Năm Can Chi" value={`Năm ${lunar.ganZhiYear} (${lunar.zodiac})`} />
            <InfoRow label="Tháng Âm Lịch" value={lunar.lunarMonthStr} />
            <InfoRow label="Ngày Âm Lịch" value={lunar.lunarDayStr} />
            <InfoRow label="Tháng Can Chi" value={lunar.ganZhiMonth} />
            <InfoRow label="Ngày Can Chi" value={lunar.ganZhiDay} />
            {lunar.isLeapMonth && <InfoRow label="Tháng Nhuận" value="Có" highlight />}
          </View>

          {/* Festivals */}
          {allFestivals.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Lễ Hội · Festivals</Text>
              <View style={styles.card}>
                {allFestivals.map((f, i) => (
                  <View key={i} style={styles.festivalItem}>
                    <View style={styles.festivalDot} />
                    <Text style={styles.festivalText}>{f}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Solar Terms */}
          {lunar.solarTerms.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Tiết Khí · Solar Terms</Text>
              <View style={styles.card}>
                {lunar.solarTerms.map((t, i) => (
                  <View key={i} style={styles.festivalItem}>
                    <View style={[styles.festivalDot, styles.solarTermDot]} />
                    <Text style={[styles.festivalText, styles.solarTermText]}>{t}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={styles.bottomPad} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: Colors.border,
    maxHeight: '75%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },
  header: {
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  dateBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBadgeToday: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayNumber: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
  },
  dayNumberToday: {
    color: Colors.textOnPrimary,
  },
  headerText: {
    flex: 1,
  },
  fullDate: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  lunarFull: {
    fontSize: 13,
    color: Colors.primary,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    textAlign: 'right',
  },
  infoValueHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },
  festivalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  festivalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  solarTermDot: {
    backgroundColor: Colors.accent,
  },
  festivalText: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: '500',
  },
  solarTermText: {
    color: Colors.accent,
  },
  bottomPad: {
    height: 32,
  },
});
