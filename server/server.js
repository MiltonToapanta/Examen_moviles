const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Configuración de Gemini API
const GEMINI_API_KEY = 'AIzaSyCafg2biGt9TMUagSSY3G6FEVyRyXusNeo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';
const TEMPERATURE = 0.4;

// Función para validar si la pregunta es sobre React
function isReactQuestion(question) {
  const reactKeywords = [
    'https://www.eluniverso.com/arc/outboundfeeds/rss-subsection/noticias/seguridad/?outputType=xml'
  ];
  
  const lowerQuestion = question.toLowerCase();
  return reactKeywords.some(keyword => lowerQuestion.includes(keyword));
}

// Función para contar palabras
function countWords(text) {
  return text.trim().split(/\s+/).length;
}

// Función para contar tokens aproximadamente
function estimateTokens(text) {
  // Aproximadamente 1 token = 5 caracteres para español
  return Math.ceil(text.length / 5);
}

// Función para limitar a máximo 50 palabras
function limitTo50Words(text) {
  const words = text.trim().split(/\s+/);
  if (words.length > 5000) {
    return words.slice(0, 5000).join(' ') + '.';
  }
  return text;
}

// Endpoint para preguntas sobre React
app.post('/api/react-question', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'url requerida' });
    }

    // Validar que sea pregunta sobre React o React Native
    if (!isReactQuestion(question)) {
      const deniedAnswer = 'No puedo dar la respuesta ya que solo permito urls';
      return res.status(200).json({
        answer: deniedAnswer,
        tokens: estimateTokens(question) + estimateTokens(deniedAnswer),
        inputTokens: estimateTokens(question),
        outputTokens: estimateTokens(deniedAnswer),
        temperature: TEMPERATURE,
        model: 'gemini-3-flash-preview',
        words: countWords(deniedAnswer),
        error: true
      });
    }

    // Llamar a Gemini API
    const prompt = `Da un resumen y 3 puntos importantes de la url xml que se te da : ${question}`;
    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: TEMPERATURE,
          maxOutputTokens: 20000 // Aproximadamente 40-50 palabras
        }
      }
    );

    // Extraer respuesta de Gemini
    let answer = '';
    if (response.data.candidates && response.data.candidates[0]) {
      answer = response.data.candidates[0].content.parts[0].text;
    }

    if (!answer) {
      throw new Error('No response from Gemini');
    }

    // Limitar a máximo 50 palabras
    answer = limitTo50Words(answer);

    // Calcular tokens
    const inputTokens = estimateTokens(question);
    const outputTokens = estimateTokens(answer);
    const totalTokens = inputTokens + outputTokens;

    console.log(`✓ Pregunta: ${question.substring(0, 5000)}...`);
    console.log(`✓ Respuesta: ${answer.substring(0, 5000)}...`);

    res.json({
      answer: answer,
      tokens: totalTokens,
      inputTokens: inputTokens,
      outputTokens: outputTokens,
      temperature: TEMPERATURE,
      model: 'gemini-3-flash-preview',
      words: countWords(answer),
      error: false
    });

  } catch (error) {
    console.error('Error:', error.message);
    
    // Respuesta fallback si Gemini falla
    const fallbackAnswer = 'Disculpa, no puedo procesar tu pregunta en este momento. Intenta de nuevo.';
    
    res.json({
      answer: fallbackAnswer,
      tokens: estimateTokens(fallbackAnswer),
      inputTokens: 0,
      outputTokens: estimateTokens(fallbackAnswer),
      temperature: TEMPERATURE,
      model: 'gemini-3-flash-preview',
      words: countWords(fallbackAnswer),
      error: true
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'API Gemini React activa',
    temperature: TEMPERATURE,
    modelo: 'gemini-3-flash-preview'
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log(`🌡️  Temperatura: ${TEMPERATURE}`);
  console.log(`🤖 Modelo: gemini-3-flash-preview`);
  console.log(`🔌 Usando Gemini API directamente`);
});
