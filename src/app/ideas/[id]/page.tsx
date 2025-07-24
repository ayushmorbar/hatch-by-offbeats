import { supabase } from "../../../../lib/supabaseClient";
import CommentForm from "../../../../components/CommentForm";
import CommentList from "../../../../components/CommentList";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: idea } = await supabase
    .from("ideas")
    .select("content, tags, created_at, likes")
    .eq("id", id)
    .single();
  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at")
    .eq("idea_id", id)
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="text-xl font-bold">{idea ? idea.content : "Idea not found"}</h1>
      <CommentList comments={comments || []} />
      <CommentForm ideaId={id} />
    </div>
  );
}