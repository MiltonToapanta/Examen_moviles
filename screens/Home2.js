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

const TEMPERATURE = 0.8;

// Base de conocimiento sobre React y React Native
const REACT_KNOWLEDGE = {
  'componente': 'Función o clase que retorna elementos JSX',
  'jsx': 'Sintaxis que combina JavaScript con HTML',
  'props': 'Datos que pasan de padre a hijo componente',
  'state': 'Datos internos que cambian en componente',
  'hook': 'Funciones que añaden estado a componentes',
  'usestate': 'Hook para manejar estado en componentes',
  'useeffect': 'Hook para efectos secundarios',
  'render': 'Proceso de mostrar componentes en pantalla',
  'virtual dom': 'Copia ligera del DOM para optimizar',
  'native': 'Framework para apps móviles con React',
  'view': 'Contenedor básico en React Native',
  'text': 'Componente para mostrar texto en RN',
  'stylesheet': 'Objeto para definir estilos en RN',
  'flatlist': 'Lista optimizada para renderizar datos',
  'touchable': 'Componente clickeable en React Native',
  'navigation': 'Sistema para navegar entre pantallas',
  'expo': 'Herramienta para desarrollar con RN',
  'lifecycle': 'Ciclo de vida de un componente React',
  'context': 'API para compartir datos globalmente',
  'reducer': 'Función que maneja cambios de estado',
  'memo': 'Optimización para evitar re-renders',
  'key': 'Identificador único para elementos en lista',
  'ref': 'Referencia directa a elemento del DOM',
  'fragment': 'Agrupa elementos sin nodo extra',
  'portal': 'Renderiza fuera de jerarquía padre',
};

export default function Home2({ navigation }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(false);

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Buscar coincidencias en la base de conocimiento
    for (const [key, value] of Object.entries(REACT_KNOWLEDGE)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }

    // Respuestas por patrones
    if (lowerQuery.includes('qué es') || lowerQuery.includes('que es')) {
      return 'Concepto fundamental en React ecosystem';
    } else if (lowerQuery.includes('cómo') || lowerQuery.includes('como')) {
      return 'Se implementa usando funciones y JSX';
    } else if (lowerQuery.includes('para qué') || lowerQuery.includes('para que')) {
      return 'Para crear interfaces interactivas';
    } else if (lowerQuery.includes('diferencia')) {
      return 'Difieren en uso y optimización';
    } else {
      return 'Pregunta sobre React o React Native';
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse('');
    setTokens(0);

    // Simular delay de API
    setTimeout(() => {
      try {
        const generatedText = generateResponse(question);
        const limitedResponse = generatedText.substring(0, 50);
        setResponse(limitedResponse);

        // Calcular tokens (palabras * 1.3)
        const wordCount = limitedResponse.split(' ').length;
        const approximateTokens = Math.ceil(wordCount * 1.3);
        setTokens(approximateTokens);
      } catch (error) {
        setResponse('Error al procesar pregunta');
      } finally {
        setLoading(false);
      }
    }, 800);
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
            <Text style={styles.configValue}>React AI Local</Text>
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
              • Powered by IA React Native Local
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
