import {
  FaBriefcase,
  FaCode,
  FaDownload,
  FaEnvelope,
  FaEye,
  FaFileAlt,
  FaGraduationCap,
  FaProjectDiagram
} from "react-icons/fa";

export const STATS_CONFIG = [
  {
    key: "totalProjects",
    title: "Total Projects",
    icon: FaProjectDiagram,
    color: "accent"
  },
  {
    key: "publishedProjects",
    title: "Published Projects",
    icon: FaFileAlt,
    color: "green"
  },
  {
    key: "totalSkills",
    title: "Total Skills",
    icon: FaCode,
    color: "blue"
  },
  {
    key: "totalExperiences",
    title: "Experiences",
    icon: FaBriefcase,
    color: "purple"
  },
  {
    key: "totalEducation",
    title: "Education",
    icon: FaGraduationCap,
    color: "orange"
  },
  {
    key: "totalContacts",
    title: "Contact Messages",
    icon: FaEnvelope,
    color: "accent"
  },
  {
    key: "totalVisits",
    title: "Total Visits",
    icon: FaEye,
    color: "blue"
  },
  {
    key: "totalCvDownloads",
    title: "CV Downloads",
    icon: FaDownload,
    color: "green"
  }
];

export const PERIOD_OPTIONS = [
  { value: "day", label: "Last 7 Days" },
  { value: "week", label: "Last 30 Days" },
  { value: "month", label: "Last 12 Months" },
  { value: "year", label: "Last 5 Years" }
];

