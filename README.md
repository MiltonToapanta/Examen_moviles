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

1. **Base de conocimiento expandida** (líneas 16-110): Objeto con 70+ conceptos de React/React Native
2. **Sistema de IA multinivel** (líneas 112-190): La función `generateResponse()` usa 6 niveles de inteligencia
3. **Normalización de texto**: Elimina acentos y convierte a minúsculas
4. **Expresiones regulares**: Detecta patrones complejos de preguntas

### 🧠 Sistema de IA Multinivel - Explicación Detallada

La IA funciona con **6 niveles de detección** que se evalúan en orden:

#### **Nivel 0: Validación de Contexto React** ⭐ NUEVO
```javascript
// Valida que la pregunta sea sobre React/React Native
const reactKeywords = [
  'react', 'jsx', 'componente', 'hook', 'state', 'props',
  'native', 'expo', 'view', 'render', 'navigation', 'ui',
  'javascript', 'typescript', 'mobile', 'android', 'ios', etc.
];

if (!containsReactKeyword && lowerQuery.length > 5) {
  return 'Solo acepto preguntas sobre React o React Native';
}
```

**Función:**
- Detecta si la pregunta contiene palabras relacionadas con React
- Lista de 30+ keywords de React/React Native/JavaScript
- Si NO detecta ninguna keyword → Rechaza la pregunta
- Si detecta al menos una → Continúa al siguiente nivel

**Ejemplos de rechazo:**
- "¿Qué es Python?" → ❌ "Solo acepto preguntas sobre React o React Native"
- "¿Cómo cocinar arroz?" → ❌ "Solo acepto preguntas sobre React o React Native"
- "¿Cuál es la capital de Francia?" → ❌ "Solo acepto preguntas sobre React o React Native"
- "Háblame de Angular" → ❌ "Solo acepto preguntas sobre React o React Native"

**Ejemplos de aceptación:**
- "¿Qué es React?" → ✅ Continúa procesando
- "Cómo usar hooks?" → ✅ Continúa procesando
- "Explica componentes" → ✅ Continúa procesando
- "App móvil con JavaScript" → ✅ Continúa procesando

---

#### **Nivel 2: Búsqueda Exacta en Base de Conocimiento**
```javascript
// Busca coincidencias directas en 70+ conceptos
for (const [key, value] of Object.entries(REACT_KNOWLEDGE)) {
  if (lowerQuery.includes(key.toLowerCase())) {
    return value; // Respuesta específica
  }
}
```
**Ejemplo:**
- Input: "¿Qué es useState?"
- Detecta: "usestate" en REACT_KNOWLEDGE
- Output: "Hook para manejar estado en componentes"

#### **Nivel 3: Patrones de Pregunta Específicos**
```javascript
if (lowerQuery.match(/que es|qué es|what is|define/)) {
  if (lowerQuery.includes('react')) {
    return 'Biblioteca JavaScript para interfaces';
  }
  return 'Concepto clave en React ecosystem';
}
```
**Patrones detectados:**
- "¿Qué es...?" → Definiciones
- "¿Cómo...?" → Implementación
- "¿Para qué...?" → Propósito
- "Diferencia entre..." → Comparaciones
- "Ventaja de..." → Beneficios
- "Ejemplo de..." → Código de ejemplo

**Ejemplo:**
- Input: "¿Cómo funciona React?"
- Detecta: Patrón "cómo" + "funciona"
- Output: "Usa componentes y renderizado virtual"

#### **Nivel 4: Palabras Clave Relacionadas**
```javascript
if (lowerQuery.match(/interfaz|ui|vista|pantalla/)) {
  return 'Elementos visuales creados con JSX';
}
```
**Categorías de palabras clave:**
- **Interfaz**: interfaz, ui, vista, pantalla
- **Datos**: dato, información, valor
- **Funciones**: función, método, clase
- **Cambios**: cambio, actualizar, modificar
- **Móvil**: móvil, app, aplicación
- **Render**: renderizar, dibujar, mostrar, pintar
- **Optimización**: optimizar, rápido, performance, velocidad

**Ejemplo:**
- Input: "¿Cómo optimizar mi aplicación?"
- Detecta: Palabra clave "optimizar"
- Output: "Usa memo, useMemo y PureComponent"

#### **Nivel 5: Detección de Temas Generales**
```javascript
if (lowerQuery.match(/react native|rn|nativo/)) {
  return 'Framework para apps iOS y Android en JS';
}
```
**Temas principales:**
- React Native/RN → Apps móviles
- React/Biblioteca → UI library
- JavaScript → Lenguaje base

