interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="kjj-eyebrow">
          Step {currentStep} / {totalSteps}
        </span>
        <span className="kjj-eyebrow" style={{ color: 'var(--color-accent)' }}>
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done = i < currentStep;
          const active = i === currentStep - 1;
          return (
            <div
              key={i}
              className="h-px flex-1 transition-all duration-300"
              style={{
                background: done || active ? 'var(--color-accent)' : 'var(--color-border-hi)',
                height: active ? '2px' : '1px',
                animation: active ? 'segment-fill 0.25s ease both' : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
