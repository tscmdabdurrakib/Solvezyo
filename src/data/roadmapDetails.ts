import { Roadmap } from './roadmaps';

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  resources: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics?: string[];
  completed?: boolean;
}

export interface RoadmapResource {
  id: number;
  title: string;
  type: string;
  description: string;
  link: string;
}

export interface RoadmapTool {
  id: number;
  name: string;
  description: string;
  link: string;
}

export interface RoadmapDetail {
  id: string;
  title: string;
  description: string;
  steps: RoadmapStep[];
  resources: RoadmapResource[];
  tools: RoadmapTool[];
  stats: {
    modules: number;
    duration: string;
    learners: string;
    completion: string;
  };
}

// Roadmap details data
export const roadmapDetails: Record<string, RoadmapDetail> = {
  'web-development': {
    id: 'web-development',
    title: 'Web Development Roadmap',
    description: 'A complete guide to becoming a modern web developer, covering frontend and backend technologies.',
    stats: {
      modules: 12,
      duration: '24w',
      learners: '2.1k',
      completion: '87%'
    },
    steps: [
      {
        id: 1,
        title: "HTML Fundamentals",
        description: "Learn the structure of web pages with semantic HTML elements",
        duration: "1 week",
        resources: 5,
        difficulty: "Beginner",
        topics: ["HTML5", "Semantic Tags", "Forms", "Accessibility"]
      },
      {
        id: 2,
        title: "CSS Styling & Layout",
        description: "Master styling with CSS including Flexbox and Grid layouts",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Selectors", "Flexbox", "Grid", "Responsive Design"]
      },
      {
        id: 3,
        title: "JavaScript Basics",
        description: "Learn JavaScript fundamentals including DOM manipulation",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Beginner",
        topics: ["Variables", "Functions", "DOM", "Events"]
      },
      {
        id: 4,
        title: "Version Control with Git",
        description: "Master Git for code versioning and collaboration",
        duration: "1 week",
        resources: 6,
        difficulty: "Beginner",
        topics: ["Commits", "Branching", "Merging", "GitHub"]
      },
      {
        id: 5,
        title: "Frontend Frameworks",
        description: "Learn React or Vue.js for building modern user interfaces",
        duration: "4 weeks",
        resources: 15,
        difficulty: "Intermediate",
        topics: ["Components", "State Management", "Routing", "Hooks"]
      },
      {
        id: 6,
        title: "Backend Development",
        description: "Build server-side applications with Node.js or Python",
        duration: "4 weeks",
        resources: 14,
        difficulty: "Intermediate",
        topics: ["APIs", "Databases", "Authentication", "REST"]
      },
      {
        id: 7,
        title: "Database Design",
        description: "Learn SQL and NoSQL databases for data storage",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["SQL", "MongoDB", "ORM", "Schema Design"]
      },
      {
        id: 8,
        title: "Deployment & DevOps",
        description: "Deploy applications to production environments",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Intermediate",
        topics: ["CI/CD", "Docker", "Cloud Hosting", "Monitoring"]
      },
      {
        id: 9,
        title: "Performance Optimization",
        description: "Optimize web applications for speed and efficiency",
        duration: "2 weeks",
        resources: 11,
        difficulty: "Advanced",
        topics: ["Caching", "CDN", "Minification", "Lazy Loading"]
      },
      {
        id: 10,
        title: "Testing & QA",
        description: "Implement testing strategies for reliable applications",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Advanced",
        topics: ["Unit Tests", "E2E Tests", "Jest", "Cypress"]
      },
      {
        id: 11,
        title: "Security Best Practices",
        description: "Protect applications from common security vulnerabilities",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Advanced",
        topics: ["OWASP", "Authentication", "Encryption", "CSP"]
      },
      {
        id: 12,
        title: "Advanced Specializations",
        description: "Specialize in areas like mobile apps, desktop apps, or specific frameworks",
        duration: "4 weeks",
        resources: 12,
        difficulty: "Advanced",
        topics: ["PWA", "Electron", "Next.js", "Specialization"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "MDN Web Docs",
        type: "Documentation",
        description: "Comprehensive resource for HTML, CSS, and JavaScript",
        link: "https://developer.mozilla.org/en-US/"
      },
      {
        id: 2,
        title: "freeCodeCamp",
        type: "Course",
        description: "Free coding curriculum with projects and certifications",
        link: "https://www.freecodecamp.org/"
      },
      {
        id: 3,
        title: "CSS-Tricks",
        type: "Blog",
        description: "Articles and guides on CSS and frontend development",
        link: "https://css-tricks.com/"
      }
    ],
    tools: [
      {
        id: 1,
        name: "VS Code",
        description: "Popular code editor with extensive extensions",
        link: "https://code.visualstudio.com/"
      },
      {
        id: 2,
        name: "Chrome DevTools",
        description: "Browser developer tools for debugging and optimization",
        link: "https://developer.chrome.com/docs/devtools/"
      },
      {
        id: 3,
        name: "Postman",
        description: "API testing and development platform",
        link: "https://www.postman.com/"
      }
    ]
  },
  'app-development': {
    id: 'app-development',
    title: 'App Development Roadmap',
    description: 'Master the skills to build beautiful and functional mobile apps for iOS and Android.',
    stats: {
      modules: 10,
      duration: '20w',
      learners: '1.5k',
      completion: '82%'
    },
    steps: [
      {
        id: 1,
        title: "Mobile Development Fundamentals",
        description: "Understand mobile app architecture and platforms",
        duration: "1 week",
        resources: 5,
        difficulty: "Beginner",
        topics: ["iOS vs Android", "App Architecture", "UI/UX Principles", "App Stores"]
      },
      {
        id: 2,
        title: "Programming Language Selection",
        description: "Choose between native (Swift/Kotlin) or cross-platform (React Native/Flutter)",
        duration: "1 week",
        resources: 6,
        difficulty: "Beginner",
        topics: ["Swift", "Kotlin", "React Native", "Flutter"]
      },
      {
        id: 3,
        title: "UI/UX Design for Mobile",
        description: "Learn mobile-specific design principles and patterns",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Material Design", "Human Interface Guidelines", "Prototyping", "Responsive Layouts"]
      },
      {
        id: 4,
        title: "Development Environment Setup",
        description: "Set up development tools for your chosen platform",
        duration: "1 week",
        resources: 6,
        difficulty: "Beginner",
        topics: ["Xcode", "Android Studio", "Emulators", "Debugging Tools"]
      },
      {
        id: 5,
        title: "Core App Features Development",
        description: "Build essential app features like navigation, data handling, and user input",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Intermediate",
        topics: ["Navigation", "State Management", "Local Storage", "API Integration"]
      },
      {
        id: 6,
        title: "Data Management & Storage",
        description: "Implement data persistence and database integration",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["SQLite", "Core Data", "Room", "Firebase"]
      },
      {
        id: 7,
        title: "Networking & APIs",
        description: "Connect your app to backend services and REST APIs",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Intermediate",
        topics: ["HTTP Requests", "REST APIs", "JSON Parsing", "Authentication"]
      },
      {
        id: 8,
        title: "Testing & Debugging",
        description: "Test your app on different devices and debug issues",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["Unit Testing", "UI Testing", "Device Testing", "Performance Profiling"]
      },
      {
        id: 9,
        title: "App Store Deployment",
        description: "Prepare and publish your app to app stores",
        duration: "2 weeks",
        resources: 7,
        difficulty: "Advanced",
        topics: ["App Store Guidelines", "Play Store Guidelines", "App Signing", "Marketing"]
      },
      {
        id: 10,
        title: "Advanced Features & Optimization",
        description: "Implement advanced features and optimize app performance",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Advanced",
        topics: ["Push Notifications", "Offline Support", "Animations", "Performance Optimization"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "React Native Documentation",
        type: "Documentation",
        description: "Official documentation for React Native framework",
        link: "https://reactnative.dev/"
      },
      {
        id: 2,
        title: "Flutter Course by Google",
        type: "Course",
        description: "Official Flutter course from Google developers",
        link: "https://flutter.dev/docs"
      },
      {
        id: 3,
        title: "Mobile Design Patterns",
        type: "Book",
        description: "Collection of mobile UI patterns and best practices",
        link: "https://mobiledesignpatterns.com/"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Android Studio",
        description: "Official IDE for Android app development",
        link: "https://developer.android.com/studio"
      },
      {
        id: 2,
        name: "Xcode",
        description: "Official IDE for iOS app development",
        link: "https://developer.apple.com/xcode/"
      },
      {
        id: 3,
        name: "Figma",
        description: "Design tool for creating mobile app interfaces",
        link: "https://www.figma.com/"
      }
    ]
  },
  'ai-ml': {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning Roadmap',
    description: 'Explore the world of AI and ML, from basic concepts to advanced neural networks.',
    stats: {
      modules: 14,
      duration: '30w',
      learners: '1.8k',
      completion: '75%'
    },
    steps: [
      {
        id: 1,
        title: "Mathematics for AI/ML",
        description: "Master the mathematical foundations required for AI/ML",
        duration: "3 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Linear Algebra", "Calculus", "Probability", "Statistics"]
      },
      {
        id: 2,
        title: "Programming for Data Science",
        description: "Learn Python and essential libraries for data manipulation",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Beginner",
        topics: ["Python", "NumPy", "Pandas", "Matplotlib"]
      },
      {
        id: 3,
        title: "Data Analysis & Visualization",
        description: "Analyze datasets and create meaningful visualizations",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Beginner",
        topics: ["Data Cleaning", "EDA", "Seaborn", "Plotly"]
      },
      {
        id: 4,
        title: "Machine Learning Fundamentals",
        description: "Understand core ML concepts and algorithms",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Intermediate",
        topics: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"]
      },
      {
        id: 5,
        title: "Deep Learning Basics",
        description: "Learn neural networks and deep learning frameworks",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Intermediate",
        topics: ["Neural Networks", "TensorFlow", "PyTorch", "Backpropagation"]
      },
      {
        id: 6,
        title: "Computer Vision",
        description: "Build applications that can interpret visual data",
        duration: "3 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["Image Processing", "CNNs", "OpenCV", "Object Detection"]
      },
      {
        id: 7,
        title: "Natural Language Processing",
        description: "Process and analyze human language data",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Intermediate",
        topics: ["Text Preprocessing", "NLP Libraries", "Sentiment Analysis", "Transformers"]
      },
      {
        id: 8,
        title: "Model Deployment",
        description: "Deploy ML models to production environments",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Advanced",
        topics: ["Model Serving", "APIs", "Cloud Deployment", "Docker"]
      },
      {
        id: 9,
        title: "Advanced Deep Learning",
        description: "Explore cutting-edge deep learning techniques",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Advanced",
        topics: ["GANs", "Reinforcement Learning", "AutoML", "Transfer Learning"]
      },
      {
        id: 10,
        title: "AI Ethics & Bias",
        description: "Understand ethical considerations in AI development",
        duration: "1 week",
        resources: 6,
        difficulty: "Advanced",
        topics: ["Bias Detection", "Fairness", "Privacy", "Regulations"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "Andrew Ng's ML Course",
        type: "Course",
        description: "Comprehensive machine learning course by Stanford professor",
        link: "https://www.coursera.org/learn/machine-learning"
      },
      {
        id: 2,
        title: "Fast.ai",
        type: "Course",
        description: "Practical deep learning for coders",
        link: "https://www.fast.ai/"
      },
      {
        id: 3,
        title: "Kaggle Learn",
        type: "Platform",
        description: "Micro-courses on ML and data science topics",
        link: "https://www.kaggle.com/learn"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Jupyter Notebook",
        description: "Interactive development environment for data science",
        link: "https://jupyter.org/"
      },
      {
        id: 2,
        name: "Google Colab",
        description: "Cloud-based Jupyter notebook environment with free GPU access",
        link: "https://colab.research.google.com/"
      },
      {
        id: 3,
        name: "TensorFlow",
        description: "End-to-end open source machine learning platform",
        link: "https://www.tensorflow.org/"
      }
    ]
  },
  'data-science': {
    id: 'data-science',
    title: 'Data Science Roadmap',
    description: 'Learn how to extract insights from data using statistical analysis, and visualization.',
    stats: {
      modules: 11,
      duration: '26w',
      learners: '1.9k',
      completion: '80%'
    },
    steps: [
      {
        id: 1,
        title: "Introduction to Data Science",
        description: "Understand the field of data science and its applications",
        duration: "1 week",
        resources: 6,
        difficulty: "Beginner",
        topics: ["Data Science Lifecycle", "Roles & Responsibilities", "Tools Overview", "Ethics"]
      },
      {
        id: 2,
        title: "Mathematics & Statistics",
        description: "Master the mathematical and statistical foundations",
        duration: "3 weeks",
        resources: 10,
        difficulty: "Beginner",
        topics: ["Descriptive Statistics", "Probability", "Inferential Statistics", "Distributions"]
      },
      {
        id: 3,
        title: "Programming for Data Science",
        description: "Learn Python/R for data manipulation and analysis",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Beginner",
        topics: ["Python/R Basics", "Data Structures", "Libraries (Pandas, NumPy)", "Functions"]
      },
      {
        id: 4,
        title: "Data Wrangling & Cleaning",
        description: "Process messy real-world data into analysis-ready formats",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Intermediate",
        topics: ["Data Cleaning", "Missing Data", "Data Transformation", "Web Scraping"]
      },
      {
        id: 5,
        title: "Data Visualization",
        description: "Create compelling visualizations to communicate insights",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["Matplotlib", "Seaborn", "Plotly", "Dashboard Tools"]
      },
      {
        id: 6,
        title: "Exploratory Data Analysis",
        description: "Discover patterns and insights through data exploration",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["Hypothesis Generation", "Statistical Tests", "Correlation Analysis", "Outlier Detection"]
      },
      {
        id: 7,
        title: "Machine Learning for Data Science",
        description: "Apply ML techniques to solve data science problems",
        duration: "4 weeks",
        resources: 14,
        difficulty: "Advanced",
        topics: ["Regression", "Classification", "Clustering", "Model Evaluation"]
      },
      {
        id: 8,
        title: "Big Data Technologies",
        description: "Work with large datasets using big data tools",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Advanced",
        topics: ["SQL", "Spark", "Hadoop", "Cloud Platforms"]
      },
      {
        id: 9,
        title: "Data Storytelling",
        description: "Communicate findings effectively to stakeholders",
        duration: "1 week",
        resources: 7,
        difficulty: "Advanced",
        topics: ["Report Writing", "Presentation Skills", "Dashboard Design", "Business Context"]
      },
      {
        id: 10,
        title: "Specialized Domains",
        description: "Dive into specific areas like finance, healthcare, or marketing analytics",
        duration: "3 weeks",
        resources: 10,
        difficulty: "Advanced",
        topics: ["Domain Knowledge", "Specialized Tools", "Industry Case Studies", "Advanced Techniques"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "Python for Data Science Handbook",
        type: "Book",
        description: "Comprehensive guide to data science with Python",
        link: "https://jakevdp.github.io/PythonDataScienceHandbook/"
      },
      {
        id: 2,
        title: "DataCamp",
        type: "Platform",
        description: "Online learning platform focused on data science skills",
        link: "https://www.datacamp.com/"
      },
      {
        id: 3,
        title: "Kaggle Datasets",
        type: "Resource",
        description: "Large collection of datasets for practice and competitions",
        link: "https://www.kaggle.com/datasets"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Python",
        description: "Programming language widely used in data science",
        link: "https://www.python.org/"
      },
      {
        id: 2,
        name: "Tableau",
        description: "Powerful data visualization and business intelligence tool",
        link: "https://www.tableau.com/"
      },
      {
        id: 3,
        name: "Apache Spark",
        description: "Unified analytics engine for big data processing",
        link: "https://spark.apache.org/"
      }
    ]
  },
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing Roadmap',
    description: 'Your guide to SEO, content marketing, social media, and other essential digital marketing skills.',
    stats: {
      modules: 9,
      duration: '18w',
      learners: '1.3k',
      completion: '85%'
    },
    steps: [
      {
        id: 1,
        title: "Digital Marketing Fundamentals",
        description: "Understand the digital marketing landscape and core concepts",
        duration: "1 week",
        resources: 6,
        difficulty: "Beginner",
        topics: ["Marketing Channels", "Customer Journey", "KPIs", "ROI"]
      },
      {
        id: 2,
        title: "Market Research & Analytics",
        description: "Learn to research markets and analyze customer behavior",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Customer Personas", "Competitor Analysis", "Google Analytics", "Data Interpretation"]
      },
      {
        id: 3,
        title: "Content Marketing",
        description: "Create valuable content to attract and engage audiences",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Beginner",
        topics: ["Content Strategy", "Blogging", "SEO Content", "Content Calendar"]
      },
      {
        id: 4,
        title: "Search Engine Optimization (SEO)",
        description: "Optimize websites to rank higher in search engine results",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Intermediate",
        topics: ["Keyword Research", "On-Page SEO", "Technical SEO", "Link Building"]
      },
      {
        id: 5,
        title: "Social Media Marketing",
        description: "Leverage social platforms to build brand awareness",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["Platform Strategy", "Content Creation", "Community Management", "Social Ads"]
      },
      {
        id: 6,
        title: "Email Marketing",
        description: "Build email campaigns to nurture leads and retain customers",
        duration: "2 weeks",
        resources: 7,
        difficulty: "Intermediate",
        topics: ["List Building", "Email Design", "Automation", "Campaign Optimization"]
      },
      {
        id: 7,
        title: "Paid Advertising",
        description: "Run effective paid campaigns on Google, Facebook, and other platforms",
        duration: "3 weeks",
        resources: 10,
        difficulty: "Advanced",
        topics: ["Google Ads", "Facebook Ads", "PPC Strategy", "Conversion Optimization"]
      },
      {
        id: 8,
        title: "Marketing Automation",
        description: "Use tools to automate repetitive marketing tasks",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Advanced",
        topics: ["CRM Integration", "Lead Scoring", "Workflow Automation", "Personalization"]
      },
      {
        id: 9,
        title: "Advanced Analytics & Optimization",
        description: "Measure campaign performance and optimize for better results",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Advanced",
        topics: ["A/B Testing", "Attribution Models", "ROI Analysis", "Predictive Analytics"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "Google Digital Garage",
        type: "Course",
        description: "Free digital marketing course from Google",
        link: "https://learndigital.withgoogle.com/digitalgarage"
      },
      {
        id: 2,
        title: "HubSpot Academy",
        type: "Platform",
        description: "Free courses on inbound marketing and related topics",
        link: "https://academy.hubspot.com/"
      },
      {
        id: 3,
        title: "Moz Blog",
        type: "Blog",
        description: "SEO and inbound marketing resources",
        link: "https://moz.com/blog"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Google Analytics",
        description: "Web analytics service for tracking website traffic",
        link: "https://analytics.google.com/"
      },
      {
        id: 2,
        name: "SEMrush",
        description: "SEO and competitive analysis toolkit",
        link: "https://www.semrush.com/"
      },
      {
        id: 3,
        name: "Mailchimp",
        description: "Email marketing and automation platform",
        link: "https://mailchimp.com/"
      }
    ]
  },
  'cybersecurity': {
    id: 'cybersecurity',
    title: 'Cybersecurity Roadmap',
    description: 'Understand the principles of cybersecurity and learn how to protect systems from digital attacks.',
    stats: {
      modules: 12,
      duration: '28w',
      learners: '1.6k',
      completion: '78%'
    },
    steps: [
      {
        id: 1,
        title: "Cybersecurity Fundamentals",
        description: "Understand the cybersecurity landscape and core concepts",
        duration: "1 week",
        resources: 7,
        difficulty: "Beginner",
        topics: ["Threat Landscape", "Security Principles", "Risk Management", "Compliance"]
      },
      {
        id: 2,
        title: "Networking Basics",
        description: "Learn how networks function and common protocols",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Beginner",
        topics: ["OSI Model", "TCP/IP", "DNS", "Firewalls"]
      },
      {
        id: 3,
        title: "Operating System Security",
        description: "Secure Windows, Linux, and macOS systems",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Access Controls", "Hardening", "Patch Management", "Logging"]
      },
      {
        id: 4,
        title: "Cryptography Fundamentals",
        description: "Understand encryption and cryptographic protocols",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["Encryption Algorithms", "Hash Functions", "Digital Signatures", "PKI"]
      },
      {
        id: 5,
        title: "Identity & Access Management",
        description: "Manage user identities and control access to resources",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["Authentication", "Authorization", "SSO", "Privilege Management"]
      },
      {
        id: 6,
        title: "Security Assessment & Testing",
        description: "Identify vulnerabilities through testing and assessment",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Intermediate",
        topics: ["Vulnerability Scanning", "Penetration Testing", "Code Review", "Risk Assessment"]
      },
      {
        id: 7,
        title: "Incident Response & Forensics",
        description: "Respond to security incidents and investigate breaches",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Advanced",
        topics: ["Incident Handling", "Forensic Analysis", "Malware Analysis", "Reporting"]
      },
      {
        id: 8,
        title: "Web Application Security",
        description: "Secure web applications from common vulnerabilities",
        duration: "3 weeks",
        resources: 12,
        difficulty: "Advanced",
        topics: ["OWASP Top 10", "Input Validation", "Session Management", "API Security"]
      },
      {
        id: 9,
        title: "Cloud Security",
        description: "Secure cloud infrastructure and services",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Advanced",
        topics: ["Shared Responsibility", "Cloud Compliance", "Data Protection", "IAM in Cloud"]
      },
      {
        id: 10,
        title: "Governance & Compliance",
        description: "Understand regulatory requirements and security frameworks",
        duration: "2 weeks",
        resources: 7,
        difficulty: "Advanced",
        topics: ["ISO 27001", "NIST", "GDPR", "Auditing"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "Cybrary",
        type: "Platform",
        description: "Free cybersecurity training and courses",
        link: "https://www.cybrary.it/"
      },
      {
        id: 2,
        title: "OWASP",
        type: "Resource",
        description: "Open Web Application Security Project resources",
        link: "https://owasp.org/"
      },
      {
        id: 3,
        title: "SANS Institute",
        type: "Training",
        description: "Professional cybersecurity training and certifications",
        link: "https://www.sans.org/"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Wireshark",
        description: "Network protocol analyzer for troubleshooting",
        link: "https://www.wireshark.org/"
      },
      {
        id: 2,
        name: "Nmap",
        description: "Network discovery and security auditing tool",
        link: "https://nmap.org/"
      },
      {
        id: 3,
        name: "Metasploit",
        description: "Penetration testing framework",
        link: "https://www.metasploit.com/"
      }
    ]
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'Graphic Design Roadmap',
    description: 'A step-by-step guide to visual communication, branding, and design principles.',
    stats: {
      modules: 8,
      duration: '16w',
      learners: '1.1k',
      completion: '88%'
    },
    steps: [
      {
        id: 1,
        title: "Design Fundamentals",
        description: "Learn core design principles and elements",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Color Theory", "Typography", "Layout", "Visual Hierarchy"]
      },
      {
        id: 2,
        title: "Design Software Basics",
        description: "Master industry-standard design tools",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Beginner",
        topics: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma"]
      },
      {
        id: 3,
        title: "Branding & Identity",
        description: "Create visual identities and brand systems",
        duration: "2 weeks",
        resources: 7,
        difficulty: "Beginner",
        topics: ["Logo Design", "Brand Guidelines", "Color Palettes", "Brand Voice"]
      },
      {
        id: 4,
        title: "Print Design",
        description: "Design for physical media and print production",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["CMYK vs RGB", "Bleed & Margins", "Typography in Print", "Print Finishes"]
      },
      {
        id: 5,
        title: "Digital Design",
        description: "Create designs for web and digital platforms",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Intermediate",
        topics: ["Web Graphics", "UI/UX Design", "Social Media Assets", "Email Templates"]
      },
      {
        id: 6,
        title: "Typography Mastery",
        description: "Deep dive into typefaces and typographic principles",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["Type Classification", "Hierarchy", "Kerning & Tracking", "Web Typography"]
      },
      {
        id: 7,
        title: "Advanced Design Techniques",
        description: "Learn advanced techniques and specializations",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Advanced",
        topics: ["3D Design", "Motion Graphics", "Illustration", "Advanced Compositing"]
      },
      {
        id: 8,
        title: "Portfolio Development",
        description: "Build a professional portfolio to showcase your work",
        duration: "1 week",
        resources: 6,
        difficulty: "Advanced",
        topics: ["Case Studies", "Presentation", "Online Portfolio", "Client Communication"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "Canva Design School",
        type: "Course",
        description: "Free graphic design courses for beginners",
        link: "https://www.canva.com/designschool/"
      },
      {
        id: 2,
        title: "Design Principles",
        type: "Book",
        description: "Comprehensive guide to fundamental design principles",
        link: "https://www.designprinciplesftw.com/"
      },
      {
        id: 3,
        title: "Dribbble",
        type: "Community",
        description: "Show and tell for designers",
        link: "https://dribbble.com/"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Adobe Creative Suite",
        description: "Industry-standard design software collection",
        link: "https://www.adobe.com/creativecloud.html"
      },
      {
        id: 2,
        name: "Figma",
        description: "Collaborative interface design tool",
        link: "https://www.figma.com/"
      },
      {
        id: 3,
        name: "Procreate",
        description: "Powerful illustration app for iPad",
        link: "https://procreate.art/"
      }
    ]
  },
  'ui-ux-design': {
    id: 'ui-ux-design',
    title: 'UI/UX Design Roadmap',
    description: 'Learn to create intuitive and user-friendly digital experiences with this comprehensive guide.',
    stats: {
      modules: 10,
      duration: '22w',
      learners: '1.7k',
      completion: '84%'
    },
    steps: [
      {
        id: 1,
        title: "UX Design Fundamentals",
        description: "Understand user experience principles and processes",
        duration: "1 week",
        resources: 7,
        difficulty: "Beginner",
        topics: ["User-Centered Design", "Design Thinking", "UX Process", "User Research"]
      },
      {
        id: 2,
        title: "User Research & Analysis",
        description: "Learn methods to understand user needs and behaviors",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Beginner",
        topics: ["Interviews", "Surveys", "Personas", "Journey Maps"]
      },
      {
        id: 3,
        title: "Information Architecture",
        description: "Organize and structure content for optimal user experience",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Beginner",
        topics: ["Site Maps", "Navigation", "Categorization", "Labeling"]
      },
      {
        id: 4,
        title: "Wireframing & Prototyping",
        description: "Create low and high-fidelity representations of designs",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Intermediate",
        topics: ["Sketching", "Wireframing Tools", "Interactive Prototypes", "Usability Testing"]
      },
      {
        id: 5,
        title: "Visual Design Principles",
        description: "Apply visual design principles to create appealing interfaces",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Intermediate",
        topics: ["Layout", "Color", "Typography", "Visual Hierarchy"]
      },
      {
        id: 6,
        title: "UI Design Patterns",
        description: "Learn common UI patterns and components",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Intermediate",
        topics: ["Components", "Patterns", "Design Systems", "Responsive Design"]
      },
      {
        id: 7,
        title: "Interaction Design",
        description: "Design meaningful interactions and animations",
        duration: "2 weeks",
        resources: 10,
        difficulty: "Advanced",
        topics: ["Microinteractions", "Transitions", "Feedback", "Accessibility"]
      },
      {
        id: 8,
        title: "Usability Testing",
        description: "Test designs with real users to identify issues",
        duration: "2 weeks",
        resources: 9,
        difficulty: "Advanced",
        topics: ["Test Planning", "Moderation", "Analysis", "Reporting"]
      },
      {
        id: 9,
        title: "Design Systems",
        description: "Create and maintain scalable design systems",
        duration: "3 weeks",
        resources: 11,
        difficulty: "Advanced",
        topics: ["Component Libraries", "Style Guides", "Documentation", "Governance"]
      },
      {
        id: 10,
        title: "Advanced UX Specializations",
        description: "Explore specialized areas like service design or UX research",
        duration: "2 weeks",
        resources: 8,
        difficulty: "Advanced",
        topics: ["Service Design", "UX Research", "Content Strategy", "Voice UX"]
      }
    ],
    resources: [
      {
        id: 1,
        title: "NN/g UX Education",
        type: "Course",
        description: "Evidence-based UX training from Nielsen Norman Group",
        link: "https://www.nngroup.com/training/"
      },
      {
        id: 2,
        title: "UX Design for Beginners",
        type: "Book",
        description: "Comprehensive introduction to UX design principles",
        link: "https://www.uxdesignforbeginners.com/"
      },
      {
        id: 3,
        title: "UX Collective",
        type: "Blog",
        description: "Articles and insights on UX design practices",
        link: "https://uxdesign.cc/"
      }
    ],
    tools: [
      {
        id: 1,
        name: "Figma",
        description: "Collaborative interface design tool",
        link: "https://www.figma.com/"
      },
      {
        id: 2,
        name: "Sketch",
        description: "Digital design toolkit for Mac",
        link: "https://www.sketch.com/"
      },
      {
        id: 3,
        name: "InVision",
        description: "Digital product design platform",
        link: "https://www.invisionapp.com/"
      }
    ]
  }
};