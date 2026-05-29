interface WhyThisProductProps {
  text: string;
}

export function WhyThisProduct({ text }: WhyThisProductProps) {
  return (
    <div
      className="px-4 py-3 text-sm leading-relaxed"
      style={{
        background: 'var(--color-surface-2)',
        borderLeft: '2px solid var(--color-accent)',
        color: 'var(--color-text)',
        fontWeight: 300,
      }}
    >
      <span
        className="block mb-1 kjj-eyebrow"
        style={{ color: 'var(--color-accent)' }}
      >
        Why this product
      </span>
      {text}
    </div>
  );
}
