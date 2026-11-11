import { useState } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';

export function Footer({ onReset }: { onReset: () => void }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <footer className="bg-[var(--paper)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="no-print flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[var(--dark)] px-6 py-2.5 text-[14.5px] font-semibold text-[var(--bronze-bright)] shadow-md shadow-[#221c14]/15 transition-all hover:-translate-y-0.5 hover:bg-[var(--bronze-deep)] cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6V2h8v4M4 12H2V7h12v5h-2M4 10h8v4H4v-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              Распечатать опросник
            </button>
            <button
              onClick={() => setConfirmOpen(true)}
              className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[var(--line)] bg-transparent px-6 py-2.5 text-[14.5px] font-medium text-[var(--ink-soft)] transition-colors hover:border-[var(--bronze)]/60 hover:bg-[var(--paper-deep)] cursor-pointer"
            >
              Сбросить ответы
            </button>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-[var(--ink-faint)] transition-colors hover:text-[var(--bronze-deep)]"
          >
            Наверх
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 14V3M3.5 7 8 2.5 12.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-[var(--line-soft)] pt-8 text-center">
          <span className="text-[var(--bronze)]" aria-hidden="true">◆</span>
          <p className="font-display text-xl font-semibold text-[var(--ink)]">
            Логоритмика: ритм, движение, речь
          </p>
          <p className="text-[13.5px] text-[var(--ink-faint)]">
            Ирина Сергеевна Кичигина · Диагностическое издание для детей 1,5–3 лет
          </p>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Сбросить все ответы?"
        text="Оценки по всем семи сферам, сведения о ребёнке и заметки педагога будут удалены из этого браузера. Действие нельзя отменить."
        confirmLabel="Да, сбросить"
        onConfirm={() => {
          onReset();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </footer>
  );
}
