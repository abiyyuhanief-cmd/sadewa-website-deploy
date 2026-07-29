/**
 * Structured data (JSON-LD schema.org) — cara Google membaca "ini organisasi
 * apa / artikel apa" secara eksplisit, bukan menebak dari teks halaman.
 *
 * `<` di-escape supaya isi dari database tidak bisa menutup tag <script>
 * lebih awal (proteksi XSS standar untuk JSON-LD inline).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