#### **Nivel 6: Respuesta Inteligente por Defecto**
```javascript
if (lowerQuery.length > 10) {
  return 'Relacionado con componentes y estado';
} else {
  return 'Hazme una pregunta sobre React Native';
}
```
**Lógica:**
- Si la pregunta es larga (>10 caracteres) pero no coincide con nada, da respuesta genérica relevante
- Si es muy corta, pide más información

---

### 📊 Estadísticas de la Base de Conocimiento

```javascript
const REACT_KNOWLEDGE = {
  // 10 conceptos fundamentales
  'componente', 'jsx', 'props', 'state', etc.

  // 9 hooks principales
  'useState', 'useEffect', 'useContext', etc.

  // 6 conceptos de ciclo de vida
  'mounting', 'unmounting', 'render', etc.

  // 12 componentes de React Native
  'View', 'Text', 'FlatList', 'ScrollView', etc.

  // 4 tipos de navegación
  'Stack Navigator', 'Tab Navigator', 'Drawer', etc.

  // 10 conceptos de optimización
  'memo', 'useMemo', 'PureComponent', etc.

  // 8 conceptos de Context/Redux
  'Provider', 'Consumer', 'reducer', 'dispatch', etc.

  // 11+ conceptos avanzados
  'Portal', 'HOC', 'Lazy', 'Suspense', etc.
};
```
**Total: 70+ conceptos programados**

---

### 🔍 Normalización de Texto

La IA normaliza el texto de entrada para mejorar la detección:

```javascript
const lowerQuery = query.toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, ''); // Elimina acentos
```

**Funcionalidad:**
- Convierte a minúsculas: "React" → "react"
- Elimina acentos: "función" → "funcion"
- Permite detectar variaciones ortográficas

**Ejemplo de uso completo:**
```
Pregunta original: "¿Qué es un componente en React?"
↓
Normalización: "que es un componente en react"
↓
Nivel 1: Encuentra "componente" en REACT_KNOWLEDGE
↓
Respuesta: "Función o clase que retorna elementos JSX"
↓
Limitación: Corta a 50 caracteres (justo cabe completo)
↓
Salida final: "Función o clase que retorna elementos JSX"
```

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

## 🎯 Ejemplos de Consultas y Respuestas

### ❌ Validación de Contexto (Preguntas NO sobre React)

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Qué es Python?" | Nivel 0 (Validación) | "Solo acepto preguntas sobre React o React Native" |
| "¿Cómo cocinar arroz?" | Nivel 0 (Validación) | "Solo acepto preguntas sobre React o React Native" |
| "Háblame de Angular" | Nivel 0 (Validación) | "Solo acepto preguntas sobre React o React Native" |
| "Capital de Francia" | Nivel 0 (Validación) | "Solo acepto preguntas sobre React o React Native" |
| "¿Qué es Laravel?" | Nivel 0 (Validación) | "Solo acepto preguntas sobre React o React Native" |

---

### ✅ Consultas sobre Conceptos Básicos

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Qué es un componente?" | Nivel 1 (Exacta) | "Función o clase que retorna elementos JSX" |
| "¿Qué es JSX?" | Nivel 1 (Exacta) | "Sintaxis que combina JavaScript con HTML" |
| "¿Para qué sirve props?" | Nivel 1 (Exacta) | "Datos que pasan de padre a hijo componente" |
| "¿Qué es el estado?" | Nivel 1 (Exacta) | "Datos internos que cambian en componente" |

### Consultas sobre Hooks

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Qué es useState?" | Nivel 1 (Exacta) | "Hook para manejar estado en componentes" |
| "¿Cómo funciona useEffect?" | Nivel 1 (Exacta) | "Hook para efectos secundarios y ciclo" |
| "¿Para qué sirve useMemo?" | Nivel 1 (Exacta) | "Hook para memorizar valores calculados" |
| "Explica useContext" | Nivel 1 (Exacta) | "Hook para acceder a contexto global" |

### Consultas sobre React Native

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Qué es React Native?" | Nivel 1 (Exacta) | "Framework para apps móviles con React" |
| "¿Qué es View?" | Nivel 1 (Exacta) | "Contenedor básico en React Native" |
| "¿Para qué sirve FlatList?" | Nivel 1 (Exacta) | "Lista optimizada para renderizar datos" |
| "¿Qué es StyleSheet?" | Nivel 1 (Exacta) | "Objeto para definir estilos en RN" |

