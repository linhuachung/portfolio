export const contentVersion = '2026-10-27';

export const profile = {
  name: 'Lin Hua Chung',
  role: 'Frontend Engineer',
  headline: 'Frontend Engineer focused on complex forms, API-driven workflows, and product interfaces for banking and commerce.',
  introduction: 'I translate operational requirements into clear, resilient interfaces with React, TypeScript, and a practical full-stack perspective.',
  email: 'chunglh1304@gmail.com',
  location: 'Ho Chi Minh City, Vietnam',
  timezone: 'UTC+7',
  resume: '/cv',
  linkedin: 'https://www.linkedin.com/in/lin-hua-chung-200158179/',
  github: 'https://github.com/linhuachung',
  proofPoints: [
    'Frontend engineering since 2021',
    'Banking, commerce, and operational products',
    'React, TypeScript, APIs, and product UI'
  ]
};

export const projects = [
  {
    slug: 'mercatus', experienceSlug: 'mercatus', number: '01', title: 'Mercatus Grocery Commerce', employer: 'Mercatus Technologies Inc.', client: null,
    role: 'Frontend Developer', period: 'Mar 2024–Mar 2025', domain: 'Grocery commerce', market: 'United States and Canada',
    summary: 'E-commerce storefront work for grocery retailers serving customers across the United States and Canada.',
    confidentiality: 'public',
    contributions: [
      'Built and maintained storefront features across AngularJS, React, Next.js, and Drupal',
      'Integrated backend APIs and contributed to performance and quality improvements',
      'Helped onboard new project members and collaborated across a 30+ person team'
    ],
    technologies: ['JavaScript', 'AngularJS', 'React', 'Next.js', 'Drupal'],
    context: 'A multi-market grocery commerce platform with mature systems, cross-functional delivery, and varied frontend stacks.',
    live: 'https://shop.mercatus.com/',
    media: {
      src: '/assets/work/mercatus.png',
      alt: 'Mercatus grocery commerce storefront interface',
      source: 'Mercatus public product website',
      permission: 'confirmed',
      evidenceRole: 'product-proof',
      label: 'Product interface · Public product reference'
    }
  },
  {
    slug: 'nab', experienceSlug: 'nab', number: '02', title: 'Join NAB Customer Onboarding', employer: 'NAB Innovation Centre Vietnam', client: 'National Australia Bank (NAB)',
    role: 'Software Engineer (Frontend)', period: 'Mar 2025–Present', domain: 'Digital banking', market: 'Australia',
    summary: 'Customer-onboarding interfaces for NAB banking journeys, built around reusable schema-driven forms and clear validation states.',
    confidentiality: 'internal',
    contributions: [
      'Build reusable React and TypeScript components for schema-driven onboarding forms',
      'Integrate REST APIs and handle asynchronous data, validation, and error states',
      'Collaborate with design and backend teams through planning and code reviews'
    ],
    technologies: ['TypeScript', 'React', 'Jest', 'REST APIs'],
    context: 'A regulated banking product where clarity, maintainability, and dependable form behavior are central to the customer journey.',
    media: {
      src: '/assets/work/nabvietnam.jpg',
      alt: 'NAB Innovation Centre Vietnam office branding',
      source: 'NAB Innovation Centre Vietnam company media',
      permission: 'public-reference-only',
      evidenceRole: 'context-only',
      label: 'Context photograph · Not product evidence'
    }
  },
  {
    slug: 'dronex', experienceSlug: 'bap', number: '03', title: 'DroneX', employer: 'BAP IT Co., JSC', client: null,
    role: 'Frontend Developer', period: 'Feb 2023–Feb 2024', domain: 'Drone operations', market: 'Japan',
    summary: 'Interfaces for a Japanese-market product that helps users understand flight zones and manage drone flight registration.',
    confidentiality: 'internal',
    contributions: [
      'Built React interfaces from product requirements and design mockups',
      'Integrated backend APIs and clarified data flow with the delivery team',
      'Debugged product features and maintained shared frontend code'
    ],
    technologies: ['JavaScript', 'React', 'Redux', 'Ant Design'],
    context: 'A Japanese-market operations product translating domain rules into approachable map and registration workflows.',
    media: {
      src: '/assets/work/droneX.png',
      alt: 'DroneX flight-zone product interface',
      source: 'Project delivery archive',
      permission: 'needs-review',
      evidenceRole: 'product-proof',
      label: 'Internal interface · Publication pending'
    }
  },
  {
    slug: 'bintech', experienceSlug: 'bap', number: '04', title: 'Bintech', employer: 'BAP IT Co., JSC', client: null,
    role: 'Full-stack Developer', period: 'Feb 2022–Jan 2023', domain: 'Waste operations', market: 'Japan',
    summary: 'A Japanese-market operations product supporting industrial-waste collection requests and service workflows.',
    confidentiality: 'internal',
    contributions: [
      'Delivered React interfaces and Node.js service features',
      'Translated customer requirements into maintainable product behavior',
      'Integrated APIs and resolved issues across the application stack'
    ],
    technologies: ['React', 'Redux Saga', 'Node.js', 'Express', 'Sass'],
    context: 'A full-stack delivery environment serving operational users and customer workflows in Japan.',
    media: {
      src: '/assets/work/bintech.avif',
      alt: 'Bintech industrial-waste operations interface',
      source: 'Project delivery archive',
      permission: 'needs-review',
      evidenceRole: 'product-proof',
      label: 'Internal interface · Publication pending'
    }
  },
  {
    slug: 'shinhan', experienceSlug: 'fpt', number: '05', title: 'Shinhan Bank Operations', employer: 'FPT Software', client: 'Shinhan Bank',
    role: 'Frontend Developer', period: 'Oct 2021–Jan 2022', domain: 'Banking operations', market: 'Vietnam',
    summary: 'Internal customer-information screens designed to support reliable data entry in a banking operations product.',
    confidentiality: 'internal',
    contributions: [
      'Implemented WebSquare5 interfaces with HTML, CSS, and JavaScript',
      'Analyzed input-screen behavior and resolved UI defects',
      'Delivered requested features with the project team'
    ],
    technologies: ['WebSquare5', 'JavaScript', 'HTML', 'CSS'],
    context: 'An internal banking environment focused on accurate customer-information entry and dependable operational workflows.',
    media: {
      src: '/assets/work/shinhanbank.jpg',
      alt: 'Banking brand reference',
      source: 'Public brand reference',
      permission: 'public-reference-only',
      evidenceRole: 'context-only',
      label: 'Brand reference · Not product evidence'
    }
  }
];

