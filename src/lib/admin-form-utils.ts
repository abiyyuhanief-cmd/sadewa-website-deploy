import type { TitikPelaksanaan } from "@/lib/types";

export function linesToArray(value: FormDataEntryValue | null): string[] | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  return str
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function arrayToLines(arr: string[] | null): string {
  return arr?.join("\n") ?? "";
}

export function commaToArray(value: FormDataEntryValue | null): string[] | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function arrayToComma(arr: string[] | null): string {
  return arr?.join(", ") ?? "";
}

export function linesToTitik(value: FormDataEntryValue | null): TitikPelaksanaan[] {
  const str = String(value ?? "").trim();
  if (!str) return [];
  return str
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [nama, desa, kecamatan] = line.split("|").map((s) => s.trim());
      return {
        nama: nama || line,
        ...(desa ? { desa } : {}),
        ...(kecamatan ? { kecamatan } : {}),
      };
    });
}

export function titikToLines(titik: TitikPelaksanaan[]): string {
  return titik
    .map((t) => [t.nama, t.desa ?? "", t.kecamatan ?? ""].join(" | ").replace(/(\s\|\s)+$/, ""))
    .join("\n");
}

export function toNullableInt(value: FormDataEntryValue | null): number | null {
  const str = String(value ?? "").trim();
  if (!str) return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}
