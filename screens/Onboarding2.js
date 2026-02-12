import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

export default function Onboarding2({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding3');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconGrid}>
          <Svg width={80} height={100} viewBox="0 0 60 80">
            <Rect x="15" y="15" width="30" height="45" rx="5" stroke="#00B894" strokeWidth="2" fill="none" />
            <Rect x="20" y="25" width="20" height="3" fill="#00B894" />
            <Rect x="20" y="32" width="20" height="3" fill="#00B894" />
            <Rect x="20" y="39" width="20" height="3" fill="#00B894" />
          </Svg>

          <View style={styles.iconRow}>
            <Svg width={60} height={60} viewBox="0 0 60 60">
              <Circle cx="30" cy="30" r="25" stroke="#00B894" strokeWidth="2" fill="none" />
              <Path d="M20 30 L35 20 L40 30 L35 50 Q33 55 28 52 L20 45" fill="none" stroke="#00B894" strokeWidth="2" />
            </Svg>
            <Svg width={60} height={60} viewBox="0 0 60 60">
              <Circle cx="30" cy="30" r="25" stroke="#00B894" strokeWidth="2" fill="none" />
              <Path d="M30 20 Q40 30 30 45 Q20 30 30 20 Z" fill="none" stroke="#00B894" strokeWidth="2" />
            </Svg>
          </View>
        </View>

        <Text style={styles.title}>Pequeños hábitos.{'\n'}Grandes cambios.</Text>
        <Text style={styles.description}>Te contaremos un poco de AI7</Text>

        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Onboarding3')}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  iconGrid: { alignItems: 'center', marginBottom: 40, gap: 20 },
  iconRow: { flexDirection: 'row', gap: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3436', textAlign: 'center', marginBottom: 20, lineHeight: 32 },
  description: { fontSize: 16, color: '#636e72', textAlign: 'center', lineHeight: 24, marginBottom: 60 },
  pagination: { flexDirection: 'row', gap: 8, position: 'absolute', bottom: 60 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#dfe6e9' },
  dotActive: { backgroundColor: '#00B894', width: 24 },
  nextButton: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#00B894', justifyContent: 'center', alignItems: 'center' },
  nextButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  backButton: { position: 'absolute', bottom: 30, left: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  backButtonText: { color: '#2d3436', fontSize: 24, fontWeight: 'bold' },
});
