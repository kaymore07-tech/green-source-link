import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Calendar,
  Store,
  Warehouse,
  Snowflake,
  Sun,
  Sprout,
  X,
  Check,
} from "lucide-react";
import { HUBS, HUB_TYPES } from "../data/farmData";
import type { Hub } from "../types";
import { toast } from "sonner";

const TYPE_STYLES: Record<string, string> = {
  farm: "bg-emerald-900",
  cold: "bg-sky-600",
  stand: "bg-amber-500",
  greenhouse: "bg-teal-600",
  depot: "bg-violet-600",
};

const TYPE_ICON: Record<string, typeof MapPin> = {
  farm: Sprout,
  cold: Snowflake,
  stand: Store,
  greenhouse: Sun,
  depot: Warehouse,
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function FarmLocator({
  onBook,
}: {
  onBook: (code: string) => void;
}) {
  const [active, setActive] = useState("all");
  const [zip, setZip] = useState("");
  const [selected, setSelected] = useState<Hub | null>(null);
  const [directions, setDirections] = useState<Hub | null>(null);
  const [slot, setSlot] = useState<Hub | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 - 12:00");

  const filtered = active === "all" ? HUBS : HUBS.filter((h) => h.type === active);
  const sorted = [...filtered].sort((a, b) => a.distance - b.distance);

  const filteredByZip = zip.trim()
    ? sorted.filter((h) =>
        `${h.name} ${h.crops}`.toLowerCase().includes(zip.trim().toLowerCase())
      )
    : sorted;

  const confirmPickup = () => {
    if (!date) {
      toast.error("Please choose a pickup date first");
      return;
    }
    toast.success(`Pickup booked at ${slot?.name} for ${date}, ${time}. Packing in 24h optimised for freshness.`);
    setSlot(null);
  };

  return (
    <section id="locate" className="bg-emerald-950 py-16 sm:py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Farm Hub Locator</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-white sm:text-5xl">
            Find fresh produce near you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Filter by hub type, search a ZIP or area, and get live directions or book a same-day pickup slot.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {HUB_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === t.id
                  ? "bg-amber-400 text-emerald-950"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10">
            <div className="relative h-[420px] w-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
              {HUBS.map((h) => {
                const Icon = TYPE_ICON[h.type] || MapPin;
                const isSel = selected?.id === h.id;
                const dimmed = active !== "all" && h.type !== active;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelected(h)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                      dimmed ? "opacity-30" : "opacity-100"
                    }`}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    aria-label={h.name}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white shadow-lg ${TYPE_STYLES[h.type]} ${isSel ? "scale-110 ring-4 ring-amber-300/60" : ""}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                  </button>
                );
              })}
              <span className="absolute bottom-3 left-3 rounded-lg bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur">
                {filteredByZip.length} hub{filteredByZip.length === 1 ? "" : "s"} in view
              </span>
            </div>

            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease, duration: 0.3 }}
                className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-white/95 p-4 backdrop-blur dark:bg-zinc-900/95"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-black text-emerald-950 dark:text-white">{selected.name}</p>
                    <p className="mt-0.5 text-sm text-emerald-950/55 dark:text-white/55">{selected.stock} · {selected.hours}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-emerald-950/50 hover:text-emerald-950 dark:text-white/50">
                    <X className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setDirections(selected)} className="flex items-center gap-1.5 rounded-lg bg-emerald-900 px-3 py-2 text-sm font-semibold text-white dark:bg-emerald-600">
                    <Navigation className="h-4 w-4" strokeWidth={1.5} /> Get directions
                  </button>
                  <button onClick={() => setSlot(selected)} className="flex items-center gap-1.5 rounded-lg border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
                    <Calendar className="h-4 w-4" strokeWidth={1.5} /> Book pickup
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-[360px]">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5">
              <MapPin className="h-4 w-4 text-white/40" strokeWidth={1.5} />
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="Search ZIP or crop (e.g. tomatoes)"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-1 [scrollbar-width:thin]">
              {filteredByZip.map((h, i) => {
                const Icon = TYPE_ICON[h.type] || MapPin;
                return (
                  <motion.button
                    key={h.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ease, duration: 0.35, delay: i * 0.04 }}
                    onClick={() => setSelected(h)}
                    className="mb-3 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10"
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white ${TYPE_STYLES[h.type]}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-white">{h.name}</span>
                      <span className="block truncate text-xs text-white/55">{h.crops}</span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-sm font-bold text-amber-300">{h.distance}km</span>
                      <span className={`block text-[11px] ${h.stockStatus === "Open today" ? "text-emerald-300" : h.stockStatus === "Refilling" ? "text-amber-300" : "text-white/50"}`}>
                        {h.stockStatus}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
              {filteredByZip.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60">
                  No hubs match that search. Try a crop name like tomatoes.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {directions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-emerald-950/60 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setDirections(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-emerald-950 dark:text-white">Directions</h3>
                <button onClick={() => setDirections(null)} className="text-emerald-950/50 dark:text-white/50"><X className="h-5 w-5" strokeWidth={1.5} /></button>
              </div>
              <div className="mt-4 rounded-2xl bg-emerald-50 p-4 dark:bg-white/5">
                <p className="font-bold text-emerald-950 dark:text-white">{directions.name}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-emerald-950/60 dark:text-white/60"><Clock className="h-4 w-4" strokeWidth={1.5} />{directions.hours}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-emerald-950/60 dark:text-white/60"><Phone className="h-4 w-4" strokeWidth={1.5} />{directions.phone}</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-emerald-950/70 dark:text-white/70">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" strokeWidth={1.5} /> Live GPS route loads in your map app</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" strokeWidth={1.5} /> ~{directions.distance}km from your area</li>
              </ul>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(directions.name + " Kogi Nigeria")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 font-bold text-white dark:bg-emerald-600"
              >
                <Navigation className="h-5 w-5" strokeWidth={1.5} /> Open in Maps
              </a>
            </motion.div>
          </motion.div>
        )}

        {slot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-emerald-950/60 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setSlot(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ ease, duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-emerald-950 dark:text-white">Book pickup</h3>
                <button onClick={() => setSlot(null)} className="text-emerald-950/50 dark:text-white/50"><X className="h-5 w-5" strokeWidth={1.5} /></button>
              </div>
              <p className="mt-1 text-sm text-emerald-950/55 dark:text-white/55">At <b>{slot.name}</b></p>
              <label className="mt-4 block text-sm font-semibold text-emerald-950 dark:text-white">Pickup date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-emerald-900/15 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-950 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <label className="mt-3 block text-sm font-semibold text-emerald-950 dark:text-white">Time window</label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                {["10:00 - 12:00", "01:00 - 03:00", "04:00 - 06:00", "6:00am - 8:00am"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      time === t ? "bg-emerald-900 text-white dark:bg-emerald-600" : "bg-emerald-50 text-emerald-950/70 dark:bg-white/5 dark:text-white/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button onClick={confirmPickup} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-emerald-950 transition active:scale-95">
                <Calendar className="h-5 w-5" strokeWidth={1.5} /> Confirm pickup slot
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}