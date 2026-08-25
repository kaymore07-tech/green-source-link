import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  MapPin,
  Thermometer,
  ClipboardCheck,
  Truck,
  Sprout,
  Package,
  Phone,
  Calendar,
  Send,
  Check,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { BATCHES, TEAM, TESTIMONIALS, BRAND } from "../data/farmData";
import { toast } from "sonner";

const ease = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS = [
  { icon: Sprout, color: "bg-emerald-600" },
  { icon: Package, color: "bg-amber-500" },
  { icon: ClipboardCheck, color: "bg-teal-600" },
  { icon: Thermometer, color: "bg-sky-600" },
  { icon: Truck, color: "bg-violet-600" },
];

const PRICING = [
  { label: "Zackjay direct farm price", pct: 100, amount: "₦2,300", color: "bg-emerald-900" },
  { label: "Farmer's share", pct: 84, amount: "84%", color: "bg-amber-400" },
  { label: "Conventional supermarket", pct: 205, amount: "2.1x", color: "bg-zinc-300 dark:bg-white/20" },
];

export default function TraceabilityAndStory({
  onBookTour,
}: {
  onBookTour: (data: { name: string; date: string }) => void;
}) {
  const [code, setCode] = useState("");
  const [trace, setTrace] = useState<typeof BATCHES[number] | null>(null);
  const [tourName, setTourName] = useState("");
  const [tourDate, setTourDate] = useState("");

  const lookup = () => {
    const found = BATCHES.find((b) => b.code.toLowerCase() === code.trim().toLowerCase());
    if (found) {
      setTrace(found);
    } else {
      setTrace(null);
      toast.error(`No record found for "${code}". Try BATCH-ZK-2026 or BATCH-ZK-2025.`);
    }
  };

  const submitTour = () => {
    if (!tourName.trim() || !tourDate) {
      toast.error("Add your name and a preferred date to book a tour.");
      return;
    }
    onBookTour({ name: tourName, date: tourDate });
    setTourName("");
    setTourDate("");
  };

  return (
    <div>
      {/* Traceability */}
      <section id="trace" className="bg-white py-16 sm:py-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">Farm-to-Fork Tracker</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-emerald-950 sm:text-5xl dark:text-white">
              Scan the batch, see the whole journey
            </h2>
            <p className="mt-4 text-base leading-relaxed text-emerald-950/60 dark:text-white/60">
              Every crate carries a trace code. Look it up to see the plot, agronomist, harvest time and cold-chain log.
            </p>
          </div>

          <div className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-emerald-900/15 bg-stone-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
            <Search className="h-5 w-5 text-emerald-900/40 dark:text-white/40" strokeWidth={1.5} />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              placeholder="Enter batch code (e.g. BATCH-ZK-2026)"
              className="w-full bg-transparent text-sm outline-none placeholder:text-emerald-900/40 dark:placeholder:text-white/40"
            />
            <button onClick={lookup} className="rounded-xl bg-emerald-900 px-4 py-2 text-sm font-bold text-white dark:bg-emerald-600">
              Trace
            </button>
          </div>

          <AnimatePresence mode="wait">
            {trace && (
              <motion.div
                key={trace.code}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease, duration: 0.35 }}
                className="mt-8 grid gap-6 lg:grid-cols-3"
              >
                <div className="rounded-3xl bg-emerald-950 p-6 text-white lg:col-span-1 dark:bg-zinc-900">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wide text-amber-300">
                    <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> {trace.status}
                  </div>
                  <h3 className="mt-4 text-2xl font-black tracking-tight">{trace.crop}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div><dt className="text-white/45">Batch</dt><dd className="font-bold">{trace.code}</dd></div>
                    <div><dt className="text-white/45">Origin plot</dt><dd className="font-bold">{trace.plot}</dd></div>
                    <div><dt className="text-white/45">Harvest time</dt><dd className="font-bold">{trace.harvestDate}</dd></div>
                    <div><dt className="text-white/45">Lead agronomist</dt><dd className="font-bold">{trace.agronomist}</dd></div>
                    <div><dt className="text-white/45">Cold chain</dt><dd className="font-bold">{trace.temperature}</dd></div>
                    <div><dt className="text-white/45">Supply route</dt><dd className="font-bold">{trace.market}</dd></div>
                  </dl>
                </div>

                <div className="lg:col-span-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900/50 dark:text-white/50">Journey timeline</h4>
                  <div className="mt-4 space-y-3">
                    {trace.steps.map((s, i) => {
                      const Icon = STEP_ICONS[i]?.icon || Package;
                      return (
                        <div key={s.label} className={`flex gap-4 rounded-2xl border p-4 ${s.done ? "border-emerald-900/10 bg-stone-50 dark:border-white/10 dark:bg-white/5" : "border-dashed border-emerald-900/25 bg-transparent dark:border-white/15"}`}>
                          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white ${STEP_ICONS[i]?.color || "bg-emerald-900"}`}>
                            <Icon className="h-5 w-5" strokeWidth={1.5} />
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-emerald-950 dark:text-white">{s.label}</p>
                              {s.done ? (
                                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                  <Check className="h-3 w-3" strokeWidth={1.5} /> Verified
                                </span>
                              ) : (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">Pending</span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-emerald-950/55 dark:text-white/55">{s.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!trace && (
            <div className="mt-8 rounded-3xl border border-emerald-900/10 bg-stone-50 p-6 text-center text-sm text-emerald-950/50 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
              Look up a batch to reveal its full harvest journey. Try <b>BATCH-ZK-2026</b>.
            </div>
          )}
        </div>
      </section>

      {/* Pricing transparency */}
      <section className="border-y border-emerald-900/10 bg-stone-50 py-16 dark:border-white/10 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">Price Transparency</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-emerald-950 sm:text-4xl dark:text-white">
                Farmers earn more. You pay less. Math that works.
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-emerald-950/60 dark:text-white/60">
                By selling direct we cut the middleman stack. Farmers keep up to 90% of the price you pay, and you save 30-50% versus the supermarket shelf.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                <ShieldCheck className="h-8 w-8 text-emerald-700" strokeWidth={1.5} />
                <p className="text-sm text-emerald-950/70 dark:text-white/70">
                  Every price on this page is the real snapshot for a 2kg sweet potato sample: <b>₦2,300 direct</b> vs <b>₦4,800</b> at market.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {PRICING.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ease, duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-emerald-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-emerald-950 dark:text-white">{row.label}</span>
                    <span className="font-black text-emerald-950 dark:text-white">{row.amount}</span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-stone-100 dark:bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(row.pct, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ ease, duration: 0.7, delay: 0.1 }}
                      className={`h-full rounded-full ${row.color}`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-950/40 dark:text-white/40">relative value index</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story + team + attachment image */}
      <section id="story" className="bg-white py-16 sm:py-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ease, duration: 0.6 }}
              className="relative overflow-hidden rounded-[2rem] border border-emerald-900/10 shadow-xl dark:border-white/10"
            >
              <img src={BRAND.image} alt="Zackjay Agro Farms brand and supply chain overview" className="h-full w-full object-cover" loading="lazy" />
            </motion.div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">The Farm Story</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-emerald-950 sm:text-4xl dark:text-white">
                Built to shorten the distance between you and the soil
              </h2>
              <p className="mt-4 text-base leading-relaxed text-emerald-950/60 dark:text-white/60">
                Zackjay Agro Farms started on 4 hectares of family land in Ochadamu. Today we manage 420 acres of regenerative plots, greenhouses, cold storage and free-range runs, all run on one pledge: sustainable harvest, honest pricing, and complete traceability.
              </p>
              <p className="mt-3 text-base leading-relaxed text-emerald-950/60 dark:text-white/60">
                No pesticide shortcuts, no synthetic inputs, no silent markups. When you buy from us, the farmer you see on the batch log is the farmer who gets paid.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease, duration: 0.4, delay: i * 0.08 }}
                className="rounded-3xl border border-emerald-900/10 bg-stone-50 p-6 dark:border-white/10 dark:bg-white/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-900 text-lg font-black text-amber-300 dark:bg-emerald-600 dark:text-white">
                  {m.initials}
                </span>
                <h3 className="mt-4 font-black text-emerald-950 dark:text-white">{m.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-300">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950/60 dark:text-white/60">{m.bio}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ease, duration: 0.4, delay: i * 0.08 }}
                className="relative rounded-3xl border border-emerald-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
              >
                <Quote className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
                <blockquote className="mt-3 text-sm leading-relaxed text-emerald-950/75 dark:text-white/75">"{t.quote}"</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900 dark:bg-white/10 dark:text-white">{t.initials}</span>
                  <div>
                    <p className="text-sm font-bold text-emerald-950 dark:text-white">{t.name}</p>
                    <p className="text-xs text-emerald-950/50 dark:text-white/50">{t.area}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Visit booking */}
      <section className="bg-emerald-950 py-16 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Plan a Visit</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tighter text-white sm:text-4xl">
                Tour the farm, taste the difference
              </h2>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-white/60">
                Join a guided customer agro-experience, book bulk B2B harvest crates, or message our agronomists directly on WhatsApp.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-amber-300" strokeWidth={1.5} /> Guided tours every Saturday from the main farm</li>
                <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-amber-300" strokeWidth={1.5} /> {BRAND.phone}</li>
                <li className="flex items-center gap-3"><Send className="h-5 w-5 text-amber-300" strokeWidth={1.5} /> {BRAND.email}</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 dark:bg-white/5">
              <h3 className="text-lg font-black text-emerald-950 dark:text-white">Book a farm tour</h3>
              <label className="mt-4 block text-sm font-semibold text-emerald-950 dark:text-white">Your name</label>
              <input
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                placeholder="Full name"
                className="mt-1 w-full rounded-xl border border-emerald-900/15 bg-stone-50 px-3 py-2.5 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <label className="mt-3 block text-sm font-semibold text-emerald-950 dark:text-white">Preferred date</label>
              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-emerald-900/15 bg-stone-50 px-3 py-2.5 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <button onClick={submitTour} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-emerald-950 transition active:scale-95">
                <Calendar className="h-5 w-5" strokeWidth={1.5} /> Request visit
              </button>
              <p className="mt-3 text-center text-xs text-emerald-950/45 dark:text-white/45">Confirmation sent within 24h by WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}