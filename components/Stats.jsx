"use client"

import CountUp from "react-countup";

const stats = [
    {
        num: 3,
        text: "Years of experience",
        isPlus: true
    },
    {
        num: 8,
        text: "Projects completed",
    },
    {
        num: 4,
        text: "Technologies mastered",
        isPlus: true
    },
    {
        num: 500,
        text: "Code commits",
        isPlus: true
    }
]

function Stats() {
    return (
        <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
            <div className="container mx-auto">
                <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                    {stats.map((item, i) => {
                        return (
                            <div key={i}
                                 className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                                <CountUp
                                    end={item.num}
                                    duration={3.5}
                                    delay={2}
                                    className="text-4xl xl:text-6xl font-extrabold"
                                    suffix={item.isPlus && "+"}
                                ></CountUp>
                                <p
                                    className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>{
                                    item.text}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Stats