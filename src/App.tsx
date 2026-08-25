import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  X,
  ShoppingCart,
  Trash,
  Plus,
  Minus,
  Check,
  Leaf,
  Truck,
  Store,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FarmLocator from "./components/FarmLocator";
import ProduceShop from "./components/ProduceShop";
import TraceabilityAndStory from "./components/TraceabilityAndStory";
import { BRAND, PRODUCE } from "./data/farmData";
import type { CartItem, Produce } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("zackjay_cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("zackjay_theme") === "dark");
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [orderDone, setOrderDone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("zackjay_theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("zackjay_cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);

  const addToCart = (p: Produce, weight: number) => {
    setCart((prev) => {
      const id = `${p.id}-${weight}`;
      const existing = prev.find((i) => i.productId + "-" + i.weight === id);
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { productId: p.id, name: p.name, unit: p.unit, price: p.price, weight, quantity: 1, emoji: p.emoji }];
    });
  };

  const changeQty = (productId: string, weight: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.weight === weight
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (productId: string, weight: number) =>
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.weight === weight)));

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Your basket is empty. Add some fresh harvest first.");
      return;
    }
    setCartOpen(false);
    setOrderDone(true);
    setCart([]);
  };

  const confirmTour = ({ name, date }: { name: string; date: string }) => {
    toast.success(`Tour request received for ${name} on ${date}. ${BRAND.phone} confirms within 24h.`);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-emerald-950 antialiased dark:bg-zinc-950 dark:text-white">
      <Toaster position="top-center" richColors />
      <Navbar
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        onSearch={setSearch}
      />
      <main>
        <Hero onLocate={() => scrollTo("#locate")} onShop={() => scrollTo("#shop")} dark={dark} />
        <FarmLocator onBook={() => toast.success("Pickup slot saved.")} />
        <ProduceShop search={search} onAdd={addToCart} onViewCart={() => setCartOpen(true)} />
        <TraceabilityAndStory onBookTour={confirmTour} />
      </main>

      <footer className="border-t border-emerald-900/10 bg-emerald-950 py-12 dark:border-white/10 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-emerald-950">
                  <Leaf className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="font-[900] tracking-tight text-white">Zackjay Agro Farms</span>
              </div>
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/55">
                Sustainable direct-to-consumer produce. Fair to farmers, traceable to the field, fresh to your doorstep.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  <Phone className="h-4 w-4" strokeWidth={1.5} /> {BRAND.phone}
                </a>
                <a href={`https://wa.me/2348123456789`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp order
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Explore</h4>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  ["Farm Locator", "#locate"],
                  ["Fresh Produce", "#shop"],
                  ["Trace Batch", "#trace"],
                  ["Our Story", "#story"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <button onClick={() => scrollTo(href)} className="text-white/70 transition hover:text-amber-300">{label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Our Promise</h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" strokeWidth={1.5} /> Zero synthetic inputs</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" strokeWidth={1.5} /> 90% direct to farmers</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-400" strokeWidth={1.5} /> Full batch traceability</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
            <p>© {new Date().getFullYear()} {BRAND.name}. Harvested with care in Kogi, Nigeria.</p>
            <p>Made fresh for households, markets and chefs.</p>
          </div>
        </div>
      </footer>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[70] bg-emerald-950/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease, duration: 0.35 }}
              className="fixed right-0 top-0 z-[71] flex h-full w-full max-w-md flex-col bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between border-b border-emerald-900/10 p-5 dark:border-white/10">
                <h2 className="flex items-center gap-2 text-lg font-black text-emerald-950 dark:text-white">
                  <ShoppingCart className="h-5 w-5" strokeWidth={1.5} /> Your basket
                </h2>
                <button onClick={() => setCartOpen(false)} className="text-emerald-950/50 hover:text-emerald-950 dark:text-white/50 dark:hover:text-white">
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-3xl dark:bg-white/10">🧺</span>
                    <p className="mt-4 font-bold text-emerald-950 dark:text-white">Your basket is empty</p>
                    <p className="mt-1 text-sm text-emerald-950/55 dark:text-white/55">Add fresh harvest from the shop below.</p>
                    <button
                      onClick={() => { setCartOpen(false); scrollTo("#shop"); }}
                      className="mt-4 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-bold text-white dark:bg-emerald-600"
                    >
                      Browse fresh harvest
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {cart.map((i) => (
                      <li key={`${i.productId}-${i.weight}`} className="flex items-center gap-3 rounded-2xl border border-emerald-900/10 p-3 dark:border-white/10">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-2xl dark:bg-white/5">{i.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-emerald-950 dark:text-white">{i.name}</p>
                          <p className="text-xs text-emerald-950/50 dark:text-white/50">{i.weight} {i.unit} · ₦{(i.price * i.weight).toLocaleString()} each</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <button onClick={() => changeQty(i.productId, i.weight, -1)} className="grid h-6 w-6 place-items-center rounded-md bg-emerald-50 text-emerald-900 dark:bg-white/10 dark:text-white"><Minus className="h-3 w-3" strokeWidth={1.5} /></button>
                            <span className="w-6 text-center text-sm font-bold text-emerald-950 dark:text-white">{i.quantity}</span>
                            <button onClick={() => changeQty(i.productId, i.weight, 1)} className="grid h-6 w-6 place-items-center rounded-md bg-emerald-50 text-emerald-900 dark:bg-white/10 dark:text-white"><Plus className="h-3 w-3" strokeWidth={1.5} /></button>
                            <span className="ml-auto text-sm font-black text-emerald-950 dark:text-white">₦{(i.price * i.weight * i.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                        <button onClick={() => removeItem(i.productId, i.weight)} className="text-emerald-950/40 hover:text-rose-600 dark:text-white/40"><Trash className="h-4 w-4" strokeWidth={1.5} /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-emerald-900/10 p-5 dark:border-white/10">
                  <div className="flex items-center justify-between text-sm text-emerald-950/60 dark:text-white/60">
                    <span>Subtotal</span>
                    <span className="text-lg font-black text-emerald-950 dark:text-white">₦{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-emerald-950/70 dark:bg-white/5 dark:text-white/70"><Truck className="h-4 w-4 text-emerald-700" strokeWidth={1.5} /> Doorstep Express</div>
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-emerald-950/70 dark:bg-white/5 dark:text-white/70"><Store className="h-4 w-4 text-emerald-700" strokeWidth={1.5} /> Free hub pickup</div>
                  </div>
                  <button onClick={placeOrder} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-4 py-3.5 font-bold text-white transition active:scale-95 dark:bg-emerald-600">
                    <Check className="h-5 w-5" strokeWidth={1.5} /> Place direct order
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Order confirmation */}
      <AnimatePresence>
        {orderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-emerald-950/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ ease, duration: 0.3 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center dark:bg-zinc-900"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <Check className="h-8 w-8" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 text-2xl font-black text-emerald-950 dark:text-white">Order confirmed!</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/60 dark:text-white/60">
                Your fresh harvest is being picked. We'll notify you on {BRAND.phone} with live courier tracking.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-950/60 dark:text-white/60">
                <MapPin className="h-4 w-4 text-amber-500" strokeWidth={1.5} /> Pickup or doorstep by tomorrow morning
              </div>
              <button onClick={() => setOrderDone(false)} className="mt-6 w-full rounded-xl bg-emerald-900 px-4 py-3 font-bold text-white dark:bg-emerald-600">
                Continue shopping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Re-export types used across the app for import clarity
export type { Produce } from "./types";
export const produceCatalog = () => PRODUCE;