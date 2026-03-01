"use client";

import React from "react";

type Point = { day: string; value: number };

export default function ChartClient({ data }: { data: Point[] }) {
  const w = 900;
  const h = 260;
  const pad = 28;

  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);

  const x = (i: number) =>
    pad + (i * (w - pad * 2)) / Math.max(data.length - 1, 1);

  const y = (v: number) => {
    const t = (v - min) / Math.max(max - min, 1);
    return pad + (1 - t) * (h - pad * 2);
  };

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.value)}`)
    .join(" ");

  const area =
    path +
    ` L ${x(data.length - 1)} ${h - pad}` +
    ` L ${x(0)} ${h - pad}` +
    " Z";

  return (
    <div className="w-full h-full rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
        <defs>
          <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-purple)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* baseline grid */}
        {[0, 1, 2, 3].map((i) => {
          const yy = pad + (i * (h - pad * 2)) / 3;
          return (
            <line
              key={i}
              x1={pad}
              x2={w - pad}
              y1={yy}
              y2={yy}
              stroke="rgba(15,23,42,0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* filled area */}
        <path d={area} fill="url(#areaFill)" />

        {/* line */}
        <path
          d={path}
          fill="none"
          stroke="var(--brand-purple)"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* points */}
        {data.map((d, i) => (
          <circle
            key={d.day}
            cx={x(i)}
            cy={y(d.value)}
            r="4.4"
            fill="white"
            stroke="var(--brand-purple)"
            strokeWidth="2"
          />
        ))}

        {/* x labels */}
        {data.map((d, i) => (
          <text
            key={d.day}
            x={x(i)}
            y={h - 8}
            textAnchor="middle"
            fontSize="12"
            fill="rgba(15,23,42,0.55)"
            fontWeight="700"
          >
            {d.day}
          </text>
        ))}
      </svg>
    </div>
  );
}