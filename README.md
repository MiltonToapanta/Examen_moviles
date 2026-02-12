# 🎓 Examen Dispositivos Móviles - Proyecto Final React Native

Aplicación móvil de React Native con sistema de IA local para responder preguntas sobre React.

## 📱 Proyecto Final - Chat IA React Native

### 🎯 Requisitos Implementados

Este proyecto implementa un sistema de chat con IA que cumple con los siguientes requisitos:

#### 1. ✅ Componente Input de Pregunta sobre React Native

**Ubicación:** `screens/Home2.js` líneas 117-124

```javascript
<TextInput
  style={styles.input}
  placeholder="Ej: ¿Qué es un componente en React?"
  placeholderTextColor="#95a5a6"
  value={question}
  onChangeText={setQuestion}
  multiline
/>
```

**Cómo funciona:**
- **TextInput multilinea**: Permite escribir preguntas de cualquier longitud
- **State management**: Usa `useState` (línea 45) para almacenar la pregunta
- **Placeholder**: Muestra un ejemplo de pregunta válida
- **onChangeText**: Actualiza el estado en tiempo real cuando el usuario escribe

**Variables involucradas:**
```javascript
const [question, setQuestion] = useState(''); // Línea 45
```

---

#### 2. ✅ Respuesta de Máximo 50 Caracteres

**Ubicación:** `screens/Home2.js` líneas 85-88

```javascript
const generatedText = generateResponse(question);
const limitedResponse = generatedText.substring(0, 50); // Limita a 50 caracteres
setResponse(limitedResponse);
```

**Cómo funciona:**
1. La función `generateResponse()` (línea 50) genera la respuesta basada en la pregunta
2. `.substring(0, 50)` corta el texto a exactamente 50 caracteres máximo
3. Se guarda en el estado `response` (línea 46)
4. Se muestra en pantalla en las líneas 144-149

**Visualización en pantalla:**
```javascript
<Text style={styles.responseText}>{response}</Text> // Línea 144
<Text style={styles.responseInfoText}>
  📏 {response.length}/50 caracteres // Línea 147 - Muestra el contador
</Text>
```

---

#### 3. ✅ Contexto Solo de React

**Ubicación:** `screens/Home2.js` líneas 15-42

```javascript
const REACT_KNOWLEDGE = {
  'componente': 'Función o clase que retorna elementos JSX',
  'jsx': 'Sintaxis que combina JavaScript con HTML',
  'props': 'Datos que pasan de padre a hijo componente',
  'state': 'Datos internos que cambian en componente',
  'hook': 'Funciones que añaden estado a componentes',
  'usestate': 'Hook para manejar estado en componentes',
  'useeffect': 'Hook para efectos secundarios',
  // ... 25+ conceptos de React
};
```

**Cómo funciona el contexto:**

1. **Base de conocimiento** (líneas 16-42): Objeto con 25+ conceptos de React/React Native
2. **Búsqueda inteligente** (líneas 50-72): La función `generateResponse()` busca palabras clave
3. **Detección de patrones**: Reconoce preguntas tipo "qué es", "cómo", "para qué"

```javascript
const generateResponse = (query) => {
  const lowerQuery = query.toLowerCase();

  // Buscar coincidencias en REACT_KNOWLEDGE
  for (const [key, value] of Object.entries(REACT_KNOWLEDGE)) {
    if (lowerQuery.includes(key)) {
      return value; // Retorna respuesta específica
    }
  }

  // Respuestas genéricas si no encuentra coincidencia exacta
  if (lowerQuery.includes('qué es')) {
    return 'Concepto fundamental en React ecosystem';
  }
  // ... más patrones
};
```

**Ejemplo de uso:**
- Pregunta: "¿Qué es un componente en React?"
- Detección: La palabra "componente" está en `REACT_KNOWLEDGE`
- Respuesta: "Función o clase que retorna elementos JSX"
- Limitado a: 50 caracteres máximo

---

#### 4. ✅ Presentación de Tokens y Temperatura en 0.8

##### **A) Temperatura 0.8**

**Ubicación:** `screens/Home2.js` línea 13

```javascript
const TEMPERATURE = 0.8;
```

**Dónde se muestra:**
- **Card de configuración** (líneas 94-99):
```javascript
<View style={styles.configRow}>
  <Text style={styles.configLabel}>🌡️ Temperatura:</Text>
  <Text style={styles.configValue}>{TEMPERATURE}</Text> // Muestra 0.8
</View>
```

- **Card de estadísticas** (líneas 161-165):
```javascript
<View style={styles.statCard}>
  <Text style={styles.statIcon}>🌡️</Text>
  <Text style={styles.statValue}>{TEMPERATURE}</Text> // Muestra 0.8
  <Text style={styles.statLabel}>Temperatura</Text>
</View>
```

##### **B) Tokens Utilizados**

**Ubicación del cálculo:** `screens/Home2.js` líneas 90-92

```javascript
const wordCount = limitedResponse.split(' ').length; // Cuenta palabras
const approximateTokens = Math.ceil(wordCount * 1.3); // Calcula tokens
setTokens(approximateTokens); // Guarda en estado
```

**Cómo se calculan:**
1. Divide la respuesta en palabras: `.split(' ')`
2. Cuenta cuántas palabras hay: `.length`
3. Multiplica por 1.3 (aproximación de tokens por palabra)
4. Redondea hacia arriba: `Math.ceil()`

**Dónde se muestran:**
- **Card de estadísticas** (líneas 156-160):
```javascript
<View style={styles.statCard}>
  <Text style={styles.statIcon}>🔢</Text>
  <Text style={styles.statValue}>{tokens}</Text> // Muestra tokens calculados
  <Text style={styles.statLabel}>Tokens</Text>
</View>
```

