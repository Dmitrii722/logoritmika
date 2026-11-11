import { Reveal } from '@/components/Reveal';
import type { Section } from '@/data';

type Answers = Record<string, number | undefined>;

const SCALE_LABELS: Record<number, string> = {
  0: '0 — не проявляется',
  1: '1 — с помощью',
  2: '2 — самостоятельно',
};

function SkillRow({
  skillId,
  name,
  hint,
  value,
  onSelect,
}: {
  skillId: string;
  name: string;
  hint: string;
  value: number | undefined;
  onSelect: (v: number) => void;
}) {
  return (
    <div className="grid items-center gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
      <div className="min-w-0">
        <p className="text-[15.5px] font-medium leading-snug text-[var(--ink)]">{name}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-[var(--ink-faint)]">{hint}</p>
      </div>
      <fieldset className="w-full sm:w-[264px] sm:shrink-0">
        <legend className="sr-only">
          {name}: {SCALE_LABELS[0]}, {SCALE_LABELS[1]}, {SCALE_LABELS[2]}
        </legend>
        <div className="score-group" role="radiogroup" aria-label={name}>
          {[0, 1, 2].map((v) => (
            <label key={v} className="score-option">
              <input
                type="radio"
                name={skillId}
                value={v}
                checked={value === v}
                onChange={() => onSelect(v)}
              />
              <span>{v}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export function AssessmentSection({
  section,
  answers,
  onSelect,
}: {
  section: Section;
  answers: Answers;
  onSelect: (skillId: string, value: number) => void;
}) {
  const score = section.skills.reduce((s, sk) => s + (answers[sk.id] ?? 0), 0);
  const answered = section.skills.filter((sk) => answers[sk.id] !== undefined).length;
  const pct = Math.round((score / section.max) * 100);

  return (
    <section
      id={`section-${section.id}`}
      className="print-block scroll-mt-24 border-b border-[var(--line)]"
      aria-labelledby={`section-title-${section.id}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
            <span
              className="font-display select-none text-[clamp(3rem,6vw,4.4rem)] font-light leading-none text-[var(--bronze)]"
              aria-hidden="true"
            >
              {section.numeral}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2
                  id={`section-title-${section.id}`}
                  className="font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-tight text-[var(--ink)]"
                >
                  {section.name}
                </h2>
                <p className="font-display text-xl font-semibold text-[var(--bronze-deep)]" aria-live="polite">
                  {score} <span className="text-[var(--ink-faint)]">/ {section.max}</span>
                </p>
              </div>
              <p className="mt-1 text-[15px] italic text-[var(--ink-faint)]">{section.subtitle}</p>
              <div className="section-progress mt-4 max-w-md" aria-hidden="true">
                <div style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--ink-faint)]">
                Отвечено {answered} из {section.skills.length} показателей
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mt-8 divide-y divide-[var(--line-soft)] border-y border-[var(--line)]">
            <div className="hidden grid-cols-[minmax(0,1fr)_auto] gap-8 pb-3 pt-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-faint)] sm:grid">
              <span>Показатель</span>
              <span className="w-[264px] text-center">0 не проявляется · 1 с помощью · 2 самостоятельно</span>
            </div>
            {section.skills.map((sk) => (
              <SkillRow
                key={sk.id}
                skillId={sk.id}
                name={sk.name}
                hint={sk.hint}
                value={answers[sk.id]}
                onSelect={(v) => onSelect(sk.id, v)}
              />
            ))}
          </div>
          {section.note && (
            <p className="mt-4 rounded-xl bg-[var(--paper-deep)] px-4 py-3 text-[13.5px] leading-relaxed text-[var(--ink-soft)]">
              {section.note}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
