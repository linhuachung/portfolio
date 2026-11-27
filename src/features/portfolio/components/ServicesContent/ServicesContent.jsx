'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { experiences, projects, services } from '@/content/public-content';
import { createQueryHref, getAllowedValue } from '../../utils/url-state';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Kicker, PageHeading, SectionTitle } from '../../styles/PublicLayout.styles';
import { ServicesScreen } from '../../styles/Services.styles';
import { CapabilityList, DetailCopy, DetailPanel, DiscussAction, EvidenceCard, EvidenceLink, EvidenceRole, EvidenceStack, SelectorLayout, ServiceButton, ServiceSelector, ServiceTitle } from './ServicesContent.styles';

const serviceSlugs = services.map( item => item.slug );

const compactServiceLabels = {
  frontend: 'Frontend',
  ui: 'UI & Perf.',
  fullstack: 'Full-stack'
};

// Performance was merged into UI; old links keep landing on the matching tab.
const legacyServices = { performance: 'ui' };

/** The role and project that back up a capability, all taken from the résumé data. */
function evidenceFor( service ) {
  const project = projects.find( item => item.slug === service.project );
  const role = experiences.find( item => item.slug === project.experienceSlug );
  return { project, role, href: `/resume?section=experience&role=${role.slug}&panel=projects&project=${project.slug}` };
}

export default function ServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requested = searchParams.get( 'service' );
  const selectedSlug = legacyServices[requested] || getAllowedValue( searchParams, 'service', serviceSlugs, 'frontend' );
  const selected = services.find( item => item.slug === selectedSlug );
  const { project, role, href } = evidenceFor( selected );

  const selectService = ( slug ) => {
    router.replace( createQueryHref( pathname, searchParams, { service: slug } ), { scroll: false } );
  };

  const onTabKeyDown = event => {
    const currentIndex = serviceSlugs.indexOf( selectedSlug );
    let nextIndex = null;
    if ( event.key === 'ArrowUp' || event.key === 'ArrowLeft' ) {nextIndex = ( currentIndex - 1 + services.length ) % services.length;}
    if ( event.key === 'ArrowDown' || event.key === 'ArrowRight' ) {nextIndex = ( currentIndex + 1 ) % services.length;}
    if ( event.key === 'Home' ) {nextIndex = 0;}
    if ( event.key === 'End' ) {nextIndex = services.length - 1;}
    if ( nextIndex === null ) {return;}
    event.preventDefault();
    selectService( serviceSlugs[nextIndex] );
    requestAnimationFrame( () => event.currentTarget.parentElement?.parentElement?.querySelectorAll( '[role="tab"]' )[nextIndex]?.focus() );
  };

  return (
    <ServicesScreen component="section" aria-labelledby="services-title">
      <PageHeading component="header">
        <Box>
          <Kicker component="p">Engineering focus</Kicker>
          <SectionTitle component="h1" id="services-title">How I contribute to product teams.</SectionTitle>
        </Box>
      </PageHeading>

      <SelectorLayout>
        <ServiceSelector component="ol" role="tablist" aria-label="Capabilities">
          { services.map( service => (
            <Box component="li" key={ service.slug } role="presentation">
              <ServiceButton
                id={ `service-tab-${service.slug}` }
                type="button"
                role="tab"
                aria-selected={ service.slug === selectedSlug }
                aria-label={ service.title }
                aria-controls="service-panel"
                tabIndex={ service.slug === selectedSlug ? 0 : -1 }
                onKeyDown={ onTabKeyDown }
                onClick={ () => selectService( service.slug ) }
              >
                <Typography component="span" data-service-number>{ service.number }</Typography>
                <Typography component="span" data-service-label>{ service.title }</Typography>
                <Typography component="span" data-service-compact>{ compactServiceLabels[service.slug] }</Typography>
              </ServiceButton>
            </Box>
          ) ) }
        </ServiceSelector>

        <DetailPanel component="article" id="service-panel" role="tabpanel" aria-labelledby={ `service-tab-${selected.slug}` } key={ selected.slug }>
          <DetailCopy>
            <Kicker component="p">{ selected.title }</Kicker>
            <ServiceTitle component="h2">{ selected.description }</ServiceTitle>
            <CapabilityList component="ul" aria-label={ `${selected.title} capabilities` }>
              { selected.capabilities.map( capability => <Box component="li" key={ capability }>{ capability }</Box> ) }
            </CapabilityList>
            <DiscussAction component={ NextLink } href="/contact?topic=role">
              Discuss a role
              { ' ' }
              <Box component="span" aria-hidden="true">→</Box>
            </DiscussAction>
          </DetailCopy>

          <EvidenceCard component="aside" aria-label="Where I did this">
            <Kicker component="p">Where I did this</Kicker>
            <EvidenceRole>
              <Box component="span" data-logo><Box component={ Image } src={ role.logo } alt="" width={ 40 } height={ 40 }/></Box>
              <Box>
                <Typography component="p">{ role.role }</Typography>
                <Typography component="p">
                  { role.company }
                  { ' ' }
                  ·
                  { ' ' }
                  { role.dates }
                </Typography>
              </Box>
            </EvidenceRole>
            <Typography component="p" data-project>{ project.title }</Typography>
            <EvidenceStack component="ul" aria-label={ `${project.title} technologies` }>
              { project.technologies.map( item => <Box component="li" key={ item }>{ item }</Box> ) }
            </EvidenceStack>
            <EvidenceLink component={ NextLink } href={ href }>
              See the project
              { ' ' }
              <Box component="span" aria-hidden="true">→</Box>
            </EvidenceLink>
          </EvidenceCard>
        </DetailPanel>
      </SelectorLayout>
    </ServicesScreen>
  );
}
