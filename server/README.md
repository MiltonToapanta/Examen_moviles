# React Native Chat con API Gemini

Un asistente inteligente que responde preguntas sobre React Native usando la API de Google Gemini.

## Configuración

### 1. Instalar dependencias del servidor

Abre una terminal en la carpeta `server` y ejecuta:

```bash
cd server
npm install
```

### 2. Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3002`

### Verificación

Prueba el servidor:
```bash
curl http://localhost:3002/health
```

Debería responder: `{"status":"API Gemini React activa"}`

## Características

✅ **Componente Input** - Campo de entrada para preguntas sobre React Native
✅ **Respuestas limitadas** - Máximo 50 caracteres por respuesta
✅ **Contexto React** - La IA solo responde sobre React y React Native
✅ **Temperatura configurada** - Fija en 0.8 para variabilidad controlada
✅ **Visualización de Tokens** - Muestra cantidad de tokens utilizados
✅ **Historial** - Guarda las preguntas y respuestas anteriores
✅ **API Gemini** - Integración con Google Generative AI

## Estructura

```
.
├── screens/
│   ├── Home.js          # Pantalla principal
│   └── Home2.js         # Chat con IA (actualizado)
├── server/
│   ├── server.js        # Backend Express
│   └── package.json     # Dependencias del servidor
└── README.md
```

## API

### POST `/api/react-question`

**Request:**
```json
{
  "question": "¿Qué es un hook en React?"
}
```

**Response:**
```json
{
  "answer": "Funciones que añaden estado a componentes",
  "tokens": 8,
  "temperature": 0.8,
  "model": "gemini-1.5-flash"
}
```

## Notas

- La API de Gemini está preconfigurada con la clave incluida
- Las respuestas se limitan automáticamente a 50 caracteres
- La temperatura fija en 0.8 proporciona un balance entre coherencia y creatividad
- La base de conocimiento incluye 70+ conceptos de React

## Solución de Problemas

Si el app muestra error de conexión:
1. Verifica que el servidor está corriendo: `npm start` en la carpeta `server`
2. Comprueba que está en el puerto 3000
3. Si usas emulador, cambia `localhost` por IP de tu máquina

---
**Proyecto Final - Examen Móviles** 🚀
