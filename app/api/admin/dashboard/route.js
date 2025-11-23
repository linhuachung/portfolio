import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET( req ) {
  try {
    const { searchParams } = new URL( req.url );
    const period = searchParams.get( 'period' ) || 'month';

    const now = new Date();
    const startDate = new Date();

    switch ( period ) {
      case 'day':
        startDate.setDate( now.getDate() - 7 );
        break;
      case 'week':
        startDate.setDate( now.getDate() - 30 );
        break;
      case 'month':
        startDate.setMonth( now.getMonth() - 12 );
        break;
      case 'year':
        startDate.setFullYear( now.getFullYear() - 5 );
        break;
    }
    let totalProjects = 0;
    let totalSkills = 0;
    let totalExperiences = 0;
    let totalEducation = 0;
    let totalContacts = 0;
    let totalVisits = 0;
    let totalCvDownloads = 0;
    let publishedProjects = 0;

    try {
      [
        totalProjects,
        totalSkills,
        totalExperiences,
        totalEducation,
        totalContacts,
        totalVisits,
        totalCvDownloads,
        publishedProjects
      ] = await Promise.all( [
        prismadb.project?.count() || Promise.resolve( 0 ),
        prismadb.skill?.count() || Promise.resolve( 0 ),
        prismadb.experience?.count() || Promise.resolve( 0 ),
        prismadb.education?.count() || Promise.resolve( 0 ),
        prismadb.contact?.count() || Promise.resolve( 0 ),
        prismadb.visit?.count() || Promise.resolve( 0 ),
        prismadb.cvDownload?.count() || Promise.resolve( 0 ),
        prismadb.project?.count( { where: { isPublished: true } } ) || Promise.resolve( 0 )
      ] );
    } catch ( countError ) {
      console.error( 'Failed to fetch counts:', countError );
    }

    let allVisits = [];
    try {
      allVisits = await prismadb.visit.findMany( {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          createdAt: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch visits:', error );
    }

    let allCvDownloads = [];
    try {
      allCvDownloads = await prismadb.cvDownload.findMany( {
        where: {
          createdAt: {
            gte: startDate
          }
        },
        select: {
          createdAt: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch CV downloads:', error );
    }

    let visitsWithPath = [];
    try {
      visitsWithPath = await prismadb.visit.findMany( {
        where: {
          createdAt: {
            gte: startDate
          },
          path: {
            not: null
          }
        },
        select: {
          path: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch visits with path:', error );
    }

    const pathCounts = {};
    visitsWithPath.forEach( ( visit ) => {
      const path = visit.path || 'Unknown';
      pathCounts[path] = ( pathCounts[path] || 0 ) + 1;
    } );

    const visitsByPath = Object.entries( pathCounts )
      .map( ( [path, count] ) => ( {
        path,
        _count: { id: count }
      } ) )
      .sort( ( a, b ) => b._count.id - a._count.id )
      .slice( 0, 10 );

    let allContacts = [];
    try {
      allContacts = await prismadb.contact.findMany( {
        select: {
          status: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch contacts:', error );
    }

    const statusCounts = {};
    allContacts.forEach( ( contact ) => {
      statusCounts[contact.status] = ( statusCounts[contact.status] || 0 ) + 1;
    } );

    const contactsByStatus = Object.entries( statusCounts ).map( ( [status, count] ) => ( {
      status,
      _count: { id: count }
    } ) );

    let allProjects = [];
    try {
      allProjects = await prismadb.project.findMany( {
        select: {
          category: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch projects:', error );
    }

    const categoryCounts = {};
    allProjects.forEach( ( project ) => {
      categoryCounts[project.category] = ( categoryCounts[project.category] || 0 ) + 1;
    } );

    const projectsByCategory = Object.entries( categoryCounts ).map( ( [category, count] ) => ( {
      category,
      _count: { id: count }
    } ) );

    let recentContacts = [];
    try {
      recentContacts = await prismadb.contact.findMany( {
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true
        }
      } );
    } catch ( error ) {
      console.error( 'Failed to fetch recent contacts:', error );
    }

    const formatChartData = ( data, period ) => {
      const grouped = {};
      data.forEach( ( item ) => {
        const date = new Date( item.createdAt );
        let key;

        switch ( period ) {
          case 'day':
            key = date.toISOString().split( 'T' )[0];
            break;
          case 'week': {
            const week = Math.floor( ( now - date ) / ( 7 * 24 * 60 * 60 * 1000 ) );
            key = `Week ${week}`;
            break;
          }
          case 'month':
            key = `${date.getFullYear()}-${String( date.getMonth() + 1 ).padStart( 2, '0' )}`;
            break;
          case 'year':
            key = String( date.getFullYear() );
            break;
        }

        if ( !grouped[key] ) {
          grouped[key] = 0;
        }
        grouped[key] += 1;
      } );

      return Object.entries( grouped )
        .map( ( [date, count] ) => ( {
          date,
          count
        } ) )
        .sort( ( a, b ) => a.date.localeCompare( b.date ) );
    };

    const visitsChartData = formatChartData( allVisits, period );
    const cvDownloadsChartData = formatChartData( allCvDownloads, period );

    const dashboardData = {
      stats: {
        totalProjects,
        publishedProjects,
        totalSkills,
        totalExperiences,
        totalEducation,
        totalContacts,
        totalVisits,
        totalCvDownloads
      },
      charts: {
        visits: visitsChartData,
        cvDownloads: cvDownloadsChartData,
        visitsByPath: visitsByPath.map( ( item ) => ( {
          path: item.path || 'Unknown',
          count: item._count.id
        } ) ),
        contactsByStatus: contactsByStatus.map( ( item ) => ( {
          status: item.status,
          count: item._count.id
        } ) ),
        projectsByCategory: projectsByCategory.map( ( item ) => ( {
          category: item.category,
          count: item._count.id
        } ) )
      },
      recentContacts
    };

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Dashboard data retrieved', dashboardData ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}

