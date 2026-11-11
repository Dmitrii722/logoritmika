import { Reveal } from '@/components/Reveal';

export interface ChildInfo {
  name: string;
  age: string;
  date: string;
  teacher: string;
}

const FIELDS: { key: keyof ChildInfo; label: string; type: string; placeholder: string }[] = [
  { key: 'name', label: 'ФИ ребёнка', type: 'text', placeholder: 'Иванов Иван' },
  { key: 'age', label: 'Возраст', type: 'text', placeholder: '2 года 4 мес.' },
  { key: 'date', label: 'Дата', type: 'date', placeholder: '' },
  { key: 'teacher', label: 'Педагог', type: 'text', placeholder: 'Ирина Сергеевна Кичигина' },
];

export function ChildInfoCard({
  info,
  onChange,
}: {
  info: ChildInfo;
  onChange: (info: ChildInfo) => void;
}) {
  return (
    <section id="anketa" className="scroll-mt-24 border-b border-[var(--line)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[var(--bronze)]">
                Анкета
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--ink)]">
                Сведения о ребёнке
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--ink-faint)]">
              Данные сохраняются автоматически в этом браузере и будут включены в печатную версию.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FIELDS.map((f) => (
              <label key={f.key} className="group block">
                <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-faint)]">
                  {f.label}
                </span>
                <input
                  type={f.type}
                  value={info[f.key]}
                  placeholder={f.placeholder}
                  onChange={(e) => onChange({ ...info, [f.key]: e.target.value })}
                  className="w-full rounded-xl border border-[var(--line)] bg-[#fffdf8] px-4 py-3 text-[15px] text-[var(--ink)] shadow-sm outline-none transition-all placeholder:text-[var(--ink-faint)]/60 hover:border-[var(--bronze)]/50 focus:border-[var(--bronze)] focus:ring-2 focus:ring-[var(--bronze)]/20"
                />
              </label>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
