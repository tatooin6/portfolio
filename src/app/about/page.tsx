import React from 'react'
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
          <Badge tag='Languages' color={badgeColor.red}/>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">JavaScript</span>
            <span className="badge">TypeScript</span>
            <span className="badge">C#</span>
            <span className="badge">Python</span>
            <span className="badge">HTML5</span>
            <span className="badge">CSS/SCSS</span>
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Frameworks & Libraries' color={badgeColor.purple}/>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">ReactJS</span>
            <span className="badge">Next.js</span>
            <span className="badge">Node.js</span>
            <span className="badge">.NET Core</span>
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Databases' color={badgeColor.yellow}/>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">MySQL</span>
            <span className="badge">PostgreSQL</span>
            <span className="badge">MongoDB</span>
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Cloud & DevOps' color={badgeColor.indigo}/>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">Docker</span>
            <span className="badge">Azure DevOps</span>
            <span className="badge">CI/CD Pipelines</span>
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Design' color={badgeColor.blue} />
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">Atomic Design</span>
            <span className="badge">UI/UX Design</span>
            <span className="badge">Adobe Photoshop</span>
          </div>
        </div>

        <div className="mt-6">
          <Badge tag='Tools' color={badgeColor.green}/>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="badge">SourceTree</span>
            <span className="badge">SAP Business One</span>
            <span className="badge">Bash Scripts</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
