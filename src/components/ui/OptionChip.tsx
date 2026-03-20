'use client';

interface OptionChipProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionChip({ label, description, icon, selected, onClick }: OptionChipProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-lg transition-all duration-150 cursor-pointer group"
      style={{
        background: selected ? 'var(--color-accent-dim)' : 'var(--color-surface-2)',
        border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
        padding: '12px 14px',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-150"
          style={{
            background: selected ? 'var(--color-accent)' : 'transparent',
            border: `1.5px solid ${selected ? 'var(--color-accent)' : 'var(--color-border-hi)'}`,
          }}>
          {selected && (
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>

        {icon && <span className="text-lg flex-shrink-0">{icon}</span>}

        <div>
          <div className="text-sm font-bold"
            style={{
              fontFamily: 'var(--font-mono)',
              color: selected ? 'var(--color-accent-2)' : 'var(--color-text)',
            }}>
            {label}
          </div>
          {description && (
            <div className="text-xs mt-0.5"
              style={{ color: 'var(--color-text-dim)' }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
