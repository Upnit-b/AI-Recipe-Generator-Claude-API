import ReactMarkDown from "react-markdown"

export default function ClaudeRecipe({ recipe } : { recipe : string }) {
  return (
    <section className="mt-8 rounded-2xl border bg-white p-6 shadow-md" aria-live="polite">
      <h2 className="text-base font-semibold">Recipe Generator recommends:</h2>
      <div className="prose prose-neutral mt-4 max-w-none">
        <ReactMarkDown>{recipe}</ReactMarkDown>
      </div>
    </section>
  )
}