export const experiences = [
  {
    slug: 'fpt', shortLabel: 'FPT', company: 'FPT Software', role: 'Frontend Developer', dates: 'Sep 2021–Jan 2022', year: '2021',
    logo: '/assets/resume/companyIcons/fpt_software.jpg',
    summary: 'Built internal customer-information screens for a banking operations product.',
    contributions: ['Implemented WebSquare5 interfaces with HTML, CSS, and JavaScript', 'Analyzed input-screen behavior and resolved UI defects', 'Delivered requested features with the project team'],
    stack: ['WebSquare5', 'JavaScript', 'HTML', 'CSS']
  },
  {
    slug: 'bap', shortLabel: 'BAP', company: 'BAP IT Co., JSC', role: 'Full-stack Developer', dates: 'Feb 2022–Feb 2024', year: '2022',
    logo: '/assets/resume/companyIcons/bap_it.jpg',
    summary: 'Delivered frontend and Node.js features for products serving the Japanese market.',
    contributions: ['Built React interfaces and Node.js/Express services', 'Translated customer requirements into technical solutions', 'Collaborated with a 10+ person team to deliver and debug product features'],
    stack: ['JavaScript', 'React', 'Node.js', 'Express', 'Redux']
  },
  {
    slug: 'mercatus', shortLabel: 'Mercatus', company: 'Mercatus Technologies Inc.', role: 'Frontend Developer', dates: 'Mar 2024–Mar 2025', year: '2024',
    logo: '/assets/resume/companyIcons/mercatus.jpg',
    summary: 'Built e-commerce interfaces for grocery retailers in the United States and Canada.',
    contributions: ['Built and maintained storefront features across AngularJS, React, Next.js, and Drupal', 'Integrated backend APIs and contributed to performance and quality improvements', 'Helped onboard new project members and collaborated across a 30+ person team'],
    stack: ['JavaScript', 'AngularJS', 'React', 'Next.js', 'Drupal']
  },
  {
    slug: 'nab', shortLabel: 'NAB', company: 'NAB Innovation Centre Vietnam', role: 'Software Engineer (Frontend)', dates: 'Mar 2025–Present', year: '2025',
    logo: '/assets/resume/companyIcons/nabvietnam.jpg',
    summary: 'Build customer-onboarding interfaces for NAB banking journeys.',
    contributions: ['Build reusable React and TypeScript components for schema-driven onboarding forms', 'Integrate REST APIs and handle asynchronous data, validation, and error states', 'Collaborate with design and backend teams through planning and code reviews'],
    stack: ['TypeScript', 'React', 'Jest', 'REST APIs']
  }
];

