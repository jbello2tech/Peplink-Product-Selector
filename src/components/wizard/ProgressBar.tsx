interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)' }}>
          Step {currentStep} / {totalSteps}
        </span>
        <span className="text-xs"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      {/* Segmented bars */}
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done    = i < currentStep;
          const active  = i === currentStep - 1;
          return (
            <div
              key={i}
              className="h-1 flex-1 rounded-sm transition-all duration-300"
              style={{
                background: done
                  ? 'var(--color-accent)'
                  : active
                  ? 'var(--color-accent-2)'
                  : 'var(--color-border)',
                opacity: active ? 1 : done ? 0.85 : 0.4,
                animation: active ? 'segment-fill 0.25s ease both' : undefined,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
