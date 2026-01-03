/* eslint-disable no-console */
import { ContactStatus, PrismaClient, ProjectCategory, SkillCategory, SkillLevel, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';
import { SEED_CONSTANTS } from './seed-constants.js';

const prisma = new PrismaClient();

// Helper function to generate dates for last N days
function generateDates( days ) {
  const dates = [];
  const now = new Date();
  for ( let i = 0; i < days; i++ ) {
    const date = new Date( now );
    date.setDate( date.getDate() - i );
    dates.push( date );
  }
  return dates;
}

async function main() {
  console.log( '🌱 Starting seed...' );

  // Create Admin User
  const adminExists = await prisma.admin.findFirst( {
    where: { username: SEED_CONSTANTS.ADMIN.USERNAME }
  } );

  if ( !adminExists ) {
    const hashedPassword = await bcrypt.hash( SEED_CONSTANTS.ADMIN.PASSWORD, 10 );

    await prisma.admin.create( {
      data: {
        username: SEED_CONSTANTS.ADMIN.USERNAME,
        password: hashedPassword,
        email: SEED_CONSTANTS.ADMIN.EMAIL,
        role: UserRole.admin,
        isActive: true
      }
    } );
    console.log( '✅ Admin user created!' );
    console.log( `   Username: ${SEED_CONSTANTS.ADMIN.USERNAME}` );
    console.log( `   Password: ${SEED_CONSTANTS.ADMIN.PASSWORD}` );
  } else {
    console.log( 'ℹ️  Admin user already exists.' );
  }

  // Get or create default User (Portfolio Owner)
  // User data should be managed through admin panel, not seed script
  let user = await prisma.user.findFirst();

  if ( !user ) {
    // Only create minimal user if doesn't exist (for development/testing)
    user = await prisma.user.create( {
      data: {
        email: 'user@example.com',
        name: 'Portfolio Owner',
        role: UserRole.user
      }
    } );
    console.log( '✅ Default user created. Please update user data through admin panel.' );
  } else {
    console.log( 'ℹ️  User already exists. User data is managed through admin panel.' );
  }

  // Create Tech Stacks
  const techStacks = [
    'ReactJS', 'NextJS', 'JavaScript', 'TypeScript', 'NodeJS', 'ExpressJS',
    'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'MongoDB', 'Prisma'
  ];

  const createdTechStacks = {};
  for ( const techName of techStacks ) {
    const existing = await prisma.techStack.findUnique( { where: { name: techName } } );
    if ( !existing ) {
      const tech = await prisma.techStack.create( {
        data: { name: techName }
      } );
      createdTechStacks[techName] = tech.id;
    } else {
      createdTechStacks[techName] = existing.id;
    }
  }
  console.log( '✅ Tech stacks created!' );

  // Create Skills
  const skillsData = [
    { name: 'HTML5', category: SkillCategory.frontend },
    { name: 'CSS3', category: SkillCategory.frontend },
    { name: 'JavaScript', category: SkillCategory.frontend },
    { name: 'ReactJS', category: SkillCategory.frontend },
    { name: 'NextJS', category: SkillCategory.frontend },
    { name: 'Redux', category: SkillCategory.frontend },
    { name: 'Tailwind CSS', category: SkillCategory.frontend },
    { name: 'NodeJS', category: SkillCategory.backend },
    { name: 'ExpressJS', category: SkillCategory.backend },
    { name: 'MongoDB', category: SkillCategory.database },
    { name: 'Prisma', category: SkillCategory.database }
  ];

  const createdSkills = {};
  for ( const skillData of skillsData ) {
    const existing = await prisma.skill.findUnique( { where: { name: skillData.name } } );
    if ( !existing ) {
      const skill = await prisma.skill.create( { data: skillData } );
      createdSkills[skillData.name] = skill.id;
    } else {
      createdSkills[skillData.name] = existing.id;
    }
  }
  console.log( '✅ Skills created!' );

  // Create User Skills
  const userSkillsCount = await prisma.userSkill.count( { where: { userId: user.id } } );
  if ( userSkillsCount === 0 ) {
    const userSkillsData = [
      { skillId: createdSkills['ReactJS'], level: SkillLevel.expert, years: 3 },
      { skillId: createdSkills['NextJS'], level: SkillLevel.advanced, years: 2 },
      { skillId: createdSkills['JavaScript'], level: SkillLevel.expert, years: 3 },
      { skillId: createdSkills['TypeScript'], level: SkillLevel.advanced, years: 2 },
      { skillId: createdSkills['NodeJS'], level: SkillLevel.intermediate, years: 2 },
      { skillId: createdSkills['Redux'], level: SkillLevel.advanced, years: 2 },
      { skillId: createdSkills['Tailwind CSS'], level: SkillLevel.expert, years: 3 }
    ].filter( item => item.skillId );

    await prisma.userSkill.createMany( {
      data: userSkillsData.map( item => ( {
        userId: user.id,
        skillId: item.skillId,
        level: item.level,
        years: item.years
      } ) )
    } );
    console.log( '✅ User skills created!' );
  }

  // Create Projects
  const projectsCount = await prisma.project.count( { where: { userId: user.id } } );
  if ( projectsCount === 0 ) {
    const projectsData = [
      {
        title: 'NAB Innovation Centre Vietnam',
        description: 'An internal onboarding platform developed for NAB Group',
        category: ProjectCategory.frontend,
        image: '/assets/work/nabvietnam.jpg',
        isPublished: true,
        order: 0,
        techStackNames: ['ReactJS', 'JavaScript', 'NodeJS']
      },
      {
        title: 'Mercatus',
        description: 'An e-commerce platform for US and Canadian customers',
        category: ProjectCategory.frontend,
        image: '/assets/work/mercatus.png',
        link: 'https://shop.mercatus.com/',
        isPublished: true,
        order: 1,
        techStackNames: ['NextJS', 'ReactJS']
      },
      {
        title: 'DroneX',
        description: 'A comprehensive project for monitoring legal flight zones for drones',
        category: ProjectCategory.fullstack,
        image: '/assets/work/droneX.png',
        isPublished: true,
        order: 2,
        techStackNames: ['ReactJS', 'NodeJS']
      },
      {
        title: 'Bintech',
        description: 'A green environmental project in the Japanese market',
        category: ProjectCategory.fullstack,
        image: '/assets/work/bintech.avif',
        isPublished: true,
        order: 3,
        techStackNames: ['ReactJS', 'NodeJS', 'ExpressJS']
      },
      {
        title: 'Shinhan Bank',
        description: 'Internal application for customer information management',
        category: ProjectCategory.frontend,
        image: '/assets/work/shinhanbank.jpg',
        isPublished: true,
        order: 4,
        techStackNames: ['JavaScript', 'HTML5', 'CSS3']
      }
    ];

    for ( const projectData of projectsData ) {
      const { techStackNames, ...projectInfo } = projectData;
      const project = await prisma.project.create( {
        data: {
          ...projectInfo,
          userId: user.id
        }
      } );

      // Add tech stacks
      for ( const techName of techStackNames ) {
        const techId = createdTechStacks[techName];
        if ( techId ) {
          await prisma.projectTechStack.create( {
            data: {
              projectId: project.id,
              techStackId: techId
            }
          } );
        }
      }

      // Add tags
      await prisma.projectTag.createMany( {
        data: [
          { projectId: project.id, name: 'Web Development' },
          { projectId: project.id, name: 'Frontend' }
        ]
      } );
    }
    console.log( '✅ Projects created!' );
  }

  // Create Experiences
  const experiencesCount = await prisma.experience.count( { where: { userId: user.id } } );
  if ( experiencesCount === 0 ) {
    const experiencesData = [
      {
        company: 'NAB Innovation Centre Vietnam',
        position: 'Software Engineer',
        description: 'Develop and maintain user interfaces using ReactJS with clean, reusable components.',
        startDate: new Date( '2025-03-01' ),
        isCurrent: true,
        location: 'Ho Chi Minh City, Vietnam',
        companyLogo: '/assets/resume/companyIcons/nabvietnam.jpg',
        companyWebsite: 'https://www.linkedin.com/company/nabvietnam/',
        order: 0,
        techStackNames: ['ReactJS', 'JavaScript', 'TypeScript']
      },
      {
        company: 'Mercatus Technologies',
        position: 'Frontend Developer',
        description: 'Key contributor, lead new member. Develop web application user interfaces.',
        startDate: new Date( '2024-03-01' ),
        endDate: new Date( '2025-03-01' ),
        isCurrent: false,
        location: 'Ho Chi Minh City, Vietnam',
        companyLogo: '/assets/resume/companyIcons/mercatus.jpg',
        order: 1,
        techStackNames: ['NextJS', 'ReactJS', 'JavaScript']
      },
      {
        company: 'BAP IT Co., JSC',
        position: 'Fullstack Developer',
        description: 'Develop both Frontend and Backend for web applications.',
        startDate: new Date( '2022-02-01' ),
        endDate: new Date( '2024-02-01' ),
        isCurrent: false,
        location: 'Ho Chi Minh City, Vietnam',
        companyLogo: '/assets/resume/companyIcons/bap_it.jpg',
        order: 2,
        techStackNames: ['ReactJS', 'NodeJS', 'ExpressJS']
      }
    ];

    for ( const expData of experiencesData ) {
      const { techStackNames, ...expInfo } = expData;
      const experience = await prisma.experience.create( {
        data: {
          ...expInfo,
          userId: user.id
        }
      } );

      // Add tech stacks
      for ( const techName of techStackNames ) {
        const techId = createdTechStacks[techName];
        if ( techId ) {
          await prisma.experienceTechStack.create( {
            data: {
              experienceId: experience.id,
              techStackId: techId
            }
          } );
        }
      }
    }
    console.log( '✅ Experiences created!' );
  }

  // Create Education
  const educationCount = await prisma.education.count( { where: { userId: user.id } } );
  if ( educationCount === 0 ) {
    const educationsData = [
      {
        school: 'Ho Chi Minh City Open University',
        field: 'Computer Science',
        startDate: new Date( '2016-09-01' ),
        endDate: new Date( '2022-06-01' ),
        isCurrent: false,
        grade: 'Good',
        order: 0,
        certificates: [
          {
            name: 'Computer Science',
            file: '/assets/files/BangDaiHọc_LinHuaChung.pdf',
            order: 0,
            degrees: []
          }
        ]
      },
      {
        school: 'Cybersoft Academy',
        field: 'Fullstack Development',
        startDate: new Date( '2020-01-01' ),
        endDate: new Date( '2021-12-01' ),
        isCurrent: false,
        order: 1,
        certificates: [
          {
            name: 'Professional Frontend Developer',
            file: '/assets/files/LinHuaChung_Frontend.pdf',
            order: 0,
            degrees: []
          },
          {
            name: 'Professional NodeJS Developer',
            file: '/assets/files/LinHuaChung_Backend.pdf',
            order: 1,
            degrees: []
          }
        ]
      }
    ];

    for ( const eduData of educationsData ) {
      const { certificates, ...eduInfo } = eduData;
      const education = await prisma.education.create( {
        data: {
          ...eduInfo,
          userId: user.id
        }
      } );

      for ( const certData of certificates ) {
        const { degrees, ...certInfo } = certData;
        const certificate = await prisma.certificate.create( {
          data: {
            ...certInfo,
            educationId: education.id
          }
        } );

        for ( const degreeData of degrees ) {
          await prisma.degree.create( {
            data: {
              ...degreeData,
              certificateId: certificate.id
            }
          } );
        }
      }
    }
    console.log( '✅ Education created!' );
  }

  // Create Contacts (Sample)
  const contactsCount = await prisma.contact.count( { where: { userId: user.id } } );
  if ( contactsCount === 0 ) {
    const contactsData = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        message: 'I\'m interested in your frontend development services. Can we schedule a call?',
        status: ContactStatus.pending
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        message: 'Great portfolio! Would love to discuss a potential project.',
        status: ContactStatus.read
      },
      {
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        message: 'Your ReactJS skills are impressive. Looking for a developer for our startup.',
        status: ContactStatus.replied,
        reply: 'Thank you for your interest! I\'ll get back to you soon.',
        repliedAt: new Date()
      },
      {
        name: 'Sarah Williams',
        email: 'sarah.w@example.com',
        message: 'Interested in hiring you for a NextJS project.',
        status: ContactStatus.pending
      },
      {
        name: 'David Brown',
        email: 'david.brown@example.com',
        message: 'Can you help with a fullstack project?',
        status: ContactStatus.read
      }
    ];

    // Create contacts with different dates
    const now = new Date();
    for ( let i = 0; i < contactsData.length; i++ ) {
      const contactDate = new Date( now );
      contactDate.setDate( contactDate.getDate() - ( contactsData.length - i ) );

      await prisma.contact.create( {
        data: {
          ...contactsData[i],
          userId: user.id,
          createdAt: contactDate
        }
      } );
    }
    console.log( '✅ Contacts created!' );
  }

  // Create Visits (Analytics Data)
  const visitsCount = await prisma.visit.count();
  if ( visitsCount === 0 ) {
    const paths = ['/', '/resume', '/work', '/contact', '/services'];
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    ];

    // Generate visits for last 90 days
    const dates = generateDates( 90 );
    const visits = [];

    for ( let i = 0; i < 200; i++ ) {
      const randomDate = dates[Math.floor( Math.random() * dates.length )];
      const randomPath = paths[Math.floor( Math.random() * paths.length )];
      const randomUA = userAgents[Math.floor( Math.random() * userAgents.length )];

      visits.push( {
        userId: user.id,
        path: randomPath,
        userAgent: randomUA,
        ip: `192.168.1.${Math.floor( Math.random() * 255 )}`,
        createdAt: randomDate
      } );
    }

    // Batch create visits (MongoDB limit)
    const batchSize = 100;
    for ( let i = 0; i < visits.length; i += batchSize ) {
      await prisma.visit.createMany( {
        data: visits.slice( i, i + batchSize )
      } );
    }
    console.log( `✅ ${visits.length} visits created!` );
  }

  // Create CV Downloads (Analytics Data)
  const cvDownloadsCount = await prisma.cvDownload.count();
  if ( cvDownloadsCount === 0 ) {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    ];

    // Generate CV downloads for last 60 days
    const dates = generateDates( 60 );
    const downloads = [];

    for ( let i = 0; i < 45; i++ ) {
      const randomDate = dates[Math.floor( Math.random() * dates.length )];
      const randomUA = userAgents[Math.floor( Math.random() * userAgents.length )];

      downloads.push( {
        userId: user.id,
        userAgent: randomUA,
        ip: `192.168.1.${Math.floor( Math.random() * 255 )}`,
        createdAt: randomDate
      } );
    }

    await prisma.cvDownload.createMany( {
      data: downloads
    } );
    console.log( `✅ ${downloads.length} CV downloads created!` );
  }

  console.log( '✨ Seed completed!' );
  console.log( '\n📊 Dashboard Data Summary:' );
  console.log( `   - Projects: ${await prisma.project.count()}` );
  console.log( `   - Skills: ${await prisma.skill.count()}` );
  console.log( `   - Experiences: ${await prisma.experience.count()}` );
  console.log( `   - Education: ${await prisma.education.count()}` );
  console.log( `   - Contacts: ${await prisma.contact.count()}` );
  console.log( `   - Visits: ${await prisma.visit.count()}` );
  console.log( `   - CV Downloads: ${await prisma.cvDownload.count()}` );
}

main()
  .catch( ( e ) => {
    console.error( '❌ Seed error:', e );
    process.exit( 1 );
  } )
  .finally( async () => {
    await prisma.$disconnect();
  } );