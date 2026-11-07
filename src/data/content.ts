export const CONTENT = {
  statusPill: 'AVAILABLE FOR WORK',
  about: [
    "I'm a QA engineer with 3+ years of experience testing web and mobile applications, and currently expanding into automation testing. My work covers the full testing cycle — writing and running test cases, smoke testing before releases, API testing with Postman, and digging into user-reported issues until I find the root cause. I've worked on products in the HRIS and waste management industries, collaborating closely with developers and product teams along the way. Most of my experience is in manual testing, and I recently completed an intensive Cypress bootcamp to start bringing automation into my work.",
    "Good documentation matters to me — a test case or bug report should make sense to anyone who reads it, not just me. I like working close to the team, asking questions early instead of finding surprises late, and every project ends up teaching me something new about how to test better."
  ],
  tags: ['🔍 Detail-oriented', '⚡ Agile / Scrum', '📱 Web · Mobile · API', '🐞 Bug Advocate', '🚀 Fast Learner'],
  infoCards: [
    { k: 'Location', v: 'Jakarta, Indonesia' },
    { k: 'Work preference', v: 'Remote / Hybrid / On-site' }
  ]
} as const;

export type ExperienceItemData = {
  id: string;
  title: string;
  org: string;
  employmentType: string;
  period: string;
  /** Total months (inclusive), rendered as a count-up "1y 10m". Current jobs compute this live. */
  durationMonths?: number;
  location: string;
  workMode: string;
  logo: string;
  logoVariant: 'w4c' | 'dealls' | 'dame-ulos' | 'digitalent' | 'jatis' | 'code-id';
  fallback: string;
  isCurrent?: boolean;
  bullets: string[];
};

export const EXPERIENCES: ExperienceItemData[] = [
  {
    id: 'dame-ulos',
    title: 'Project Manager',
    org: 'Dame Ulos · Traditional Textile',
    employmentType: 'Freelance',
    period: 'Jun 2025 - Present',
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/dame-ulos.webp',
    logoVariant: 'dame-ulos',
    fallback: 'D',
    isCurrent: true,
    bullets: [
      '*UI Design & Requirement Engineering*: Designing user interfaces using Figma while leading requirement discussions with stakeholders to define project deliverables, scope, and specifications.',
      '*Cross-Functional Coordinatio*n: Facilitating end-to-end communication with engineering teams throughout the development lifecycle to ensure smooth delivery.',
      '*Quality & Issue Resolution*: Performing manual testing against project requirements and investigating user-reported issues to identify root causes for prompt resolution.',
    ]
  },
  {
    id: 'dealls',
    title: 'Quality Assurance Analyst',
    org: 'Dealls · Human Resource Information System',
    employmentType: 'Full-time',
    period: 'Jun 2024 - May 2026',
    durationMonths: 24,
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/dealls.webp',
    logoVariant: 'dealls',
    fallback: 'D',
    bullets: [
      '*End-to-End Test Execution*: Designed, maintained, and executed manual, smoke, and ad hoc API test cases (via Postman) across web and mobile (Android/iOS) platforms for key HRIS modules, including Attendance, Shift, On-Call, and OKR.',
      '*Product Quality & Strategy*: Analyzed product requirement documents (PRDs) and collaborated with engineering and product teams to drive feature improvements and ensure smooth release deliveries.',
      '*Defect & Root Cause Analysis*: Investigated and reproduced user-reported issues escalated by customer support to pinpoint root causes and facilitate resolution.',
    ]
  },
  {
    id: 'w4c-contract',
    title: 'Quality Assurance',
    org: 'Waste4Change · Waste Management',
    employmentType: 'Contract',
    period: 'Sep 2022 - Jun 2024',
    durationMonths: 22,
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/w4c.webp',
    logoVariant: 'w4c',
    fallback: 'W',
    bullets: [
      '*Test Planning & Execution*: Designed, maintained, and executed end-to-end test cases (manual, API, smoke, and regression) for trading, production applications, and client dashboards across environments.',
      '*Defect & Lifecycle Management*: Identified, tracked, and reported software defects while conducting post-deployment system monitoring to ensure application stability.',
      '*UAT & Stakeholder Collaboration*: Partnered with internal stakeholders to drive User Acceptance Testing (UAT) prior to major releases and provided on-demand testing for newly deployed features.',
      '*Requirement Analysis & Documentation*: Analyzed product requirements to deliver quality evaluations and recommendations while maintaining master test plans and versioning documentation.'
    ]
  },
  {
    id: 'digitalent',
    title: 'Mentor (Women In Tech: Python and Cybersecurity)',
    org: 'Digital Talent Scholarship',
    employmentType: 'Contract',
    period: 'May 2023 - July 2023',
    durationMonths: 3,
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/digitalent.webp',
    logoVariant: 'digitalent',
    fallback: 'D',
    bullets: [
      'Provided guidance and mentorship to participants learning Python basics and Django.',
      'Conducted project reviews, assessed progress, and delivered constructive feedback.'
    ]
  },
  {
    id: 'jatis-mobile',
    title: 'Frontend Developer',
    org: 'Jatis Mobile',
    employmentType: 'Internship',
    period: 'Oct 2021 - Feb 2022',
    durationMonths: 5,
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/jatis-mobile.webp',
    logoVariant: 'jatis',
    fallback: 'J',
    bullets: [
      'Developed a human resource information system web application, focusing on Career and CMS modules.',
      'Leveraged Bootstrap and the Laravel framework for implementation.'
    ]
  },
  {
    id: 'code-id',
    title: 'Frontend Developer',
    org: 'PT Code Development Indonesia',
    employmentType: 'Internship',
    period: 'Jun 2021 - Aug 2021',
    durationMonths: 3,
    location: 'Jakarta, Indonesia',
    workMode: 'Remote',
    logo: '/img/company-logo/code.id.webp',
    logoVariant: 'code-id',
    fallback: 'C',
    bullets: [
      'Built an Android application for selling office products, assigned to design and implement UI for login, registration, and dashboard screens.'
    ]
  }
];

