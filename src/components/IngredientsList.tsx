
type Props = {
  ingredients: string[];
  onRemove: (ingredient: string) => void;
  onGetRecipe: () => void;
  loading: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>
}

export default function IngredientsList({ingredients, onRemove, onGetRecipe, loading, scrollRef} : Props){
  return(
    <section className="mt-6">
      <h2 className="text-sm font-medium text-neutral-700">
        Ingredients on hand
      </h2>

      <div className="mt-3 flex flex-wrap gap-2" aria-live="polite">
        {ingredients.map((ingredient) => (
          <span key={ingredient} className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm">
            {ingredient}
            <button type="button" onClick={() => onRemove(ingredient)}
              className="rounded-full px-2 py-0.5 text-neutral-500 hover:bg-neutral-100" aria-label={`Remove ${ingredient}`}>
                x
            </button>
          </span>
        ))}
      </div>

      {ingredients.length > 2 && (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-md">
          <div ref={scrollRef}>
            <h3 className="text-base font-semibold">Ready for a recipe?</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Generate a recipe using your ingredient list
            </p>
          </div>

          <button type="button" onClick={onGetRecipe} disabled={loading} className="mt-4 inline-flex items-center
            justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800
            disabled:cursor-not-allowed disabled:opacity-60">

            {loading ? "Cooking... " : "Get a recipe"}
          </button>
        </div>
      )}
    </section>
  )
}