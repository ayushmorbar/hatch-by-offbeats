import { supabase } from "../../../lib/supabaseClient";

export default async function AnalyticsPage() {
  const { data } = await supabase
    .from("metrics")
    .select("created_at, action_type")
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()); // Last 7 days

  // Count actions
  const counts = { submit: 0, like: 0, comment: 0 };
  type ActionType = keyof typeof counts;
  data?.forEach((m) => {
    const action = m.action_type as ActionType;
    if (counts[action] !== undefined) counts[action]++;
  });

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Analytics (Last 7 Days)</h1>
      <ul className="space-y-2">
        <li>Ideas Submitted: {counts.submit}</li>
        <li>Likes: {counts.like}</li>
        <li>Comments: {counts.comment}</li>
      </ul>
    </div>
  );
}
