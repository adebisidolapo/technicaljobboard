"use client";

import React, { useMemo } from "react";

export type Point = { day: string; views: number };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ChartClient({ data }: { data: Point[] }) {
  const { max, points } = useMemo(() => {
    const m = Math.max(1, ...data.map((d) => d.views));
    return { max: m, points: data };
  }, [data]);

  // Simple, clean inline SVG chart (no libraries)
  const width = 720;
  const height = 220;
  const padX = 28;
  const padY = 18;

  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const step = points.length > 1 ? innerW / (points.length - 1) : innerW;

  const coords = points.map((p, i) => {
    const x = padX + i * step;
    const y = padY + innerH - (p.views / max) * innerH;
    return { x, y, ...p };
  });

  const lineD = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const areaD = `${lineD} L ${padX + innerW} ${padY + innerH} L ${padX} ${
    padY + innerH
  } Z`;

  return (
    <div className="w-full h-full">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-extrabold tracking-wide text-slate-500">
            Daily views
          </div>
          <div className="text-xs font-semibold text-slate-600">
            Peak: <span className="text-slate-900">{max}</span>
          </div>
        </div>

        <div className="mt-3">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-[180px] sm:h-[210px]"
            role="img"
            aria-label="Job interest chart"
          >
            <defs>
              <linearGradient id="tj_area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(106, 111, 242, 0.28)" />
                <stop offset="100%" stopColor="rgba(106, 111, 242, 0.02)" />
              </linearGradient>

              <filter id="tj_soft" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* grid */}
            {[0.25, 0.5, 0.75].map((t) => {
              const y = padY + innerH * t;
              return (
                <line
                  key={t}
                  x1={padX}
                  x2={padX + innerW}
                  y1={y}
                  y2={y}
                  stroke="rgba(15, 23, 42, 0.08)"
                  strokeWidth="1"
                />
              );
            })}

            {/* area */}
            <path d={areaD} fill="url(#tj_area)" />

            {/* line */}
            <path
              d={lineD}
              fill="none"
              stroke="rgba(106, 111, 242, 1)"
              strokeWidth="3"
              filter="url(#tj_soft)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* points */}
            {coords.map((c, idx) => (
              <g key={`${c.day}-${idx}`}>
                <circle cx={c.x} cy={c.y} r="4.5" fill="white" />
                <circle cx={c.x} cy={c.y} r="3.2" fill="rgba(106, 111, 242, 1)" />
              </g>
            ))}
          </svg>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            {points.map((p) => (
              <div key={p.day} className={cx("min-w-0", "font-semibold")}>
                {p.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}