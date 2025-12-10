"use client";

import { useState } from "react";
import { generateRecipes, Recipe } from "@/lib/mockData";
import { Clock, Users, ChefHat, Loader2 } from "lucide-react";

export default function RecipesPage() {
  const [ingredients, setIngredients] = useState("");
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState("Moyen");
  const [goal, setGoal] = useState("Aucun");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);
    
    // Simulation délai API
    setTimeout(() => {
      setRecipes(generateRecipes(ingredients, people, budget, goal));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Qu'avez-vous dans votre frigo ?</h1>
      
      <div className="mb-12 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">Vos Ingrédients</label>
            <textarea
              required
              placeholder="Ex: Tomates, Poulet, Riz, Crème..."
              className="w-full rounded-xl border-slate-200 p-4 text-slate-900 focus:border-primary focus:ring-primary"
              rows={3}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Personnes</label>
              <input 
                type="number" min="1" max="12"
                className="w-full rounded-lg border-slate-200 p-3"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Budget</label>
              <select 
                className="w-full rounded-lg border-slate-200 p-3"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option>Faible</option>
                <option>Moyen</option>
                <option>Élevé</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Objectif</label>
              <select 
                className="w-full rounded-lg border-slate-200 p-3"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="aucun">Aucun</option>
                <option value="perte">Perte de poids</option>
                <option value="masse">Prise de masse</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white transition hover:bg-orange-700 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ChefHat />}
            Générer les recettes
          </button>
        </form>
      </div>

      {/* Résultats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
            <div className="bg-orange-50 p-6">
              <h3 className="mb-2 text-xl font-bold text-slate-900">{recipe.title}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Clock size={14}/> {recipe.time}</span>
                <span className="flex items-center gap-1"><Users size={14}/> {people} p.</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium border">{recipe.difficulty}</span>
              </div>
            </div>
            <div className="flex-1 p-6">
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-bold uppercase text-slate-400">Ingrédients</h4>
                <p className="text-sm text-slate-600">{recipe.ingredients.join(", ")}</p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-bold uppercase text-slate-400">Préparation</h4>
                <ol className="list-decimal pl-4 text-sm text-slate-600 space-y-1">
                  {recipe.steps.slice(0, 3).map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasSearched && recipes.length === 0 && !loading && (
        <p className="text-center text-slate-500">Aucune recette trouvée. Essayez d'autres ingrédients.</p>
      )}
    </div>
  );
}
