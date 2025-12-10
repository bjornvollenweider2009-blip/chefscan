"use client";

import { useState } from "react";
import { getShoppingList } from "@/lib/mockData";
import { Check, ShoppingBasket } from "lucide-react";

export default function ShoppingListPage() {
  const list = getShoppingList();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (item: string) => {
    const next = new Set(checked);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setChecked(next);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-10 flex items-center gap-4">
        <div className="rounded-full bg-orange-100 p-3 text-primary">
          <ShoppingBasket size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Liste de Courses</h1>
          <p className="text-slate-500">Générée automatiquement pour votre semaine.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(list).map(([category, items]) => (
          <div key={category} className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-primary">{category}</h2>
            <div className="space-y-2">
              {items.map((item) => {
                const isChecked = checked.has(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggle(item)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                      isChecked 
                        ? "bg-slate-50 border-slate-100" 
                        : "bg-white border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                      isChecked ? "bg-primary border-primary text-white" : "border-slate-300 bg-white"
                    }`}>
                      {isChecked && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-medium ${isChecked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
