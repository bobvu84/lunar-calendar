import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.sub}>Page not found</Text>
        <Link href="/" style={styles.link}>Go back home</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 48, fontWeight: '700', color: Colors.primary },
  sub: { fontSize: 16, color: Colors.textSecondary },
  link: { fontSize: 15, color: Colors.primary, textDecorationLine: 'underline' },
});
