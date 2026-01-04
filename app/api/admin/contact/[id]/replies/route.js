import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { sendReplyEmail } from '@/lib/resend-reply';
import { NextResponse } from 'next/server';

/**
 * GET - Get all replies for a contact
 */
export async function GET( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID is required', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const replies = await prismadb.contactReply.findMany( {
      where: { contactId: id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        message: true,
        emailSent: true,
        sentAt: true,
        createdAt: true,
        updatedAt: true
      }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Replies retrieved successfully', replies ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    console.error( 'Error fetching replies:', error );
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Internal server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}

/**
 * POST - Create a new reply
 */
export async function POST( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID is required', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const body = await req.json();

    if ( !body || typeof body !== 'object' ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Invalid request body', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    const { message, sendEmail = true } = body;

    if ( !message || !message.trim() ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Reply message is required', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
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
      return NextResponse.json(
        DataResponse( STATUS_CODES.NOT_FOUND, 'Contact not found', null ),
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    // Validate contact email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !contact.email || !emailRegex.test( contact.email ) ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Invalid contact email', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Get user (portfolio owner) info for reply email
    const user = await prismadb.user.findFirst( {
      select: {
        email: true,
        name: true
      }
    } );

    if ( !user ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.NOT_FOUND, 'User not found', null ),
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    // Create reply
    const reply = await prismadb.contactReply.create( {
      data: {
        contactId: id,
        message: message.trim(),
        emailSent: false,
        sentAt: null
      },
      select: {
        id: true,
        message: true,
        emailSent: true,
        sentAt: true,
        createdAt: true,
        updatedAt: true
      }
    } );

    // Get previous replies (excluding current one) for email history
    // Get all previous replies, not just those sent via email
    const previousReplies = await prismadb.contactReply.findMany( {
      where: {
        contactId: id,
        id: { not: reply.id }
      },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        message: true,
        createdAt: true
      }
    } );


    // Send email if requested
    let emailSent = false;
    let emailError = null;

    if ( sendEmail ) {
      try {
        await sendReplyEmail( {
          contactId: contact.id,
          replyId: reply.id,
          recipientEmail: contact.email,
          recipientName: contact.name || `${contact.firstname} ${contact.lastname}`.trim(),
          replyMessage: message.trim(),
          originalMessage: contact.message,
          previousReplies: previousReplies || [],
          adminName: user.name || 'Portfolio Admin',
          adminEmail: user.email
        } );

        // Update reply with email sent status
        await prismadb.contactReply.update( {
          where: { id: reply.id },
          data: {
            emailSent: true,
            sentAt: new Date()
          }
        } );

        emailSent = true;
      } catch ( emailErr ) {
        console.error( 'Failed to send reply email:', emailErr );
        emailError = emailErr.message;
      }
    }

    // Update contact status to replied
    await prismadb.contact.update( {
      where: { id },
      data: {
        status: 'replied'
      }
    } );

    // Get updated reply
    const updatedReply = await prismadb.contactReply.findUnique( {
      where: { id: reply.id },
      select: {
        id: true,
        message: true,
        emailSent: true,
        sentAt: true,
        createdAt: true,
        updatedAt: true
      }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Reply created successfully', {
        reply: updatedReply,
        emailSent,
        emailError: emailError || null
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    console.error( 'Error creating reply:', error );
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Internal server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}