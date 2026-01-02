"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import IngredientsList from "@/components/IngredientsList";
import ClaudeRecipe from "@/components/ClaudeRecipe";

function normalizeIngredient(value:string) {
  return value.trim().replace(/\s+/g, ' ');
}

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [recipe, setRecipe] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const recipeSection = useRef<HTMLDivElement | null>(null);

  const canAdd = useMemo(() => normalizeIngredient(input).length > 0, [input])

  useEffect(() => {
    if (recipe && recipeSection.current){
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipe])

  function addIngredient(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const cleaned = normalizeIngredient(input)
    if (!cleaned) return

    setIngredients((prev) => {
      const exists = prev.some((p) => p.toLowerCase() === cleaned.toLowerCase())
      return exists ? prev : [...prev, cleaned]
    })

    setInput("")
  }

  function removeIngredient(ingredient: string){
    setIngredients((prev) => prev.filter((i) => i !== ingredient))
  }

  async function getRecipe() {
    setError("")
    setLoading(true)
    setRecipe("")

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ ingredients }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error ?? "Request failed")
      }

      setRecipe(data.recipe ?? "")
    } catch (e:any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false)
    }

  }


  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header/>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-6 shadow-2xl">
          <h2 className="text-base font-semibold">Add ingredients</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Type what you have. We'll guarantee a recipe you can actually make. (Minimum 3 ingredients)
          </p>

          <form onSubmit={addIngredient} className="mt-5 flex gap-2">
            <input aria-label="Add ingredient" type="text" value={input}
            onChange={(e) => setInput(e.target.value)} placeholder="e.g. oregano"
            className="flex-1 rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
            <button type="submit" disabled={!canAdd}
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40">
              Add
            </button>
          </form>

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {ingredients.length > 0 && (
            <IngredientsList
              ingredients={ingredients}
              onRemove={removeIngredient}
              onGetRecipe={getRecipe}
              loading={loading}
              scrollRef={recipeSection}
            />
          )}
        </div>

        {recipe && <ClaudeRecipe recipe={recipe}/>}
      </main>

      <footer className="pb-10 text-center text-xs text-neutral-500">
        Build with Next.js + Anthropic. Recipes are AI-generated.
      </footer>
    </div>
  );
}
