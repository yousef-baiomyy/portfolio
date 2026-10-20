/* ─────────────────────────────────────────────────────────────
   CERTIFICATES  —  edit this file to add / remove certificates.
   1) Put the certificate image in:  public/certificates/
   2) Copy one block below, change the values, save.
   The certificate counter on the site updates automatically.
───────────────────────────────────────────────────────────── */

export interface Certificate {
  title: string;          // course / certificate name
  issuer: string;         // who issued it (used for the filter buttons)
  date: string;           // shown as written, e.g. 'Oct 2026'
  image: string;          // path inside /public, e.g. '/certificates/x.jpg'
  credentialId?: string;  // certificate code (optional)
  verifyUrl?: string;     // public verification link (optional)
  type?: 'Certificate' | 'Diploma' | 'Course';
  note?: string;          // one short line (optional)
}

export const CERTIFICATES: Certificate[] = [
  {
    title: 'AI Analytics Engineer',
    issuer: 'Mazen Analytics',
    date: 'Sep 2026',
    image: '/certificates/mazen-diploma.jpg',
    credentialId: 'MAZ-DIP-B0CAFB-A4BA4B-808B64',
    type: 'Diploma',
    note: 'Diploma of Professional Achievement · 4 completed courses',
  },
  {
    title: 'Advanced SQL',
    issuer: 'Kaggle',
    date: 'Oct 2026',
    image: '/certificates/kaggle-advanced-sql.jpg',
    type: 'Certificate',
  },
  {
    title: 'HCIA-Cloud Computing V5.5 Course',
    issuer: 'Huawei ICT Academy',
    date: 'Oct 2026',
    image: '/certificates/huawei-hcia-cloud.jpg',
    credentialId: '20261006001384',
    type: 'Course',
    note: 'Course completion (not the HCIA certification exam)',
  },
  {
    title: 'Intro to SQL',
    issuer: 'Kaggle',
    date: 'Oct 2026',
    image: '/certificates/kaggle-intro-sql.jpg',
    type: 'Certificate',
  },
  {
    title: 'Overview of AI',
    issuer: 'Huawei ICT Academy',
    date: 'Sep 2026',
    image: '/certificates/huawei-overview-of-ai.jpg',
    credentialId: 'ICT20260909098738',
    type: 'Course',
  },
  {
    title: 'Introduction to Data Engineering',
    issuer: 'IBM · Coursera',
    date: 'Sep 2026',
    image: '/certificates/ibm-intro-data-engineering.jpg',
    credentialId: 'K3W8YW4O8FS5',
    verifyUrl: 'https://coursera.org/verify/K3W8YW4O8FS5',
    type: 'Certificate',
  },
  {
    title: 'Statistics',
    issuer: 'Mazen Analytics',
    date: 'Sep 2026',
    image: '/certificates/mazen-statistics.jpg',
    credentialId: 'MAZ-A3637A-A1E11A-449D7F',
    type: 'Certificate',
    note: 'Part of the AI Analytics Engineer diploma',
  },
  {
    title: 'n8n for Data Analysis',
    issuer: 'Mazen Analytics',
    date: 'Sep 2026',
    image: '/certificates/mazen-n8n.jpg',
    credentialId: 'MAZ-15CFDD-C2EC13-EB6203',
    type: 'Certificate',
    note: 'Part of the AI Analytics Engineer diploma',
  },
  {
    title: 'Business Fundamentals',
    issuer: 'Mazen Analytics',
    date: 'Sep 2026',
    image: '/certificates/mazen-business.jpg',
    credentialId: 'MAZ-FB429A-15F706-B99B81',
    type: 'Certificate',
    note: 'Part of the AI Analytics Engineer diploma',
  },
  {
    title: 'AI Basics',
    issuer: 'Mazen Analytics',
    date: 'Sep 2026',
    image: '/certificates/mazen-ai-basics.jpg',
    credentialId: 'MAZ-E9BD70-764B82-48A17F',
    type: 'Certificate',
    note: 'Part of the AI Analytics Engineer diploma',
  },
];

/* Programs you are currently studying (shown as "In progress"). */
export const IN_PROGRESS: { title: string; issuer: string }[] = [
  { title: 'McKinsey Forward Program', issuer: 'McKinsey & Company' },
  { title: 'Data Engineering Program', issuer: 'Data Pill' },
];
