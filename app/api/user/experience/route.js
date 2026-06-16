import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { DataResponse } from '@/lib/data-response';
import { formatExperienceForDisplay } from '@/lib/experience-utils';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET public experiences (for user-facing pages)
export async function GET() {
  try {
    // Get first user (portfolio owner)
    const user = await prismadb.user.findFirst( {
      select: { id: true }
    } );

    if ( !user ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    const experiences = await prismadb.experience.findMany( {
      where: { userId: user.id },
      include: {
        techStack: {
          include: {
            techStack: {
              select: {
                id: true,
                name: true,
                icon: true,
                category: true
              }
            }
          }
        }
      },
      orderBy: [
        { startDate: 'desc' }
      ]
    } );

    const formattedExperiences = experiences.map( formatExperienceForDisplay );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Experiences retrieved successfully', formattedExperiences ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Get experiences' );
  }
}
