/**
 * Edifyron Engineering Learning Platform Database
 * Focused on: Python, Java, C, C++, DSA, Web Dev, and Campus Placements
 * Branding: Edifyron - "THE FUTURE STARTS HERE" & "MADE IN INDIA - MADE FOR INDIA"
 */

const EDIFYRON_CATEGORIES = [
  {
    id: "programming",
    name: "Core Languages",
    icon: "code",
    subcategories: [
      { id: "c-cpp", name: "C & C++ Programming", count: 180 },
      { id: "java", name: "Java & Spring Boot", count: 240 },
      { id: "python", name: "Python for Engineers", count: 310 },
      { id: "javascript", name: "JavaScript & TypeScript", count: 195 }
    ]
  },
  {
    id: "dsa-placements",
    name: "DSA & Placements",
    icon: "layers",
    subcategories: [
      { id: "dsa", name: "Data Structures & Algorithms", count: 160 },
      { id: "leetcode", name: "LeetCode Top 150 Problems", count: 120 },
      { id: "competitive-coding", name: "Competitive Programming", count: 90 },
      { id: "system-design", name: "System Design & Low-Level Design", count: 110 }
    ]
  },
  {
    id: "core-cs",
    name: "Core CS Subjects",
    icon: "cpu",
    subcategories: [
      { id: "dbms", name: "DBMS & SQL Query Mastery", count: 130 },
      { id: "os", name: "Operating Systems (Linux)", count: 95 },
      { id: "cn", name: "Computer Networks", count: 85 },
      { id: "oops", name: "Object Oriented Programming (OOP)", count: 115 }
    ]
  },
  {
    id: "development",
    name: "Full-Stack Web & App",
    icon: "globe",
    subcategories: [
      { id: "web-dev", name: "MERN & React 19 Full-Stack", count: 280 },
      { id: "backend", name: "Backend APIs with Node & Java", count: 175 },
      { id: "mobile-dev", name: "Flutter Mobile App Dev", count: 140 }
    ]
  }
];

