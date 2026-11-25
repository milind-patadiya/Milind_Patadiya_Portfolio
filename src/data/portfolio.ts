export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mobile' | 'Full-Stack Web' | 'Native Android';
  tech: string[];
  githubUrl?: string;
  githubLabel?: string;
  summary: string;
  highlights: string[];
  architectureNotes: string[];
  featuredLabel: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  accreditation?: string;
  period: string;
  metricLabel: string;
  metricValue: string;
  status: 'Current' | 'Completed';
}

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  items: string[];
}

export interface CertificationItem {
  title: string;
  issuerHint: string;
  domain: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Milind Patadiya',
    initials: 'MP',
    headline: 'Computer Engineering Student | Full-Stack & Flutter Developer',
    roleBadges: [
      'Full-Stack Web Developer',
      'Flutter & Kotlin Mobile Dev',
      '.NET Internship Experience',
    ],
    email: 'milindpatadiya10@gmail.com',
    phone: '+91 8200942645',
    phoneHref: 'tel:+918200942645',
    location: 'Rajkot, Gujarat, India',
    githubUrl: 'https://github.com/milind-patadiya',
    // Verify and update this LinkedIn profile URL slug if needed
    linkedinUrl: 'https://www.linkedin.com/in/milind-patadiya',
    graduation: 'B.Tech 2027',
    availability: 'Open to Internships & Full-Stack / Mobile Roles',
    summary:
      'B.Tech Computer Engineering student (graduating 2027) with hands-on full-stack web development experience in JavaScript, PHP, MySQL, and Bootstrap, plus Flutter and Kotlin for mobile development. Completed a .NET internship and built multiple end-to-end projects covering authentication, dashboards, and database integration.',
  },
  metrics: [
    { label: 'Internship', value: '.NET Core', detail: 'eLogics Corp, Gandhidham' },
    { label: 'Shipped Work', value: '4 Projects', detail: 'AI Travel, Web & Mobile' },
    { label: 'Focus Stack', value: 'Web + Mobile', detail: 'Full-Stack & Cross-Platform' },
    { label: 'Credentials', value: '4 Certs', detail: 'CCNA, SRWE, SQL & Python' },
  ],
  experience: [
    {
      role: '.NET Developer Intern',
      company: 'eLogics Corporation',
      location: 'Gandhidham, Gujarat',
      period: 'Jun – Jul 2023',
      type: 'Production Web Engineering Internship',
      bullets: [
        'Built and maintained features for production web apps using ASP.NET MVC and .NET Core with senior developers.',
        'Debugged, tested, and refined features across the development lifecycle, improving stability and quality.',
      ],
      stack: ['ASP.NET MVC', '.NET Core', 'Web Application Lifecycle', 'Debugging & QA'],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: 'B.Tech – Computer Engineering',
      institution: 'Marwadi University, Rajkot',
      accreditation: 'NAAC A+',
      period: 'Expected: Feb 2027',
      metricLabel: 'Current CGPA',
      metricValue: '7.03',
      status: 'Current',
    },
    {
      degree: 'Diploma – Computer Engineering',
      institution: 'Marwadi University, Rajkot',
      accreditation: 'NAAC A+',
      period: 'May 2024',
      metricLabel: 'CGPA',
      metricValue: '7.78',
      status: 'Completed',
    },
    {
      degree: 'SSC (10th Grade)',
      institution: 'Shree Sahyog Sarswati Vidyamandir, Anjar, Gujarat',
      period: 'May 2021',
      metricLabel: 'Score',
      metricValue: '50%',
      status: 'Completed',
    },
  ] as EducationItem[],
  skills: [
    {
      id: 'languages',
      category: 'Languages',
      description: 'Core programming languages used across web backends, client logic, and mobile apps.',
      items: ['JavaScript', 'TypeScript', 'PHP', 'Dart'],
    },
    {
      id: 'frontend',
      category: 'Frontend',
      description: 'Responsive, structured interfaces built with modern component libraries and semantic markup.',
      items: ['React 18', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap 5', 'JavaScript (ES6+)'],
    },
    {
      id: 'mobile',
      category: 'Mobile',
      description: 'Cross-platform Flutter experiences and zero-dependency native Android engineering.',
      items: ['Flutter (Android & iOS)', 'Kotlin (Native Android)'],
    },
    {
      id: 'backend',
      category: 'Backend',
      description: 'Server-side MVC & REST architectures, authentication, and cloud/AI integrations.',
      items: ['Node.js', 'Express.js', 'PHP', 'ASP.NET MVC', '.NET Core', 'Firebase (Firestore, Auth)'],
    },
    {
      id: 'database',
      category: 'Database',
      description: 'Relational schema design, CRUD transactions, and NoSQL document synchronization.',
      items: ['MySQL', 'MongoDB', 'phpMyAdmin', 'Firebase Firestore'],
    },
    {
      id: 'tools-concepts',
      category: 'Tools & Engineering Concepts',
      description: 'Version control workflows, IDE tooling, and foundational software design patterns.',
      items: [
        'Git',
        'GitHub',
        'VS Code',
        'Android Studio',
        'Full-Stack Dev',
        'Mobile Dev',
        'REST APIs',
        'CRUD',
        'Auth Systems',
        'Responsive Design',
        'NoSQL Databases',
      ],
    },
  ] as SkillGroup[],
  projects: [
    {
      id: 'tripwise',
      title: 'TripWise – AI Travel Planner',
      subtitle: 'Full-Stack Itinerary Generator & Booking Ecosystem',
      category: 'Full-Stack Web',
      tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI'],
      githubUrl: 'https://github.com/milind-patadiya/TripWise',
      githubLabel: 'github.com/milind-patadiya/TripWise',
      summary:
        'Enterprise-grade full-stack travel planning application that leverages Google Gemini AI to generate personalized day-by-day itineraries with budget tracking, live destination weather, interactive maps, PDF export, and an admin management panel.',
      highlights: [
        'AI-powered day-by-day itinerary generation using Google Gemini with a resilient fallback engine based on budget and preferences.',
        'Smart dashboard featuring expense tracking, upcoming trip management, interactive React Leaflet maps, and live Open-Meteo weather integration.',
        'Branded downloadable PDF itinerary export via jsPDF alongside a secure Admin Panel for managing users, packages, and destinations.',
      ],
      architectureNotes: [
        'Decoupled Vite + React 18 + TypeScript client powered by Zustand, React Query, Framer Motion, and Recharts.',
        'RESTful Node.js + Express.js backend backed by MongoDB / Mongoose schemas and JWT authentication.',
        'Integrates Open-Meteo Weather, REST Countries, and Google Gemini APIs with automated database seeding.',
      ],
      featuredLabel: 'Full-Stack AI Web',
    },
    {
      id: 'cems-portal',
      title: 'CEMS – College Event Management Portal',
      subtitle: 'Full-Stack Event Lifecycle & Admin Dashboard',
      category: 'Full-Stack Web',
      tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
      githubUrl: 'https://github.com/milind-patadiya/CEMS-College-Event-Management-Portal',
      githubLabel: 'github.com/milind-patadiya/CEMS-College-Event-Management-Portal',
      summary:
        'A comprehensive web-based college event management platform connecting students and administrators with structured authentication, registration workflows, and centralized oversight.',
      highlights: [
        'Developed a web-based college event management system for students and administrators.',
        'Features include event creation, registration, participant management, authentication, and admin dashboard.',
        'Enabled efficient event tracking and streamlined communication between organizers and participants.',
      ],
      architectureNotes: [
        'Role-aware authentication separating student registration flows and administrator controls.',
        'Relational MySQL database backing event listings, participant records, and status tracking.',
        'Responsive Bootstrap & ES6 JavaScript UI delivering fast CRUD management on desktop and mobile.',
      ],
      featuredLabel: 'Full-Stack Web',
    },
    {
      id: 'gitaguide-path',
      title: 'GitaGuide – Path (Flutter App)',
      subtitle: 'Cross-Platform Spiritual Reader & Verse Explorer',
      category: 'Mobile',
      tech: ['Flutter', 'Dart'],
      githubUrl: 'https://github.com/milind-patadiya/gitaguide_project',
      githubLabel: 'github.com/milind-patadiya/gitaguide_project',
      summary:
        'Cross-platform mobile application built around the Bhagavad Gita, engineered for serene readability with structured chapter/verse browsing and clean Flutter UI craft.',
      highlights: [
        'Cross-platform mobile app based on Bhagavad Gita with chapter/verse browsing and clean Flutter UI.',
        'Built with modular Dart widgets for consistent rendering across Android and iOS targets.',
      ],
      architectureNotes: [
        'Clean hierarchical navigation from chapters to individual verses for frictionless reading.',
        'Focused distraction-free typography and responsive Flutter widget layout across screen densities.',
      ],
      featuredLabel: 'Flutter / Dart',
    },
    {
      id: 'snakes-and-ladders',
      title: 'Snakes and Ladders App',
      subtitle: 'Pure Kotlin Two-Player Native Android Engine',
      category: 'Native Android',
      tech: ['Kotlin'],
      summary:
        'A two-player native Android Snakes and Ladders game engineered from scratch in Kotlin with zero external libraries—featuring complete game rules, dice mechanics, board UI, and win detection.',
      highlights: [
        'Built a two-player Android Snakes and Ladders game with dice rolls and automatic snake/ladder movement.',
        'Implemented the complete game logic, board UI, and win detection natively in Kotlin with no external libraries.',
      ],
      architectureNotes: [
        'Deterministic state machine handling turn switching, dice bounds, board coordinates, and victory conditions.',
        'Zero third-party dependencies—pure native Kotlin & Android UI architecture.',
      ],
      featuredLabel: 'Native Kotlin',
    },
  ] as ProjectItem[],
  certifications: [
    {
      title: 'CCNA',
      issuerHint: 'Networking & Infrastructure',
      domain: 'Networking',
    },
    {
      title: 'Cisco SRWE',
      issuerHint: 'Switching, Routing & Wireless Essentials',
      domain: 'Network Engineering',
    },
    {
      title: 'Database & SQL',
      issuerHint: 'Relational Modeling & Querying',
      domain: 'Databases',
    },
    {
      title: 'Python for Data Science',
      issuerHint: 'Data Analysis & Scripting Foundations',
      domain: 'Data & Python',
    },
  ] as CertificationItem[],
  languages: [
    { name: 'English', proficiency: 'Intermediate' },
    { name: 'Hindi', proficiency: 'Fluent' },
    { name: 'Gujarati', proficiency: 'Native' },
  ] as LanguageItem[],
  activities: [
    {
      title: 'Participant – WebHorizon Technical Competition',
      organization: 'Marwadi University',
      detail: 'Competed in web engineering & rapid problem-solving challenges.',
    },
  ],
};
