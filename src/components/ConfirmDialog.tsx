interface ConfirmDialogProps {
  open: boolean;
  title: string;
  text: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, text, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <button
        aria-label="Отмена"
        className="absolute inset-0 bg-[#221c14]/45 backdrop-blur-[2px] cursor-default"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-7 shadow-2xl">
        <h3 id="confirm-title" className="font-display text-2xl font-semibold text-[var(--ink)]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-soft)]">{text}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="rounded-full border border-[var(--line)] bg-transparent px-5 py-2.5 text-sm font-medium text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-deep)] cursor-pointer"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            autoFocus
            className="rounded-full bg-[var(--dark)] px-5 py-2.5 text-sm font-semibold text-[var(--bronze-bright)] transition-colors hover:bg-[var(--bronze-deep)] cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
