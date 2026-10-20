/* ─────────────────────────────────────────────────────────────
   PROFILE  —  your name, texts, numbers, links.
   Change any text between the quotes and save.
   The "projects" and "certificates" numbers are counted
   automatically from projects.ts and certificates.ts.
───────────────────────────────────────────────────────────── */

import { PROJECTS } from './projects';
import { CERTIFICATES } from './certificates';

export const PROFILE = {
  /* ── Hero (first screen) ── */
  firstName: 'YOUSEF',
  lastName: 'BAIOMY',
  label: 'DATA ANALYST / BI / ENGINEER',
  roles: ['Data Analyst', 'Business Intelligence', 'Future Data Engineer', 'Full-Stack Builder'],
  typingWords: [
    'Python', 'SQL', 'Power BI', 'DAX', 'Pandas', 'PostgreSQL', 'Supabase',
    'Next.js', 'TypeScript', 'Data Cleaning', 'Data Modeling', 'Dashboards & KPIs', 'n8n',
  ],
  heroSubtitle:
    'Data Analyst turning raw data into decision-ready insights — and building the apps, dashboards and systems that deliver them. Growing toward Data Engineering.',

  /* ── Files & links ── */
  cvFile: '/Yousef_Mohamed_Baiomy_CV.pdf',   // put the PDF in /public with this name
  email: 'yousefbaiomy7@gmail.com',

  /* ── About section ── */
  aboutHeading: 'I BUILD SYSTEMS THAT TALK',
  aboutParagraphs: [
    "I'm Yousef Mohamed Baiomy, a Data Analyst and Computer Science & AI student at the Faculty of Computers and Artificial Intelligence, Cairo University. I've been doing hands-on data work since December 2025 — freelance client projects, independent analyses, and business analytics systems.",
    'I work with Python, SQL, Power BI, DAX and Excel to clean, model and visualize data — on datasets of 500,000+ rows — and turn it into KPIs, trends, segmentation and business insights that support real decisions.',
    'I also build the products around the data: web apps, PWAs, dashboards and data layers on PostgreSQL / Supabase with row-level security and role-based access. Next stop: Data Engineering — ETL, data warehousing and cloud.',
  ],

  /* ── Experience & education (About section) ── */
  timeline: [
    {
      period: 'Dec 2025 — Present',
      title: 'Freelance Data Analyst & Systems Developer',
      place: 'Self-Employed · Cairo, Egypt (Remote)',
      note: 'Paid client projects since March 2026',
    },
    {
      period: '2025 — 2029 (Expected)',
      title: 'B.Sc. Computer Science & Artificial Intelligence',
      place: 'FCAI, Cairo University',
    },
  ],
};

/* ── Stats shown in the About section ──
   value: a number (animates counting up) — suffix is added after it. */
export const STATS = [
  { value: PROJECTS.length, suffix: '', label: 'Projects' },
  { value: CERTIFICATES.length, suffix: '', label: 'Certifications' },
  { value: 500, suffix: 'K+', label: 'Rows per dataset' },
  { value: 2025, suffix: '', label: 'Freelancing since', plain: true },
];
