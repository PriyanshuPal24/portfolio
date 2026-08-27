// Single source of truth for everything shown on the site. Edit this file to update the portfolio.
export const profile = {
  name: 'Priyanshu Pal',
  pronouns: 'He/Him',
  title: 'Graduate Engineer Trainee at Sopra Steria | Full-Stack (React & Python)',
  tagline:
    'Computer Science engineer building scalable, high-performance software — specialising in AI-assisted code migration and system modernisation with React and Python.',
  summary:
    'I am a Computer Science Engineer driven by a passion for building scalable, high-performance software systems and navigating complex system modernizations. Currently a Graduate Engineer Trainee at Sopra Steria, I specialise in full-stack development leveraging React and Python to drive digital transformation. My foundation balances theoretical rigor with real-world execution: enterprise application development and API integration at Airtel Digital, 800+ problems solved on LeetCode, and GATE 2026 qualification in Computer Science. While my current focus is the React and Python ecosystems, I bring strong core expertise in Java, Spring Boot and MySQL — whether architecting clean, maintainable code from scratch or implementing hybrid AI-human strategies to migrate legacy codebases into modern tech stacks.',
  location: 'Noida, Uttar Pradesh, India',
  email: 'priyanshu24april2003@gmail.com',
  phone: '',
  openToWork: 'Open to Software Engineer roles — On-site, Hybrid or Remote',
  avatar: '/profile.jpg',
  avatarFallback: 'https://avatars.githubusercontent.com/u/135883761?v=4',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Priyanshu-Pal-Resume.pdf',
  github: 'https://github.com/PriyanshuPal24',
  githubUsername: 'PriyanshuPal24',
  linkedin: 'https://www.linkedin.com/in/priyanshu-pal-b12435230',

  stats: [
    { label: 'DSA problems solved on LeetCode', value: '800+' },
    { label: 'GATE 2026 (Computer Science)', value: 'Qualified' },
    { label: 'B.Tech CGPA — Distinction', value: '8.29' },
    { label: 'Licenses & certifications', value: '15' },
  ],

  topSkills: ['React.js', 'React Native', 'Python', 'Java', 'Mobile Application Development'],

  skills: [
    {
      category: 'Backend',
      items: ['Python', 'Java', 'Spring Boot', 'REST APIs', 'MySQL', 'JDBC', 'Flask'],
    },
    {
      category: 'Frontend',
      items: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Modernisation & AI',
      items: [
        'Legacy code migration',
        'Architectural refactoring',
        'GenAI-assisted workflows',
        'GitHub Copilot',
        'Type safety',
      ],
    },
    {
      category: 'Mobile & Automation',
      items: ['Android Development', 'React Native', 'UiPath', 'Robotic Process Automation'],
    },
    {
      category: 'CS Fundamentals',
      items: [
        'Data Structures & Algorithms',
        'Operating Systems',
        'DBMS',
        'System Architecture',
        'System Design',
      ],
    },
    {
      category: 'Tools & Ecosystem',
      items: ['Git & GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Agile'],
    },
  ],

  experience: [
    {
      role: 'Graduate Engineer Trainee',
      company: 'Sopra Steria',
      employmentType: 'Full-time',
      period: 'Apr 2026 — Present',
      location: 'Noida, Uttar Pradesh, India · On-site',
      description:
        'Full-stack software engineer working with React and Python, specialising in system modernisation.',
      highlights: [
        'Execute end-to-end codebase migrations using both traditional architectural refactoring and cutting-edge GenAI workflows.',
        'Minimise downtime and ensure type safety across migrated services.',
        'Contribute to enterprise application development and API integration across the stack.',
      ],
      skills: ['Python', 'React.js', 'Migration Projects', 'Artificial Intelligence (AI)'],
    },
    {
      role: 'Software Engineer Intern',
      company: 'Airtel Digital',
      employmentType: 'Internship',
      period: 'Apr 2025 — Aug 2025',
      location: 'Gurugram, Haryana, India · Hybrid',
      description:
        'Contributed to internal application development and seamless API integration, learning first-hand how to build for scale.',
      highlights: [
        'Built and maintained features for internal applications used across teams.',
        'Integrated REST APIs and delivered mobile-facing functionality with React Native.',
      ],
      skills: ['React Native', 'Android Development', 'REST APIs'],
    },
    {
      role: 'Robotic Process Automation Engineer',
      company: 'EduSkills Foundation®',
      employmentType: 'Internship',
      period: 'Sep 2023 — Nov 2023',
      location: 'Remote',
      description:
        'Built automation workflows with UiPath as part of the EduSkills UiPath RPA programme.',
      highlights: ['Designed and tested RPA workflows to automate repetitive business processes.'],
      skills: ['UiPath', 'Robotic Process Automation (RPA)'],
    },
    {
      role: 'Web Developer',
      company: 'CodSoft',
      employmentType: 'Internship',
      period: 'Aug 2023 — Sep 2023',
      location: 'Remote',
      description:
        'Completed a structured web development internship delivering responsive front-end projects.',
      highlights: [
        'Built a fully responsive landing page and an interactive calculator with HTML, CSS and JavaScript.',
      ],
      skills: ['Front-End Development', 'Web Applications'],
    },
  ],

  education: [
    {
      degree: 'B.Tech — Computer Science and Engineering (Data Science)',
      institution: 'GL Bajaj Institute of Technology and Management',
      period: 'Nov 2021 — May 2025',
      grade: 'First Division with Distinction · 8.29 CGPA',
      description:
        'Coursework across data structures and algorithms, operating systems, DBMS, machine learning, statistics and software engineering.',
    },
    {
      degree: 'AISSCE — Science with Physical Education',
      institution: 'S.D. Public School',
      period: 'May 2019 — Jun 2021',
      grade: '9.22 CGPA',
      description:
        'Activities and societies: Volleyball, Table Tennis and Cricket, alongside a Science and English focus.',
    },
  ],

  certifications: [
    { name: 'AI for All', issuer: 'Sopra Steria', date: 'May 2026' },
    { name: 'Sustainable IT Awareness', issuer: 'Sopra Steria', date: 'May 2026' },
    { name: 'UiPath RPA Developer Programme', issuer: 'EduSkills Foundation®', date: 'Nov 2023' },
  ],
  certificationsNote:
    '15 licenses & certifications in total — the full list is available on my LinkedIn profile.',

  // Repos highlighted at the top of the Projects section.
  featuredRepos: ['Cinebase', 'Cinebase_Migrated', 'Text_Classification', 'React-Native'],

  // Repos hidden from the Projects section.
  hiddenRepos: ['PriyanshuPal24'],
}

export default profile
