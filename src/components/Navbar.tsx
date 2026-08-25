import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Leaf,
  Sun,
  Moon,
  Search,
  ShoppingCart,
  Phone,
} from "lucide-react";
import { BRAND } from "../data/farmData";

const LINKS = [
  { label: "Farm Locator", href: "#locate" },
  { label: "Shop Harvest", href: "#shop" },
  { label: "Trace Batch", href: "#trace" },
  { label: "Our Story", href: "#story" },
];

export default function Navbar({
  cartCount,
  onCart,
  dark,
  onToggleTheme,
  onSearch,
}: {
  cartCount: number;
  onCart: () => void;
  dark: boolean;
  onToggleTheme: () => void;
  onSearch: (q: string) => void;
}) {
  const reduce = useReducedMotion();
  const [q, setQ] = useState("");

  const scroll = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-stone-50/85 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" onClick={scroll("#top")} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-900 text-amber-300 dark:bg-emerald-600 dark:text-white">
            <Leaf className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-[900] tracking-tight text-emerald-950 dark:text-white">Zackjay Agro</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-600 dark:text-amber-300">Farms</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={scroll(l.href)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-950/70 transition-colors hover:bg-emerald-900/5 hover:text-emerald-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center rounded-xl border border-emerald-900/10 bg-white px-3 py-2 focus-within:border-emerald-900/40 lg:flex dark:border-white/10 dark:bg-white/5">
          <Search className="h-4 w-4 text-emerald-900/40 dark:text-white/40" strokeWidth={1.5} />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search produce or hub..."
            className="w-40 bg-transparent px-2 text-sm outline-none placeholder:text-emerald-900/40 dark:placeholder:text-white/40"
          />
        </div>

        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-emerald-900/10 bg-white text-emerald-900 transition active:scale-95 lg:ml-0 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          {dark ? <Sun className="h-4 w-4" strokeWidth={1.5} /> : <Moon className="h-4 w-4" strokeWidth={1.5} />}
        </button>

        <motion.button
          onClick={onCart}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-10 items-center gap-2 rounded-xl bg-emerald-900 px-3 font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden text-sm sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-amber-400 px-1 text-[11px] font-bold text-emerald-950">
              {cartCount}
            </span>
          )}
        </motion.button>

        <button
          className="hidden xl:flex items-center gap-2 rounded-xl border-2 border-amber-400 px-3 py-2 text-sm font-bold text-amber-700 transition active:scale-95 dark:text-amber-300"
          aria-label="Call to order"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} />
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>Order Now</a>
        </button>
      </div>
    </header>
  );
}