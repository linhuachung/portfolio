import { FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiRedux, SiTailwindcss } from "react-icons/si";

export const about = {
  title: "About me",
  description: "I am a Frontend Developer with over 3 years of experience in ReactJS, specializing in building responsive and high-performance web applications for the Japanese and U.S. markets. With a strong foundation in backend development, I ensure seamless integration and robust functionality. Adaptable and committed to continuous learning, I thrive in long-term, dynamic environments.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Lin Hua Chung"
    },
    {
      fieldName: "Phone",
      fieldValue: "(+84) 849966 277"
    },
    {
      fieldName: "Experience",
      fieldValue: "3+ Years"
    },
    {
      fieldName: "Skype",
      fieldValue: "huachung1304"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Vienamese"
    },
    {
      fieldName: "Email",
      fieldValue: "chunglh1304@gmail.com"
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available"
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Vietnamese"
    }
  ]
};

export const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "Frontend Developer skilled in ReactJS and NextJS, API integration, and performance optimization. Passionate about WebAssembly for innovative digital experiences.",
  workExperiences: [
    {
      id: 1,
      company: "Mercatus Technologies",
      position: "Frontend Developer",
      startdate: "03/2024",
      enddate: "03/2025",
      isCurrent: false,
      location: "Ho Chi Minh City, Vietnam",
      link: "https://www.linkedin.com/company/mercatus-technologies-inc-/posts/?feedView=all",
      rolesAndResponsibilities: [
        "Key contributor, lead new member.",
        "Develop web application user interfaces using HTML, CSS and JavaScript.",
        "Collaborate with over 30 members to ensure product quality and efficiency."
      ],
      techStack: ["JavaScript", "HTML", "CSS", "AngularJS", "ReactJS", "NextJS"]
    },
    {
      id: 2,
      company: "BAP IT Co., JSC",
      position: "Fullstack Developer",
      startdate: "02/2022",
      enddate: "02/2024",
      isCurrent: false,
      location: "Ho Chi Minh City, Vietnam",
      link: "https://www.linkedin.com/company/bap-it-jsc/",
      rolesAndResponsibilities: [
        "Key contributor.",
        "Develop both Frontend and Backend for web applications using JavaScript, NodeJS and ReactJS.",
        "Analyze and provide solutions directly for customers.",
        "Collaborate with over 10 members to ensure product quality and efficiency."
      ],
      techStack: ["JavaScript", "HTML", "CSS", "ReactJS", "NodeJS", "ExpressJS"]
    },
    {
      id: 3,
      company: " FPT Software",
      position: "Frontend Developer",
      startdate: "09/2021",
      enddate: "12/2022",
      isCurrent: false,
      location: "Ho Chi Minh City, Vietnam",
      link: "https://www.linkedin.com/company/fpt-software/posts/?feedView=all",
      rolesAndResponsibilities: [
        "Develop internal applications for managing customer information.",
        "Develop UIs using HTML, CSS, JavaScript, and WebSquare5."
      ],
      techStack: ["JavaScript", "HTML", "CSS", "WebSquare5"]
    }
  ]
};

export const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description: "I studied Computer Science at Ho Chi Minh City Open University, building a" +
    " strong foundation in programming and software development. In 2020, I completed a Fullstack Developer program at Cybersoft Academy, enhancing my practical web development skills. These experiences prepared me for a career in technology.",
  educationExperiences: [
    {
      degree: [
        {
          name: "Computer Science",
          file: "/assets/files/BangDaiHọc_LinHuaChung.pdf"
        }
      ],
      school: "Ho Chi Minh City Open University",
      startdate: "2016",
      enddate: "2022",
      isCurrent: false,
      location: "Ho Chi Minh City, Vietnam"
    },
    {
      degree: [
        {
          name: "Professional Frontend Developer",
          file: "/assets/files/LinHuaChung_Frontend.pdf"
        },
        {
          name: "Professional NodeJS Developer",
          file: "/assets/files/LinHuaChung_Backend.pdf"
        }
      ],
      school: "Cybersoft Academy",
      startdate: "2020",
      enddate: "2021",
      isCurrent: false,
      location: "Ho Chi Minh City, Vietnam"
    }
  ]
};

export const skills = {
  title: "My skills",
  description: "A Frontend Developer skilled in HTML, CSS, JavaScript, ReactJS, Redux, NextJS, Tailwind CSS, and Node.js, focused on building high-performance, responsive web apps for the Japanese and U.S. markets, ensuring seamless integration and modern UI/UX.",
  skillList: [
    {
      icon: <FaHtml5/>,
      name: "html5"
    },
    {
      icon: <FaCss3/>,
      name: "css3"
    },
    {
      icon: <FaJs/>,
      name: "Javascript"
    },
    {
      icon: <FaReact/>,
      name: "ReactJs"
    },
    {
      icon: <SiRedux/>,
      name: "Redux"
    },
    {
      icon: <SiNextdotjs/>,
      name: "NextJs"
    },
    {
      icon: <SiTailwindcss/>,
      name: "Tailwindcss"
    },
    {
      icon: <FaNodeJs/>,
      name: "NodeJs"
    }
  ]
};