export type EducationItemData = {
  id: string;
  school: string;
  degree: string;
  grade?: string;
  period: string;
};

export const EDUCATION: EducationItemData[] = [
  {
    id: 'del',
    school: 'Institut Teknologi Del',
    degree: 'Bachelor of Engineering, Information System',
    grade: 'GPA: 3.27 / 4.00',
    period: 'Aug 2018 - Aug 2022'
  },
  {
    id: 'sanbercode',
    school: 'Sanbercode',
    degree: 'Quality Assurance Bootcamp',
    period: 'Jan 2024 - Feb 2024'
  },
  {
    id: 'afteroffice',
    school: 'AfterOffice Academy',
    degree: 'Intensive QA Automation Bootcamp – Cypress',
    period: 'Apr 2025 - Jun 2025'
  }
];

export type SkillGroupData = {
  icon: string;
  name: string;
  skills: string[];
};

export const SKILL_GROUPS: SkillGroupData[] = [
  {
    icon: '🧪',
    name: 'Testing',
    skills: [
      'Test Case Design',
      'Regression Testing',
      'Smoke Testing',
      'Manual Testing',
      'UAT',
      'API Testing',
      'Mobile Testing (Android & IOS)'
    ]
  },
  {
    icon: '🛠️',
    name: 'Tools',
    skills: ['Jira', 'Click Up', 'Figma', 'Jam.dev', 'Cypress', 'Testiny', 'Postman', 'Confluence', 'VS Code']
  },
  {
    icon: '🤝',
    name: 'Ways of working',
    skills: ['Agile / Scrum', 'Bug Triage', 'Documentation', 'Cross-team Communication']
  }
];

export type ProjectItemData = {
  id: string;
  type: string;
  title: string;
  description: string;
  href: string;
};

export const PROJECTS: ProjectItemData[] = [
  {
    id: 'playwright-suite',
    type: 'TEST AUTOMATION',
    title: 'Playwright Automation Suite',
    description:
      'End-to-end tests for the Kelas Otomesyen Test App, covering login, registration, and product management (add, edit, and delete), built with Playwright and TypeScript and run through GitHub Actions.',
    href: 'https://github.com/gracevrp/kelasotomesyen-automation-playwright'
  },
  {
    id: 'live-websites',
    type: 'TEST AUTOMATION',
    title: 'E2E Testing on Live Websites',
    description:
      'Cypress automation for real production sites — a flight booking flow on Agoda, product search and sorting on Amazon, and trending navigation on YouTube. Built with the Page Object Model, environment variables, and cross-page data assertions.',
    href: 'https://github.com/gracevrp/Final-Project'
  },
  {
    id: 'orangehrm',
    type: 'TEST AUTOMATION',
    title: 'OrangeHRM E2E UI Automation',
    description:
      'End-to-end Cypress tests for a web-based HR system — covering employee onboarding, leave entitlement, and a multi-role leave request and approval flow. Built around real HR workflows, switching between admin and employee accounts.',
    href: 'https://github.com/gracevrp/UI-Testing-Cypress'
  },
  {
    id: 'bdd-cypress',
    type: 'TEST AUTOMATION',
    title: 'BDD Automation with Cypress',
    description:
      'End-to-end tests for an e-commerce demo site, covering login, shopping cart, and checkout flows. Scenarios written in Gherkin with Cucumber, implemented in Cypress, and run automatically through GitHub Actions.',
    href: 'https://github.com/gracevrp/BDD-Cypress-Project'
  },
  {
    id: 'appium',
    type: 'MOBILE AUTOMATION',
    title: 'Flight Booking Automation — Appium',
    description:
      'Mobile automation tests for a flight booking app — covering one-way and round-trip booking flows. Built with Appium and Robot Framework using the Page Object Model.',
    href: 'https://github.com/gracevrp/Sanber53-Appium-Kelompok-8'
  }
];
