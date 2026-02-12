import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  StatusBar
} from 'react-native';

const GEMINI_API_KEY = 'AIzaSyABUFpGu7x7exe665Q_AT0jb8daLYOT6L0';
const TEMPERATURE = 0.8;

export default function FinalProject({ navigation }) {
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proyecto Final IA</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📱 Chat de React Native</Text>
          <Text style={styles.infoText}>Pregunta sobre React y obtén respuestas de hasta 50 caracteres</Text>
        </View>

        <View style={styles.configCard}>
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
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Tu pregunta sobre React Native:</Text>
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
              <Text style={styles.buttonText}>Preguntar 🤖</Text>
            )}
          </TouchableOpacity>
        </View>

        {response ? (
          <View style={styles.responseSection}>
            <Text style={styles.responseTitle}>Respuesta:</Text>
            <View style={styles.responseCard}>
              <Text style={styles.responseText}>{response}</Text>
            </View>

            <View style={styles.tokensCard}>
              <View style={styles.tokenInfo}>
                <Text style={styles.tokenLabel}>Tokens utilizados:</Text>
                <Text style={styles.tokenValue}>{tokens}</Text>
              </View>
              <View style={styles.tokenInfo}>
                <Text style={styles.tokenLabel}>Temperatura:</Text>
                <Text style={styles.tokenValue}>{TEMPERATURE}</Text>
              </View>
            </View>

            <View style={styles.metadataCard}>
              <Text style={styles.metadataText}>📏 Caracteres: {response.length}/50</Text>
              <Text style={styles.metadataText}>💬 Contexto: React</Text>
              <Text style={styles.metadataText}>🤖 Modelo: Gemini Pro</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home2')}
        >
          <Text style={styles.navIcon}>👥</Text>
          <Text style={styles.navLabel}>Amigos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
          <Text style={styles.navIcon}>🎓</Text>
          <Text style={styles.navLabel}>IA Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#00B894',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoCard: {
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
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 20,
  },
  configCard: {
    backgroundColor: '#e8f8f5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  configLabel: {
    fontSize: 15,
    color: '#2d3436',
    fontWeight: '500',
  },
  configValue: {
    fontSize: 15,
    color: '#00B894',
    fontWeight: '700',
  },
  inputSection: {
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
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
  responseSection: {
    marginBottom: 30,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 12,
  },
  responseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
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
  },
  tokensCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tokenInfo: {
    alignItems: 'center',
  },
  tokenLabel: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 5,
  },
  tokenValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#00B894',
  },
  metadataCard: {
    backgroundColor: '#e8f8f5',
    borderRadius: 12,
    padding: 15,
  },
  metadataText: {
    fontSize: 14,
    color: '#2d3436',
    marginBottom: 5,
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
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  navButtonActive: {
    backgroundColor: '#00B894',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#636e72',
    fontWeight: '500',
  },
});
