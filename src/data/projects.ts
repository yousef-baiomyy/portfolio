export const CATEGORIES = ['All', 'End-to-End Analysis projects', 'Analytical/Business Systems', 'Interactive HTML Dashboard', 'Python Projects'] as const;
export type Category = typeof CATEGORIES[number];

export interface Project {
  title: string;
  subtitle?: string;
  category: Category;
  tags: string[];
  description: string;
  image: string;
  images?: string[];
  difficulty: string;
  year: string;
  github?: string;          // leave empty for private repos
  liveDemo?: string;
  private?: boolean;        // true → shows a 'Private repository' lock badge
  readme: string;
}

/* ─────────────────────────────────────────────────────────────
   PROJECTS  —  edit this file to add / remove projects.
   • Order on the site = order in this list (first = top).
   • Images go in /public. First image = card cover.
   • github / liveDemo are optional — leave them out for private work.
   • Project counters on the site update automatically.
   See EDIT_GUIDE.md (Arabic) for a copy-paste template.
───────────────────────────────────────────────────────────── */

export const PROJECTS: Project[] = [
  {
    title: 'Physiotherapy Clinic Management System',
    subtitle: 'Paper-to-Digital Operations System for a 10-Physician Clinic',
    category: 'Analytical/Business Systems',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'RPC'],
    description:
      'A clinic management system designed, built and deployed for a physiotherapy clinic with 10 physicians, replacing fully paper-based patient and appointment records. Requirements were gathered directly from the non-technical clinic owner and turned into a PostgreSQL / Supabase data model with row-level security, RPC functions and multi-role access. Currently in pilot use by clinic management and reception.',
    image: '/clinic-cover.jpg',
    images: ['/clinic-cover.jpg'],
    difficulty: 'Advanced',
    year: '2026',
    // Private client repository — no public GitHub or demo link.
    private: true,
    readme: `## Physiotherapy Clinic Management System

### Overview
A clinic management system for a **physiotherapy clinic with 10 physicians**. The clinic ran entirely on **paper** — patient files and appointment records were handwritten. I designed, built and deployed a system that moves those records into a structured database and a web application used in daily operations.

### Business Problem
Paper-based records made it slow to find patient history, track appointments, and give management a reliable view of what was happening in the clinic. Information lived in folders and notebooks instead of one shared, searchable source of truth.

### Solution
A web application backed by a **PostgreSQL / Supabase** data layer. Patient and appointment records are stored in a relational model, and access is controlled per role so each user only sees and changes what their role allows.

### My Role — end to end
- **Requirements** — gathered directly from the non-technical clinic owner and translated into a data model
- **Data modeling** — designed the PostgreSQL schema for patient and appointment records
- **Security** — implemented **row-level security** and **multi-role access**
- **Business logic** — implemented **RPC functions** in the database
- **Application** — built the Next.js front end connecting frontend, backend and data layers
- **Deployment** — shipped and rolled it out to the clinic

### Status
- 🟢 **In pilot use** by clinic management and reception
- 📄 Replaced **fully paper-based** patient and appointment records

### Technologies
- **Next.js** — web application
- **Supabase** — authentication and backend
- **PostgreSQL** — relational data model, row-level security, RPC functions

### Privacy
The source code is in a **private repository** and the system holds real patient data, so no public link or live demo is shared. Any screenshots added here use no real patient information.`,
  },
  {
    title: 'Yousef Academy',
    subtitle: 'Quran Memorization & Teaching Platform — PWA + Android',
    category: 'Analytical/Business Systems',
    tags: ['JavaScript', 'PWA', 'Supabase', 'PostgreSQL', 'RLS & RPC', 'Capacitor'],
    description:
      'A production Quran learning platform that reached ~200 users organically before any marketing spend. It combines a full Mushaf reader with multi-reciter audio, prayer times, recitation (Tasmee3) subscriptions with teachers, quizzes, multiplayer battle rooms and a token wallet — backed by a Supabase / PostgreSQL data layer (22 tables, 16 RPC functions) with row-level security, multi-role authentication, admin controls, offline support and real-time features.',
    image: '/ya-1.jpg',
    images: ['/ya-1.jpg', '/ya-2.jpg', '/ya-3.jpg', '/ya-4.jpg', '/ya-5.jpg'],
    difficulty: 'Advanced',
    year: '2026',
    readme: `## Yousef Academy — Quran Memorization & Teaching Platform

### Overview
**Yousef Academy** is a production Progressive Web App for learning and memorizing the Quran, also packaged as an **Android app**. It reached **~200 users organically before any marketing spend**. I designed and built it end to end: product, UI, data model, backend logic and deployment.

### What it solves
Quran students and teachers usually juggle separate tools — a Mushaf app, a prayer-times app, WhatsApp for recitation sessions, and paper for tracking progress. Yousef Academy brings reading, listening, recitation with a teacher, practice and progress tracking into one app, with a parent able to follow a student's progress.

### Key Features
- 📖 **Quran reader** — all 114 surahs, word search across the whole Quran (without diacritics), adjustable font size
- 🎧 **Audio recitation** — multiple reciters, playback speed, sleep timer, verse-by-verse highlighting, background playback bar
- 🕌 **Prayer** — prayer times with next-prayer countdown, Qibla, Tasbeeh and nearest mosque
- 🎙️ **Tasmee3 subscriptions** — choose a weekly plan (2 or 3 days/week), number of months, your days and your teacher
- 🧠 **Memorization tools** — hide words and recite from memory
- 🎯 **Quizzes** — by surah, difficulty and number of questions; question types include complete the verse, next / previous verse, surah name, word meanings, missing word and similar verses
- 🎮 **Battle rooms** — create a room or join with a 6-digit code, plus public rooms
- 🪙 **Wallet** — token balance and top-up packages
- 👤 **Profile** — student stats (memorized parts, points, streak) and a **parent follow-up code**
- 🎨 **Neon themes** — 6 color themes, color blending, brightness and preferred reciter

### Data & Backend
| Item | Detail |
|------|--------|
| Database | PostgreSQL on Supabase |
| Schema | 22 tables |
| Business logic | 16 RPC functions |
| Security | Row-level security, multi-role authentication |
| Admin | Admin controls and user management |
| Offline | Offline functionality (PWA caching) |
| Live | Real-time features |

### Technologies
- **JavaScript** — single-file PWA front end
- **Supabase** — authentication, REST API, real-time
- **PostgreSQL** — schema, RLS, RPC functions
- **PWA** — installable, offline-capable
- **Capacitor** — Android build
- **Vercel** — hosting

### Screenshots
![01 · Home dashboard and the Mushaf reader with synced recitation and verse highlighting.](/ya-1.jpg)
![02 · All 114 surahs with search and audio, and prayer times with Qibla, Tasbeeh and nearest mosque.](/ya-2.jpg)
![03 · Tasmee3 subscription flow and the quiz builder.](/ya-3.jpg)
![04 · Multiplayer battle rooms and the token wallet.](/ya-4.jpg)
![05 · Student profile with parent follow-up code, and neon theme & reciter settings.](/ya-5.jpg)`,
  },
  {
    title: 'Salla — Contact Center Intelligence',
    subtitle: 'Interactive Contact-Center Analytics Console (Feb–Apr 2022)',
    category: 'Interactive HTML Dashboard',
    tags: ['HTML', 'CSS', 'JavaScript', 'ECharts'],
    description:
      'A self-contained, six-page contact-center analytics console covering executive KPIs, demand forecasting, service quality, agent performance, operations risk, and a record-level data explorer. Re-engineered from a 267-row Power BI dataset (project × day, Feb–Apr 2022) into a single dependency-free HTML file with Apache ECharts — cross-filtered by date, project, agent, and day of week. Deployed on Vercel.',
    image: '/salla-overview.jpg',
    images: [
      '/salla-overview.jpg',
      '/salla-forecast.jpg',
      '/salla-service.jpg',
      '/salla-agents.jpg',
      '/salla-operations.jpg',
      '/salla-explorer.jpg',
    ],
    difficulty: 'Advanced',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/Salla-call-center-dashboard',
    liveDemo: 'https://sallacontactcenterdashboard.vercel.app/',
    readme: `## Salla — Contact Center Intelligence

### Overview
An interactive **contact-center analytics console** that turns three months of daily operations data (**01 Feb – 30 Apr 2022**) into a decision-ready, six-page report. It was re-engineered from a Power BI project (\`salla_full_project.pbix\`) into a **single, self-contained HTML file** — no build step, no server, no external chart dependencies — so it runs anywhere and deploys as one static asset.

### What it answers
Contact-center performance was locked inside a \`.pbix\` file that needed Power BI to open. The console rebuilds that analysis as a portable web app so anyone can explore service level, demand vs forecast, abandonment, agent load, and operational risk in the browser — and drill all the way down to the raw records.

### Dashboard Pages
- **01 · Executive Overview** — Headline KPIs, demand-vs-forecast, and a service-level trend calendar
- **02 · Demand & Forecast** — Forecast bias, MAPE, forecast-vs-actual by month, daily forecast error
- **03 · Service & Quality** — Abandonment rate/volume, volume-vs-service-level correlation, SL by project, distribution of daily SL
- **04 · Agent Performance** — Load-vs-service-level bubble chart and a Pareto of handling concentration
- **05 · Operations & Risk** — Volume anomalies (z-score), SL-outcome split, worst operating days, and concentration/dependency risk
- **06 · Data Explorer** — Every source row, searchable and filterable, with one-click CSV download

### Headline KPIs (full period)
| Metric | Value |
|--------|-------|
| Calls Offered | 1.74M |
| Calls Handled | 1.72M (23,043 abandoned) |
| Handling Rate | 98.68% |
| Service Level | 91.1% (target 90%, +1.1 pp) |
| Avg Speed of Answer | 14.3s |
| Days SLA Met | 75 / 89 (84% of days) |
| Peak Day | 43.5K calls (24 Mar) |

### Forecasting & Risk Signals
- **Forecast bias −28.4%** — plan sat above demand (2,437,071 planned vs 1,744,885 actual)
- **Daily error (MAPE) 32.7%**, with demand beating plan on **8 / 89** days (understaffing exposure)
- **Abandonment spike** on 05 Mar — 4,163 abandoned calls at an 11.8% abandon rate
- **Volume vs service level** correlation r = −0.54 (R² = 0.29) — volume alone doesn't explain the misses
- **Concentration risk** — top agent handles 10.0% of calls; top-3 share 27.8%; project HHI 0.46

### Agent Performance
- **16 agents** on queue, **11 / 16** sustaining service level ≥ 90%
- Best sustained SL **99.5%** (Laila, 10 days) · weakest **77.5%** (Youssef, 12 days)

### Filters & Interactions
- Date range + quick ranges (Full period, Feb, Mar, Apr, Last 30d)
- Project (A / B / C) and multi-select agent filter
- Day-of-week toggles
- A **quarter ribbon** you can click or drag to set the date range (bar height = calls offered, colour = SL band)
- Every chart is cross-filtered and fully tooltipped

### Technologies
- **HTML5** · **CSS3** (custom hairline "operations console" design system)
- **Vanilla JavaScript** — filtering, cross-chart state, derived metrics computed per record
- **Apache ECharts** — inlined into the file so the dashboard works fully offline
- **IBM Plex Sans / Mono** typography
- Source: \`salla_full_project.pbix\` · grain project × day · 267 rows · SL target 90%
- Deployed on **Vercel** as a single static file

### Screenshots
![01 · Executive Overview — headline KPIs, demand vs forecast, and the service-level trend (1.74M offered, 91.1% SL).](/salla-overview.jpg)
![02 · Demand & Forecast — forecast bias −28.4%, MAPE 32.7%, forecast-vs-actual by month and daily error.](/salla-forecast.jpg)
![03 · Service & Quality — abandonment rate/volume and the volume-vs-service-level correlation (r = −0.54).](/salla-service.jpg)
![04 · Agent Performance — load-vs-service-level bubble chart and a Pareto of handling concentration.](/salla-agents.jpg)
![05 · Operations & Risk — volume anomalies, SL-outcome split, worst operating days and concentration risk.](/salla-operations.jpg)
![06 · Data Explorer — every source row, searchable and filterable, with one-click CSV download (267 records).](/salla-explorer.jpg)

### Links
- 🔗 **Live Demo** — https://sallacontactcenterdashboard.vercel.app/
- 💻 **GitHub** — https://github.com/yousef-baiomyy/Salla-call-center-dashboard`,
  },
  {
    title: 'InsightHub',
    subtitle: 'Enterprise Multi-Branch Sales Intelligence Platform',
    category: 'Analytical/Business Systems',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'XLSX'],
    description:
      'Enterprise multi-branch sales intelligence platform for analyzing sales performance, comparing branches, monitoring KPIs, and generating actionable business insights. Three separate branch datasets (Cairo, Alexandria, Mansoura) were cleaned, standardized, and merged into a unified dataset, then transformed into an interactive BI web app with role-based access, executive dashboards, branch comparison, customer analytics, and PDF/Excel reporting — deployed on Vercel.',
    image: '/insighthub-dashboard.jpg',
    images: [
      '/insighthub-dashboard.jpg',
      '/insighthub-comparison.jpg',
      '/insighthub-analytics.jpg',
      '/insighthub-sales.jpg',
      '/insighthub-customers.jpg',
      '/insighthub-reports.jpg',
      '/insighthub-branch.jpg',
      '/insighthub-login.jpg',
    ],
    difficulty: 'Advanced',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/InsightHub',
    liveDemo: 'https://insighthub-one.vercel.app/login',
    readme: `## InsightHub — Enterprise Multi-Branch Sales Intelligence Platform

### Overview
**InsightHub** is a Business Intelligence web application that analyzes and compares sales performance across multiple company branches. It started as three separate Excel datasets — **Cairo**, **Alexandria**, and **Mansoura** — which were cleaned, validated, standardized, and merged into a single unified dataset, then transformed into an interactive BI application. The goal was not just to draw charts, but to deliver a complete analytics solution where managers can monitor KPIs, compare branches, spot trends, and act on insights.

### Business Problem
The business had sales data scattered across separate branch files, making it hard to get a unified view of overall performance or compare branches efficiently. Management needed a centralized way to monitor sales KPIs, compare branch performance, identify trends, and understand which branches, products, and categories were driving results.

### Solution
I transformed the separate branch datasets into a unified Business Intelligence solution — combining data preparation, analytics, visualization, role-based access, and reporting into a single web application. Each record preserves its branch identity, so the platform can present both an all-branches executive view and branch-scoped dashboards from the same source of truth.

### Data Workflow
- **Collect** — Gather sales data from three separate Excel files (one per branch)
- **Clean** — Handle inconsistencies, formatting, and quality issues
- **Validate & standardize** — Align schemas, types, and category naming across branches
- **Merge** — Combine the three datasets into one unified dataset
- **Preserve identity** — Keep a branch tag on every record for scoped access & comparison
- **Model KPIs** — Calculate revenue, profit, margin, AOV, growth, and performance metrics
- **Visualize** — Build interactive charts for every analytical area
- **Deploy** — Ship the full application on Vercel

### Key Features
- 📊 **Executive dashboard** — 12+ KPI cards with interactive filters (Branch, Category, Product, Payment, Month)
- 🏢 **Branch comparison** — Performance scores, best-performing, fastest-growing, and most-profitable branch
- 🔐 **Role-based access** — Manager sees all branches; each branch manager sees only their own data
- 🤖 **Automated business insights** — Summaries of top branch, fastest-growing branch, and revenue/profit shifts
- 🧾 **Reporting** — One-click PDF & Excel export, plus print, with a live report preview
- 🌗 **Dark / light mode** — Modern, responsive SaaS interface

### Analytics & Visualizations
- **Revenue Trend** — Monthly net-sales line chart
- **Revenue vs Profit** — Monthly comparison bars
- **Product Revenue Treemap** — Relative product contribution
- **Quantity vs Profit** — Bubble chart (bubble size = revenue)
- **Payment Methods** — Revenue split donut (Credit Card, Digital Wallet, Bank Transfer, Cash, Debit Card)
- **Sales Channels** — Revenue split (Retail Store, Phone Order, Website, Mobile App)
- **Top Customers** — Ranked by revenue
- **Revenue by Segment** — Consumer · Small Business · Corporate
- **Performance Score** — Per-branch scoring, and Revenue / Profit by branch

### Headline KPIs (all-branches view)
| Metric | Value |
|--------|-------|
| Total Revenue | EGP 85.2M |
| Total Profit | EGP 16.2M |
| Profit Margin | 19.0% |
| Total Orders | 3K |
| Sales Growth (MoM) | +9.6% |
| Records in Scope | 3,000 |

### Branch Comparison Snapshot
| Branch | Performance Score |
|--------|-------------------|
| Cairo | 96 / 100 (Best performing · Most profitable) |
| Alexandria | 68 / 100 |
| Mansoura | 63 / 100 (Fastest growing · +25.3%) |

### Role-Based Access
- 👔 **Executive Manager** — All three branches, full comparison, executive KPIs, complete dashboard
- 🟦 **Cairo Branch Manager** — Cairo data only
- 🟪 **Alexandria Branch Manager** — Alexandria data only
- 🟩 **Mansoura Branch Manager** — Mansoura data only

### My Contribution
This is an end-to-end project I built myself — from raw data to a deployed application: **data cleaning, validation, standardization, dataset merging, KPI development, business analysis, data visualization, dashboard design, role-based access, web-app development, and deployment.** The core value is the full journey from three raw Excel files to a live, interactive Business Intelligence platform.

### Technologies
- **Next.js** · **TypeScript** · **Tailwind CSS** · **shadcn/ui**
- **Recharts** (charts) · **Framer Motion** (animation) · **Zustand** (state) · **XLSX** (Excel export)
- Deployed on **Vercel**

### Screenshots
![Role-based login — demo accounts for Manager and each branch (client-side demo auth).](/insighthub-login.jpg)
![Executive dashboard — 12+ KPI cards across all branches (EGP 85.2M revenue) with interactive filters.](/insighthub-dashboard.jpg)
![Branch comparison — performance scores plus best-performing, fastest-growing, and most-profitable branch.](/insighthub-comparison.jpg)
![Analytics — product revenue treemap and a quantity-vs-profit bubble chart (bubble size = revenue).](/insighthub-analytics.jpg)
![Sales — revenue trend, payment-method and sales-channel splits, and exportable transactions.](/insighthub-sales.jpg)
![Customer analytics — top customers by revenue and revenue by segment.](/insighthub-customers.jpg)
![Reports & Export — one-click PDF / Excel export and print, with a live report preview.](/insighthub-reports.jpg)
![Role-scoped view — the Cairo branch manager sees only Cairo data (EGP 31.3M).](/insighthub-branch.jpg)

### Links
- 🔗 **Live Demo** — https://insighthub-one.vercel.app/login
- 💻 **GitHub** — https://github.com/yousef-baiomyy/InsightHub`,
  },
  {
    title: 'GlowCare — E-Commerce Business System',
    subtitle: 'Storefront + Automated Order Management',
    category: 'Analytical/Business Systems',
    tags: ['React', 'TypeScript', 'Vite', 'Google Apps Script', 'Telegram Bot API'],
    description:
      'An e-commerce system for a cosmetics brand that replaced manual order tracking. Customers order from a React storefront with product galleries; a Google Apps Script middleware writes every order into Google Sheets as an order-management workflow and pushes an instant Telegram notification to the owner. Deployed on Vercel.',
    image: '/glowcare-cover.jpg',
    images: ['/glowcare-cover.jpg'],
    difficulty: 'Intermediate',
    year: '2026',
    readme: `## GlowCare — E-Commerce Business System

### Overview
An e-commerce system for **GlowCare**, a cosmetics brand. Orders used to be tracked **manually**. I built a storefront and an automated order pipeline so every order is recorded and the owner is notified instantly.

### Business Problem
Manual order tracking is slow and error-prone: orders get missed, details get copied wrong, and there is no single place to see order status.

### Solution
- 🛍️ **Storefront** — React + TypeScript + Vite site with product galleries
- ⚙️ **Backend middleware** — Google Apps Script receives each order
- 📊 **Google Sheets** — every order lands in a sheet that works as the order-management workflow
- 🔔 **Telegram Bot API** — the owner gets an instant notification for each new order
- 🚀 **Vercel** — hosting and deployment

### Workflow
- **Customer** places an order on the storefront
- **Middleware** receives the order and forwards it
- **Google Sheets** stores it for tracking and follow-up
- **Telegram** alerts the owner in real time

### Technologies
- **React** · **TypeScript** · **Vite**
- **Google Apps Script** · **Google Sheets**
- **Telegram Bot API**
- **Vercel**`,
  },
  {
    title: 'End-to-End Retail Sales Analytics Pipeline',
    category: 'End-to-End Analysis projects',
    tags: ['Python', 'SQL', 'MySQL', 'Power BI'],
    description:
      'A complete retail analytics pipeline that turns raw transactional data into decision-ready insights. Covers data cleaning and transformation in Python, exploratory data analysis, and advanced SQL in MySQL — surfacing $8.74M in revenue across 4.33K customers and 18.4K orders. The three-page Power BI report spans an executive KPI home, a sales performance overview, and a full RFM customer segmentation model classifying every customer into Champions, Loyal, Potential Loyalists, Need Attention, and At-Risk cohorts.',
    image: '/retail-home.jpg',
    images: ['/retail-home.jpg', '/retail-sales.jpg', '/retail-rfm.jpg'],
    difficulty: 'Advanced',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/End-to-End--Retail-Sales-Analaytics-pipeline',
    readme: `## End-to-End Retail Sales Analytics Pipeline

### Overview
An end-to-end retail sales analytics project built with **Python, SQL, and Power BI**. It focuses on cleaning and transforming raw transactional data, performing exploratory data analysis (EDA), and extracting actionable business insights. The cleaned dataset is integrated into **MySQL** for advanced SQL analysis and visualized through a three-page interactive **Power BI** dashboard — demonstrating a complete analytics workflow from raw data to decision-ready insights.

### Tech Stack
- **Python / Pandas** — Data cleaning, transformation, and exploratory data analysis (EDA)
- **MySQL** — Advanced SQL analysis on the cleaned, integrated dataset
- **Power BI** — Interactive 3-page report: Home, Sales Performance, RFM Segmentation

### Dashboard Pages
#### 1. Retail Sales & Customer Segmentation (Home)
Executive KPI landing page with monthly revenue & orders trend, and revenue by country.

#### 2. Executive Sales Performance Overview
Top countries by revenue, revenue distribution & contribution by customer segment, and RFM averages.

#### 3. Customer RFM Segmentation Analysis
Customer behavior & value analysis using the RFM model — distribution by segment, customer value matrix, retention vs target, and average purchase frequency.

### Business KPIs
| Metric | Value |
|--------|-------|
| Total Revenue | $8.74M |
| Total Customers | 4.33K |
| Average Order Value (AOV) | $475.08 |
| Total Orders | 18.4K |

### RFM Segment Breakdown
| Segment | Customers |
|---------|-----------|
| Champions | 871 (20.1%) |
| Need Attention | 996 (22.98%) |
| Potential Loyalists | 855 (19.73%) |
| Loyal Customers | 808 (18.64%) |
| At Risk | 804 (18.55%) |

### RFM Averages
| Metric | Value |
|--------|-------|
| Avg Frequency | 18.67 |
| Avg Monetary | $11.29K |
| Avg Recency | 41.25 |
| Avg RFM Score | 10.10 |

### Key Insights
- 🇬🇧 **United Kingdom dominates** — ~82.85% of total revenue ($7.24M) comes from a single market
- 🏆 **Champions drive value** — the Champions segment contributes $5.80M (66.35%) of revenue
- 📈 **Strong year-end momentum** — revenue and orders peak sharply toward Nov 2011
- 🎯 **Retention gap** — actual retention (76K) benchmarked against a 153K target
- 🔁 **Frequency by segment** — Champions average 30 purchases vs 1 for At-Risk customers

### Workflow
1. **Clean & transform** raw transactional data in Python (Pandas)
2. **Explore** with EDA to understand distributions and quality issues
3. **Integrate** the cleaned dataset into MySQL for advanced SQL analysis
4. **Model** customers with RFM (Recency, Frequency, Monetary) scoring
5. **Visualize** insights in an interactive 3-page Power BI dashboard`,
  },
  {
    title: 'Global Metabolic Health & Insulin Resistance',
    category: 'End-to-End Analysis projects',
    tags: ['Python', 'SQL Server', 'Power BI'],
    description:
      'Global-scale analysis of insulin resistance across 188K+ patients from dozens of countries. Built advanced SQL queries in SQL Server using CASE risk profiling, STDEV outlier detection, and RANK window functions. The Power BI dashboard features a world-map geospatial layer, HbA1c vs Fasting Insulin scatter correlation, HOMA-IR area charts by age group, and gender distribution — all in a dark-mode UI with Country, Gender, and Year slicers.',
    image: '/project-insulin.jpg',
    difficulty: 'Advanced',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/Global-insulin-analysis-project',
    readme: `## Global Metabolic Health & Insulin Resistance Analysis

### Overview
End-to-end data analysis project examining insulin resistance trends across **188,720 patients** worldwide. The project covers the full data pipeline: from raw data cleaning in Python to advanced SQL analysis in SQL Server and interactive Power BI visualization.

### Tech Stack
- **Python** — Data cleaning, EDA, missing-value handling with Pandas
- **SQL Server** — Advanced queries: CASE risk profiles, STDEV outlier detection, RANK window functions
- **Power BI** — Interactive dark-mode dashboard with geospatial map, scatter plots, slicers

### Key Features
- 🌍 **Global Map** — Geospatial distribution of insulin resistance by country (gradient formatting)
- 📊 **HbA1c vs Fasting Insulin** — Scatter correlation chart segmented by risk level (Early / Optimal / Significant)
- 📈 **HOMA-IR by Age Group** — Area chart from Children → Elderly showing resistance growth
- ⚤ **Gender Distribution** — Column chart for insulin status across Male / Female
- 🎛️ **Dynamic Slicers** — Filter by Country, Gender, Year

### KPIs
| Metric | Value |
|--------|-------|
| Total Patients | 188.72K |
| Average HOMA-IR | 1.89 |
| High-Risk Insulin Count | 17.95K |
| Average HbA1c | 6.89 |

### SQL Highlights
- **Risk Zone Profiling** — CASE WHEN combining HOMA-IR and HbA1c thresholds
- **Outlier Detection** — STDEV > 1.5x global average to flag data quality issues
- **Demographic Vulnerability** — Multi-factor query combining Insulin_Resistant + Heart_Risk + Age_Group
- **Country Ranking** — RANK() OVER for Triglyceride benchmarking across countries`,
  },
  {
    title: 'Tech Layoffs Trend Analysis',
    category: 'End-to-End Analysis projects',
    tags: ['Python', 'MySQL', 'Power BI'],
    description:
      'Full-cycle analysis of tech industry layoffs across 12,000 records, examining AI adoption impact, layoff reasons, and hiring trends by industry and country. Features advanced SQL with window functions (LAG, RANK) for month-over-month change tracking, and a Power BI dashboard exposing AI replacement risk versus job security scores across Social Media, AI, E-Commerce, Cybersecurity, and Gaming sectors.',
    image: '/project-layoffs.jpg',
    difficulty: 'Intermediate',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/Tech-layoffs-trend-analysis',
    readme: `## Tech Layoffs Trend Analysis

### Overview
Full-cycle data analysis project investigating tech industry layoffs across **12,000 records**, examining the role of AI adoption, company size, industry type, and geography in workforce reductions.

### Tech Stack
- **Python / Pandas** — Data cleaning, EDA, exploratory analysis
- **MySQL** — Advanced window functions, monthly trend analysis, company ranking
- **Power BI** — Dark-mode dashboard with histograms, bar charts, and pie chart

### Key Features
- 📉 **Layoffs by Industry** — Social Media leads, followed by AI, E-Commerce, Cybersecurity, Gaming
- 🌍 **Country Comparison** — Layoffs count vs open roles available by country
- ⚙️ **Reason Breakdown** — AI automation, cost cutting, restructuring distribution
- 📅 **Monthly Trends** — Time-series spike detection across months/years
- 🤖 **AI Risk vs Job Security** — Pie chart: AI replacement risk (44.6%) vs job security score (55.4%)

### KPIs
| Metric | Value |
|--------|-------|
| Avg AI Adoption Level | 5.54 |
| Avg Revenue Growth % | 17.47 |
| Avg AI Replacement Risk | 7.21 |

### SQL Highlights
- **LAG() window function** — Month-over-month layoff change tracking
- **Percentage change calculation** — Subquery + derived table for pct_change
- **RANK() window function** — Top 15 companies by total layoffs
- **Monthly summary VIEW** — Pre-aggregated for direct Power BI connection`,
  },
  {
    title: 'Reels Impact & Digital Wellbeing',
    category: 'End-to-End Analysis projects',
    tags: ['Python', 'MySQL', 'Power BI'],
    description:
      'Full-cycle data analysis investigating how short-form video consumption (Instagram Reels, TikTok, YouTube Shorts) affects user productivity and mental health. Covers EDA in Pandas, MySQL user segmentation by age and productivity metrics, and a Power BI dashboard with scatter plot correlation analysis and AI-driven Key Influencers for stress trigger identification.',
    image: '/project-reels.jpg',
    difficulty: 'Intermediate',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/Reels-attention-span-analysis',
    readme: `## Reels Impact & Digital Wellbeing Analysis

### Overview
Full-cycle data analysis project investigating how short-form video consumption across Instagram Reels, TikTok, and YouTube Shorts affects user productivity, attention span, and mental health.

### Tech Stack
- **Python / Pandas** — Raw data cleaning, missing-value handling, EDA
- **MySQL** — User segmentation, platform time analysis, productivity ranking
- **Power BI** — Purple-themed interactive dashboard with AI Key Influencers visual

### Key Features
- 📈 **Correlation Scatter** — Reels Watch Time vs Focus Level across all 3 platforms
- 📊 **Platform Performance** — Health Score vs Task Completion Rate per platform
- 😴 **Sleep by Stress Level** — Table: High (6.54h), Medium (6.50h), Low (6.47h)
- 🎛️ **Platform Slicer** — Filter between Instagram Reels, TikTok, YouTube Shorts
- 🧠 **Stress Level Slicer** — High / Medium / Low filtering

### KPIs
| Metric | Value |
|--------|-------|
| Avg Reels Watch Time | 3.02 hrs |
| Average Age | 29.60 |
| Average Sleep Hours | 6.50 |
| Avg Daily Screen Time | 7.61 hrs |

### SQL Highlights
- Platform-level total watch time aggregation
- Age-based attention span segmentation (Under 25 vs 25+)
- "Ideal Users" filter: watch < 1hr ordered by focus DESC
- "Worst 10" users: lowest task completion + highest screen time
- Stress level distribution count`,
  },
  {
    title: 'US E-Commerce Sales Analysis',
    category: 'End-to-End Analysis projects',
    tags: ['Python', 'MySQL', 'Power BI'],
    description:
      'End-to-end analysis of customer shopping trends for a US-based e-commerce platform covering 3,900 customers and $233K in sales. Pipeline spans data cleaning in Python with feature engineering (Is_VIP column), advanced MySQL queries for customer segmentation and category performance, and an interactive Power BI dashboard with dynamic slicers for Season, Gender, and Subscription Status.',
    image: '/project-ecomm.jpg',
    difficulty: 'Intermediate',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/US-Ecomm-Sales-Analysis',
    readme: `## US E-Commerce Sales Analysis

### Overview
End-to-end analysis of customer shopping trends and sales performance for a US-based e-commerce platform. The workflow covers the entire data lifecycle: from raw data cleaning in Python to advanced SQL querying and interactive Power BI visualization.

### Tech Stack
- **Python / Pandas** — Data validation, feature engineering, type standardization
- **MySQL** — Customer segmentation, category performance, payment method analysis
- **Power BI** — Interactive dashboard with dynamic slicers and KPI cards

### Key Features
- 🏷️ **Is_VIP Feature** — Custom column classifying high-value customers (purchase > $80)
- 📊 **Category Sales** — Bar chart: Clothing (104K) → Accessories (74K) → Footwear (36K) → Outerwear (19K)
- 🍩 **Payment Methods** — Donut chart showing 6 payment methods each ~16% usage
- 🎛️ **Slicers** — Filter by Season, Gender, Subscription Status
- 👥 **Age by Gender** — Column chart: Male (117K) vs Female (55K) age sum

### KPIs
| Metric | Value |
|--------|-------|
| Total Sales | $233K |
| Total Customers | 3,900 |
| Average Customer Age | 44 years |
| VIP Rate | 25% |

### SQL Highlights
- Subscription status segmentation and purchase frequency analysis
- Category revenue aggregation to identify top revenue drivers
- Payment method count and ranking
- VIP customer breakdown by gender`,
  },
  {
    title: 'Python Projects Collection',
    category: 'Python Projects',
    tags: ['Python', 'OOP', 'CSV', 'CLI'],
    description:
      'A collection of Python CLI applications built with object-oriented principles focusing on data cleaning and analysis. Includes a multi-role Company Management System with role-based auth (employee / team-leader / manager), CSV persistence, and analytics engine — plus a Customer CRM with filtering and statistics, and an OOP user system using abstract base classes and inheritance.',
    image: '/project-python.jpg',
    difficulty: 'Intermediate',
    year: '2026',
    github: 'https://github.com/yousef-baiomyy/Python-projects',
    readme: `## Python Projects Collection

### Overview
A collection of real-world Python CLI applications demonstrating object-oriented programming, file persistence, and business logic design — built without any external frameworks.

### Projects Included

#### 1. Company Management System
Multi-role employee management system with full CRUD operations.

**Features:**
- 🔐 Role-based authentication: Employee / Team Leader / Manager (each with unique passwords)
- 📁 CSV persistence using \`csv.DictReader\` / \`DictWriter\`
- 👥 Department-scoped operations (managers can only delete from own department)
- 📊 Analytics Engine: service count, service income, department ranking by usage/income
- 🏢 Customer system with VIP vs Normal separation and 30% VIP discount logic

**Classes:** \`CSVStorage\`, \`Analytics\`, \`ServiceAnalytics\`, \`EmployeeSystem\`, \`CustomerSystem\`

#### 2. Customer CRM
Interactive CLI CRM for managing a 50-customer dataset.

**Features:**
- Data cleaning pipeline (strip, capitalize, age validation, deduplication)
- Filter by status (Active) and country (Egypt)
- Add / delete customers dynamically
- Search by name with exact match
- Statistics report: total count, active count, avg age, oldest/youngest

#### 3. OOP User System
Clean OOP demo using Abstract Base Classes and inheritance.

**Features:**
- \`BaseUser\` abstract class with \`get_role()\` and \`can_login()\` abstract methods
- \`User\` class: email domain validation, activate/deactivate, class-level member list
- \`Admin\` class: inherits User, overrides role, adds add_user / delete_user / view_users
- Banned domain enforcement at object creation time

### Concepts Demonstrated
- Abstract Base Classes (\`ABC\`, \`abstractmethod\`)
- Class methods, static methods, instance methods
- \`defaultdict\`, \`lambda\`, list comprehensions
- CSV file I/O with proper encoding
- Input validation and error handling`,
  },
];
