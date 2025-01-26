"use client"
import {motion} from "framer-motion";

import {FaCss3, FaHtml5, FaJs, FaNodeJs, FaReact} from "react-icons/fa";
import {SiExpress, SiNextdotjs, SiRedux, SiTailwindcss} from "react-icons/si";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {DialogDocument} from "@/components/DialogDocument";

const about = {
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

const experience = {
    icon: '/assets/resume/badge.svg',
    title: 'My experience',
    description: 'Frontend Developer skilled in building responsive web applications with' +
        ' ReactJS and NextJS, integrating APIs, and optimizing performance. Passionate about exploring WebAssembly to deliver innovative digital experiences.',
    items: [
        {
            company: "Mercatus Technologies",
            position: "Frontend Developer",
            duration: "03/2024 - Present",
            link: "https://www.linkedin.com/company/mercatus-technologies-inc-/posts/?feedView=all"
        },
        {
            company: "BAP IT Co., JSC",
            position: "Fullstack Developer",
            duration: "02/2022- 02/2024",
            link: "https://www.linkedin.com/company/bap-it-jsc/"
        },
        {
            company: " FPT Software",
            position: "Frontend Developer",
            duration: "09/2021- 01/2022",
            link: "https://www.linkedin.com/company/fpt-software/posts/?feedView=all"
        },
    ]
}

const education = {
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
    ]
}

const skills = {
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


function Resume() {

    const renderFieldValueAboutMe = (item) => {
        switch (item.fieldName) {
            case 'Email':
                return (
                    <a
                        href={`mailto: ${item.fieldValue}`}
                        className="text-lg hover:text-accent transition-all duration-300"
                    >
                        {item.fieldValue}
                    </a>
                )
            case 'Phone':
                return (
                    <a
                        className="text-lg hover:text-accent transition-all duration-300"
                        href={`tel:${item.fieldValue}`}
                    >
                        {item.fieldValue}
                    </a>
                )
            case 'Skype':
                return (
                    <a
                        className="text-lg hover:text-accent transition-all duration-300"
                        href={`skype:${item.fieldValue}?call`}
                    >
                        {item.fieldValue}
                    </a>
                )
            default:
                return <span className="text-lg">{item.fieldValue}</span>
        }
    }
    const renderFieldValueEducation = (item) => {
        switch (item.degree) {
            case 'Cybersoft Academy':
                return (
                    <li key={item.fieldName}
                        className="bg-[#232329] min-h-[184px] py-6 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                        {item.institution.map(x => {
                            return (
                                <div key={x.name} className="flex items-baseline gap-3">
                                    <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                    <DialogDocument file={x.file} title={x.name}/>
                                </div>
                            )
                        })}

                    </li>
                )
            case 'Ho Chi Minh City Open University':
                return (
                    <li key={item.fieldName}
                        className="bg-[#232329] min-h-[184px] py-6 px-8 rounded-xl flex flex-col justify-start items-center lg:items-start gap-1">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                        <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <DialogDocument file={item.file} title={item.institution}/>
                        </div>
                    </li>
                )
            default:
                return <span className="text-lg">{item.fieldValue}</span>
        }
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{
                opacity: 1,
                transition: {
                    delay: 2.4,
                    duration: 0.4,
                    ease: "easeIn"
                }
            }}
            className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
        >
            <div className="container mx-auto">
                <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
                    <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="about">About me</TabsTrigger>
                    </TabsList>
                    <div>
                        <DialogDocument/>
                    </div>
                    <div className="min-h-[700px] w-full">
                        <TabsContent value="experience" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{experience.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {experience.items.map((item, index) => {
                                            return (
                                                <li key={index}
                                                    className="bg-[#232329] h-[184px] py-6 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                                                    <span
                                                        className="text-accent">{item.duration}</span>
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left hover:text-accent transition-all duration-300"
                                                    >
                                                        {item.company}
                                                    </a>
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                                                        <p className="text-white/60">{item.position}</p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <TabsContent value="education" className="w-full">
                            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                                <h3 className="text-4xl font-bold">{education.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                                <ScrollArea className="h-[400px]">
                                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                                        {education.items.map((item, index) => {
                                            return renderFieldValueEducation(item)
                                        })}
                                    </ul>
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <TabsContent value="skills" className="w-full h-full">
                            <div className="flex flex-col gap-[30px]">
                                <div className="flex flex-col gap-[30px] text-center xl:text-left ">
                                    <h3 className="text-4xl font-bold">{skills.title}</h3>
                                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                                </div>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                                    {skills.skillList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger
                                                            className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                                            <div
                                                                className="text-6xl group-hover:text-accent transition-all duration-300">{item.icon}</div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className="capitalize">{item.name}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                        <TabsContent value="about" className="w-full text-center xl:text-left">
                            <div className="flex flex-col gap-[30px]">
                                <h3 className="text-4xl font-bold">{about.title}</h3>
                                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                                    {about.info.map((item, index) => {
                                        return (
                                            <li key={index}
                                                className="flex items-center justify-center xl:justify-start gap-4">
                                                <span
                                                    className="text-white/60"
                                                >
                                                    {item.fieldName}
                                                </span>
                                                {renderFieldValueAboutMe(item)}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </motion.div>
    )
}

export default Resume