export const resumeSections = ['experience', 'skills', 'education', 'about'];

export const skills = [
  { group: 'Frontend', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'AngularJS'] },
  { group: 'Interface', items: ['HTML', 'CSS', 'Tailwind CSS', 'Responsive UI', 'Accessibility'] },
  { group: 'Integration', items: ['REST APIs', 'Node.js', 'Express', 'Drupal', 'Jest'] }
];

export const education = [
  {
    slug: 'open-university',
    school: 'Ho Chi Minh City Open University',
    programs: [
      { name: 'Computer Science', credential: '/assets/files/BangDaiHọc_LinHuaChung.pdf' }
    ],
    dates: '2016–2022',
    location: 'Ho Chi Minh City, Vietnam',
    logo: '/assets/resume/shoolIcons/ou.jpg'
  },
  {
    slug: 'cybersoft',
    school: 'Cybersoft Academy',
    programs: [
      { name: 'Professional Frontend Developer', credential: '/assets/files/LinHuaChung_Frontend.pdf' },
      { name: 'Professional NodeJS Developer', credential: '/assets/files/LinHuaChung_Backend.pdf' }
    ],
    dates: '2020–2021',
    location: 'Ho Chi Minh City, Vietnam',
    logo: '/assets/resume/shoolIcons/cyber_soft.jpg'
  }
];

export const about = {
  summary: 'Frontend Engineer with product experience in banking, commerce, and internal operations. I work across interface architecture, API integration, and delivery with distributed teams.',
  domains: ['Banking', 'Commerce', 'Internal Operations'],
  facts: [['Based in', 'Ho Chi Minh City, Vietnam'], ['Experience', 'Frontend engineering since 2021'], ['Languages', 'Vietnamese, English'], ['Focus', 'Reliable product interfaces']]
};

export const services = [
  { slug: 'frontend', number: '01', title: 'Frontend Engineering', description: 'Build maintainable product interfaces from architecture through delivery.', capabilities: ['React and Next.js implementation', 'Typed component architecture', 'API and state integration'], project: 'nab', projectLabel: 'See NAB work' },
  { slug: 'ui', number: '02', title: 'UI Implementation', description: 'Translate product designs into responsive, accessible interfaces.', capabilities: ['Responsive layout systems', 'Reusable UI components', 'Accessible interaction states'], project: 'mercatus', projectLabel: 'See Mercatus work' },
  { slug: 'performance', number: '03', title: 'Performance', description: 'Improve interface behavior with focused measurement and practical changes.', capabilities: ['Rendering-path review', 'Asset and bundle strategy', 'Runtime quality checks'], project: 'mercatus', projectLabel: 'See commerce work' },
  { slug: 'fullstack', number: '04', title: 'Full-stack Integration', description: 'Connect frontend journeys to dependable Node.js services and REST APIs.', capabilities: ['REST API integration', 'Node.js and Express features', 'Validation and error states'], project: 'bintech', projectLabel: 'See full-stack work' }
];
