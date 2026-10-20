/* ─────────────────────────────────────────────────────────────
   DATA ANIMATIONS  —  content for the "live" data effects.
   • PIPELINE     → the "From raw data to decisions" section
   • LIVE_QUERIES → the SQL console that types itself in the hero
   Numbers in LIVE_QUERIES are real results from your projects.
   Keep them real if you add new ones.
───────────────────────────────────────────────────────────── */

export type Glyph = 'collect' | 'clean' | 'model' | 'visualize' | 'decide';

export const PIPELINE: { step: string; tools: string; glyph: Glyph }[] = [
  { step: 'Collect',   tools: 'CSV · Excel · APIs · Databases', glyph: 'collect' },
  { step: 'Clean',     tools: 'Python · Pandas · Validation',   glyph: 'clean' },
  { step: 'Model',     tools: 'SQL · PostgreSQL · SQL Server',  glyph: 'model' },
  { step: 'Visualize', tools: 'Power BI · DAX · ECharts',       glyph: 'visualize' },
  { step: 'Decide',    tools: 'KPIs · Insights · Reports',      glyph: 'decide' },
];

export interface LiveQuery {
  project: string;               // shown in the console header
  sql: string;                   // typed out character by character
  rows: [string, number][];      // [label, value] — real results
  prefix?: string;               // e.g. '$'
  suffix?: string;               // e.g. 'K' or '%'
}

export const LIVE_QUERIES: LiveQuery[] = [
  {
    project: 'InsightHub',
    sql: 'SELECT branch, performance_score\nFROM branch_kpis\nORDER BY performance_score DESC;',
    rows: [['Cairo', 96], ['Alexandria', 68], ['Mansoura', 63]],
    suffix: '/100',
  },
  {
    project: 'Retail Sales · RFM',
    sql: 'SELECT segment, COUNT(*) AS customers\nFROM rfm_segments\nGROUP BY segment\nORDER BY customers DESC;',
    rows: [
      ['Need Attention', 996],
      ['Champions', 871],
      ['Potential Loyalists', 855],
      ['Loyal Customers', 808],
      ['At Risk', 804],
    ],
  },
  {
    project: 'US E-Commerce',
    sql: 'SELECT category, SUM(purchase_amount) AS sales\nFROM shopping_trends\nGROUP BY category\nORDER BY sales DESC;',
    rows: [['Clothing', 104], ['Accessories', 74], ['Footwear', 36], ['Outerwear', 19]],
    prefix: '$',
    suffix: 'K',
  },
];
