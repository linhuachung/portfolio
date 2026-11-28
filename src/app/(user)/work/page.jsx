import { projects } from '@/content/public-content';
import { redirect } from 'next/navigation';

export default async function WorkRedirect( { searchParams } ) {
  const params = await searchParams;
  const requestedProject = projects.find( project => project.slug === params?.project ) || projects[0];
  const target = new URLSearchParams( {
    section: 'experience',
    role: requestedProject.experienceSlug,
    panel: 'projects',
    project: requestedProject.slug
  } );

  redirect( `/resume?${target.toString()}` );
}
