"use client"
import {Button} from "@/components/ui/button";
import {FiDownload} from "react-icons/fi";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

function Home() {
    const handleClick = () => {
        const link = document.createElement("a")
        link.href = "/assets/resume/CV_Frontend_LinHuaChung.pdf"
        link.download = "CV_FrontendDeveloper_Lin_Hua_Chung.pdf"
        link.click();
    }
    return (
        <section className="h-full">
            <div className="container mx-auto h-full">
                <div
                    className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
                    <div className="text-center xl:text-left order-2 xl:order-none">
                        <span className="text-xl">Frontend Developer</span>
                        <h1 className="h1">
                            Hello I'm <br/> <span className="text-accent">Hua Chung</span>
                        </h1>
                        <p className="max-w-[500px] mb-9 text-white/80">
                            Focused on building high-performance web applications with expertise in
                            ReactJS, seamless API integration, and performance optimization.
                            <br/>
                            Passionate about exploring emerging technologies like WebAssembly and
                            modern optimization techniques to deliver innovative and engaging
                            digital experiences.
                        </p>
                        <div className="flex flex-col xl:flex-row items-center gap-8">
                            <Button
                                variant="outline"
                                size="lg"
                                className="uppercase flex items-center gap-2"
                                onClick={handleClick}
                            >
                                <span>Download CV</span>
                                <FiDownload className="text-xl"/>
                            </Button>
                            <div className="mb-8 xl:mb-0 ">
                                <Social
                                    containerStyles="flex gap-6"
                                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="order-1 xl:order-none mb-8 xl:mb-0">
                        <Photo/>
                    </div>
                </div>
            </div>
            <Stats/>
        </section>
    )
}

export default Home