import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormContainer from '../ContactForm';
import ResumeLink from '@/features/portfolio/components/ResumeLink';
import { profile } from '@/content/public-content';
import MuiLink from '@mui/material/Link';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SocialLinks from '@/features/portfolio/components/SocialLinks';
import { BodyCopy, DisplayTitle, Kicker } from '@/features/portfolio/styles/PublicLayout.styles';
import { ContactDetails, ContactIntro, ContactScreen } from './ContactPage.styles';

export default function ContactPage() {
  return (
    <ContactScreen component="section" aria-labelledby="contact-title">
      <ContactIntro component="header">
        <Kicker component="p">Contact · Start with context</Kicker>
        <DisplayTitle component="h1" id="contact-title">Tell me what needs to become clearer.</DisplayTitle>
        <BodyCopy component="p">Hiring for a frontend role, or scoping product work? Send a short note or email me directly.</BodyCopy>
        <ContactDetails component="dl">
          <Box>
            <Typography component="dt">Email</Typography>
            <Typography component="dd">
              <EmailOutlinedIcon aria-hidden="true" fontSize="inherit"/>
              <MuiLink href={ `mailto:${profile.email}` }>{ profile.email }</MuiLink>
            </Typography>
          </Box>
          <Box>
            <Typography component="dt">Location</Typography>
            <Typography component="dd">
              <LocationOnOutlinedIcon aria-hidden="true" fontSize="inherit"/>
              { profile.location }
            </Typography>
          </Box>
          <Box>
            <Typography component="dt">Record</Typography>
            <Typography component="dd">
              <ResumeLink download>CV ↓</ResumeLink>
              { ' ' }
              ·
              { ' ' }
              <ResumeLink>View online ↗</ResumeLink>
              <SocialLinks variant="icons" exclude={ ['Email'] }/>
            </Typography>
          </Box>
        </ContactDetails>
      </ContactIntro>
      <FormContainer/>
    </ContactScreen>
  );
}
