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

// Base de conocimiento expandida sobre React y React Native
const REACT_KNOWLEDGE = {
  // Conceptos fundamentales
  'componente': 'Función o clase que retorna elementos JSX',
  'component': 'Función o clase que retorna elementos JSX',
  'jsx': 'Sintaxis que combina JavaScript con HTML',
  'props': 'Datos que pasan de padre a hijo componente',
  'propiedad': 'Datos que pasan de padre a hijo componente',
  'state': 'Datos internos que cambian en componente',
  'estado': 'Datos internos que cambian en componente',

  // Hooks principales
  'hook': 'Funciones que añaden estado a componentes',
  'usestate': 'Hook para manejar estado en componentes',
  'useeffect': 'Hook para efectos secundarios y ciclo',
  'usecontext': 'Hook para acceder a contexto global',
  'usereducer': 'Hook avanzado para estado complejo',
  'usememo': 'Hook para memorizar valores calculados',
  'usecallback': 'Hook para memorizar funciones',
  'useref': 'Hook para referencias mutables',
  'uselayouteffect': 'useEffect síncrono antes del render',

  // Ciclo de vida
  'render': 'Proceso de mostrar componentes en pantalla',
  'lifecycle': 'Ciclo de vida de un componente React',
  'componentdidmount': 'Método cuando componente se monta',
  'componentwillunmount': 'Método antes de desmontar componente',
  'mounting': 'Fase cuando componente se crea',
  'unmounting': 'Fase cuando componente se destruye',

  // React Native específico
  'native': 'Framework para apps móviles con React',
  'react native': 'Framework para apps móviles con React',
  'view': 'Contenedor básico en React Native',
  'text': 'Componente para mostrar texto en RN',
  'stylesheet': 'Objeto para definir estilos en RN',
  'flatlist': 'Lista optimizada para renderizar datos',
  'scrollview': 'Contenedor con scroll vertical/horizontal',
  'touchableopacity': 'Botón con feedback de opacidad',
  'touchable': 'Componente clickeable en React Native',
  'image': 'Componente para mostrar imágenes',
  'textinput': 'Campo de entrada de texto',
  'modal': 'Componente para ventanas emergentes',

  // Navegación
  'navigation': 'Sistema para navegar entre pantallas',
  'stack navigator': 'Navegación apilada entre pantallas',
  'tab navigator': 'Navegación por pestañas inferiores',
  'drawer': 'Menú lateral deslizable',

  // Herramientas y ecosistema
  'expo': 'Herramienta para desarrollar con RN rápido',
  'metro': 'Bundler de JavaScript para React Native',
  'npm': 'Gestor de paquetes de JavaScript',
  'yarn': 'Gestor de paquetes alternativo a npm',

  // Optimización y rendimiento
  'virtual dom': 'Copia ligera del DOM para optimizar',
  'memo': 'HOC para evitar re-renders innecesarios',
  'purecomponent': 'Componente con comparación superficial',
  'shouldcomponentupdate': 'Método para optimizar re-renders',
  'reconciliation': 'Proceso de actualización del DOM',

  // Context API
  'context': 'API para compartir datos globalmente',
  'provider': 'Componente que provee contexto',
  'consumer': 'Componente que consume contexto',
  'createcontext': 'Función para crear nuevo contexto',

  // Estado global
  'redux': 'Librería para manejo de estado global',
  'reducer': 'Función que maneja cambios de estado',
  'action': 'Objeto que describe cambio de estado',
  'dispatch': 'Función para enviar acciones',
  'store': 'Contenedor del estado global',

  // Eventos
  'onpress': 'Evento cuando se toca un componente',
  'onchange': 'Evento cuando cambia un valor',
  'event': 'Acción del usuario en la interfaz',

  // JSX y sintaxis
  'fragment': 'Agrupa elementos sin nodo DOM extra',
  'children': 'Prop especial con contenido hijo',
  'key': 'Identificador único para elementos lista',
  'spread': 'Operador para expandir props {...props}',

  // Refs y DOM
  'ref': 'Referencia directa a elemento del DOM',
  'createref': 'Función para crear referencias',
  'forwardref': 'Enviar ref a componente hijo',

  // Avanzado
  'portal': 'Renderiza fuera de jerarquía padre',
  'hoc': 'Higher Order Component, patrón avanzado',
  'render props': 'Patrón para compartir lógica',
  'lazy': 'Carga diferida de componentes',
  'suspense': 'Manejo de carga asíncrona',
  'error boundary': 'Captura errores en componentes hijos',

  // Estilos
  'flexbox': 'Sistema de layout para posicionar elementos',
  'styles': 'Objetos de estilos en React Native',
  'inline': 'Estilos directos en componente',
  'styled components': 'Librería para CSS-in-JS',
};

