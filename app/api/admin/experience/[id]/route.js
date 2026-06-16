import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import { formatExperienceForDisplay, prepareExperienceForDB } from '@/lib/experience-utils';
import prismadb from '@/lib/prisma';
import { buildExperienceTechStacks, ensureTechStacksExist } from '@/lib/tech-stack-utils';
import { validationExperienceSchema } from '@/services/schema';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET( req, { params } ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Experience ID is required' );
    }

    const experience = await prismadb.experience.findUnique( {
      where: { id },
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

    if ( !experience ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Experience not found' );
    }

    const formattedExperience = formatExperienceForDisplay( experience );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Experience retrieved successfully', formattedExperience ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Get experience' );
  }
}

export async function PUT( req, { params } ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Experience ID is required' );
    }

    const existingExperience = await prismadb.experience.findUnique( {
      where: { id }
    } );

    if ( !existingExperience ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Experience not found' );
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

    await prismadb.experience.update( {
      where: { id },
      data: {
        ...experienceData,
        techStack: undefined
      }
    } );

    await prismadb.experienceTechStack.deleteMany( {
      where: { experienceId: id }
    } );

    if ( techStackNames.length > 0 ) {
      const techStackMap = await ensureTechStacksExist( techStackNames );
      const experienceTechStacks = buildExperienceTechStacks( techStackNames, techStackMap, id );

      if ( experienceTechStacks.length > 0 ) {
        await prismadb.experienceTechStack.createMany( {
          data: experienceTechStacks
        } );
      }
    }

    const updatedExperience = await prismadb.experience.findUnique( {
      where: { id },
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

    const formattedExperience = formatExperienceForDisplay( updatedExperience );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Experience updated successfully', formattedExperience ),
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
    return handleApiError( error, 'Update experience' );
  }
}

export async function DELETE( req, { params } ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return createErrorResponse( STATUS_CODES.BAD_REQUEST, 'Experience ID is required' );
    }

    const existingExperience = await prismadb.experience.findUnique( {
      where: { id }
    } );

    if ( !existingExperience ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'Experience not found' );
    }

    await prismadb.experience.delete( {
      where: { id }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Experience deleted successfully', null ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Delete experience' );
  }
}

