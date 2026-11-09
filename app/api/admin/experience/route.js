import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { formatExperienceForDisplay, prepareExperienceForDB } from '@/lib/experience-utils';
import { buildExperienceTechStacks, ensureTechStacksExist } from '@/lib/tech-stack-utils';
import prismadb from '@/lib/prisma';
import { validationExperienceSchema } from '@/services/schema';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

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

export async function POST( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const body = await req.json();

    await validationExperienceSchema.validate( body, { abortEarly: false } );

    const user = await prismadb.user.findFirst( {
      select: { id: true }
    } );

    if ( !user ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    const { techStackNames = [], ...experienceData } = prepareExperienceForDB( body, user.id, body.techStack || [] );

    const experience = await prismadb.experience.create( {
      data: {
        ...experienceData,
        techStack: undefined
      }
    } );

    if ( techStackNames.length > 0 ) {
      const techStackMap = await ensureTechStacksExist( techStackNames );
      const experienceTechStacks = buildExperienceTechStacks( techStackNames, techStackMap, experience.id );

      if ( experienceTechStacks.length > 0 ) {
        await prismadb.experienceTechStack.createMany( {
          data: experienceTechStacks
        } );
      }
    }

    const createdExperience = await prismadb.experience.findUnique( {
      where: { id: experience.id },
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
      }
    } );

    const formattedExperience = formatExperienceForDisplay( createdExperience );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Experience created successfully', formattedExperience ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    if ( error.name === 'ValidationError' ) {
      const errors = error.inner?.map( ( err ) => ( {
        field: err.path,
        message: err.message
      } ) ) || [];
      return NextResponse.json(
        DataResponse( STATUS_CODES.BAD_REQUEST, 'Validation failed', null, errors ),
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }
    return handleApiError( error, 'Create experience' );
  }
}