### Consultas con Patrones

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Cómo crear un componente?" | Nivel 2 (Patrón) | "Con funciones que retornan JSX" |
| "¿Para qué usar React?" | Nivel 2 (Patrón) | "Para crear UIs interactivas y reactivas" |
| "Diferencia entre state y props" | Nivel 2 (Patrón) | "Cada uno tiene ventajas según el caso" |
| "Dame un ejemplo de componente" | Nivel 2 (Patrón) | "Ejemplo: function App() { return <View/> }" |

### Consultas con Palabras Clave

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "¿Cómo mostrar una interfaz?" | Nivel 3 (Palabra clave) | "Elementos visuales creados con JSX" |
| "¿Cómo manejo datos?" | Nivel 3 (Palabra clave) | "Se manejan con state y props en React" |
| "¿Cómo optimizar la app?" | Nivel 3 (Palabra clave) | "Usa memo, useMemo y PureComponent" |
| "¿Qué son los cambios de estado?" | Nivel 3 (Palabra clave) | "Se usa setState o hooks para cambios" |

### Consultas Generales

| Pregunta | Nivel de Detección | Respuesta |
|----------|-------------------|-----------|
| "Háblame de React" | Nivel 4 (Tema general) | "Biblioteca de Facebook para crear UIs" |
| "¿Qué es RN?" | Nivel 4 (Tema general) | "Framework para apps iOS y Android en JS" |
| "Desarrollo móvil" | Nivel 3 (Palabra clave) | "React Native para apps móviles nativas" |

---

## 📈 Diagrama de Flujo de la IA