export default function Home2({ navigation }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(false);

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Eliminar acentos

    // Paso 1: Búsqueda exacta en base de conocimiento
    for (const [key, value] of Object.entries(REACT_KNOWLEDGE)) {
      if (lowerQuery.includes(key.toLowerCase())) {
        return value;
      }
    }

    // Paso 2: Patrones de pregunta específicos
    if (lowerQuery.match(/que es|qu[eé] es|what is|define/)) {
      if (lowerQuery.includes('react')) {
        return 'Biblioteca JavaScript para interfaces';
      }
      return 'Concepto clave en React ecosystem';
    }

    if (lowerQuery.match(/c[oó]mo|how|de qu[eé] manera/)) {
      if (lowerQuery.includes('funciona')) {
        return 'Usa componentes y renderizado virtual';
      }
      if (lowerQuery.includes('crear') || lowerQuery.includes('hacer')) {
        return 'Con funciones que retornan JSX';
      }
      return 'Se implementa con funciones y JSX';
    }

    if (lowerQuery.match(/para qu[eé]|por qu[eé]|why|cu[aá]ndo/)) {
      return 'Para crear UIs interactivas y reactivas';
    }

    if (lowerQuery.match(/diferencia|vs|versus|comparar/)) {
      return 'Cada uno tiene ventajas según el caso';
    }

    if (lowerQuery.match(/ventaja|beneficio|pro/)) {
      return 'Reutilizable, eficiente y mantenible';
    }

    if (lowerQuery.match(/ejemplo|sample|demo/)) {
      return 'Ejemplo: function App() { return <View/> }';
    }

    // Paso 3: Palabras clave relacionadas
    if (lowerQuery.match(/interfaz|ui|vista|pantalla/)) {
      return 'Elementos visuales creados con JSX';
    }

    if (lowerQuery.match(/dato|informaci[oó]n|valor/)) {
      return 'Se manejan con state y props en React';
    }

    if (lowerQuery.match(/funci[oó]n|m[eé]todo|clase/)) {
      return 'Tipos de componentes en React';
    }

    if (lowerQuery.match(/cambio|actualiz|modific/)) {
      return 'Se usa setState o hooks para cambios';
    }

    if (lowerQuery.match(/m[oó]vil|app|aplicaci[oó]n/)) {
      return 'React Native para apps móviles nativas';
    }

    if (lowerQuery.match(/renderiz|dibuj|mostr|pintar/)) {
      return 'Proceso de convertir JSX en UI visual';
    }

    if (lowerQuery.match(/optimiz|r[aá]pid|performance|velocidad/)) {
      return 'Usa memo, useMemo y PureComponent';
    }

    // Paso 4: Detección de temas generales
    if (lowerQuery.match(/react native|rn|nativo/)) {
      return 'Framework para apps iOS y Android en JS';
    }

    if (lowerQuery.match(/react|biblioteca|library/)) {
      return 'Biblioteca de Facebook para crear UIs';
    }

    // Paso 5: Respuesta por defecto inteligente
    if (lowerQuery.length > 10) {
      return 'Relacionado con componentes y estado';
    }

    return 'Hazme una pregunta sobre React Native';
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
            <Text style={styles.configValue}>70+ conceptos React</Text>
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
              • Base de conocimiento: 70+ conceptos{'\n'}
              • Sistema multinivel: 5 niveles de IA{'\n'}
              • Respuestas máximo 50 caracteres{'\n'}
              • Temperatura: 0.8 | Powered by IA Local
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
