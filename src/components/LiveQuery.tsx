import { useEffect, useRef, useState } from 'react';
import { LIVE_QUERIES } from '../data/showcase';

/* Self-typing SQL console: types a query, "runs" it, streams the real
   result rows in with growing bars, then moves to the next project. */

const KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'DESC', 'ASC', 'AS',
  'COUNT', 'SUM', 'AVG', 'ROUND', 'JOIN', 'ON', 'LIMIT',
]);

function highlight(code: string) {
  // split keeping separators so the text is rebuilt exactly
  return code.split(/(\s+|[(),;*])/).map((tok, i) => {
    if (!tok) return null;
    if (KEYWORDS.has(tok.toUpperCase())) return <span key={i} className="text-[#00F0FF]">{tok}</span>;
    if (/^[(),;*]$/.test(tok)) return <span key={i} className="text-[#555]">{tok}</span>;
    return <span key={i} className="text-[#d0d6d9]">{tok}</span>;
  });
}

type Phase = 'typing' | 'running' | 'result' | 'fade';

export default function LiveQuery({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Reduced motion → show a finished, static result.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(LIVE_QUERIES[0].sql.length);
      setPhase('result');
      setShown(LIVE_QUERIES[0].rows.length);
      return;
    }

    let alive = true;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(root);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const waitVisible = async () => {
      while (alive && (!visible || document.hidden)) await sleep(400);
    };

    (async () => {
      await sleep(1800); // let the hero entrance finish first
      let i = 0;
      while (alive) {
        const q = LIVE_QUERIES[i];
        setQi(i); setTyped(0); setShown(0); setPhase('typing');
        for (let c = 1; c <= q.sql.length && alive; c++) {
          await waitVisible();
          setTyped(c);
          await sleep(q.sql[c - 1] === '\n' ? 140 : 22);
        }
        if (!alive) break;
        setPhase('running');
        await sleep(650);
        setPhase('result');
        for (let r = 1; r <= q.rows.length && alive; r++) {
          await waitVisible();
          setShown(r);
          await sleep(240);
        }
        await sleep(4200);
        if (!alive) break;
        setPhase('fade');
        await sleep(450);
        i = (i + 1) % LIVE_QUERIES.length;
      }
    })();

    return () => { alive = false; io.disconnect(); };
  }, []);

  const q = LIVE_QUERIES[qi];
  const max = Math.max(...q.rows.map((r) => r[1]));
  const fmt = (v: number) => `${q.prefix ?? ''}${v.toLocaleString('en-US')}${q.suffix ?? ''}`;

  return (
    <div
      ref={rootRef}
      className={`border border-[#222] bg-[#070808]/80 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.06)] ${className}`}
      aria-label="Animated SQL console showing results from portfolio projects"
      role="img"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#333]" />
          <span className="w-2 h-2 rounded-full bg-[#333]" />
          <span className="w-2 h-2 rounded-full bg-[#00F0FF]/70" />
          <span className="ml-3 font-mono-custom text-[10px] tracking-widest text-[#777] uppercase">query.sql</span>
        </div>
        <span className="font-mono-custom text-[9px] tracking-widest text-[#555] uppercase truncate">
          sample · {q.project}
        </span>
      </div>

      <div className={`transition-opacity duration-300 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
        {/* Query */}
        <pre className="px-4 pt-4 pb-3 font-mono-custom text-[12px] leading-[1.7] whitespace-pre-wrap min-h-[112px]">
          <span className="text-[#333] select-none">› </span>
          {highlight(q.sql.slice(0, typed))}
          {phase === 'typing' && <span className="inline-block w-[7px] h-[14px] -mb-[2px] bg-[#00F0FF] animate-pulse" />}
        </pre>

        {/* Status line */}
        <div className="px-4 pb-3 h-6 font-mono-custom text-[10px] tracking-wider uppercase">
          {phase === 'running' && (
            <span className="text-[#00F0FF]/80 inline-flex items-center gap-2">
              <span className="lq-spin inline-block w-2.5 h-2.5 border border-[#00F0FF] border-t-transparent rounded-full" />
              executing
            </span>
          )}
          {(phase === 'result' || phase === 'fade') && (
            <span className="text-[#3ddc97]">✓ {q.rows.length} rows returned</span>
          )}
        </div>

        {/* Result rows */}
        <div className="px-4 pb-4 space-y-2 min-h-[150px]">
          {q.rows.map(([label, value], r) => {
            const on = (phase === 'result' || phase === 'fade') && r < shown;
            return (
              <div
                key={qi + label}
                className="grid grid-cols-[110px_1fr_auto] items-center gap-3 transition-all duration-300"
                style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(6px)' }}
              >
                <span className="font-mono-custom text-[11px] text-[#9aa3a8] truncate">{label}</span>
                <span className="h-[6px] bg-[#141414] overflow-hidden">
                  <span
                    className="block h-full bg-gradient-to-r from-[#00F0FF]/40 to-[#00F0FF] transition-[width] duration-700 ease-out"
                    style={{ width: on ? `${(value / max) * 100}%` : '0%' }}
                  />
                </span>
                <span className="font-mono-custom text-[11px] text-white tabular-nums text-right">{fmt(value)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
