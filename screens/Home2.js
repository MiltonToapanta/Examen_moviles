import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator
} from 'react-native';

const GEMINI_API_KEY = 'AIzaSyABUFpGu7x7exe665Q_AT0jb8daLYOT6L0';
const TEMPERATURE = 0.8;

export default function Home2({ navigation }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse('');
    setTokens(0);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

      const requestBody = {
        contents: [{
          parts: [{
            text: `Contexto: Solo responde sobre React. Pregunta: ${question}. Responde en máximo 50 caracteres.`
          }]
        }],
        generationConfig: {
          temperature: TEMPERATURE,
          maxOutputTokens: 50,
        }
      };

      const apiResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await apiResponse.json();

      if (data.candidates && data.candidates[0]) {
        const generatedText = data.candidates[0].content.parts[0].text;
        const limitedResponse = generatedText.substring(0, 50);
        setResponse(limitedResponse);

        // Calcular tokens aproximados (palabras * 1.3)
        const wordCount = limitedResponse.split(' ').length;
        const approximateTokens = Math.ceil(wordCount * 1.3);
        setTokens(approximateTokens);
      } else {
        setResponse('No se pudo obtener respuesta');
      }
    } catch (error) {
      setResponse('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00B894" />
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <View>
            <Text style={styles.greeting}>Proyecto Final</Text>
            <Text style={styles.userName}>Chat IA React Native</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.icon}>🤖</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.configCard}>
          <Text style={styles.configTitle}>⚙️ Configuración del modelo</Text>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>🌡️ Temperatura:</Text>
            <Text style={styles.configValue}>{TEMPERATURE}</Text>
          </View>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>🎯 Tokens máximos:</Text>
            <Text style={styles.configValue}>50</Text>
          </View>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>📚 Contexto:</Text>
            <Text style={styles.configValue}>Solo React</Text>
          </View>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>🤖 Modelo:</Text>
            <Text style={styles.configValue}>Gemini Pro</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Tu pregunta sobre React Native</Text>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Ej: ¿Qué es un componente en React?"
              placeholderTextColor="#95a5a6"
              value={question}
              onChangeText={setQuestion}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={askQuestion}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Preguntar 🚀</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {response ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📝 Respuesta de IA</Text>
              <View style={styles.responseCard}>
                <Text style={styles.responseText}>{response}</Text>
                <View style={styles.responseInfo}>
                  <Text style={styles.responseInfoText}>
                    📏 {response.length}/50 caracteres
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🔢</Text>
                  <Text style={styles.statValue}>{tokens}</Text>
                  <Text style={styles.statLabel}>Tokens</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🌡️</Text>
                  <Text style={styles.statValue}>{TEMPERATURE}</Text>
                  <Text style={styles.statLabel}>Temperatura</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>📏</Text>
                  <Text style={styles.statValue}>{response.length}</Text>
                  <Text style={styles.statLabel}>Caracteres</Text>
                </View>
              </View>
            </View>
          </>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ Información</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              • Contexto limitado solo a React{'\n'}
              • Respuestas máximo 50 caracteres{'\n'}
              • Temperatura configurada en 0.8{'\n'}
              • Powered by Gemini AI
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.navContent}>
            <Text style={styles.navIcon}>🏠</Text>
            <Text style={styles.navLabel}>Inicio</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navIcon}>💪</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
          <Text style={styles.navIcon}>🤖</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#00B894',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#00B894', fontSize: 20, fontWeight: '600' },
  greeting: { fontSize: 12, color: '#e8f8f5', marginBottom: 4 },
  userName: { fontSize: 20, fontWeight: '600', color: '#fff' },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { fontSize: 20 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  configCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 15,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  configLabel: {
    fontSize: 15,
    color: '#636e72',
    fontWeight: '500',
  },
  configValue: {
    fontSize: 15,
    color: '#00B894',
    fontWeight: '700',
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#2d3436',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00B894',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  responseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  responseText: {
    fontSize: 16,
    color: '#2d3436',
    lineHeight: 24,
    marginBottom: 15,
  },
  responseInfo: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  responseInfoText: {
    fontSize: 13,
    color: '#636e72',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00B894',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#636e72',
  },
  infoCard: {
    backgroundColor: '#e8f8f5',
    borderRadius: 15,
    padding: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 22,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  navButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 12 },
  navButtonActive: { backgroundColor: '#00B894' },
  navContent: { alignItems: 'center' },
  navIcon: { fontSize: 24 },
  navLabel: {
    fontSize: 11,
    color: '#636e72',
    fontWeight: '500',
    marginTop: 4,
  },
});
