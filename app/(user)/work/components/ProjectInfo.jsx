import React from "react";
import {cn} from "@/lib/utils";

function Title({children}) {
    return <div className="text-white font-bold">{children}</div>;
}

function Info({children}) {
    return <div className="col-span-2 text-white/60 text-base">{children}</div>;
}

function Row({children, className}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-3 border-b border-white/20 px-6 py-3 items-baseline",
                className
            )}
        >
            {children}
        </div>
    )
}

function ProjectInfo({info}) {
    const {
        projectName,
        company,
        projectDescription,
        teamSize,
        position,
        technologies,
        rolesAndResponsibilities
    } = info
    return (
        <div className="bg-primary border border-white/20 shadow-lg rounded-2xl mb-6">
            <div className="grid">
                {projectName && (
                    <Row>
                        <Title>Project Name:</Title>
                        <Info>{projectName}</Info>
                    </Row>
                )}
                {company && (
                    <Row>
                        <Title>Company:</Title>
                        <Info>{company}</Info>
                    </Row>
                )}
                {projectDescription && (
                    <Row>
                        <Title>Description:</Title>
                        <Info>{projectDescription}</Info>
                    </Row>
                )}
                {teamSize && (
                    <Row>
                        <Title>Team Size:</Title>
                        <Info>{teamSize}</Info>
                    </Row>
                )}
                {position && (
                    <Row>
                        <Title>Position:</Title>
                        <Info>{position}</Info>
                    </Row>
                )}
                {teamSize && (
                    <Row>
                        <Title>Technologies:</Title>
                        <Info>{technologies.join(", ")}</Info>
                    </Row>
                )}
                {rolesAndResponsibilities && (
                    <Row className="border-b-0">
                        <Title>Roles and Responsibilities:</Title>
                        <Info>
                            <ul className="list-disc list-inside">
                                {rolesAndResponsibilities.map((role, index) => (
                                    <li className="mb-2" key={index}>{role}</li>
                                ))}
                            </ul>
                        </Info>
                    </Row>
                )}
            </div>
        </div>
    );
}

export default ProjectInfo;