interface WhyThisProductProps {
  text: string;
}

export function WhyThisProduct({ text }: WhyThisProductProps) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800">
      <span className="font-semibold">Why this product: </span>
      {text}
    </div>
  );
}
