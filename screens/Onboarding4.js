import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';

export default function Onboarding4({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Svg width={120} height={60} viewBox="0 0 100 50">
            <Circle cx="25" cy="10" r="5" fill="#00B894" />
            <Rect x="20" y="17" width="10" height="15" fill="#00B894" />
            <Rect x="18" y="22" width="5" height="8" fill="#00B894" />
            <Rect x="27" y="22" width="5" height="8" fill="#00B894" />
            <Circle cx="60" cy="10" r="5" fill="#00B894" />
            <Path d="M60 17 L55 25 L55 32 M60 17 L65 25 L65 32 M60 17 L60 24 L55 32 M60 24 L65 32" stroke="#00B894" strokeWidth="3" fill="none" />
          </Svg>
        </View>

        <Text style={styles.title}>Autoanalisis</Text>
        <Text style={styles.description}>
          Antes de empezar vamos a ver como nos{'\n'}encontramos HOY
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>

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
  description: { fontSize: 16, color: '#636e72', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  button: { backgroundColor: '#00B894', paddingVertical: 16, paddingHorizontal: 60, borderRadius: 12, marginBottom: 60 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  pagination: { flexDirection: 'row', gap: 8, position: 'absolute', bottom: 60 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#dfe6e9' },
  dotActive: { backgroundColor: '#00B894', width: 24 },
  backButton: { position: 'absolute', bottom: 30, left: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  backButtonText: { color: '#2d3436', fontSize: 24, fontWeight: 'bold' },
});