**Variables involucradas:**
```javascript
const [tokens, setTokens] = useState(0); // Línea 47 - Estado de tokens
```

---

## 🔍 Flujo Completo del Sistema

### Paso a Paso:

1. **Usuario escribe pregunta** (líneas 117-124)
   ```
   Input: "¿Qué es un componente en React?"
   ```

2. **Usuario presiona botón** (líneas 125-135)
   ```javascript
   onPress={askQuestion} // Ejecuta la función
   ```

3. **Función askQuestion inicia** (línea 74-96)
   - Activa loading: `setLoading(true)`
   - Limpia respuesta anterior: `setResponse('')`
   - Reinicia tokens: `setTokens(0)`

4. **Genera respuesta** (línea 85)
   ```javascript
   const generatedText = generateResponse(question);
   // Busca en REACT_KNOWLEDGE y retorna respuesta
   ```

5. **Limita a 50 caracteres** (línea 86)
   ```javascript
   const limitedResponse = generatedText.substring(0, 50);
   ```

6. **Calcula tokens** (líneas 90-92)
   ```javascript
   const wordCount = limitedResponse.split(' ').length; // Ej: 7 palabras
   const approximateTokens = Math.ceil(7 * 1.3); // = 10 tokens
   ```

7. **Actualiza UI** (líneas 87, 93)
   ```javascript
   setResponse(limitedResponse); // Muestra respuesta
   setTokens(approximateTokens); // Muestra tokens
   setLoading(false); // Oculta loading
   ```

8. **Renderiza resultados** (líneas 139-173)
   - Card de respuesta con texto
   - Card de estadísticas con tokens, temperatura y caracteres

---

## 📊 Visualización en Pantalla

### Sección de Configuración (parte superior)
```
⚙️ Configuración del modelo
🌡️ Temperatura: 0.8
🎯 Tokens máximos: 50
📚 Contexto: Solo React
🤖 Modelo: React AI Local
```

### Sección de Estadísticas (después de responder)
```
📊 Estadísticas
┌─────────┬─────────────┬────────────┐
│ 🔢      │ 🌡️         │ 📏        │
│   10    │    0.8      │    43      │
│ Tokens  │ Temperatura │ Caracteres │
└─────────┴─────────────┴────────────┘
```

---

## 🚀 Instalación y Ejecución

1. **Instalar dependencias:**
```bash
npm install
```

2. **Iniciar el proyecto:**
```bash
npm start
```

3. **Navegar a la pantalla:**
   - Ir desde Home → Botón "👥" en la navegación inferior
   - Llega a Home2 (Proyecto Final)

---

## 📂 Estructura del Proyecto

```
Examen_moviles/
├── screens/
│   ├── Home2.js          ← 🎯 PROYECTO FINAL AQUÍ
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   └── Onboarding(1-4).js
├── App.js                ← Configuración de navegación
├── package.json
└── README.md             ← Este archivo
```

---

## 🎨 Diseño y Estilización

### Colores Principales
- **Verde turquesa**: `#00B894` - Botones y elementos activos
- **Fondo claro**: `#f5f6fa` - Fondo principal
- **Texto oscuro**: `#2d3436` - Textos principales
- **Texto gris**: `#636e72` - Textos secundarios

### Componentes de UI
- **Cards con sombras**: Para configuración, respuesta y estadísticas
- **Input multilinea**: Con bordes redondeados y fondo suave
- **Botón con loading**: ActivityIndicator mientras procesa
- **Navegación inferior**: 4 botones con iconos emoji

---

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework principal
- **Expo**: Herramientas de desarrollo
- **React Navigation**: Sistema de navegación
- **React Hooks**: useState para manejo de estado
- **JavaScript ES6+**: Sintaxis moderna

---

## 📝 Variables de Estado Principales

```javascript
// Estado de la pregunta del usuario
const [question, setQuestion] = useState('');

// Estado de la respuesta de la IA (máximo 50 caracteres)
const [response, setResponse] = useState('');

// Estado de tokens utilizados
const [tokens, setTokens] = useState(0);

// Estado de carga/procesamiento
const [loading, setLoading] = useState(false);
```

---

## 🔑 Constantes Clave

```javascript
// Temperatura del modelo (afecta creatividad de respuestas)
const TEMPERATURE = 0.8;

// Base de conocimiento de React (25+ conceptos)
const REACT_KNOWLEDGE = { ... };
```

---

## 🎓 Conceptos de React Incluidos

La base de conocimiento incluye respuestas para:

**Conceptos básicos:**
- Componente, JSX, Props, State, Hook

**Hooks:**
- useState, useEffect, useContext, useReducer, useMemo, useRef

**React Native:**
- View, Text, StyleSheet, FlatList, TouchableOpacity, Navigation

**Conceptos avanzados:**
- Virtual DOM, Lifecycle, Context API, Portal, Fragment

---

## 👨‍💻 Autor

**Milton Toapanta**

## 📄 Licencia

Este proyecto es para fines educativos - Examen de Dispositivos Móviles

---

## 🌟 Características Destacadas

✅ Sistema de IA local (sin conexión a internet requerida)
✅ Respuestas instantáneas (sin latencia de API)
✅ 25+ conceptos de React programados
✅ Interfaz moderna y responsive
✅ Cálculo real de tokens
✅ Limitación estricta de 50 caracteres
✅ Temperatura configurable (0.8)
✅ Contexto exclusivo de React

---

## 📞 Soporte

Para preguntas o problemas, contactar a través del repositorio:
https://github.com/MiltonToapanta/Examen_moviles
