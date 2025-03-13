import {FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact} from "react-icons/fa";
import {SiNextdotjs, SiRedux, SiTailwindcss} from "react-icons/si";

export const about = {
    title: "About me",
    description: "I am a Frontend Developer with over 3 years of experience in ReactJS, specializing in building responsive and high-performance web applications for the Japanese and U.S. markets. With a strong foundation in backend development, I ensure seamless integration and robust functionality. Adaptable and committed to continuous learning, I thrive in long-term, dynamic environments.",
    info: [
        {
            fieldName: "Name",
            fieldValue: "Lin Hua Chung",
        },
        {
            fieldName: "Phone",
            fieldValue: "(+84) 849966 277",
        },
        {
            fieldName: "Experience",
            fieldValue: "3+ Years",
        },
        {
            fieldName: "Skype",
            fieldValue: "huachung1304",
        },
        {
            fieldName: "Nationality",
            fieldValue: "Vienamese",
        },
        {
            fieldName: "Email",
            fieldValue: "chunglh1304@gmail.com",
        },
        {
            fieldName: "Freelance",
            fieldValue: "Available",
        },
        {
            fieldName: "Languages",
            fieldValue: "English, Vietnamese",
        },
    ]
}

export const experience = {
    icon: '/assets/resume/badge.svg',
    title: 'My experience',
    description: 'Frontend Developer skilled in building responsive web applications with' +
        ' ReactJS and NextJS, integrating APIs, and optimizing performance. Passionate about exploring WebAssembly to deliver innovative digital experiences.',
    items: [
        {
            company: "Mercatus Technologies",
            position: "Frontend Developer",
            duration: "03/2024 - Present",
            link: "https://www.linkedin.com/company/mercatus-technologies-inc-/posts/?feedView=all",
            info: {
                duration: "03/2024 - Present",
                "rolesAndResponsibilities": [
                    "Key contributor, lead new member.",
                    "Develop web application user interfaces using HTML, CSS and JavaScript.",
                    "Collaborate with over 30 members to ensure product quality and efficiency.",
                ]
            }
        },
        {
            company: "BAP IT Co., JSC",
            position: "Fullstack Developer",
            duration: "02/2022- 02/2024",
            link: "https://www.linkedin.com/company/bap-it-jsc/",
            info: {
                duration: "02/2022- 02/2024",
                "rolesAndResponsibilities": [
                    "Key contributor.",
                    "Develop both Frontend and Backend for web applications using JavaScript, NodeJS and ReactJS.",
                    "Analyze and provide solutions directly for customers.",
                    "Collaborate with over 10 members to ensure product quality and efficiency."
                ]
            }
        },
        {
            company: " FPT Software",
            position: "Frontend Developer",
            duration: "09/2021- 01/2022",
            link: "https://www.linkedin.com/company/fpt-software/posts/?feedView=all",
            info: {
                duration: "09/2021- 01/2022",
                "rolesAndResponsibilities": [
                    "Develop internal applications for managing customer information.",
                    "Develop UIs using HTML, CSS, JavaScript, and Websqure5.",
                ]
            }
        },
    ],
}

export const education = {
    icon: '/assets/resume/cap.svg',
    title: 'My education',
    description: 'I studied Computer Science at Ho Chi Minh City Open University, building a' +
        ' strong foundation in programming and software development. In 2020, I completed a Fullstack Developer program at Cybersoft Academy, enhancing my practical web development skills. These experiences prepared me for a career in technology.',
    items: [
        {
            institution: [
                {
                    name: "Professional Frontend Developer",
                    file: "/assets/files/LinHuaChung_Frontend.pdf",
                },
                {
                    name: "Professional NodeJS Developer",
                    file: "/assets/files/LinHuaChung_Backend.pdf",
                }
            ],
            degree: "Cybersoft Academy",
            duration: "2020 - 2021"
        },
        {
            institution: "Computer Science",
            degree: "Ho Chi Minh City Open University",
            file: "/assets/files/BangDaiHọc_LinHuaChung.pdf",
            duration: "2016 - 2021"
        },
    ],
}

export const skills = {
    title: 'My skills',
    description: 'A Frontend Developer skilled in HTML, CSS, JavaScript, ReactJS, Redux, NextJS, Tailwind CSS, and Node.js, focused on building high-performance, responsive web apps for the Japanese and U.S. markets, ensuring seamless integration and modern UI/UX.',
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
        },
    ]
}
