import { Reveal } from '@/components/Reveal';
import { Staff } from '@/components/Staff';
import { GOALS, TOTAL_MAX } from '@/data';

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--paper)]">
      {/* декоративный нотный стан */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[var(--bronze)] opacity-[0.16] no-print" aria-hidden="true">
        <Staff className="mx-auto w-[min(92vw,900px)]" />
      </div>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--bronze-bright)] opacity-[0.12] blur-3xl no-print" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[var(--bronze)] opacity-[0.10] blur-3xl no-print" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92dvh] w-full max-w-5xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <Reveal>
          <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[var(--bronze)]">
            Диагностическое издание · дети 1,5–3 года
          </p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="font-display mt-6 text-[clamp(2.9rem,8vw,5.6rem)] font-semibold leading-[1.02] tracking-tight text-[var(--ink)]">
            Логоритмика
          </h1>
        </Reveal>
        <Reveal delay={170}>
          <p className="font-display mt-3 text-[clamp(1.35rem,3.4vw,2.1rem)] font-medium italic text-[var(--bronze-deep)]">
            ритм · речь · движение
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mx-auto mt-9 flex max-w-xl items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-[var(--line)]" />
            <span className="text-[var(--bronze)]">◆</span>
            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>
        </Reveal>

        <Reveal delay={320}>
          <blockquote className="mx-auto mt-9 max-w-2xl">
            <p className="font-display text-[clamp(1.15rem,2.6vw,1.5rem)] font-medium leading-snug text-[var(--ink-soft)]">
              «Ритм — это основа, на которой строится всё остальное:
              речь, движение, мышление»
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={400}>
          <p className="mt-10 text-[15px] leading-relaxed text-[var(--ink-faint)]">
            Наблюдение за динамикой развития ребёнка через искусство логоритмики
            <br />
            <span className="mt-1 inline-block font-medium text-[var(--ink-soft)]">
              Учитель-дефектолог — Ирина Сергеевна Кичигина
            </span>
          </p>
        </Reveal>

        <Reveal delay={480} className="no-print">
          <a
            href="#anketa"
            className="group mt-11 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[var(--dark)] px-8 py-3 text-[15px] font-semibold text-[var(--bronze-bright)] shadow-lg shadow-[#221c14]/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--bronze-deep)] focus-visible:outline-2"
          >
            Начать диагностику
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-y-0.5" aria-hidden="true">
              <path d="M8 2v11M3.5 9.5 8 14l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>

      {/* Цель диагностики */}
      <div className="relative border-t border-[var(--line-soft)] bg-[var(--paper-deep)]/60">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold leading-tight text-[var(--ink)]">
              Цель диагностики
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
              Оценить уровень развития предпосылок речи через логоритмические
              показатели. Каждый показатель оценивается по трёхбалльной шкале;
              максимальный результат — {TOTAL_MAX} баллов по семи сферам.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {GOALS.map((goal, i) => (
                <li key={goal} className="flex items-baseline gap-3 text-[15px] text-[var(--ink-soft)]">
                  <span className="font-display text-lg font-semibold text-[var(--bronze)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
