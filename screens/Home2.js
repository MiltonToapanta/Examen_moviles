import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';

const API_BASE_URL = 'http://192.168.100.85:3002'; // IP de la máquina donde corre el servidor
const TEMPERATURE = 0.4;


export default function Home2({ navigation }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tokens, setTokens] = useState(0);
  const [inputTokens, setInputTokens] = useState(0);
  const [outputTokens, setOutputTokens] = useState(0);
  const [temperature, setTemperature] = useState(0.8);
  const [words, setWords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isError, setIsError] = useState(false);

  // Función para enviar pregunta al backend
  const handleAsk = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Por favor ingresa una pregunta');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/react-question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.trim() })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      setAnswer(data.answer);
      setTokens(data.tokens);
      setInputTokens(data.inputTokens);
      setOutputTokens(data.outputTokens);
      setTemperature(data.temperature);
      setWords(data.words);
      setIsError(data.error || false);
      
      // Añadir a historial
      setHistory([
        ...history,
        {
          question: question,
          answer: data.answer,
          tokens: data.tokens,
          words: data.words,
          timestamp: new Date().toLocaleTimeString(),
          isError: data.error || false
        }
      ]);
      
      setQuestion(''); // Limpiar input
    } catch (error) {
      Alert.alert('⚠️ Error de conexión', 'Asegúrate de que el backend está corriendo en http://192.168.100.85:3002\n\nEn terminal ejecuta:\ncd server && npm start');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 React Assistant</Text>
        <Text style={styles.headerSubtitle}>Powered by Gemini API</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Input de pregunta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Pregunta sobre React Native</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ej: ¿Qué son los hooks?"
              placeholderTextColor="#999"
              value={question}
              onChangeText={setQuestion}
              editable={!loading}
              multiline
              maxLength={200}
            />
          </View>
          
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAsk}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar 🚀</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Mostrar respuesta y estadísticas */}
        {answer ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📝 Respuesta</Text>
              <View style={styles.answerCard}>
                <Text style={styles.answerText}>{answer}</Text>
              </View>
            </View>

            {/* Estadísticas */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>📝 Palabras</Text>
                  <Text style={styles.statValue}>{words}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>🔢 Tot. Tokens</Text>
                  <Text style={styles.statValue}>{tokens}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>🌡️ Temp</Text>
                  <Text style={styles.statValue}>{temperature}</Text>
                </View>
              </View>

              <View style={[styles.statsContainer, { marginTop: 12 }]}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>📥 Entrada</Text>
                  <Text style={styles.statValue}>{inputTokens}T</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>📤 Salida</Text>
                  <Text style={styles.statValue}>{outputTokens}T</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>🤖 Modelo</Text>
                  <Text style={styles.statValue}>Gemini</Text>
                </View>
              </View>
            </View>
          </>
        ) : null}

        {/* Historial */}
        {history.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📜 Historial</Text>
              <TouchableOpacity onPress={() => {
                setHistory([]);
                setAnswer('');
              }}>
                <Text style={styles.clearButton}>Limpiar</Text>
              </TouchableOpacity>
            </View>

            {history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyTime}>{item.timestamp}</Text>
                  <Text style={styles.historyTokens}>{item.tokens}T | {item.words}P</Text>
                </View>
                <Text style={styles.historyQuestion}>P: {item.question}</Text>
                <Text style={styles.historyAnswer}>R: {item.answer.substring(0, 100)}...</Text>
              </View>
            ))}
          </View>
        )}

        {/* Conceptos populares */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ Preguntas rápidas</Text>
          <View style={styles.conceptsGrid}>
            {[
              '¿Qué es un Hook?',
              '¿Qué son Props?',
              '¿Cómo funciona State?',
              '¿Qué es JSX?',
              '¿Qué es React Native?',
              '¿Qué son componentes?'
            ].map((concept) => (
              <TouchableOpacity
                key={concept}
                style={styles.conceptChip}
                onPress={() => setQuestion(concept)}
              >
                <Text style={styles.conceptText}>{concept}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  input: {
    padding: 12,
    fontSize: 14,
    color: '#1a1a1a',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  answerCard: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1a1a1a',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0066cc',
  },
  clearButton: {
    color: '#0066cc',
    fontSize: 13,
    fontWeight: '600',
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#6c757d',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  historyTime: {
    fontSize: 11,
    color: '#6c757d',
  },
  historyTokens: {
    fontSize: 11,
    color: '#0066cc',
    fontWeight: '600',
  },
  historyQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  historyAnswer: {
    fontSize: 12,
    color: '#495057',
    lineHeight: 18,
  },
  conceptsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conceptChip: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0066cc',
  },
  conceptText: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '500',
  },
});
