/** Декоративный нотный стан: пять линий с парящими нотами — мотив ритма и музыки */
export function Staff({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 560 140"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {[20, 45, 70, 95, 120].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="560"
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
      ))}
      {/* Нота 1 */}
      <g className="staff-note" style={{ animationDelay: '0s' }}>
        <ellipse cx="90" cy="93" rx="9" ry="7" transform="rotate(-16 90 93)" fill="currentColor" />
        <rect x="97" y="30" width="2.4" height="63" rx="1.2" fill="currentColor" />
      </g>
      {/* Нота 2 — восьмые связкой */}
      <g className="staff-note" style={{ animationDelay: '0.9s' }}>
        <ellipse cx="240" cy="68" rx="9" ry="7" transform="rotate(-16 240 68)" fill="currentColor" />
        <ellipse cx="290" cy="60" rx="9" ry="7" transform="rotate(-16 290 60)" fill="currentColor" />
        <rect x="247" y="14" width="2.4" height="55" rx="1.2" fill="currentColor" />
        <rect x="297" y="8" width="2.4" height="53" rx="1.2" fill="currentColor" />
        <path d="M247 14 L299.4 8 L299.4 22 Q273 14 247 26 Z" fill="currentColor" />
      </g>
      {/* Нота 3 */}
      <g className="staff-note" style={{ animationDelay: '1.8s' }}>
        <ellipse cx="430" cy="103" rx="9" ry="7" transform="rotate(-16 430 103)" fill="currentColor" />
        <rect x="437" y="40" width="2.4" height="63" rx="1.2" fill="currentColor" />
        <path d="M439 40 q18 4 14 22 q10 -16 -14 -12 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
