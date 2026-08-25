import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  ShoppingCart,
  Timer,
  ArrowRight,
  Leaf,
  Navigation,
} from "lucide-react";
import { BRAND, STATS } from "../data/farmData";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({
  onLocate,
  onShop,
  dark,
}: {
  onLocate: () => void;
  onShop: () => void;
  dark: boolean;
}) {
  const reduce = useReducedMotion();

  const blobs = dark
    ? ["bg-emerald-600/30", "bg-amber-400/20"]
    : ["bg-emerald-400/30", "bg-amber-300/40"];

  return (
    <section id="top" className="relative overflow-hidden bg-stone-50 dark:bg-zinc-950">
      <div className={`pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full ${blobs[0]} blur-3xl`} />
      <div className={`pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full ${blobs[1]} blur-3xl`} />

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-24">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-white/10 dark:bg-white/5 dark:text-emerald-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            Harvested this morning and ready to ship
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-[15ch] text-4xl font-black leading-none tracking-tighter text-emerald-950 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Fresh harvest from farm to{" "}
            <span className="text-emerald-600 dark:text-emerald-400">doorstep</span>, no middlemen.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-[44ch] text-base leading-relaxed text-emerald-950/60 dark:text-white/60"
          >
            Buy sustainably grown produce directly from Zackjay Agro Farms, trace every batch to its field, and pick up at a hub near you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.button
              onClick={onLocate}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 rounded-2xl bg-emerald-900 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
              Locate Nearest Hub
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </motion.button>
            <motion.button
              onClick={onShop}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-amber-400/10 px-5 py-3 font-bold text-amber-700 transition hover:bg-amber-400 hover:text-emerald-950 dark:text-amber-300 dark:hover:text-emerald-950"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
              Shop Fresh Harvest
            </motion.button>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-emerald-900/10 bg-emerald-900/10 dark:border-white/10 dark:bg-white/10 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease, duration: 0.4, delay: i * 0.06 }}
                className="bg-white px-4 py-4 dark:bg-zinc-900"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black tracking-tight text-emerald-950 dark:text-white">
                    {s.value.toLocaleString()}
                  </span>
                  {s.value === 0 && <Leaf className="h-4 w-4 text-amber-500" strokeWidth={1.5} />}
                </div>
                <p className="mt-1 text-[11px] font-medium leading-tight text-emerald-950/55 dark:text-white/55">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease, duration: 0.7, delay: 0.1 }}
          className="relative z-10 mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/10 shadow-2xl shadow-emerald-900/10 dark:border-white/10">
            <img
              src={BRAND.image}
              alt="Zackjay Agro Farms overview and supply chain"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Timer className="h-3.5 w-3.5" strokeWidth={1.5} />
                Field to farmstand in under 12 hours
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease, duration: 0.5, delay: 0.3 }}
            className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white p-3 dark:border-white/10 dark:bg-white/5"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200">
              <Navigation className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div className="text-sm">
              <p className="font-bold text-emerald-950 dark:text-white">Doorstep Express & Hub Pickup</p>
              <p className="text-emerald-950/55 dark:text-white/55">Same-day delivery across Kogi & Benue</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}