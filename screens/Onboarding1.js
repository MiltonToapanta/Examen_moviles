import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';

export default function Onboarding1({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding2');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            <Path
              d="M40 20 L55 10 Q60 8 65 12 L70 20 Q72 25 68 28 L45 45 L40 60 L35 65 Q33 68 30 66 L25 62 Q22 60 24 56 L30 40 L20 30 L15 25 Q12 22 14 18 L18 12 Q22 8 26 10 L40 20"
              fill="#00B894"
            />
            <Circle cx="65" cy="18" r="8" fill="#00B894" />
            <Ellipse cx="63" cy="20" rx="3" ry="4" fill="white" />
            <Ellipse cx="67" cy="20" rx="3" ry="4" fill="white" />
            <Path
              d="M60 22 Q65 24 70 22"
              stroke="white"
              fill="none"
              strokeWidth="1"
            />
          </Svg>
        </View>

        <Text style={styles.brand}>
          AI<Text style={styles.brandNumber}>7</Text>
        </Text>
        <Text style={styles.brandSubtitle}>Life</Text>
        <Text style={styles.description}>
          La constancia no se fuerza, se acompaña.
        </Text>

        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Onboarding2')}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 40,
  },
  brand: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  brandNumber: {
    color: '#00B894',
  },
  brandSubtitle: {
    fontSize: 24,
    color: '#1a1a1a',
    letterSpacing: 2,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    bottom: 60,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dfe6e9',
  },
  dotActive: {
    backgroundColor: '#00B894',
    width: 24,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00B894',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
