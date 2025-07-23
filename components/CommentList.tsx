interface Comment {
  id: string;
  content: string;
  created_at: string;
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (!comments.length)
    return (
      <p className="text-gray-400 font-manrope text-center py-4">
        No comments yet.
      </p>
    );
  return (
    <div className="mt-4 space-y-2">
      {comments.map((c) => (
        <div
          key={c.id}
          className="p-3 bg-black rounded border border-white/10 text-white font-manrope"
        >
          <p className="text-gray-100 font-manrope font-medium">{c.content}</p>
          <span className="text-xs text-gray-400">
            {new Date(c.created_at).toLocaleTimeString('en-GB')}
          </span>
        </div>
      ))}
    </div>
  );
}
