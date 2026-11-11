import { Reveal } from '@/components/Reveal';
import { RECOMMENDATIONS } from '@/data';

export interface Notes {
  strengths: string;
  zones: string;
}

export function Conclusion({
  notes,
  onChange,
}: {
  notes: Notes;
  onChange: (notes: Notes) => void;
}) {
  return (
    <>
      <section className="print-block border-b border-[var(--line)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--bronze)]">
                  Заключение
                </p>
                <h2 className="font-display mt-2 text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold text-[var(--ink)]">
                  Качественное заключение педагога
                </h2>
                <p className="mt-1 text-[15px] italic text-[var(--ink-faint)]">
                  Индивидуальный портрет ребёнка
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            <Reveal delay={80}>
              <label className="block h-full">
                <span className="font-display mb-3 flex items-center gap-3 text-xl font-semibold text-[var(--ink)]">
                  <span className="text-[var(--bronze)]" aria-hidden="true">◆</span>
                  Сильные стороны ребёнка
                </span>
                <textarea
                  value={notes.strengths}
                  onChange={(e) => onChange({ ...notes, strengths: e.target.value })}
                  placeholder="Опишите наблюдаемые достижения и таланты ребёнка…"
                  rows={6}
                  className="h-full min-h-[160px] w-full resize-y rounded-2xl border border-[var(--line)] bg-[#fffdf8] px-5 py-4 text-[15px] leading-relaxed text-[var(--ink)] shadow-sm outline-none transition-all placeholder:text-[var(--ink-faint)]/60 hover:border-[var(--bronze)]/50 focus:border-[var(--bronze)] focus:ring-2 focus:ring-[var(--bronze)]/20"
                />
              </label>
            </Reveal>
            <Reveal delay={160}>
              <label className="block h-full">
                <span className="font-display mb-3 flex items-center gap-3 text-xl font-semibold text-[var(--ink)]">
                  <span className="text-[var(--bronze)]" aria-hidden="true">◆</span>
                  Зоны развития
                </span>
                <textarea
                  value={notes.zones}
                  onChange={(e) => onChange({ ...notes, zones: e.target.value })}
                  placeholder="Обозначьте области, требующие внимания и поддержки…"
                  rows={6}
                  className="h-full min-h-[160px] w-full resize-y rounded-2xl border border-[var(--line)] bg-[#fffdf8] px-5 py-4 text-[15px] leading-relaxed text-[var(--ink)] shadow-sm outline-none transition-all placeholder:text-[var(--ink-faint)]/60 hover:border-[var(--bronze)]/50 focus:border-[var(--bronze)] focus:ring-2 focus:ring-[var(--bronze)]/20"
                />
              </label>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="print-block border-b border-[var(--line)] bg-[var(--paper-deep)]/50">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--bronze)]">
              Домашняя среда
            </p>
            <h2 className="font-display mt-2 text-[clamp(1.7rem,3.6vw,2.4rem)] font-semibold text-[var(--ink)]">
              Рекомендации родителям
            </h2>
          </Reveal>
          <div className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {RECOMMENDATIONS.map((rec, i) => (
              <Reveal key={rec} delay={i * 70}>
                <div className="flex items-start gap-4">
                  <span className="font-display mt-0.5 text-2xl font-semibold leading-none text-[var(--bronze)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">{rec}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
