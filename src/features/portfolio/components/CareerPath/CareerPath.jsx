import Box from '@mui/material/Box';
import Image from 'next/image';
import NextLink from 'next/link';
import { PathCompany, PathList, PathLogo, PathStop, PathYears } from './CareerPath.styles';

const roleHref = slug => `/resume?section=experience&role=${slug}&panel=overview`;
const yearOf = month => month.slice( 0, 4 );

/** Compact employer path for the home page; each stop opens that role in the résumé. */
export default function CareerPath( { roles } ) {
  return (
    <PathList component="ol" aria-label="Career path">
      { roles.map( role => (
        <Box component="li" key={ role.slug }>
          <PathStop component={ NextLink } href={ roleHref( role.slug ) } data-current={ role.isCurrent || undefined }>
            <PathLogo component="span" data-logo>
              <Box component={ Image } src={ role.logo } alt="" width={ 36 } height={ 36 }/>
            </PathLogo>
            <PathCompany component="span">{ role.shortLabel }</PathCompany>
            <PathYears component="span">{ role.isCurrent ? `${yearOf( role.start )}–Now` : yearOf( role.start ) }</PathYears>
          </PathStop>
        </Box>
      ) ) }
    </PathList>
  );
}