// Comprehensive Engineering Course Catalog with Indian Rupee (₹) Pricing
const EDIFYRON_COURSES = [
  {
    id: "c1",
    title: "Mastering C & C++ from Scratch to Advanced (Placement Ready)",
    headline: "Pointers, Dynamic Memory Allocation, Memory Leaks, Structs, OOP, STL Templates & 50+ Coding Questions.",
    category: "programming",
    subcategory: "c-cpp",
    skillTab: "c-cpp",
    instructor: {
      name: "Prof. Rajesh Sharma (Ex-IITD)",
      title: "Senior Systems Engineer & Competitive Programming Coach",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 48500,
      studentsCount: 240000,
      coursesCount: 6,
      bio: "Prof. Rajesh has trained over 240,000 Indian engineering students in C/C++ memory architecture and campus recruitment tests."
    },
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    badge: "Bestseller",
    rating: 4.9,
    ratingCount: 89400,
    students: 310000,
    price: 399,
    originalPrice: 2999,
    durationHours: 38.5,
    articlesCount: 45,
    resourcesCount: 110,
    lecturesCount: 220,
    level: "All Levels (1st to 4th Year B.Tech)",
    language: "English & Hinglish Support",
    subtitles: ["English", "Hindi"],
    lastUpdated: "February 2026",
    objectives: [
      "Master C memory architecture: Stack vs Heap, malloc/free, pointer arithmetic, and double pointers",
      "Object Oriented Programming (OOP) in C++: Classes, Polymorphism, Virtual Functions, and Operator Overloading",
      "Master C++ Standard Template Library (STL): Vectors, Sets, Maps, Priority Queues, and Iterators",
      "Solve 50+ previous year TCS, Infosys, Wipro, and Amazon coding round questions"
    ],
    prerequisites: ["No prior coding required - starts from basic logic and flowcharts."],
    description: `The most thorough and practical C and C++ masterclass in India.\n\nDesigned specifically for engineering students (B.Tech CSE/IT/ECE, BCA, MCA) to build rock-solid foundational programming concepts and clear all technical campus interview rounds.`,
    curriculum: [
      {
        sectionTitle: "Section 1: C Fundamentals & Memory Model",
        lectureCount: 8,
        duration: "2h 30m",
        lectures: [
          { id: "l1_1", title: "How C Code Executes: Preprocessing, Compiling, Linking", duration: "12:10", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l1_2", title: "Pointers Decoded: Address of Operator (&) and Dereferencing (*)", duration: "24:35", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
          { id: "l1_3", title: "Dynamic Memory: malloc, calloc, realloc, and avoiding Memory Leaks", duration: "28:15", isFree: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" }
        ]
      },
      {
        sectionTitle: "Section 2: C++ OOP & Standard Template Library (STL)",
        lectureCount: 12,
        duration: "4h 45m",
        lectures: [
          { id: "l1_4", title: "Classes, Constructors, Destructors and Deep vs Shallow Copy", duration: "25:40", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l1_5", title: "C++ STL Masterclass: Vectors, Sets, Unordered Maps & Lambdas", duration: "36:20", isFree: false, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r1", user: "Adarsh Singh (IIT BHU)", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80", rating: 5, date: "2 days ago", comment: "The pointers and STL sections made coding rounds so effortless. Cleared my campus technical test with ease!" },
      { id: "r2", user: "Sneha Reddy (NIT Surathkal)", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80", rating: 5, date: "1 week ago", comment: "Rajesh Sir explains C pointers and memory allocation with extreme clarity. Best course for engineering students!" }
    ]
  },
  {
    id: "c2",
    title: "Java Full-Stack & Spring Boot Masterclass for Engineers",
    headline: "Core Java 21, Collections Framework, Multithreading, Spring Boot 3, Hibernate, REST APIs & Microservices.",
    category: "programming",
    subcategory: "java",
    skillTab: "java",
    instructor: {
      name: "Siddharth Verma (Ex-Amazon Staff)",
      title: "Lead Enterprise Architect & Java Placement Mentor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 62000,
      studentsCount: 310000,
      coursesCount: 8,
      bio: "Siddharth has designed scalable banking backend systems in Java and trained hundreds of thousands of Indian engineers."
    },
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    badge: "Highest Rated",
    rating: 4.9,
    ratingCount: 78500,
    students: 295000,
    price: 499,
    originalPrice: 3499,
    durationHours: 52.0,
    articlesCount: 38,
    resourcesCount: 92,
    lecturesCount: 310,
    level: "All Levels",
    language: "English & Hindi",
    subtitles: ["English", "Hindi"],
    lastUpdated: "January 2026",
    objectives: [
      "Master Core Java: JVM internals, Garbage Collection, OOPs, Exceptions, and Java 21 Virtual Threads",
      "Deep dive into Java Collections Framework (ArrayList, LinkedList, HashMap, ConcurrentHashMap, TreeSet)",
      "Build production-grade REST APIs using Spring Boot 3, Spring Data JPA, and PostgreSQL",
      "Deploy scalable microservices with Docker, JWT authentication, and Kafka message streaming"
    ],
    prerequisites: ["Basic logic building."],
    description: `The complete, end-to-end Java career track designed for Indian engineering students seeking software development roles at product and services companies.`,
    curriculum: [
      {
        sectionTitle: "Section 1: Java Core, JVM & Memory Management",
        lectureCount: 10,
        duration: "3h 15m",
        lectures: [
          { id: "l2_1", title: "JVM Architecture: ClassLoader, Heap, Stack, and Garbage Collection", duration: "22:15", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
          { id: "l2_2", title: "Java Collections Deep Dive: Internal Working of HashMap", duration: "31:40", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r2_1", user: "Vikram Malhotra (BITS Pilani)", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80", rating: 5, date: "3 days ago", comment: "The explanation of how HashMap handles collisions and resizing is pure gold. Helped me crack my Oracle interview." }
    ]
  },
  {
    id: "c3",
    title: "100 Days of Python: From College Basics to AI & Automation",
    headline: "Python 3.12, OOP, File Handling, Web Scraping, Data Science (Pandas/NumPy), FastAPI & Capstone Projects.",
    category: "programming",
    subcategory: "python",
    skillTab: "python",
    instructor: {
      name: "Dr. Angela Yu & Ankit Bansal",
      title: "Lead Developer Educators",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 290000,
      studentsCount: 1150000,
      coursesCount: 10,
      bio: "Angela and Ankit have trained over a million learners worldwide with hands-on, project-first pedagogy."
    },
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    badge: "Bestseller",
    rating: 4.8,
    ratingCount: 278000,
    students: 1200000,
    price: 449,
    originalPrice: 3299,
    durationHours: 58.0,
    articlesCount: 50,
    resourcesCount: 140,
    lecturesCount: 395,
    level: "All Levels",
    language: "English",
    subtitles: ["English", "Hindi"],
    lastUpdated: "February 2026",
    objectives: [
      "Build 100 Python projects over 100 days to develop real programming muscle memory",
      "Master Python data analysis with Pandas, NumPy, Matplotlib, and Seaborn",
      "Automate tasks, build web scrapers with BeautifulSoup/Selenium, and develop APIs with FastAPI"
    ],
    prerequisites: ["No previous coding experience."],
    description: `Master Python from absolute basics to advanced software development and AI engineering with 100 real-world projects.`,
    curriculum: [
      {
        sectionTitle: "Day 1-10: Python Essentials for Engineers",
        lectureCount: 12,
        duration: "3h 20m",
        lectures: [
          { id: "l3_1", title: "Day 1 - Variables, Data Types & Console I/O", duration: "14:20", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r3_1", user: "Kavya Murthy (DTU Delhi)", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80", rating: 5, date: "Yesterday", comment: "The daily project format keeps you accountable and builds genuine confidence." }
    ]
  },
  {
    id: "c4",
    title: "Data Structures & Algorithms (DSA) Mastery for FAANG Placements",
    headline: "Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Greedy, Backtracking in C++ & Java with 200+ LeetCode Problems.",
    category: "dsa-placements",
    subcategory: "dsa",
    skillTab: "dsa",
    instructor: {
      name: "Striver & Sandeep Jain",
      title: "Senior Algorithms Mentors & Competitive Programming Grandmasters",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      rating: 4.95,
      reviewsCount: 154000,
      studentsCount: 520000,
      coursesCount: 5,
      bio: "Striver has mentored thousands of Indian engineering students who cracked Google, Microsoft, Uber, Amazon, and top product firms."
    },
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    badge: "Top Placement Choice",
    rating: 4.95,
    ratingCount: 112000,
    students: 480000,
    price: 499,
    originalPrice: 3999,
    durationHours: 65.0,
    articlesCount: 60,
    resourcesCount: 180,
    lecturesCount: 350,
    level: "Intermediate to Advanced",
    language: "English & Hindi",
    subtitles: ["English", "Hindi"],
    lastUpdated: "February 2026",
    objectives: [
      "Master Time and Space Complexity Analysis (Big-O notation, Master Theorem)",
      "Master Linear & Non-Linear DSA: Arrays, Matrix, Strings, Linked Lists, Stacks, Queues, Heaps",
      "Trees & Graphs: BST, AVL, Segment Trees, BFS, DFS, Dijkstra, Bellman-Ford, Disjoint Set Union",
      "Dynamic Programming (1D, 2D, DP on Trees, DP on Grids) & Greedy Strategies for Coding Rounds"
    ],
    prerequisites: ["Knowledge of C++, Java, or Python basics."],
    description: `The ultimate roadmap to master Data Structures & Algorithms and crack coding interviews at Google, Microsoft, Amazon, and top startups.`,
    curriculum: [
      {
        sectionTitle: "Section 1: Arrays, Two-Pointers & Sliding Window",
        lectureCount: 14,
        duration: "4h 15m",
        lectures: [
          { id: "l4_1", title: "Two-Pointer & Sliding Window Masterclass with 10 LeetCode Problems", duration: "32:10", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r4_1", user: "Harsh Vardhan (IIT Roorkee)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80", rating: 5, date: "4 days ago", comment: "The DP and Graph sections are phenomenal. Cracking coding rounds is now second nature." }
    ]
  },
  {
    id: "c5",
    title: "DBMS, SQL Queries & System Design for Engineering Placements",
    headline: "Relational Algebra, Complex SQL Queries, Indexing, Transactions (ACID), Normalization & High-Level System Design.",
    category: "core-cs",
    subcategory: "dbms",
    skillTab: "core-cs",
    instructor: {
      name: "Abhishek Saini",
      title: "Database Architect & Ex-Microsoft Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewsCount: 38000,
      studentsCount: 165000,
      coursesCount: 4,
      bio: "Abhishek has designed high-throughput distributed database engines and guided university students on core CS placement rounds."
    },
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    badge: "Core CS Favorite",
    rating: 4.8,
    ratingCount: 34200,
    students: 145000,
    price: 349,
    originalPrice: 2499,
    durationHours: 26.0,
    articlesCount: 22,
    resourcesCount: 54,
    lecturesCount: 140,
    level: "All Levels",
    language: "English & Hindi",
    subtitles: ["English", "Hindi"],
    lastUpdated: "January 2026",
    objectives: [
      "Master SQL Queries: Window Functions, CTEs, Self-Joins, Subqueries & Query Optimization",
      "Database Internals: B+ Trees Indexing, Query Execution Plans, Lock mechanisms & Isolation Levels",
      "System Design Fundamentals: Caching (Redis), Load Balancing, Sharding & CAP Theorem"
    ],
    prerequisites: ["Basic computer understanding."],
    description: `Everything you need to master DBMS, complex SQL writing, and fundamental system design for tech interviews.`,
    curriculum: [
      {
        sectionTitle: "Section 1: Complex SQL Queries & Window Functions",
        lectureCount: 8,
        duration: "2h 40m",
        lectures: [
          { id: "l5_1", title: "Top 20 SQL Interview Queries Solved Live (LEAD, LAG, RANK, DENSE_RANK)", duration: "28:15", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r5_1", user: "Tanya Sen (NIT Rourkela)", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80", rating: 5, date: "1 week ago", comment: "The SQL window functions and indexing chapters are directly asked in Amazon and Swiggy interviews!" }
    ]
  },
  {
    id: "c6",
    title: "Operating Systems, Linux & Computer Networks Placement Kit",
    headline: "Process Management, Threads, Deadlocks, Virtual Memory, TCP/IP, Sockets, DNS, HTTP/3 & 100 Viva Questions.",
    category: "core-cs",
    subcategory: "os",
    skillTab: "core-cs",
    instructor: {
      name: "Prof. Rajesh Sharma",
      title: "Computer Science Faculty & Placement Mentor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 4.85,
      reviewsCount: 42000,
      studentsCount: 190000,
      coursesCount: 6,
      bio: "Experienced professor teaching core computer science subjects for university semesters and campus recruitment."
    },
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    previewVideo: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    badge: "Placement Kit",
    rating: 4.85,
    ratingCount: 29500,
    students: 130000,
    price: 349,
    originalPrice: 2499,
    durationHours: 24.0,
    articlesCount: 30,
    resourcesCount: 65,
    lecturesCount: 120,
    level: "All Levels",
    language: "English & Hindi",
    subtitles: ["English", "Hindi"],
    lastUpdated: "January 2026",
    objectives: [
      "Master OS Process Management, CPU Scheduling Algorithms, Semaphores, Mutex, and Deadlocks",
      "Memory Management: Paging, Segmentation, TLB, Page Replacement Algorithms (LRU, FIFO)",
      "Computer Networks: OSI Model, TCP 3-Way Handshake, UDP, DNS, HTTPS, and Socket Programming"
    ],
    prerequisites: ["Computer Science student."],
    description: `The complete revision and placement preparation kit for Operating Systems, Linux, and Computer Networks.`,
    curriculum: [
      {
        sectionTitle: "Section 1: Operating Systems Core",
        lectureCount: 8,
        duration: "2h 10m",
        lectures: [
          { id: "l6_1", title: "Processes vs Threads, Concurrency and Race Conditions Explained", duration: "24:10", isFree: true, videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }
        ]
      }
    ],
    reviews: [
      { id: "r6_1", user: "Nitin Goyal (VIT Vellore)", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80", rating: 5, date: "3 days ago", comment: "Covered my entire 5th semester syllabus and helped me ace my technical viva!" }
    ]
  }
];

// 30-Second Educational Skill Reels for Engineering Students (C, C++, Java, Python, DSA)
const EDIFYRON_REELS = [
  {
    id: "reel-1",
    title: "C Pointers in 30 Seconds (* vs & Operators) 🎯",
    desc: "Memory addresses, pointer dereferencing and why pointers are crucial in systems engineering!",
    creator: {
      name: "Prof. Rajesh Sharma",
      handle: "@rajesh_cpp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=80",
    tags: ["#CProgramming", "#Pointers", "#EngineeringHacks"],
    duration: "0:30",
    views: "348.5K",
    likes: 28420,
    courseRef: "c1"
  },
  {
    id: "reel-2",
    title: "Java Memory Model: Stack vs Heap in 30s ☕",
    desc: "Where primitives, object references, and String pool reside inside the JVM!",
    creator: {
      name: "Siddharth Verma",
      handle: "@sid_java",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80",
    tags: ["#Java", "#JVM", "#PlacementsPrep"],
    duration: "0:30",
    views: "482.0K",
    likes: 39190,
    courseRef: "c2"
  },
  {
    id: "reel-3",
    title: "Python List Comprehensions vs Loops in 30s 🐍",
    desc: "Write 5 lines of loop in a single elegant Python line for coding tests!",
    creator: {
      name: "Dr. Angela Yu",
      handle: "@angela_codes",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80",
    tags: ["#Python", "#CodeSnippets", "#PythonHacks"],
    duration: "0:30",
    views: "512.4K",
    likes: 47200,
    courseRef: "c3"
  },
  {
    id: "reel-4",
    title: "C++ STL Vectors vs Static Arrays in 30s ⚡",
    desc: "Dynamic reallocation, push_back complexity and memory overhead visualized!",
    creator: {
      name: "Prof. Rajesh Sharma",
      handle: "@rajesh_cpp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=80",
    tags: ["#Cpp", "#STL", "#DataStructures"],
    duration: "0:30",
    views: "290.1K",
    likes: 23850,
    courseRef: "c1"
  },
  {
    id: "reel-5",
    title: "DSA Two-Pointer Technique (O(N) vs O(N²)) 💡",
    desc: "How to solve Two-Sum on sorted arrays in a single pass without brute force.",
    creator: {
      name: "Striver",
      handle: "@striver_dsa",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=80",
    tags: ["#DSA", "#LeetCode", "#Algorithms"],
    duration: "0:30",
    views: "620.8K",
    likes: 54900,
    courseRef: "c4"
  },
  {
    id: "reel-6",
    title: "SQL JOINs Visual Cheat Sheet in 30 Seconds 📊",
    desc: "INNER, LEFT, RIGHT and FULL OUTER JOINs visualized using set diagrams.",
    creator: {
      name: "Abhishek Saini",
      handle: "@abhishek_dbms",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=80",
    tags: ["#SQL", "#DBMS", "#Databases"],
    duration: "0:30",
    views: "385.2K",
    likes: 31200,
    courseRef: "c5"
  }
];

// Interactive Engineering Quiz Questions Database
const EDIFYRON_QUIZZES = [
  {
    id: "q1",
    topic: "C & C++",
    question: "What is the output of the following C code?",
    code: `int a = 10;\nint *p = &a;\n*p = 25;\nprintf("%d", a);`,
    options: ["10", "25", "Memory Address", "Compilation Error"],
    correctIndex: 1,
    explanation: "*p accesses the value stored at memory location &a. Modifying *p directly changes the value of variable 'a' to 25."
  },
  {
    id: "q2",
    topic: "Java",
    question: "In Java, where are String literals stored in memory?",
    code: `String s1 = "Edifyron";\nString s2 = "Edifyron";`,
    options: ["Stack Memory", "String Constant Pool (Inside Heap)", "Native Memory", "Method Stack Area"],
    correctIndex: 1,
    explanation: "String literals are stored in the String Constant Pool (SCP) inside the Java Heap to optimize memory through string interning."
  },
  {
    id: "q3",
    topic: "Python",
    question: "What will `[x**2 for x in range(5) if x % 2 == 0]` evaluate to in Python?",
    code: `print([x**2 for x in range(5) if x % 2 == 0])`,
    options: ["[0, 4, 16]", "[0, 2, 4]", "[1, 9]", "[0, 1, 4, 9, 16]"],
    correctIndex: 0,
    explanation: "range(5) gives 0, 1, 2, 3, 4. The even values are 0, 2, 4. Their squares are 0, 4, 16."
  },
  {
    id: "q4",
    topic: "DSA",
    question: "What is the average time complexity of searching an element in a Balanced Binary Search Tree (AVL/Red-Black)?",
    code: null,
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctIndex: 1,
    explanation: "In a balanced BST, tree height is log(N), allowing binary division of the search space at each step in O(log N) time."
  },
  {
    id: "q5",
    topic: "C & C++",
    question: "Which C++ STL container provides O(1) average time complexity for key lookups?",
    code: null,
    options: ["std::vector", "std::map (Red-Black Tree)", "std::unordered_map (Hash Table)", "std::deque"],
    correctIndex: 2,
    explanation: "std::unordered_map is implemented using hashing, providing O(1) average time for search, insert, and delete."
  },
  {
    id: "q6",
    topic: "DBMS",
    question: "Which normal form eliminates partial functional dependency on composite candidate keys?",
    code: null,
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctIndex: 1,
    explanation: "Second Normal Form (2NF) requires the table to be in 1NF and guarantees that all non-prime attributes are fully functionally dependent on the primary key."
  }
];

// Live Indian Engineering Colleges Leaderboard Data
const COLLEGE_LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", college: "IIT Bombay", xp: 14850, streak: 42, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80", badge: "🥇 Code Grandmaster" },
  { rank: 2, name: "Pooja Venkatesh", college: "NIT Trichy", xp: 13920, streak: 38, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80", badge: "🥈 Algorithms Ninja" },
  { rank: 3, name: "Karan Johar", college: "BITS Pilani", xp: 12780, streak: 31, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80", badge: "🥉 C++ Ace" },
  { rank: 4, name: "Sneha Reddy", college: "IIT Delhi", xp: 11450, streak: 26, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80", badge: "⭐ Java Maestro" },
  { rank: 5, name: "Rohan Kulkarni", college: "VIT Vellore", xp: 10890, streak: 22, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80", badge: "⭐ Python Pro" },
  { rank: 6, name: "Ananya Iyer", college: "DTU Delhi", xp: 9940, streak: 19, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80", badge: "⭐ DSA Scholar" },
  { rank: 7, name: "You (Learner)", college: "Engineering College India", xp: 4200, streak: 5, avatar: "assets/edifyron-logo.jpg", badge: "🚀 Rising Star" }
];

function getCourseById(id) {
  return EDIFYRON_COURSES.find(course => course.id === id) || EDIFYRON_COURSES[0];
}

const POPULAR_SEARCHES = [
  "C Programming", "C++ STL", "Java Spring Boot", "Python Basics", "DSA LeetCode", 
  "DBMS SQL Queries", "Operating Systems", "Computer Networks", "OOP Concepts"
];
