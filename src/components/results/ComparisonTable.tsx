'use client';

import { useState } from 'react';
import { RecommendationResult } from '@/lib/types';

interface ComparisonTableProps {
  results: RecommendationResult[];
}

const rows: { label: string; key: (r: RecommendationResult) => string | number | boolean }[] = [
  { label: 'Est. Price',       key: (r) => `$${r.product.priceUSD.toLocaleString()}` },
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

function renderCell(val: string | number | boolean) {
  if (typeof val === 'boolean') {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs font-bold"
        style={{
          fontFamily: 'var(--font-mono)',
          color: val ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}
      >
        {val ? '✓ Yes' : '✗ No'}
      </span>
    );
  }
  return (
    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
      {val}
    </span>
  );
}

export function ComparisonTable({ results }: ComparisonTableProps) {
  const [open, setOpen] = useState(false);

  if (results.length < 2) return null;

  return (
    <div className="mt-8 animate-fade-in">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-all duration-150"
        style={{
          fontFamily: 'var(--font-mono)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-hi)',
          color: 'var(--color-text-dim)',
        }}
      >
        <span>⇄ Compare All {results.length} Products Side-by-Side</span>
        <span style={{ color: 'var(--color-accent)' }}>{open ? '▲ Collapse' : '▼ Expand'}</span>
      </button>

      {open && (
        <div className="mt-3 rounded-xl overflow-hidden animate-slide-up"
          style={{ border: '1px solid var(--color-border)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-surface-2)' }}>
                  <th
                    className="text-left px-4 py-3 font-bold tracking-widest uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                      borderBottom: '1px solid var(--color-border)',
                      minWidth: '130px',
                    }}
                  >
                    Feature
                  </th>
                  {results.map((r, i) => (
                    <th
                      key={r.product.id}
                      className="text-center px-4 py-3 font-bold"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: i === 0 ? 'var(--color-accent)' : 'var(--color-text)',
                        borderBottom: '1px solid var(--color-border)',
                        borderLeft: '1px solid var(--color-border)',
                        background: i === 0 ? 'var(--color-accent-dim)' : undefined,
                        minWidth: '140px',
                      }}
                    >
                      <div>{r.product.name}</div>
                      <div
                        className="mt-0.5 text-xs font-normal"
                        style={{ color: i === 0 ? 'var(--color-accent-2)' : 'var(--color-text-dim)' }}
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
                      className="px-4 py-2.5"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-dim)',
                        borderBottom: ri < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                      }}
                    >
                      {row.label}
                    </td>
                    {results.map((r, ci) => (
                      <td
                        key={r.product.id}
                        className="px-4 py-2.5 text-center"
                        style={{
                          borderBottom: ri < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                          borderLeft: '1px solid var(--color-border)',
                          background: ci === 0 ? 'rgba(240,90,40,0.04)' : undefined,
                        }}
                      >
                        {renderCell(row.key(r) as string | number | boolean)}
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
