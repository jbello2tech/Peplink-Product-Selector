interface WhyThisProductProps {
  text: string;
}

export function WhyThisProduct({ text }: WhyThisProductProps) {
  return (
    <div className="rounded-lg px-4 py-3 text-sm leading-relaxed relative"
      style={{
        background: 'var(--color-accent-dim)',
        border: '1px solid rgba(240,90,40,0.2)',
        color: 'var(--color-text)',
      }}>
      <span className="font-bold mr-1.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
        // WHY:
      </span>
      {text}
    </div>
  );
}
