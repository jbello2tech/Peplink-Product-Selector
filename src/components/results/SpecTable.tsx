import { ProductSpec } from '@/lib/types';

const specLabels: Partial<Record<keyof ProductSpec, string>> = {
  wanPorts: 'WAN Ports',
  maxThroughput: 'Max Throughput',
  cellular: 'Cellular',
  cellular5G: '5G',
  wifi: 'Wi-Fi',
  wifiStandard: 'Wi-Fi Standard',
  speedFusionCapable: 'SpeedFusion',
  lanPorts: 'LAN Ports',
  formFactor: 'Form Factor',
  maxUsers: 'Max Users',
  operatingTemp: 'Operating Temp',
};

function formatValue(key: keyof ProductSpec, value: unknown): { text: string; highlight: boolean } {
  if (typeof value === 'boolean') return { text: value ? 'YES' : 'NO', highlight: value };
  if (value === undefined || value === null) return { text: '—', highlight: false };
  return { text: String(value), highlight: false };
}

interface SpecTableProps {
  specs: ProductSpec;
}

export function SpecTable({ specs }: SpecTableProps) {
  const rows = (Object.keys(specLabels) as (keyof ProductSpec)[]).filter(
    (k) => specs[k] !== undefined
  );

  return (
    <div className="rounded-lg overflow-hidden text-xs"
      style={{ border: '1px solid var(--color-border)' }}>
      {rows.map((key, i) => {
        const { text, highlight } = formatValue(key, specs[key]);
        return (
          <div key={key}
            className="flex items-center justify-between"
            style={{
              background: i % 2 === 0 ? 'var(--color-surface-2)' : 'var(--color-surface)',
              padding: '6px 10px',
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)' }}>
              {specLabels[key]}
            </span>
            <span className="font-bold" style={{
              fontFamily: 'var(--font-mono)',
              color: highlight ? 'var(--color-accent)' : 'var(--color-text)',
            }}>
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
