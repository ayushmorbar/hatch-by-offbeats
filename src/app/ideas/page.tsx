import { supabase } from "../../../lib/supabaseClient";
import IdeasList from "../../../components/IdeasList";
import FilterControls from "../../../components/FilterControls";

export default async function IdeasPage({ searchParams }: { searchParams: { sort?: string; tag?: string } }) {
  const awaitedSearchParams = await searchParams;
  const sort = awaitedSearchParams?.sort || "created_at";
  const tag = awaitedSearchParams?.tag || null;
  let query = supabase
    .from("ideas")
    .select("id, content, tags, created_at, likes")
    .order(sort, { ascending: sort !== "likes" });

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data: ideas } = await query;
  return (
    <div>
      <FilterControls />
      <IdeasList ideas={ideas || []} />
    </div>
  );
}
