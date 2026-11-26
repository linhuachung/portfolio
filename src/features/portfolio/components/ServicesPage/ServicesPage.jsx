'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { projects, services } from '@/content/public-content';
import { createQueryHref, getAllowedValue } from '@/features/portfolio/utils/url-state';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Kicker, PageHeading, SectionTitle } from '@/features/portfolio/styles/PublicLayout.styles';
import { CapabilityList, DetailNumber, DetailPanel, SelectorLayout, ServiceButton, ServiceProjectLink, ServiceSelector, ServicesScreen } from './ServicesPage.styles';

const serviceSlugs = services.map( item => item.slug );
const compactServiceLabels = {
  frontend: 'Frontend',
  ui: 'UI',
  performance: 'Performance',
  fullstack: 'Full-stack'
};

export default function ServicesPage() {
  return <Suspense fallback={ <ServicesScreen/> }><ServicesContent/></Suspense>;
}

function ServicesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedSlug = getAllowedValue( searchParams, 'service', serviceSlugs, 'frontend' );
  const selected = services.find( item => item.slug === selectedSlug );

  const selectService = ( slug ) => {
    router.push( createQueryHref( pathname, searchParams, { service: slug } ), { scroll: false } );
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
          <Kicker component="p">Engineering focus · 01–04</Kicker>
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

        <DetailPanel component="article" id="service-panel" role="tabpanel" aria-labelledby={ `service-tab-${selected.slug}` } data-focus={ selected.number } key={ selected.slug }>
          <DetailNumber aria-hidden="true">Focus { selected.number }</DetailNumber>
          <Box>
            <Kicker component="p">{ selected.title }</Kicker>
            <SectionTitle component="h2">{ selected.description }</SectionTitle>
          </Box>
          <CapabilityList component="ul">
            { selected.capabilities.map( capability => <Box component="li" key={ capability }>{ capability }</Box> ) }
          </CapabilityList>
          <ServiceProjectLink component={ NextLink } href={ `/resume?section=experience&role=${projects.find( project => project.slug === selected.project )?.experienceSlug}&panel=projects&project=${selected.project}` }>
            { selected.projectLabel } <Typography component="span" aria-hidden="true">↗</Typography>
          </ServiceProjectLink>
        </DetailPanel>
      </SelectorLayout>
    </ServicesScreen>
  );
}
