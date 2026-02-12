import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

export default function Onboarding3({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding4');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            <Path d="M50 10 L65 25 Q70 30 70 37 L68 45 L55 52 L50 55" stroke="#00B894" strokeWidth="4" fill="none" />
            <Path d="M50 55 L45 58 L32 52 L30 45 Q30 37 35 32 L50 17" stroke="#00B894" strokeWidth="4" fill="none" />
            <Polygon points="50,10 45,5 55,5" fill="#00B894" />
            <Polygon points="68,45 73,50 63,50" fill="#00B894" />
            <Polygon points="50,55 55,60 45,60" fill="#00B894" />
            <Polygon points="30,45 25,40 35,40" fill="#00B894" />
          </Svg>
        </View>

        <Text style={styles.title}>Un ciclo. Un logro.</Text>
        <Text style={styles.description}>
          AI7 te ayudará a que un hábito no sea una{'\n'}decisión forzada, sino un estilo de vida.
        </Text>

        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Onboarding4')}>
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
  iconContainer: { marginBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2d3436', textAlign: 'center', marginBottom: 20 },
  description: { fontSize: 16, color: '#636e72', textAlign: 'center', lineHeight: 24, marginBottom: 60 },
  pagination: { flexDirection: 'row', gap: 8, position: 'absolute', bottom: 60 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#dfe6e9' },
  dotActive: { backgroundColor: '#00B894', width: 24 },
  nextButton: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#00B894', justifyContent: 'center', alignItems: 'center' },
  nextButtonText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  backButton: { position: 'absolute', bottom: 30, left: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  backButtonText: { color: '#2d3436', fontSize: 24, fontWeight: 'bold' },
});
