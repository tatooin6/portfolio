import React from 'react'
import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoPython,
  BiLogoHtml5,
  BiLogoCss3,
} from "react-icons/bi";
import { TbBrandCSharp } from "react-icons/tb";
import { BsFiletypeScss } from "react-icons/bs";
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
  SiMongodb,
  SiDocker,
  SiSourcetree,
  SiSap,
  SiGnubash,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { IoLogoGitlab } from "react-icons/io5";
import {
  DiAtom,
  DiPhotoshop,
} from "react-icons/di";
import { MdOutlineDesignServices } from "react-icons/md";
import Icon from '../components/common/Icon';

import Badge from '../components/common/Badge';
import { badgeColor } from '../components/common/Badge';

const About = () => {
  return (
    <div className='px-2 w-full flex lg:flex-row flex-col dark:text-gray-200'>
      <div className='lg:w-1/2 w-full p-2'>
        <h1 className='text-xl pb-6 pt-8'>Get to know me</h1>
        <p>
          Hi there! I&apos;m Antonio Pantoja, also known as Tato. I hold a degree in Computer Science from La Paz, Bolivia, and have over 4 years of experience as a Full Stack Web Developer. Throughout my career, I&apos;ve been part of diverse projects, from geospatial platforms to low-code frameworks, which have strengthened my skills in both frontend and backend development.
        </p>
        <p className='mt-4'>
          My main focus lies in frontend development, where I enjoy creating intuitive and efficient user interfaces, especially using ReactJS and TypeScript. However, I also have robust experience in backend development with .NET Core, C#, and NodeJS, and I’ve worked on solutions involving Python and Docker.
        </p>
        <p className='mt-4'>
          Besides coding, I&apos;m passionate about sharing knowledge. With experience as an educator and mentor, I enjoy teaching and contributing to the Web Development Community. Check out the Blog section of this page for tips, tutorials, and insights that might help you or spark new ideas.
        </p>
        <p className='mt-4'>
          Currently, I&apos;m open to job opportunities where I can apply my skills, contribute meaningfully, and continue growing professionally. If you believe I can add value to your team, feel free to reach out—I&apos;d love to connect!
        </p>
      </div>
      <div className='lg:w-1/2 w-full p-2'>
        <h1 className='text-xl pb-6 pt-8'>Skills</h1>

        <div>
          <Badge tag='Languages' color={badgeColor.red} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={BiLogoJavascript} description='Javascript' />
            <Icon icon={BiLogoTypescript} description='Typescript' />
            <Icon icon={TbBrandCSharp} description='C#' />
            <Icon icon={BiLogoPython} description='Python' />
            <Icon icon={BiLogoHtml5} description='HTML5' />
            <Icon icon={BiLogoCss3} description='CSS3' />
            <Icon icon={BsFiletypeScss} description='SCSS' />
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Frameworks & Libraries' color={badgeColor.purple} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={RiReactjsFill} description='ReactJS' />
            <Icon icon={RiNextjsFill} description='NextJS' />
            <Icon icon={RiNodejsFill} description='NodeJS' />
            <Icon icon={RiTailwindCssFill} description='TailwindCSS' />
            <Icon icon={SiDotnet} description='.NET Core' />
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Databases' color={badgeColor.yellow} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={SiMysql} description='MySQL' />
            <Icon icon={SiPostgresql} description='PostgreSQL' />
            <Icon icon={SiMongodb} description='MongoDB' />
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Cloud & DevOps' color={badgeColor.indigo} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={SiDocker} description='Docker' />
            <Icon icon={VscAzureDevops} description='Azure DevOps' />
            <Icon icon={IoLogoGitlab} description='Gitlab CI/CD Pipelines' />
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Design' color={badgeColor.blue} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={DiAtom} description='Atomic Design' />
            <Icon icon={MdOutlineDesignServices} description='UI/UX Design' />
            <Icon icon={DiPhotoshop} description='Adobe Photoshop' />
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Tools' color={badgeColor.green} />
          <div className="flex flex-wrap gap-2 mt-2">
            <Icon icon={SiSourcetree} description='SourceTree' />
            <Icon icon={SiSap} description='SAP Business One' />
            <Icon icon={SiGnubash} description='Bash Scripts' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
