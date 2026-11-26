import STATUS_CODES from '@/shared/constants/status';
import { handleApiError } from '@/server/http';
import { verifyAuth } from '@/features/auth/server';
import { DataResponse } from '@/server/http';
import { handleFileUpload, UPLOAD_TYPES } from '@/features/uploads/server';
import { NextResponse } from 'next/server';

export async function POST( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const result = await handleFileUpload( req, UPLOAD_TYPES.CV );

    if ( result.error ) {
      return result.error;
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, result.successMessage, result.data ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'CV upload' );
  }
}

