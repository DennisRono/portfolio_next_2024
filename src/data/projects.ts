import NullchemyShop from '@/assets/images/nullchemy_shop.png'
import WeCare from '@/assets/images/wecare_one.png'
import TqErp from '@/assets/images/tq_erp.png'
import NPay from '@/assets/images/npay_landing.png'
import NAnalytics from '@/assets/images/analytics.png'
import NullEMS from '@/assets/images/nems-dash.png'
import WenotiFy from '@/assets/images/wenotify.png'
import NBOTechLabs from '@/assets/images/tenafriq-landing-page.png'
import BebeWa from '@/assets/images/bebewa-dash.png'
import ShopYangu from '@/assets/images/shop-yangu-landing-page.png'
import ApS from '@/assets/images/aps-homepage.png'
import LinkedInClone from '@/assets/images/linkedin-clone.png'
import NullChemy from '@/assets/images/nullchemy.png'

const projects = [
  {
    id: 0,
    imageUrl: TqErp,
    stack_string: 'Next.js/FastAPI/Redis/PostreSQL/SQLAlchemy/Pydantic',
    stack: [
      'Next.js',
      'FastAPI',
      'Redis',
      'PostreSQL',
      'SQLAlchemy',
      'Pydantic',
      'Microservice'
    ],
    title: 'TQ-ANALYTICS',
    preview:
      'TQ-ANALYTICS is a comprehensive business management platform built for the distributed workplace. It streamlines operations across finance, HR, inventory, sales, and more with real-time analytics, automation, and 100+ integrations. Flexible deployment options and pricing plans make it ideal for businesses of all sizes.',
    slug: 'tq-analytics',
    external_url:
      'https://tq.tenafriq.com/login?username=demo@gmail.com&email=DemoPass123',
    made_at: 'NBO Tech Labs',
    year: '2025',
    client: 'NBO Tech Labs',
    docs: [
      {
        type: 'pdf',
        path: '/pdf/tq-analytics-report.pdf',
        file_name: 'tq-analytics-report.pdf',
      },
      {
        type: 'docx',
        path: '/docs/tq-analytics.docx',
        file_name: 'tq-analytics.docx',
      },
      {
        type: 'pptx',
        path: '/docs/tq-analytics.pptx',
        file_name: 'tq-analytics.pptx',
      },
    ],
  },
  {
    id: 1,
    imageUrl: WeCare,
    stack_string: 'React.js/Flask/Redis/MongoDB/Electra/Bert',
    stack: ['React.js', 'Flask', 'Redis', 'MongoDB', 'Electra', 'Bert'],
    title: 'WeCare',
    preview:
      'WeCare is a cutting-edge chatbot application designed to provide emotional support and assistance to users experiencing suicidal thoughts or emotional distress. Leveraging advanced AI technologies, it integrates Electra and Bert models to offer context-aware and empathetic conversations. The application ensures user privacy and security while fostering a safe space for mental health support.',
    slug: 'wecare',
    external_url: 'https://wecare.nullchemy.com',
    made_at: 'Machakos University',
    year: '2024',
    client: 'Machakos University Research Project',
    docs: [
      {
        type: 'pdf',
        path: '/pdf/wecare-report.pdf',
        file_name: 'wecare-report.pdf',
      },
      {
        type: 'docx',
        path: '/docs/wecare.docx',
        file_name: 'wecare.docx',
      },
      {
        type: 'pptx',
        path: '/docs/wecare.pptx',
        file_name: 'wecare.pptx',
      },
    ],
  },
  {
    id: 2,
    imageUrl: NullchemyShop,
    stack_string: 'Next.js/MongoDb',
    stack: ['Next.js', 'MongoDB'],
    title: 'nullchemy shop',
    preview:
      'nullchemy shop is an online marketplace that bridges the gap between buyers and sellers. It features powerful analytical tools for sellers to track performance and optimize sales strategies, while buyers enjoy a seamless shopping experience with intuitive navigation and secure transactions. The platform aims to revolutionize e-commerce with its scalable and user-friendly design.',
    slug: 'nullchemy-shop',
    external_url: 'https://shop.nullchemy.com',
    made_at: '',
    year: '2024',
    client: 'Internal Project',
  },

  {
    id: 5,
    imageUrl: NullEMS,
    stack_string: 'React.js/Express.js/MySQL',
    stack: ['React.js', 'Express.js', 'MySQL'],
    title: 'Null-EMS',
    preview:
      'Null-EMS is an advanced Human Resource Management System (HRMS) crafted to streamline organizational workflows. It features tools for employee onboarding, performance reviews, payroll management, and compliance tracking. With its scalable design, Null-EMS serves organizations of all sizes, ensuring operational efficiency and employee satisfaction.',
    slug: 'null-ems',
    external_url: 'https://nems.nullchemy.com',
    made_at: '',
    year: '2024',
    client: 'Internal Development Team',
  },
  {
    id: 6,
    imageUrl: WenotiFy,
    stack_string: 'React Native/Django/MongoDB',
    stack: ['React Native', 'Django', 'MongoDB'],
    title: 'WenotiFy Kenya',
    preview:
      'WenotiFy Kenya is a transformative mobile application that empowers citizens to report crimes and emergencies in real-time to law enforcement. The app features multimedia support for submitting evidence and ensures user safety with encrypted communications. WenotiFy aims to build safer communities by bridging the gap between citizens and authorities through technology.',
    slug: 'wenotify-kenya',
    external_url: 'https://wenotify.nullchemy.com',
    made_at: 'Machakos University',
    year: '2024',
    client: 'Machakos University Public Safety Initiative',
  },
  {
    id: 7,
    imageUrl: NBOTechLabs,
    stack_string: 'Next.js/Postgres/Prisma',
    stack: ['Next.js', 'Postgres', 'Prisma'],
    title: 'NBO Tech Labs',
    preview:
      'NBO Tech Labs is a leading provider of AI-powered solutions, specializing in software development and robotics integration. With a mission to revolutionize industries, Tenafriq delivers innovative technologies that drive efficiency, growth, and competitive advantage for businesses across Africa. The platform represents the forefront of digital transformation in the region.',
    slug: 'nbotechlabs',
    external_url: 'https://nbotechlabs.com/',
    made_at: 'Freelance (After School)',
    year: '2025',
    client: 'Freelance Client',
  },
  {
    id: 8,
    imageUrl: BebeWa,
    stack_string: 'react.js/Postgres/Flask/React Native/Expo/Socket.io',
    stack: ['Next.js', 'Postgres', 'react.js', 'React Native', 'socket.io'],
    title: 'Bebewa Logistics',
    preview:
      'Bebewa Logistics is an innovative platform developed for merchants to seamlessly manage deliveries via a network of freelance drivers. The system features real-time tracking, automated dispatch, and payment integration, ensuring a streamlined logistics experience. Bebewa empowers businesses to scale operations and enhance customer satisfaction.',
    slug: 'bebewa-logistics',
    external_url: 'https://bebewa-admin.pages.dev/',
    client: 'Titus Njoroge',
    made_at: 'Freelance (After School)',
    year: '2025',
  },
  {
    id: 9,
    imageUrl: ShopYangu,
    stack_string: 'Next.js/MongoDb/Zod',
    stack: ['Next.js', 'MongoDB', 'Zod'],
    title: 'Shop Yangu',
    preview:
      'Shop Yangu is a robust dashboard platform developed to manage shops, products, and users. The application provides comprehensive analytics, inventory tracking, and user management tools, enabling shop owners to optimize operations and improve profitability. Shop Yangu is designed to meet the needs of modern retail businesses.',
    slug: 'shop-yangu',
    external_url: 'https://shopyangu-ten.vercel.app/',
    client: 'Sare Africa Assignment',
    made_at: 'Freelance (After School)',
    year: '2025',
  },
  {
    id: 10,
    imageUrl: ApS,
    stack_string: 'Next.js/MongoDb/Zod',
    stack: ['Next.js', 'MongoDB', 'Zod'],
    title: 'Aerial Properties Solutions Limited',
    preview:
      'A modern and responsive website built for Aerial Properties Solutions Limited, showcasing their commitment to delivering exceptional service and value to their clients. The platform provides a seamless user experience, reflecting the company’s dedication to professionalism and customer satisfaction.',
    slug: 'aerial-properties-solutions-limited',
    external_url: 'https://aps.nullchemy.com/',
    client: 'Aerial Properties Solutions Limited',
    made_at: 'Freelance (After School)',
    year: '2025',
  },
  {
    id: 11,
    imageUrl: LinkedInClone,
    stack_string: 'React.js/ChakraUI',
    stack: ['React.js', 'ChakraUI'],
    title: 'LinkedIn Clone',
    preview:
      "A personal project replicating LinkedIn's core functionalities, built with React.js and styled using ChakraUI. This clone features user authentication, profile management, and a dynamic news feed, providing a platform to connect and share professional updates.",
    slug: 'linkedin-clone',
    external_url: 'https://aps.nullchemy.com/',
    client: 'Personal Project',
    made_at: 'Freelance (After School)',
    year: '2024',
  },
  {
    id: 12,
    imageUrl: NullChemy,
    stack_string: 'React.js/TailwindCSS/Express.js/MongoDB',
    stack: ['React.js', 'TailwindCSS', 'Express.js', 'MongoDB'],
    title: 'nullchemy.com',
    preview:
      'The official website for nullchemy, developed to showcase our custom software development services. Built with React.js for a dynamic user interface, styled with TailwindCSS for responsive design, and powered by Express.js and MongoDB for robust backend support.',
    slug: 'nullchemy',
    external_url: 'https://nullchemy.com/',
    client: 'nullchemy',
    made_at: 'Machakos University',
    year: '2024',
  },
  {
    id: 3,
    imageUrl: NPay,
    stack_string: 'Flutter/Flutter/MySQL',
    stack: ['Flutter', 'Flutter', 'MySQL'],
    title: 'NPay',
    preview:
      'NPay is a state-of-the-art mobile payment solution designed to simplify transactions and empower users with actionable financial insights. It features budget planning tools, scheduled payments, and personalized analytics to help users manage their finances effectively. NPay is engineered to redefine the mobile payment ecosystem with its user-centric design and robust functionality.',
    slug: 'npay',
    external_url: 'https://npay.nullchemy.com',
    made_at: 'Machakos University',
    year: '2024',
    client: 'Machakos University FinTech Initiative',
  },
  {
    id: 4,
    imageUrl: NAnalytics,
    stack_string: 'React Native/Express.js/MySQL',
    stack: ['React Native', 'Express.js', 'MySQL'],
    title: 'N-Analytics',
    preview:
      'N-Analytics is a comprehensive business intelligence tool tailored for enterprises seeking data-driven insights. It facilitates advanced analytics for supply chain management, performance tracking, and decision-making. With its intuitive dashboards and robust backend, N-Analytics empowers businesses to optimize operations and enhance productivity.',
    slug: 'n-analytics',
    external_url: 'https://analytics.nullchemy.com',
    made_at: '',
    year: '2024',
    client: 'Internal Development Team',
  },
]

export default projects
