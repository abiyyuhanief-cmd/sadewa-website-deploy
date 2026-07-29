import AnalyticsView from "@/components/admin/analytics-view";
import { getAnalyticsSummary, parseRange } from "@/lib/analytics-data";

export default async function AdminAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const range = parseRange((await searchParams).range);
  const summary = await getAnalyticsSummary(range);

  return <AnalyticsView summary={summary} range={range} />;
}
