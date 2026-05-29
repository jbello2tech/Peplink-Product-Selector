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
  if (typeof value === 'boolean') return { text: value ? 'Yes' : 'No', highlight: value };
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
    <div
      className="text-xs"
      style={{ border: '1px solid var(--color-border)', borderRadius: '2px', overflow: 'hidden' }}
    >
      {rows.map((key, i) => {
        const { text, highlight } = formatValue(key, specs[key]);
        return (
          <div
            key={key}
            className="flex items-center justify-between"
            style={{
              background: i % 2 === 0 ? 'var(--color-surface-2)' : 'var(--color-surface)',
              padding: '8px 12px',
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <span
              style={{
                color: 'var(--color-text-dim)',
                fontWeight: 300,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '10px',
              }}
            >
              {specLabels[key]}
            </span>
            <span
              style={{
                color: highlight ? 'var(--color-accent)' : 'var(--color-text)',
                fontWeight: highlight ? 600 : 400,
              }}
            >
              {text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
