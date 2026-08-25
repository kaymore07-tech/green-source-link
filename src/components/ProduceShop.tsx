import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  Plus,
  X,
  ShoppingCart,
  ArrowRight,
  Truck,
  Store,
  BadgePercent,
} from "lucide-react";
import { PRODUCE, CATEGORIES, shopAll } from "../data/farmData";
import type { Produce } from "../types";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as const;

const STOCK_STYLE: Record<Produce["stock"], string> = {
  "In stock": "text-emerald-600 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40",
  Low: "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40",
  "Selling fast": "text-rose-600 bg-rose-100 dark:text-rose-300 dark:bg-rose-900/40",
};

export default function ProduceShop({
  search,
  onAdd,
  onViewCart,
}: {
  search: string;
  onAdd: (p: Produce, weight: number) => void;
  onViewCart: () => void;
}) {
  const [active, setActive] = useState("All");
  const [quick, setQuick] = useState<Produce | null>(null);
  const [weight, setWeight] = useState(1);
  const cats = ["All", ...CATEGORIES];

  let rows = search.trim()
    ? PRODUCE.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()))
    : shopAll(active);

  const add = (p: Produce, w: number) => {
    onAdd(p, w);
    toast.success(`${p.name} added to your basket (${w} ${p.unit})`);
    setQuick(null);
    setWeight(1);
  };

  return (
    <section id="shop" className="bg-stone-50 py-16 sm:py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">Fresh Produce Marketplace</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-emerald-950 sm:text-5xl dark:text-white">
              Today's harvest, direct pricing
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-4 py-2 text-xs font-semibold text-emerald-950 dark:border-white/10 dark:bg-white/5 dark:text-white">
            <BadgePercent className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
            30-50% below supermarket prices
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c
                  ? "bg-emerald-900 text-white dark:bg-emerald-600"
                  : "bg-white text-emerald-950/70 hover:bg-emerald-900/5 dark:bg-white/5 dark:text-white/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {rows.length === 0 && (
          <div className="mt-8 rounded-3xl border border-emerald-900/10 bg-white p-10 text-center text-emerald-950/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            No items match "{search}". Try a different crop name.
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ease, duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-emerald-900/10 bg-white transition hover:shadow-xl hover:shadow-emerald-900/5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative grid aspect-[4/3] place-items-center bg-gradient-to-br from-emerald-50 to-amber-50 text-6xl dark:from-emerald-900/30 dark:to-amber-900/20">
                <span className="transition-transform duration-300 group-hover:scale-110">{p.emoji}</span>
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-emerald-950">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold leading-snug text-emerald-950 dark:text-white">{p.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-950 dark:text-white">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />{p.rating}
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-950/50 dark:text-white/50">{p.farm}</p>
                <p className="mt-2 line-clamp-2 text-sm text-emerald-950/60 dark:text-white/60">{p.desc}</p>

                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className={`rounded-full px-2 py-0.5 font-semibold ${STOCK_STYLE[p.stock]}`}>{p.stock}</span>
                  <span className="text-emerald-950/40 dark:text-white/40">{p.farmerShare}</span>
                </div>

                <div className="mt-3 rounded-xl bg-emerald-50 p-2.5 dark:bg-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-black text-emerald-950 dark:text-white">₦{p.price.toLocaleString()}</span>
                    <span className="text-xs text-emerald-950/40 line-through dark:text-white/40">₦{p.supermarket.toLocaleString()}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-[11px] text-emerald-950/50 dark:text-white/50">
                    <span>Zackjay direct</span>
                    <span>Supermarket</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="flex-1 text-xs">{p.unit}(s)</span>
                  <button
                    onClick={() => add(p, weight)}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-800 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} /> Add
                  </button>
                  <button
                    onClick={() => { setQuick(p); setWeight(1); }}
                    className="rounded-xl border border-emerald-900/15 px-3 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-900/5 active:scale-95 dark:border-white/10 dark:text-white"
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {quick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-emerald-950/60 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setQuick(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-zinc-900"
            >
              <div className="relative grid aspect-video place-items-center bg-gradient-to-br from-emerald-100 to-amber-100 text-8xl dark:from-emerald-900/40 dark:to-amber-900/30">
                {quick.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-emerald-950">{quick.badge}</span>
                )}
                <button onClick={() => setQuick(null)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-emerald-950 backdrop-blur dark:bg-zinc-800/80 dark:text-white">
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-black text-emerald-950 dark:text-white">{quick.name}</h3>
                  <span className="flex items-center gap-1 text-sm font-bold text-emerald-950 dark:text-white">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />{quick.rating}
                  </span>
                </div>
                <p className="mt-1 text-sm text-emerald-950/50 dark:text-white/50">{quick.farm} · {quick.farmerShare}</p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-950/70 dark:text-white/70">{quick.desc}</p>

                <label className="mt-5 block text-sm font-semibold text-emerald-950 dark:text-white">Quantity ({quick.unit})</label>
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setWeight(n)}
                      className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                        weight === n ? "bg-emerald-900 text-white dark:bg-emerald-600" : "bg-emerald-50 text-emerald-950/70 dark:bg-white/5 dark:text-white/70"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-emerald-50 p-4 dark:bg-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-950/60 dark:text-white/60">Total direct price</span>
                    <span className="text-lg font-black text-emerald-950 dark:text-white">₦{(quick.price * weight).toLocaleString()}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-emerald-950/50 dark:text-white/50">
                    <span>Same item at market</span>
                    <span className="line-through">₦{(quick.supermarket * weight).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button onClick={() => add(quick, weight)} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 font-bold text-white transition active:scale-95 dark:bg-emerald-600">
                    <ShoppingCart className="h-5 w-5" strokeWidth={1.5} /> Add to basket
                  </button>
                  <button onClick={onViewCart} className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400 px-4 py-3 font-bold text-amber-700 dark:text-amber-300">
                    <ArrowRight className="h-5 w-5" strokeWidth={1.5} /> Review basket
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 rounded-3xl border border-emerald-900/10 bg-white px-6 py-5 sm:flex-row dark:border-white/10 dark:bg-white/5">
        <div className="flex flex-wrap items-center gap-5 text-sm text-emerald-950/70 dark:text-white/70">
          <span className="flex items-center gap-2 font-semibold"><Truck className="h-4 w-4 text-emerald-700" strokeWidth={1.5} /> Doorstep Express same-day</span>
          <span className="flex items-center gap-2 font-semibold"><Store className="h-4 w-4 text-emerald-700" strokeWidth={1.5} /> Free hub pickup over ₦5,000</span>
        </div>
        <button onClick={onViewCart} className="flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-bold text-white dark:bg-emerald-600">
          View basket <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}