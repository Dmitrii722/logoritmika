import { useEffect, useState } from 'react';
import { SECTIONS, TOTAL_MAX } from '@/data';

type Answers = Record<string, number | undefined>;

/** Боковая навигация-линейка: римские номера сфер + общий прогресс. Только широкие экраны. */
export function ProgressRail({ answers }: { answers: Answers }) {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(Number(e.target.id.replace('section-', '')));
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(`section-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const answered = Object.values(answers).filter((v) => v !== undefined).length;
  const totalSkills = SECTIONS.reduce((s, x) => s + x.skills.length, 0);
  const pct = Math.round((answered / totalSkills) * 100);
  void TOTAL_MAX;

  return (
    <nav
      className="no-print fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="Навигация по сферам диагностики"
    >
      <div className="flex flex-col items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--paper)]/90 px-2.5 py-4 shadow-lg shadow-[#221c14]/8 backdrop-blur">
        <span className="mb-2 text-[10.5px] font-semibold tabular-nums tracking-wide text-[var(--ink-faint)]">
          {pct}%
        </span>
        {SECTIONS.map((s) => {
          const done = s.skills.every((sk) => answers[sk.id] !== undefined);
          const active = activeId === s.id;
          return (
            <a
              key={s.id}
              href={`#section-${s.id}`}
              title={s.name}
              aria-label={`${s.name} — ${done ? 'заполнено' : 'не заполнено'}`}
              className={`font-display flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold transition-all duration-200 ${
                active
                  ? 'bg-[var(--dark)] text-[var(--bronze-bright)]'
                  : done
                    ? 'text-[var(--bronze-deep)] hover:bg-[var(--paper-deep)]'
                    : 'text-[var(--ink-faint)]/60 hover:bg-[var(--paper-deep)] hover:text-[var(--ink-soft)]'
              }`}
            >
              {s.numeral}
            </a>
          );
        })}
        <a
          href="#results"
          title="Итоговый результат"
          aria-label="Перейти к итоговому результату"
          className="mt-2 flex h-9 w-9 items-center justify-center rounded-full text-[var(--bronze)] transition-colors hover:bg-[var(--paper-deep)]"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 4.6 9.3 7l2.6.3-1.9 1.8.5 2.6L8 10.5l-2.5 1.2.5-2.6-1.9-1.8L6.7 7 8 4.6Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
