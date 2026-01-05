import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET - Get contact detail by ID
 */
export async function GET( req, { params } ) {
  try {
    // Await params for Next.js 15 compatibility
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID is required' );
    }

    const contact = await prismadb.contact.findUnique( {
      where: {
        id
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        name: true,
        email: true,
        phone: true,
        service: true,
        message: true,
        status: true,
        reply: true,
        repliedAt: true,
        emailOpenedAt: true,
        createdAt: true,
        replies: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            message: true,
            emailSent: true,
            sentAt: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    } );

    if ( !contact ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Contact retrieved successfully', contact ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Get contact detail' );
  }
}

/**
 * PUT - Update contact status
 */
export async function PUT( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID is required' );
    }

    const body = await req.json();

    if ( !body || typeof body !== 'object' ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Invalid request body' );
    }

    // Validate status if provided
    const validStatuses = ['pending', 'read', 'replied', 'archived'];
    if ( body.status && !validStatuses.includes( body.status ) ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, `Invalid status. Must be one of: ${validStatuses.join( ', ' )}` );
    }

    // Prepare update data
    const updateData = {};

    if ( body.status ) {
      updateData.status = body.status;
    }

    if ( body.reply !== undefined ) {
      updateData.reply = body.reply || null;
      // Set repliedAt if reply is provided and status is not explicitly set
      if ( body.reply && !body.status ) {
        updateData.status = 'replied';
      }
      if ( body.reply ) {
        updateData.repliedAt = new Date();
      } else {
        updateData.repliedAt = null;
      }
    }

    // Update contact
    const updatedContact = await prismadb.contact.update( {
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        name: true,
        email: true,
        phone: true,
        service: true,
        message: true,
        status: true,
        reply: true,
        repliedAt: true,
        emailOpenedAt: true,
        createdAt: true
      }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Contact updated successfully', updatedContact ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    if ( error.code === 'P2025' ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );
    }
    return handleApiError( error, 'Update contact' );
  }
}

