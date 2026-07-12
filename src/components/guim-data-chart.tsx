type Metric = {
  label: string;
  values: (number | null)[];
  color: string;
};

export default function GuimDataChart({
  angkatanLabels,
  metrics,
}: {
  angkatanLabels: string[];
  metrics: Metric[];
}) {
  const width = 720;
  const height = 200;
  const gap = 6;
  const groupWidth = width / angkatanLabels.length;
  const barWidth = (groupWidth - gap * (metrics.length + 1)) / metrics.length;
  const max = Math.max(1, ...metrics.flatMap((m) => m.values.map((v) => v ?? 0)));
  const hasData = metrics.some((m) => m.values.some((v) => (v ?? 0) > 0));

  // Series >0 also get a hatch overlay so they are distinguishable without color
  // (WCAG 1.4.1 — don't rely on color alone).
  const isPatterned = (mi: number) => mi % 2 === 1;

  if (!hasData) {
    return (
      <p className="py-10 text-center text-sm text-ink-500">
        Data belum tersedia untuk angkatan ini.
      </p>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height + 24}`}
        className="min-w-[560px]"
        role="img"
        aria-label={`Grafik ${metrics.map((m) => m.label).join(" dan ")} per angkatan GUIM`}
      >
        <defs>
          <pattern id="guim-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.55" />
          </pattern>
        </defs>
        {angkatanLabels.map((label, i) => {
          const groupX = i * groupWidth;
          return (
            <g key={label}>
              {metrics.map((m, mi) => {
                const v = m.values[i] ?? 0;
                const barHeight = (v / max) * height;
                const x = groupX + gap + mi * (barWidth + gap);
                const y = height - barHeight;
                return (
                  <g key={m.label}>
                    <rect x={x} y={y} width={barWidth} height={barHeight} fill={m.color} rx={2} />
                    {isPatterned(mi) && (
                      <rect x={x} y={y} width={barWidth} height={barHeight} fill="url(#guim-hatch)" rx={2} />
                    )}
                    {v > 0 && (
                      <text
                        x={x + barWidth / 2}
                        y={y - 4}
                        textAnchor="middle"
                        fontSize="9"
                        fill="var(--ink-600)"
                      >
                        {v}
                      </text>
                    )}
                  </g>
                );
              })}
              <text
                x={groupX + groupWidth / 2}
                y={height + 16}
                textAnchor="middle"
                fontSize="10"
                fill="var(--ink-700)"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 flex flex-wrap gap-4">
        {metrics.map((m, mi) => (
          <span key={m.label} className="flex items-center gap-1.5 text-xs text-ink-600">
            <span className="relative h-2.5 w-2.5 overflow-hidden rounded-sm" style={{ background: m.color }}>
              {isPatterned(mi) && (
                <span
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 2px, transparent 2px 4px)",
                  }}
                />
              )}
            </span>
            {m.label}
          </span>
        ))}
      </div>

      {/* Alternatif tabel untuk pembaca layar (WCAG — data-table) */}
      <table className="sr-only">
        <caption>{metrics.map((m) => m.label).join(" dan ")} per angkatan GUIM</caption>
        <thead>
          <tr>
            <th scope="col">Angkatan</th>
            {metrics.map((m) => (
              <th key={m.label} scope="col">
                {m.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {angkatanLabels.map((label, i) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {metrics.map((m) => (
                <td key={m.label}>{m.values[i] ?? "—"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
