import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { sendReplyEmail } from '@/lib/resend-reply';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST - Send reply email to contact
 */
export async function POST( req, { params } ) {
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

    const { replyMessage, adminName } = body;

    if ( !replyMessage || !replyMessage.trim() ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Reply message is required' );
    }

    // Get contact details
    const contact = await prismadb.contact.findUnique( {
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        name: true,
        email: true,
        message: true
      }
    } );

    if ( !contact ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );
    }

    // Validate contact email
    if ( !contact.email || !contact.email.trim() ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Contact email is missing or invalid' );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !emailRegex.test( contact.email ) ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, `Invalid contact email format: ${contact.email}` );
    }


    // Get user (portfolio owner) info for reply email
    const user = await prismadb.user.findFirst( {
      select: {
        email: true,
        name: true
      }
    } );

    if ( !user ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    // Send reply email to the person who sent the contact form
    let emailSent = false;
    let emailError = null;

    try {
      await sendReplyEmail( {
        contactId: contact.id,
        recipientEmail: contact.email, // Email của người đã gửi contact form
        recipientName: contact.name || `${contact.firstname} ${contact.lastname}`.trim(),
        replyMessage: replyMessage.trim(),
        originalMessage: contact.message,
        adminName: user.name || adminName || 'Portfolio Admin',
        adminEmail: user.email
      } );

      emailSent = true;
    } catch ( emailErr ) {
      console.error( '❌ Failed to send reply email:', {
        error: emailErr.message,
        recipientEmail: contact.email,
        stack: emailErr.stack
      } );
      emailError = emailErr.message;
    }

    // Update contact with reply and status
    const updatedContact = await prismadb.contact.update( {
      where: { id },
      data: {
        reply: replyMessage.trim(),
        repliedAt: new Date(),
        status: 'replied'
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
        createdAt: true
      }
    } );

    return NextResponse.json(
      DataResponse(
        STATUS_CODES.SUCCESS,
        emailSent ? 'Reply sent successfully' : 'Reply saved but email failed to send',
        {
          contact: updatedContact,
          emailSent,
          ...( emailError && { emailError } )
        }
      ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    if ( error.code === 'P2025' ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Contact not found' );
    }
    return handleApiError( error, 'Send reply email' );
  }
}

