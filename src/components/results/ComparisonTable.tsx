'use client';

import { useState } from 'react';
import { RecommendationResult } from '@/lib/types';

interface ComparisonTableProps {
  results: RecommendationResult[];
}

const rows: { label: string; key: (r: RecommendationResult) => string | number | boolean; highlight?: boolean }[] = [
  { label: 'Est. MSRP',        key: (r) => `$${r.product.priceUSD.toLocaleString()}` },
  {
    label: '★ Gold Partner Price',
    key: (r) =>
      r.product.goldPriceUSD !== undefined
        ? `$${r.product.goldPriceUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : '—',
    highlight: true,
  },
  { label: 'Max Throughput',   key: (r) => r.product.specs.maxThroughput },
  { label: 'Internet Ports',   key: (r) => r.product.specs.wanPorts },
  { label: 'LAN Ports',        key: (r) => r.product.specs.lanPorts },
  { label: 'Cellular',         key: (r) => r.product.specs.cellular },
  { label: '5G',               key: (r) => r.product.specs.cellular5G },
  { label: 'Built-in Wi-Fi',   key: (r) => r.product.specs.wifi },
  { label: 'Wi-Fi Standard',   key: (r) => r.product.specs.wifiStandard ?? '—' },
  { label: 'SpeedFusion',      key: (r) => r.product.specs.speedFusionCapable },
  { label: 'Max Devices',      key: (r) => r.product.specs.maxUsers ?? '—' },
  { label: 'Form Factor',      key: (r) => r.product.specs.formFactor },
];

function renderCell(val: string | number | boolean, highlight = false) {
  if (typeof val === 'boolean') {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs"
        style={{
          color: val ? 'var(--color-accent)' : 'var(--color-text-muted)',
          fontWeight: val ? 400 : 300,
        }}
      >
        {val ? '✓ Yes' : '— No'}
      </span>
    );
  }
  return (
    <span
      style={{
        color: highlight ? 'var(--color-accent)' : 'var(--color-text)',
        fontWeight: highlight ? 400 : 300,
      }}
    >
      {val}
    </span>
  );
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  const [open, setOpen] = useState(false);

  if (results.length < 2) return null;

  return (
    <div className="mt-10 animate-fade-in">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-all duration-150"
        style={{
          background: 'transparent',
          border: '1px solid var(--color-border-hi)',
          borderRadius: '2px',
          color: 'var(--color-text)',
          fontWeight: 300,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontSize: '0.72rem',
        }}
      >
        <span>Compare All {results.length} Products</span>
        <span style={{ color: 'var(--color-accent)' }}>{open ? '— Collapse' : '+ Expand'}</span>
      </button>

      {open && (
        <div
          className="mt-3 overflow-hidden animate-slide-up"
          style={{ border: '1px solid var(--color-border)', borderRadius: '2px' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-2)' }}>
                  <th
                    className="text-left px-4 py-3 kjj-eyebrow"
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      minWidth: '130px',
                    }}
                  >
                    Feature
                  </th>
                  {results.map((r, i) => (
                    <th
                      key={r.product.id}
                      className="text-center px-4 py-3"
                      style={{
                        color: i === 0 ? '#fff' : 'var(--color-text)',
                        background: i === 0 ? 'var(--color-accent)' : 'var(--color-surface-2)',
                        borderBottom: '1px solid var(--color-border)',
                        borderLeft: '1px solid var(--color-border)',
                        minWidth: '140px',
                        fontWeight: 400,
                        letterSpacing: '0.04em',
                      }}
                    >
                      <div>{r.product.name}</div>
                      <div
                        className="mt-1 kjj-eyebrow"
                        style={{ color: i === 0 ? 'rgba(255,255,255,0.7)' : 'var(--color-text-dim)' }}
                      >
                        {r.fitLabel}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={row.label}
                    style={{ background: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-2)' }}
                  >
                    <td
                      className="px-4 py-3 kjj-eyebrow"
                      style={{
                        borderBottom: ri < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                      }}
                    >
                      {row.label}
                    </td>
                    {results.map((r, ci) => (
                      <td
                        key={r.product.id}
                        className="px-4 py-3 text-center"
                        style={{
                          borderBottom: ri < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                          borderLeft: '1px solid var(--color-border)',
                          background: ci === 0 ? 'var(--color-accent-dim)' : undefined,
                        }}
                      >
                        {renderCell(row.key(r) as string | number | boolean, row.highlight)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
