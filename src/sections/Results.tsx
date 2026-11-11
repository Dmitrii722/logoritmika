import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { SECTIONS, TOTAL_MAX, interpret, SCALE_LEGEND } from '@/data';

type Answers = Record<string, number | undefined>;

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setInView(true), obs.unobserve(e.target))),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function useCountUp(target: number, active: boolean, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = value;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active]);
  return value;
}

function Ring({ pct, label, score, max, active, delay }: {
  pct: number;
  label: string;
  score: number;
  max: number;
  active: boolean;
  delay: number;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = active ? c - (pct / 100) * c : c;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-[120px] w-[120px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(250,247,240,0.14)" strokeWidth="7" />
          <circle
            className="ring-fill"
            cx="60" cy="60" r={r} fill="none"
            stroke="var(--bronze-bright)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transitionDelay: `${delay}ms` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold leading-none text-[var(--paper)]">{pct}%</span>
        </div>
      </div>
      <p className="mt-3 max-w-[150px] text-[13px] font-medium leading-tight text-[var(--paper)]/85">{label}</p>
      <p className="mt-0.5 text-[12px] text-[var(--paper)]/50">{score} / {max}</p>
    </div>
  );
}

export function Results({ answers }: { answers: Answers }) {
  const { ref, inView } = useInView();
  const sectionScores = SECTIONS.map((sec) => ({
    sec,
    score: sec.skills.reduce((s, sk) => s + (answers[sk.id] ?? 0), 0),
  }));
  const total = sectionScores.reduce((s, x) => s + x.score, 0);
  const answeredCount = Object.values(answers).filter((v) => v !== undefined).length;
  const animated = useCountUp(total, inView);
  const interp = interpret(total);
  const totalPct = Math.round((total / TOTAL_MAX) * 100);

  return (
    <section id="results" className="print-block scroll-mt-24 border-b border-[var(--line)] bg-[var(--dark)] text-[var(--paper)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20" ref={ref}>
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--bronze-bright)]">
            Итоговый результат
          </p>
          <h2 className="font-display mt-2 max-w-2xl text-[clamp(1.9rem,4.4vw,2.9rem)] font-semibold leading-tight">
            Визуализация динамики развития ребёнка
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <Reveal delay={100}>
            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[clamp(4.5rem,10vw,7rem)] font-semibold leading-none text-[var(--bronze-bright)]" aria-live="polite">
                  {animated}
                </span>
                <span className="font-display text-2xl text-[var(--paper)]/50">/ {TOTAL_MAX}</span>
              </div>
              <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.18em] text-[var(--paper)]/55">
                сумма баллов · {totalPct}%
              </p>
              <div className="mt-7 w-full max-w-xs rounded-2xl border border-[var(--paper)]/15 p-5">
                <p className="font-display text-xl font-semibold text-[var(--bronze-bright)]">{interp.label}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--paper)]/80">{interp.text}</p>
                <p className="mt-3 text-[12.5px] text-[var(--paper)]/45">
                  Отвечено на {answeredCount} из {SECTIONS.reduce((s, x) => s + x.skills.length, 0)} показателей
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
              {sectionScores.map(({ sec, score }, i) => (
                <Ring
                  key={sec.id}
                  pct={Math.round((score / sec.max) * 100)}
                  label={sec.name}
                  score={score}
                  max={sec.max}
                  active={inView}
                  delay={i * 90}
                />
              ))}
              <div className="col-span-2 flex items-end pb-1 sm:col-span-3 lg:col-span-1">
                <ul className="space-y-1.5">
                  {SCALE_LEGEND.map((l) => (
                    <li key={l.value} className="flex items-baseline gap-2.5 text-[13px] text-[var(--paper)]/70">
                      <span className="font-display text-base font-semibold text-[var(--bronze-bright)]">{l.value}</span>
                      <span>{l.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
