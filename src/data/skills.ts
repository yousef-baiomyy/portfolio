/* ─────────────────────────────────────────────────────────────
   SKILLS  —  edit this file to add / remove skills.
   • Add a skill:       { name: 'Tableau' }
   • Mark as learning:  { name: 'Spark', inProgress: true }   → shows "soon"
   • Add a new card:    copy a whole { title: ..., skills: [...] } block
───────────────────────────────────────────────────────────── */

export interface Skill {
  name: string;
  inProgress?: boolean;
}

export interface SkillCategory {
  title: string;
  inProgress?: boolean;   // shows an "IN PROGRESS" badge on the card
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'DATA ANALYSIS',
    skills: [
      { name: 'Python' },
      { name: 'Pandas' },
      { name: 'NumPy' },
      { name: 'Statistics' },
      { name: 'Exploratory Data Analysis (EDA)' },
      { name: 'Feature Engineering' },
      { name: 'Advanced Excel' },
    ],
  },
  {
    title: 'BI & VISUALIZATION',
    skills: [
      { name: 'Power BI' },
      { name: 'DAX' },
      { name: 'KPI Analysis' },
      { name: 'Apache ECharts' },
      { name: 'Recharts' },
      { name: 'Matplotlib' },
      { name: 'Seaborn' },
    ],
  },
  {
    title: 'SQL & DATABASES',
    skills: [
      { name: 'SQL (T-SQL · MySQL · PostgreSQL)' },
      { name: 'Microsoft SQL Server' },
      { name: 'PostgreSQL / Supabase' },
      { name: 'Row-Level Security & RPC' },
      { name: 'Data Modeling & Database Design' },
      { name: 'BigQuery', inProgress: true },
    ],
  },
  {
    title: 'APPS & WEB',
    skills: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'PWA' },
      { name: 'REST APIs' },
      { name: 'Role-Based Authentication' },
    ],
  },
  {
    title: 'DATA ENGINEERING',
    inProgress: true,
    skills: [
      { name: 'ETL Concepts' },
      { name: 'n8n Automation' },
      { name: 'Spark', inProgress: true },
      { name: 'Kafka', inProgress: true },
      { name: 'Airflow', inProgress: true },
      { name: 'dbt', inProgress: true },
    ],
  },
  {
    title: 'CLOUD & DEVOPS',
    inProgress: true,
    skills: [
      { name: 'Cloud Computing Fundamentals' },
      { name: 'Git & GitHub' },
      { name: 'Vercel' },
      { name: 'AWS', inProgress: true },
      { name: 'Azure', inProgress: true },
      { name: 'Docker', inProgress: true },
    ],
  },
];
