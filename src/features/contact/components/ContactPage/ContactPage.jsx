import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormContainer from '../ContactForm';
import ResumeLink from '@/features/portfolio/components/ResumeLink';
import { profile } from '@/content/public-content';
import MuiLink from '@mui/material/Link';
import { BodyCopy, DisplayTitle, Kicker } from '@/features/portfolio/styles/PublicLayout.styles';
import { ContactDetails, ContactIntro, ContactScreen } from './ContactPage.styles';

export default function ContactPage() {
  return (
    <ContactScreen component="section" aria-labelledby="contact-title">
      <ContactIntro component="header">
        <Kicker component="p">Contact · Start with context</Kicker>
        <DisplayTitle component="h1" id="contact-title">Tell me what needs to become clearer.</DisplayTitle>
        <BodyCopy component="p">Share the workflow, team context, and where frontend engineering support would help.</BodyCopy>
        <ContactDetails component="dl">
          <Box><Typography component="dt">Email</Typography><Typography component="dd"><MuiLink href={ `mailto:${profile.email}` }>{ profile.email }</MuiLink></Typography></Box>
          <Box><Typography component="dt">Location</Typography><Typography component="dd">{ profile.location } · { profile.timezone }</Typography></Box>
          <Box><Typography component="dt">Record</Typography><Typography component="dd"><ResumeLink>Résumé ↗</ResumeLink> · <MuiLink href={ profile.linkedin } target="_blank" rel="noreferrer">LinkedIn ↗</MuiLink></Typography></Box>
        </ContactDetails>
      </ContactIntro>
      <FormContainer/>
    </ContactScreen>
  );
}