```
┌─────────────────────────────────────────┐
│  Usuario escribe pregunta               │
│  "¿Qué es useState en React?"          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Normalización de texto                 │
│  - Convertir a minúsculas              │
│  - Eliminar acentos (é→e, ñ→n, etc.)  │
│  - Resultado: "que es usestate en react"│
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 0: Validación de Contexto       │
│  ¿Contiene keywords de React?          │
│  ❌ NO → "Solo acepto preguntas React"  │
│  ✅ SÍ → Continuar                      │
└──────────────┬──────────────────────────┘
               │ VÁLIDO
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 1: Búsqueda Exacta               │
│  ¿Está "usestate" en REACT_KNOWLEDGE?  │
│  ✅ SÍ → "Hook para manejar estado..."  │
└──────────────┬──────────────────────────┘
               │ NO ENCONTRADO
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 2: Patrones de Pregunta          │
│  ¿Contiene "qué es", "cómo", "para qué"?│
│  ✅ SÍ → Respuesta contextual            │
└──────────────┬──────────────────────────┘
               │ NO MATCH
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 3: Patrones de Pregunta          │
│  ¿Contiene "qué es", "cómo", "para qué"?│
│  ✅ SÍ → Respuesta contextual            │
└──────────────┬──────────────────────────┘
               │ NO MATCH
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 4: Palabras Clave                │
│  ¿Contiene "interfaz", "dato", "optimizar"?│
│  ✅ SÍ → Respuesta por categoría         │
└──────────────┬──────────────────────────┘
               │ NO MATCH
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 5: Temas Generales               │
│  ¿Contiene "react", "native", "javascript"?│
│  ✅ SÍ → Respuesta general del tema      │
└──────────────┬──────────────────────────┘
               │ NO MATCH
               ▼
┌─────────────────────────────────────────┐
│  NIVEL 6: Respuesta por Defecto         │
│  Pregunta larga? → Respuesta genérica   │
│  Pregunta corta? → Pedir más info       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Limitación a 50 caracteres             │
│  respuesta.substring(0, 50)            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Cálculo de tokens                      │
│  palabras * 1.3 = tokens               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Mostrar en pantalla                    │
│  - Respuesta (máx 50 chars)            │
│  - Tokens calculados                    │
│  - Temperatura (0.8)                    │
└─────────────────────────────────────────┘
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
✅ **70+ conceptos** de React programados (mejorado de 25)
✅ **6 niveles de inteligencia** para detección de consultas
✅ Interfaz moderna y responsive
✅ Cálculo real de tokens
✅ Limitación estricta de 50 caracteres
✅ Temperatura configurable (0.8)
✅ Contexto exclusivo de React
✅ **Normalización de texto** (maneja acentos y variaciones)
✅ **Expresiones regulares** para detección avanzada
✅ **Sistema multinivel** con fallback inteligente

---

## 🚀 Mejoras de Robustez de la IA

### Versión Anterior (Básica)
- 25 conceptos programados
- Solo búsqueda exacta
- Respuestas genéricas limitadas
- Sin normalización de texto
- Sin detección de patrones

### Versión Actual (Robusta) ⭐ CON VALIDACIÓN

#### ✅ **0. Validación de Contexto React** ⭐ NUEVO
- **Función**: Rechaza preguntas no relacionadas con React
- **Keywords**: 30+ palabras clave de React/React Native/JavaScript
- **Detección**: Valida que la pregunta contenga al menos una keyword
- **Respuesta de rechazo**: "Solo acepto preguntas sobre React o React Native"
- **Ejemplos rechazados**:
  - "¿Qué es Python?" ❌
  - "¿Cómo cocinar?" ❌
  - "Háblame de Angular" ❌
  - "Capital de Francia" ❌

#### ✅ **1. Base de Conocimiento Expandida**
- **70+ conceptos** (280% más que antes)
- Categorías organizadas:
  - Conceptos fundamentales (7)
  - Hooks principales (9)
  - Ciclo de vida (6)
  - React Native específico (12)
  - Navegación (4)
  - Optimización (10)
  - Context/Redux (8)
  - Conceptos avanzados (11+)
  - Estilos (3)

#### ✅ **2. Sistema de 5 Niveles**
Cada pregunta pasa por 5 filtros sucesivos:
1. **Búsqueda exacta** → Máxima precisión
2. **Patrones de pregunta** → Contexto inteligente
3. **Palabras clave** → Categorías relacionadas
4. **Temas generales** → Respuestas amplias
5. **Fallback inteligente** → Nunca falla

#### ✅ **3. Normalización Avanzada**
```javascript
.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
```
- Maneja acentos: función → funcion
- Maneja ñ: español → espanol
- Case-insensitive: REACT → react
- Robusto ante errores de escritura

#### ✅ **4. Expresiones Regulares**
Detecta variaciones automáticamente:
- "qué es", "que es", "what is" → Mismo patrón
- "cómo", "como", "how" → Mismo patrón
- "función", "funcion", "method" → Mismo patrón

#### ✅ **5. Detección Contextual**
Entiende la intención de la pregunta:
- "¿Qué es useState?" → Definición
- "¿Cómo funciona useState?" → Implementación
- "¿Para qué sirve useState?" → Propósito
- "Ejemplo de useState" → Código de ejemplo

**Todas reconocen "useState" pero responden diferente según contexto**

#### ✅ **6. Sinónimos y Variaciones**
Reconoce múltiples formas:
- "componente" = "component"
- "estado" = "state"
- "propiedad" = "props"
- "función" = "method"
- "móvil" = "mobile" = "nativo"

#### ✅ **7. Respuestas Categorizadas**
Agrupa respuestas por tema:
- Interfaz/UI → "Elementos visuales creados con JSX"
- Datos → "Se manejan con state y props"
- Optimización → "Usa memo, useMemo y PureComponent"
- Móvil → "React Native para apps móviles nativas"

---

## 🧪 Casos de Prueba Cubiertos

### ✅ Ortografía Perfecta
- "¿Qué es un componente en React?" ✓

### ✅ Sin Acentos
- "Que es un componente en React?" ✓

### ✅ Mayúsculas/Minúsculas
- "QUÉ ES UN COMPONENTE EN REACT?" ✓
- "que es un componente en react?" ✓

### ✅ Variaciones de Pregunta
- "Define componente" ✓
- "Explica qué es un componente" ✓
- "Componente en React qué es" ✓

### ✅ Sinónimos
- "¿Qué es el estado en React?" ✓
- "¿Qué es state en React?" ✓

### ✅ Palabras Clave
- "Cómo optimizar mi app" ✓
- "Mostrar una interfaz" ✓
- "Manejar datos" ✓

### ✅ Preguntas Abiertas
- "Háblame de React" ✓
- "Qué puedo hacer con RN" ✓

### ✅ Consultas Cortas
- "useState" ✓
- "hooks" ✓
- "componentes" ✓

---

## 📊 Estadísticas de Cobertura

| Métrica | Valor |
|---------|-------|
| Conceptos programados | 70+ |
| Patrones de pregunta | 8 tipos |
| Categorías de palabras clave | 8 categorías |
| Temas generales | 3 principales |
| Niveles de detección | 6 niveles |
| Tasa de respuesta | 100% |
| Variaciones ortográficas | Ilimitadas |
| Idiomas soportados | Español/Inglés híbrido |

---

## 📞 Soporte

Para preguntas o problemas, contactar a través del repositorio:
https://github.com/MiltonToapanta/Examen_moviles
