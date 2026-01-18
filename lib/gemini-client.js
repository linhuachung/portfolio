import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { cleanMarkdownCodeBlocks } from './ai-utils';

const DEFAULT_MODELS = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b'
];

/**
 * Get available Gemini models
 */
export async function getAvailableModels( apiKey ) {
  try {
    const listModelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const response = await axios.get( listModelsUrl, {
      headers: { 'Content-Type': 'application/json' }
    } );

    if ( response.data?.models ) {
      return response.data.models
        .filter( m => m.supportedGenerationMethods?.includes( 'generateContent' ) )
        .map( m => m.name.replace( 'models/', '' ) );
    }
  } catch ( error ) {
    // Silently fail, will use default models
  }

  return DEFAULT_MODELS;
}

/**
 * Generate content using Gemini SDK
 */
export async function generateWithSDK( apiKey, prompt, models ) {
  const genAI = new GoogleGenerativeAI( apiKey );

  for ( const modelName of models ) {
    try {
      const model = genAI.getGenerativeModel( { model: modelName } );
      const result = await model.generateContent( prompt );
      const response = await result.response;
      const rawText = response.text();

      if ( rawText ) {
        return cleanMarkdownCodeBlocks( rawText );
      }
    } catch ( error ) {
      // Try next model
      continue;
    }
  }

  return null;
}

/**
 * Generate content using REST API
 */
export async function generateWithREST( apiKey, prompt, models ) {
  const endpoints = [];
  for ( const modelName of models ) {
    endpoints.push(
      { model: modelName, url: `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent` },
      { model: modelName, url: `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent` }
    );
  }

  for ( const { url } of endpoints ) {
    try {
      const response = await axios.post(
        `${url}?key=${apiKey}`,
        {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if ( rawText ) {
        return cleanMarkdownCodeBlocks( rawText );
      }
    } catch ( error ) {
      // Try next endpoint
      continue;
    }
  }

  return null;
}

/**
 * Generate content using Gemini API with fallback
 */
export async function generateContent( apiKey, prompt ) {
  if ( !apiKey ) {
    throw new Error( 'GEMINI_API_KEY is not configured' );
  }

  const models = await getAvailableModels( apiKey );
  const modelsToTry = models.length > 0 ? models : DEFAULT_MODELS;

  // Try SDK first
  let result = await generateWithSDK( apiKey, prompt, modelsToTry );
  if ( result ) {
    return result;
  }

  // Fallback to REST API
  result = await generateWithREST( apiKey, prompt, modelsToTry.slice( 0, 3 ) );
  if ( result ) {
    return result;
  }

  throw new Error( 'Failed to generate content with all available models and endpoints' );
}
