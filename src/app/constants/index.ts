export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Head of Development',
    company: 'Brave Digital',
    period: '2021 - Present',
    description: 'Lead a talented team of developers in delivering cutting-edge software solutions. Responsible for scoping and architecting projects, overseeing developer growth, guiding technical strategy, and ensuring high-quality delivery. Manage DevOps including web servers, cloud infrastructure, and app deployment. Also work as a senior developer on projects to hit budgets and deadlines.',
    tech: ['Laravel', 'Node.js', 'Vue', 'React', 'Flutter', 'AWS', 'DevOps']
  },
  {
    role: 'Full-Stack Developer',
    company: 'Brave Digital',
    period: '2015 - 2021',
    description: 'Gained expertise in full-stack software development using Laravel, NodeJS, Vue, and React. Developed mobile apps with Flutter, React Native, Cordova, and Swift. Worked on complex software solutions for startups and corporate clients. Developed experimental projects including Unity and VR applications.',
    tech: ['Laravel', 'Node.js', 'Vue', 'React', 'Flutter', 'React Native', 'Unity', 'VR']
  },
  {
    role: 'Consultant / Developer',
    company: 'Freelance',
    period: '2014 - Present',
    description: 'Take on diverse projects outside normal responsibilities to expand skillset and grow professionally. Proactively seek opportunities that challenge learning of new technologies and frameworks. Work with clients from different industries, honing adaptability, communication, and time management skills.',
    tech: ['Web Development', 'Mobile Development', 'Consulting', 'Full-Stack']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Core Skills',
    skills: ['Web Development', 'Software Development', 'Software Engineering', 'Solution Architecture', 'Mobile App Development', 'Server Architecture']
  },
  {
    title: 'Languages',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Dart', 'PHP', 'SQL', 'Python', 'Java', 'C#']
  },
  {
    title: 'Frameworks',
    skills: ['Node.js', 'Laravel', 'Vue', 'React', 'Flutter', 'React Native', 'WordPress', 'Tailwind', 'Bootstrap', 'SASS']
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'AWS', 'Google Cloud', 'MySQL', 'PostgreSQL', 'Linux', 'Apache', 'Nginx', 'Bitbucket Pipelines']
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Enterprise Software Solutions',
    description: 'Led development of complex software solutions for startups and corporate clients, featuring advanced front-ends and robust backend architectures.',
    tech: ['Laravel', 'Vue', 'Node.js', 'React'],
    github: 'https://github.com/FJLessing',
    demo: 'https://www.fjlessing.co.za'
  },
  {
    title: 'Mobile Applications',
    description: 'Built cross-platform mobile applications using modern frameworks, delivering seamless user experiences across iOS and Android platforms.',
    tech: ['Flutter', 'React Native', 'Swift', 'Cordova'],
    github: 'https://github.com/FJLessing',
    demo: 'https://www.fjlessing.co.za'
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    description: 'Managed and architected cloud infrastructure, implementing CI/CD pipelines and ensuring high availability for production applications.',
    tech: ['AWS', 'Google Cloud', 'Docker', 'Bitbucket Pipelines'],
    github: 'https://github.com/FJLessing',
    demo: 'https://www.fjlessing.co.za'
  },
  {
    title: 'VR & Experimental Projects',
    description: 'Developed experimental applications including VR experiences and Unity-based projects, pushing the boundaries of interactive technology.',
    tech: ['Unity', 'VR', 'C#', 'WebGL'],
    github: 'https://github.com/FJLessing',
    demo: 'https://www.fjlessing.co.za'
  }
];

export const CONTACT_INFO = {
  email: 'me@fjlessing.co.za',
  phone: '+27 83 233 6448',
  website: 'https://www.fjlessing.co.za',
  telLink: 'tel:+27832336448'
};