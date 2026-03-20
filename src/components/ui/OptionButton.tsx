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
      className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all duration-150 cursor-pointer
        ${selected
          ? 'border-blue-600 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50'
        }`}
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-2xl leading-none mt-0.5">{icon}</span>}
        <div>
          <div className={`font-semibold text-sm ${selected ? 'text-blue-700' : 'text-gray-900'}`}>
            {label}
          </div>
          {description && (
            <div className="text-xs text-gray-500 mt-0.5">{description}</div>
          )}
        </div>
        {selected && (
          <div className="ml-auto">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
