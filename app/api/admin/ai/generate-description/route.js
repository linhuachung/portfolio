import { EXPERIENCE_DESCRIPTION_PROMPT } from '@/constants/ai-prompts';
import STATUS_CODES from '@/constants/status';
import { createErrorResponse } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { generateContent } from '@/lib/gemini-client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const generateDescriptionSchema = z.object( {
  company: z.string().min( 1, 'Company name is required' ),
  position: z.string().min( 1, 'Position is required' ),
  location: z.string().optional(),
  techStack: z.array( z.string() ).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional()
} );

export async function POST( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const body = await req.json();
    const validatedData = generateDescriptionSchema.parse( body );

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if ( !geminiApiKey ) {
      return createErrorResponse(
        STATUS_CODES.SERVER_ERROR,
        'Google Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.'
      );
    }

    // Build context data
    const dateRange = validatedData.isCurrent
      ? validatedData.startDate
        ? `Started in ${new Date( validatedData.startDate ).toLocaleDateString( 'en-US', { month: 'long', year: 'numeric' } )} and currently working.`
        : 'Currently working.'
      : validatedData.startDate && validatedData.endDate
        ? `Worked from ${new Date( validatedData.startDate ).toLocaleDateString( 'en-US', { month: 'long', year: 'numeric' } )} to ${new Date( validatedData.endDate ).toLocaleDateString( 'en-US', { month: 'long', year: 'numeric' } )}.`
        : null;

    const prompt = EXPERIENCE_DESCRIPTION_PROMPT.buildPrompt( {
      company: validatedData.company,
      position: validatedData.position,
      location: validatedData.location || null,
      dateRange: dateRange,
      techStack: validatedData.techStack || []
    } );

    // Generate description
    const generatedDescription = await generateContent( geminiApiKey, prompt );

    if ( !generatedDescription ) {
      throw new Error( 'Failed to generate description' );
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Description generated successfully', {
        description: generatedDescription
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    if ( error.name === 'ZodError' ) {
      const validationErrors = error.errors.map( ( err ) => ( {
        field: err.path.join( '.' ),
        message: err.message
      } ) );
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Validation failed', null, validationErrors ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    return createErrorResponse(
      STATUS_CODES.SERVER_ERROR,
      error.message || 'Failed to generate description'
    );
  }
}
