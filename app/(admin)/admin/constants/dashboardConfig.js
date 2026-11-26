import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const STATS_CONFIG = [
  {
    key: 'pendingContacts',
    title: 'New Inquiries',
    icon: DraftsOutlinedIcon,
    color: 'orange'
  },
  {
    key: 'publishedProjects',
    title: 'Public Projects',
    icon: FolderOpenOutlinedIcon,
    color: 'green'
  },
  {
    key: 'totalVisits',
    title: 'Total Visits',
    icon: VisibilityOutlinedIcon,
    color: 'accent'
  },
  {
    key: 'totalCvDownloads',
    title: 'CV Downloads',
    icon: DownloadOutlinedIcon,
    color: 'purple'
  }
];

export const PERIOD_OPTIONS = [
  { value: 'day', label: 'Last 7 Days' },
  { value: 'week', label: 'Last 30 Days' },
  { value: 'month', label: 'Last 12 Months' },
  { value: 'year', label: 'Last 5 Years' }
];

