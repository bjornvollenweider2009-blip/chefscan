import Link from 'next/link';
import { ChefHat, ShoppingCart, Calendar, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <ChefHat className="h-8 w-8" />
          <span>ChefScan</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/recipes" className="flex items-center gap-2 hover:text-primary transition">
            <Search size={18} /> Recettes
          </Link>
          <Link href="/meal-plan" className="flex items-center gap-2 hover:text-primary transition">
            <Calendar size={18} /> Planning
          </Link>
          <Link href="/shopping-list" className="flex items-center gap-2 hover:text-primary transition">
            <ShoppingCart size={18} /> Courses
          </Link>
        </div>
      </div>
    </nav>
  );
}
