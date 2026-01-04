import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { sendReplyEmail } from '@/lib/resend-reply';

/**
 * PUT - Update a reply
 */
export async function PUT( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id, replyId } = resolvedParams;

    if ( !id || !replyId ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID and Reply ID are required', null ),
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

    const { message, sendEmail = false } = body;

    if ( !message || !message.trim() ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Reply message is required', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Check if reply exists
    const existingReply = await prismadb.contactReply.findUnique( {
      where: { id: replyId },
      select: {
        id: true,
        contactId: true
      }
    } );

    if ( !existingReply || existingReply.contactId !== id ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.NOT_FOUND, 'Reply not found', null ),
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    // Get contact details for email
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

    // Update reply
    await prismadb.contactReply.update( {
      where: { id: replyId },
      data: {
        message: message.trim()
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
        id: { not: replyId }
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if ( contact.email && emailRegex.test( contact.email ) ) {
        const user = await prismadb.user.findFirst( {
          select: {
            email: true,
            name: true
          }
        } );

        if ( user ) {
          try {
            await sendReplyEmail( {
              contactId: contact.id,
              replyId: replyId,
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
              where: { id: replyId },
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
      }
    }

    // Get final updated reply
    const finalReply = await prismadb.contactReply.findUnique( {
      where: { id: replyId },
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
      DataResponse( STATUS_CODES.SUCCESS, 'Reply updated successfully', {
        reply: finalReply,
        emailSent,
        emailError: emailError || null
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    console.error( 'Error updating reply:', error );
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Internal server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}

/**
 * DELETE - Delete a reply
 */
export async function DELETE( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id, replyId } = resolvedParams;

    if ( !id || !replyId ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Contact ID and Reply ID are required', null ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // Check if reply exists
    const existingReply = await prismadb.contactReply.findUnique( {
      where: { id: replyId },
      select: {
        id: true,
        contactId: true
      }
    } );

    if ( !existingReply || existingReply.contactId !== id ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.NOT_FOUND, 'Reply not found', null ),
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    // Delete reply
    await prismadb.contactReply.delete( {
      where: { id: replyId }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Reply deleted successfully', null ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    console.error( 'Error deleting reply:', error );
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Internal server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}

