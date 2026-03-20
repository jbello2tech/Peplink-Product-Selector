'use client';

interface OptionButtonProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionButton({ label, description, icon, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-lg transition-all duration-150 cursor-pointer group relative overflow-hidden"
      style={{
        background: selected ? 'var(--color-accent-dim)' : 'var(--color-surface-2)',
        border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
        boxShadow: selected ? '0 0 0 1px var(--color-accent), inset 0 0 20px var(--color-accent-dim)' : 'none',
        padding: '14px 16px',
      }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l transition-all duration-150"
        style={{ background: selected ? 'var(--color-accent)' : 'transparent' }} />

      <div className="flex items-center gap-3 pl-2">
        {icon && (
          <span className="text-xl leading-none flex-shrink-0 transition-transform duration-150 group-hover:scale-110">
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold tracking-wide transition-colors"
            style={{
              fontFamily: 'var(--font-mono)',
              color: selected ? 'var(--color-accent-2)' : 'var(--color-text)',
            }}>
            {label}
          </div>
          {description && (
            <div className="text-xs mt-0.5 truncate"
              style={{ color: 'var(--color-text-dim)' }}>
              {description}
            </div>
          )}
        </div>

        {/* Checkmark */}
        <div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-all duration-150"
          style={{
            background: selected ? 'var(--color-accent)' : 'transparent',
            border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border-hi)'}`,
          }}>
          {selected && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
