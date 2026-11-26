import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  SourceNotice,
  StudioDescription,
  StudioEyebrow,
  StudioHeader,
  StudioPage,
  StudioTitle
} from '@/features/admin-shell/styles/ContentStudio.styles';
import InboxClientBoundary from '../InboxClient';

export default function ContactInboxPage() {
  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Communication · Inbox</StudioEyebrow>
          <StudioTitle component="h1">Contact conversations</StudioTitle>
          <StudioDescription component="p">Triage new inquiries, search message history, update status, and continue reply threads.</StudioDescription>
        </Box>
      </StudioHeader>
      <SourceNotice>
        <InboxOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Operational inbox</Typography>
          <Typography component="p">Filters are stored in the URL. Opening a message keeps the existing reply and status workflow.</Typography>
        </Box>
      </SourceNotice>
      <InboxClientBoundary />
    </StudioPage>
  );
}
