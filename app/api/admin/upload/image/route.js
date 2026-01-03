import STATUS_CODES from '@/constants/status';
import { handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { handleFileUpload, UPLOAD_TYPES } from '@/lib/upload-handler';
import { NextResponse } from 'next/server';

export async function POST( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const result = await handleFileUpload( req, UPLOAD_TYPES.IMAGE );

    if ( result.error ) {
      return result.error;
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, result.successMessage, result.data ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Image upload' );
  }
}

