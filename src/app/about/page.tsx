"use client";

import React, { useState } from "react";

import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoPython,
  BiLogoHtml5,
  BiLogoCss3,
} from "react-icons/bi";
import { TbBrandCSharp } from "react-icons/tb";
import {
  RiReactjsFill,
  RiNextjsFill,
  RiNodejsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiDotnet,
  SiMysql,
  SiPostgresql,
  SiNestjs,
  SiMongodb,
  SiDocker,
  SiSourcetree,
  SiSap,
  SiGnubash,
  SiFigma,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { IoLogoGitlab, IoLogoGithub } from "react-icons/io5";
import { DiAtom } from "react-icons/di";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaGitAlt } from "react-icons/fa";

import Icon from "../components/common/Icon";
import Badge, { badgeColor } from "../components/common/Badge";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="px-2 w-full flex lg:flex-row flex-col items-center dark:text-gray-200">

      <div className="flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2ac3de]">
            Who am I?
          </p>
          <h2 className="text-4xl font-bold text-[#bb9af7]">
            A curious mind, a builder and a lifelong learner
          </h2>
          <p className="text-lg leading-relaxed text-[#c0caf5]">
            With a background in teaching, a passion for music, and years of experience in software development, I've found joy in creating solutions that matter. Whether I'm crafting interfaces, writing clean APIs, or exploring satellite image processing, I bring heart and logic to the work I do. Learn about my journey, my passions, and my goals.
          </p>
        </div>

        <div className="flex w-full max-w-4xl flex-row">

          <div className="lg:w-1/2 w-full p-2">
            <h1 className="text-xl pb-6 pt-8">Get to know me</h1>
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
isExpanded ? "max-h-full" : "max-h-40"
}`}
            >
              <p>
                Hi there! my name is Antonio Pantoja, but people also known me as Tato. I hold a
                degree in Computer Science that I obtained in my city, La Paz, Bolivia, and have over <strong>5{" "}</strong>
                years of{" "}
                <a
                  href="/experience"
                  className="text-[#bb9af7] underline-offset-4 hover:underline"
                >
                  experience as a Full Stack Web Developer.
                </a>
                {" "}Throughout my
                career, I&apos;ve been part of diverse projects, from geospatial
                platforms to low-code frameworks, which have strengthened my skills
                in both frontend and backend development.
              </p>
              <p className="mt-4">
                My main focus lies in frontend development, where I enjoy creating
                intuitive and efficient user interfaces, especially using ReactJS
                and TypeScript. However, I also have robust experience in backend
                development with .NET Core with C#, and NestJS with NodeJS, and I&apos;ve also worked on
                solutions involving Python and Docker.
              </p>
              <p className="mt-4">
                Besides coding, I&apos;m passionate about sharing knowledge. With
                experience as an educator and mentor, I enjoy teaching and
                contributing to the Web Development Community. Check out the{" "}
                <a
                  href="/blog"
                  className="text-[#bb9af7] underline-offset-4 hover:underline"
                >
                  Blog Section
                </a>
                {" "}of this web page for tips, tutorials, and insights that might
                help you or spark new ideas.
              </p>
              <p className="mt-4">
                Currently, I&apos;m open to job opportunities where I can apply my
                skills, contribute meaningfully, and continue growing
                professionally. If you believe I can add value to your team, feel
                free to reach out. I&apos;d love to connect!
              </p>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-t from-[rgb(228,228,228)] to-transparent dark:from-[rgb(36,40,59)] dark:to-transparent"></div>
              )}
            </div>
            <div className="flex flex-row justify-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-indigo-600 dark:text-cyan-200 hover:underline focus:outline-none"
              >
                {isExpanded ? "Show less" : "Read more"}
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full p-2">
            <h1 className="text-xl pb-6 pt-8">Skills</h1>

            <div>
              <Badge tag="Languages" color={badgeColor.red} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={BiLogoJavascript} description="Javascript" />
                <Icon icon={BiLogoTypescript} description="Typescript" />
                <Icon icon={TbBrandCSharp} description="C#" />
                <Icon icon={BiLogoPython} description="Python" />
                <Icon icon={BiLogoHtml5} description="HTML5" />
                <Icon icon={BiLogoCss3} description="CSS3" />
              </div>
            </div>

            <div className="mt-6">
              <Badge tag="Frameworks & Libraries" color={badgeColor.purple} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={RiReactjsFill} description="ReactJS" />
                <Icon icon={RiNextjsFill} description="NextJS" />
                <Icon icon={SiNestjs} description="NestJS" />
                <Icon icon={RiNodejsFill} description="NodeJS" />
                <Icon icon={SiDotnet} description=".NET Core" />
                <Icon icon={RiTailwindCssFill} description="TailwindCSS" />
              </div>
            </div>

            <div className="mt-6">
              <Badge tag="Databases" color={badgeColor.yellow} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={SiPostgresql} description="PostgreSQL" />
                <Icon icon={SiMysql} description="MySQL" />
                <Icon icon={SiMongodb} description="MongoDB" />
              </div>
            </div>

            <div className="mt-6">
              <Badge tag="Cloud & DevOps" color={badgeColor.indigo} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={SiDocker} description="Docker" />
                <Icon icon={VscAzureDevops} description="Azure DevOps" />
                <Icon icon={IoLogoGitlab} description="Gitlab CI/CD Pipelines" />
                <Icon icon={IoLogoGithub} description="GitHub" />
              </div>
            </div>

            <div className="mt-6">
              <Badge tag="Design" color={badgeColor.blue} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={SiFigma} description="Figma" />
                <Icon icon={DiAtom} description="Atomic Design" />
                <Icon icon={MdOutlineDesignServices} description="UI/UX Design" />
              </div>
            </div>

            <div className="mt-6">
              <Badge tag="Tools" color={badgeColor.green} />
              <div className="flex flex-wrap gap-2 mt-2">
                <Icon icon={FaGitAlt} description="Git" />
                <Icon icon={SiSourcetree} description="SourceTree" />
                <Icon icon={SiSap} description="SAP Business One" />
                <Icon icon={SiGnubash} description="Bash Scripts" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
