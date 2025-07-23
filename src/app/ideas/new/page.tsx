import IdeaForm from "../../../../components/IdeaForm";

export default function NewIdeaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans p-8">
      <main className="max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Submit Your Idea</h1>
        <IdeaForm />
      </main>
    </div>
  );
}
