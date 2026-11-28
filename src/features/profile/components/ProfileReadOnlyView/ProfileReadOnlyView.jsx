import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SectionHeading } from '@/features/admin-shell/styles/Admin.styles';
import { SOCIAL_LINK_OPTIONS } from '../../constants/profile-form';
import {
  ProfileFact,
  ProfileFacts,
  ProfileFormGrid,
  ProfileIdentity,
  ProfileReadOnlyRoot,
  ProfileSection,
  ProfileStack
} from '../../styles/Profile.styles';

const fallback = 'Not provided';

function textValue( value ) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function plainText( value ) {
  if ( typeof value !== 'string' || !value.trim() ) {return fallback;}
  return value
    .replace( /<br\s*\/?\s*>/gi, ' ' )
    .replace( /<[^>]*>/g, ' ' )
    .replace( /&nbsp;/gi, ' ' )
    .replace( /&amp;/gi, '&' )
    .replace( /&quot;/gi, '"' )
    .replace( /&#39;|&apos;/gi, '\'' )
    .replace( /\s+/g, ' ' )
    .trim() || fallback;
}

function FactList( { label, items } ) {
  return (
    <ProfileFacts component="dl" aria-label={ label }>
      { items.map( item => (
        <ProfileFact key={ item.label }>
          <Typography component="dt">{ item.label }</Typography>
          <Typography component="dd">{ item.value }</Typography>
        </ProfileFact>
      ) ) }
    </ProfileFacts>
  );
}

export default function ProfileReadOnlyView( { profile } ) {
  const socialLinks = Array.isArray( profile?.socialLinks )
    ? profile.socialLinks.filter( link => typeof link?.url === 'string' && link.url.trim() )
    : [];
  const location = [profile?.addressCity, profile?.addressCountry].filter( value => typeof value === 'string' && value.trim() ).join( ', ' );
  const socialFacts = socialLinks.length
    ? socialLinks.map( link => ( {
      label: SOCIAL_LINK_OPTIONS.find( option => option.value === link?.type )?.label || textValue( link?.type ),
      value: textValue( link?.url )
    } ) )
    : [{ label: 'Links', value: fallback }];

  return (
    <ProfileReadOnlyRoot data-testid="profile-read-view">
      <ProfileFormGrid>
        <ProfileSection>
          <SectionHeading component="h2">Basic Information</SectionHeading>
          <ProfileIdentity>
            <Avatar
              data-testid="profile-photo"
              alt={ profile?.name ? `${profile.name} profile photo` : 'Profile photo' }
              src={ profile?.avatar || undefined }
              sx={ { width: 88, height: 88, bgcolor: 'action.hover', color: 'text.secondary', '& .MuiAvatar-img': { objectFit: 'cover' }, '& .MuiSvgIcon-root': { fontSize: '2.6rem' } } }
            />
            <Box sx={ { minWidth: 0, display: 'grid', gap: .5 } }>
              <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' } }>Profile Photo</Typography>
              <Typography component="p" sx={ { fontSize: '1.15rem', fontWeight: 700, overflowWrap: 'anywhere' } }>{ textValue( profile?.name ) }</Typography>
              <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.82rem' } }>{ textValue( profile?.title ) }</Typography>
            </Box>
          </ProfileIdentity>
          <FactList
            label="Basic profile information"
            items={ [
              { label: 'Email', value: textValue( profile?.email ) },
              { label: 'Phone', value: textValue( profile?.phone ) },
              { label: 'Location', value: textValue( location ) },
              { label: 'Address', value: textValue( profile?.address ) },
              { label: 'Bio', value: textValue( profile?.bio ) }
            ] }
          />
        </ProfileSection>

        <ProfileStack>
          <ProfileSection>
            <SectionHeading component="h2">Database Profile Copy</SectionHeading>
            <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.76rem', lineHeight: 1.45 } }>Read-only preview of the compatibility content stored in MongoDB.</Typography>
            <FactList
              label="Database profile copy"
              items={ [
                { label: 'Greeting', value: textValue( profile?.greeting ) },
                { label: 'Title', value: textValue( profile?.title ) },
                { label: 'Biography', value: plainText( profile?.bioParagraph ) },
                { label: 'CV file', value: textValue( profile?.cvPath ) }
              ] }
            />
          </ProfileSection>

          <ProfileSection>
            <SectionHeading component="h2">Social Links</SectionHeading>
            <FactList label="Social links" items={ socialFacts } />
          </ProfileSection>
        </ProfileStack>
      </ProfileFormGrid>
    </ProfileReadOnlyRoot>
  );
}
