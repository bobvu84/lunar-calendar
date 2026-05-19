import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export default function WeekHeader() {
  return (
    <View style={styles.row}>
      {DAYS.map((d, i) => (
        <View key={d} style={styles.cell}>
          <Text style={[styles.text, (i === 0 || i === 6) && styles.weekend]}>{d}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.surface,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  weekend: {
    color: Colors.weekend,
  },
});
