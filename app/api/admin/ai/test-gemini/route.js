import STATUS_CODES from '@/constants/status';
import { createErrorResponse } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if ( !geminiApiKey ) {
      return createErrorResponse(
        STATUS_CODES.SERVER_ERROR,
        'GEMINI_API_KEY is not configured in environment variables.'
      );
    }

    const results = {
      apiKeyConfigured: true,
      apiKeyPrefix: geminiApiKey.substring( 0, 10 ) + '...',
      availableModels: [],
      sdkTest: {
        success: false,
        workingModel: null,
        testResponse: null,
        errors: []
      },
      restTest: {
        success: false,
        workingModel: null,
        testResponse: null,
        errors: []
      },
      recommendation: ''
    };

    const testPrompt = 'Say "Hello" in one word.';

    // Test 0: List available models first
    let availableModels = [];
    try {
      const listModelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${geminiApiKey}`;
      const listResponse = await axios.get( listModelsUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      } );

      if ( listResponse.data?.models ) {
        availableModels = listResponse.data.models
          .filter( m => m.supportedGenerationMethods?.includes( 'generateContent' ) )
          .map( m => ( {
            name: m.name.replace( 'models/', '' ),
            displayName: m.displayName,
            version: m.version,
            inputTokenLimit: m.inputTokenLimit,
            outputTokenLimit: m.outputTokenLimit
          } ) );
        results.availableModels = availableModels;
      }
    } catch ( listError ) {
      const errorMsg = listError.response?.data?.error?.message || listError.message;
      results.recommendation = `Cannot list models: ${errorMsg}. This suggests the API key may not have proper permissions or Generative Language API is not enabled.`;
    }

    // Test 1: Using Google Generative AI SDK
    // Use available models if found, otherwise try common models
    const modelsToTest = availableModels.length > 0
      ? availableModels.map( m => m.name )
      : [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b'
      ];

    try {
      const genAI = new GoogleGenerativeAI( geminiApiKey );

      for ( const modelName of modelsToTest ) {
        try {
          const model = genAI.getGenerativeModel( { model: modelName } );
          const result = await model.generateContent( testPrompt );
          const response = await result.response;
          const text = response.text();

          if ( text ) {
            results.sdkTest.success = true;
            results.sdkTest.workingModel = modelName;
            results.sdkTest.testResponse = text;
            break;
          }
        } catch ( modelError ) {
          results.sdkTest.errors.push( {
            model: modelName,
            error: modelError.message || modelError.toString(),
            details: modelError.response?.data || modelError.cause
          } );
        }
      }
    } catch ( sdkError ) {
      results.sdkTest.errors.push( {
        error: sdkError.message || sdkError.toString()
      } );
    }

    // Test 2: Using REST API directly
    // Use available models if found, otherwise try common models
    const restModelsToTest = availableModels.length > 0
      ? availableModels.map( m => m.name )
      : ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'];

    const restEndpoints = [];
    for ( const modelName of restModelsToTest ) {
      // Try v1 first, then v1beta
      restEndpoints.push(
        { model: modelName, url: `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent` },
        { model: modelName, url: `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent` }
      );
    }

    for ( const { model, url } of restEndpoints ) {
      try {
        const response = await axios.post(
          `${url}?key=${geminiApiKey}`,
          {
            contents: [{
              parts: [{ text: testPrompt }]
            }]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if ( text ) {
          results.restTest.success = true;
          results.restTest.workingModel = model;
          results.restTest.testResponse = text;
          break;
        }
      } catch ( restError ) {
        const errorMsg = restError.response?.data?.error?.message || restError.message || restError.toString();
        results.restTest.errors.push( {
          model: model,
          endpoint: url,
          error: errorMsg,
          status: restError.response?.status,
          details: restError.response?.data
        } );
      }
    }

    // Provide recommendation
    if ( !results.sdkTest.success && !results.restTest.success ) {
      const allErrors = [...results.sdkTest.errors, ...results.restTest.errors];
      const has404 = allErrors.some( e =>
        e.error?.includes( '404' ) ||
        e.error?.includes( 'not found' ) ||
        e.status === 404
      );
      const has403 = allErrors.some( e =>
        e.error?.includes( '403' ) ||
        e.error?.includes( 'permission' ) ||
        e.status === 403
      );
      const has401 = allErrors.some( e =>
        e.error?.includes( '401' ) ||
        e.error?.includes( 'unauthorized' ) ||
        e.status === 401
      );

      if ( has401 || has403 ) {
        results.recommendation = 'API key is invalid or does not have proper permissions. Verify your API key at: https://aistudio.google.com/apikey';
      } else if ( has404 ) {
        results.recommendation = 'Models not found. Enable Generative Language API at: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com';
      } else {
        results.recommendation = 'Check your API key is valid and has proper permissions. Test at: https://aistudio.google.com/apikey';
      }
    } else {
      results.recommendation = 'API key is working correctly!';
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Gemini API test completed', results ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return createErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      `Test failed: ${error.message}`
    );
  }
}
