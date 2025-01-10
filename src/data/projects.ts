import NullchemyShop from '@/assets/images/nullchemy_shop.png'
import WeCare from '@/assets/images/wecare_one.png'
import NPay from '@/assets/images/npay_landing.png'
import NAnalytics from '@/assets/images/analytics.png'
import NullEMS from '@/assets/images/null_ems.png'
import WenotiFy from '@/assets/images/wenotify.png'
import TenAfriq from '@/assets/images/tenafriq-landing-page.png'
import BebeWa from '@/assets/images/bebewa-dash.png'
import ShopYangu from '@/assets/images/shop-yangu-landing-page.png'

const projects = [
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
    imageUrl: TenAfriq,
    stack_string: 'Next.js/Postgres/Prisma',
    stack: ['Next.js', 'Postgres', 'Prisma'],
    title: 'Tenafriq',
    preview:
      'Tenafriq is a leading provider of AI-powered solutions, specializing in software development and robotics integration. With a mission to revolutionize industries, Tenafriq delivers innovative technologies that drive efficiency, growth, and competitive advantage for businesses across Africa. The platform represents the forefront of digital transformation in the region.',
    slug: 'tenafriq',
    external_url: 'https://tenafriq.com',
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
]

export default projects
