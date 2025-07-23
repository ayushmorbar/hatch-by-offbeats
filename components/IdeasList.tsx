import IdeaCard from "./IdeaCard";

export default function IdeasList({ ideas }: { ideas: any[] }) {
  if (!ideas.length)
    return (
      <p className="text-gray-400 font-manrope text-center py-8">
        No ideas yet—be the first to hatch one!
      </p>
    );
  return (
    <div className="grid gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} />
      ))}
    </div>
  );
}
