import { ProductSpec } from '@/lib/types';

const specLabels: Partial<Record<keyof ProductSpec, string>> = {
  wanPorts: 'WAN Ports',
  maxThroughput: 'Max Throughput',
  cellular: 'Cellular',
  cellular5G: '5G Cellular',
  wifi: 'Built-in Wi-Fi',
  wifiStandard: 'Wi-Fi Standard',
  speedFusionCapable: 'SpeedFusion',
  lanPorts: 'LAN Ports',
  formFactor: 'Form Factor',
  maxUsers: 'Max Users',
  operatingTemp: 'Operating Temp',
};

function formatValue(key: keyof ProductSpec, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === undefined || value === null) return '—';
  return String(value);
}

interface SpecTableProps {
  specs: ProductSpec;
}

export function SpecTable({ specs }: SpecTableProps) {
  const rows = (Object.keys(specLabels) as (keyof ProductSpec)[]).filter(
    (k) => specs[k] !== undefined
  );

  return (
    <div className="rounded-lg border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((key, i) => (
            <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-3 py-2 text-gray-500 font-medium w-1/2">{specLabels[key]}</td>
              <td className="px-3 py-2 text-gray-900">{formatValue(key, specs[key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
