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

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height + 24}`} className="min-w-[560px]" role="img" aria-label="Grafik GUIM in Data per angkatan">
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
        {metrics.map((m) => (
          <span key={m.label} className="flex items-center gap-1.5 text-xs text-ink-600">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
