import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Calculator, Crown, Radar, ScanBarcode, Search, ShoppingBasket, TrendingDown } from "lucide-react";
import { countries, rankings, products, shrinkflation, unitPrice, fmt, type CountryCode, type Period } from "@/lib/kilo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KiloRadar — Catch shrinkflation, find the cheapest store" },
      { name: "description", content: "Compare unit prices, expose shrinkflation and see which grocery chain is cheapest this week, month and year." },
      { property: "og:title", content: "KiloRadar — Catch shrinkflation, find the cheapest store" },
      { property: "og:description", content: "Unit price calculator, barcode product search and weekly cheapest-chain rankings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [code, setCode] = useState<CountryCode>("NO");
  const country = countries.find((c) => c.code === code)!;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground"><Radar className="size-4" /></span>
            KiloRadar
          </a>
          <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#ranking" className="transition-colors hover:text-foreground">Cheapest stores</a>
            <a href="#calculator" className="transition-colors hover:text-foreground">Calculator</a>
            <a href="#products" className="transition-colors hover:text-foreground">Products</a>
          </nav>
          <select aria-label="Country" value={code} onChange={(e) => setCode(e.target.value as CountryCode)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring">
            {countries.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
          </select>
        </div>
      </header>
      <Hero />
      <Ranking code={code} />
      <CalculatorSection country={country} />
      <Products country={country} />
      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        KiloRadar · Prices shown are sample data for illustration · Shop smarter, not smaller.
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-shrink" /> 214 shrunken products spotted this month
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl">Same price.<br /><span className="text-shrink">Less inside.</span></h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">KiloRadar shows the real price per kilo, flags sneaky shrinkflation, and tells you which store is cheapest right now.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#ranking" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">See cheapest stores</a>
            <a href="#calculator" className="rounded-full border border-border bg-card px-6 py-3 font-semibold transition-colors hover:bg-secondary">Check a product</a>
          </div>
        </div>
        <div className="card-kilo animate-rise p-6 sm:p-8" style={{ animationDelay: ".1s" }}>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl">🍫</span>
            <div><p className="font-semibold">Freia Melkesjokolade</p><p className="text-sm text-muted-foreground">Changed Sep 2026</p></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-secondary p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Before</p>
              <p className="mt-1 font-display text-2xl font-bold tabular">200 g</p>
              <p className="text-sm text-muted-foreground tabular">kr 42,90 · kr 215/kg</p>
            </div>
            <div className="rounded-2xl border border-shrink/40 bg-shrink/10 p-4">
              <p className="text-xs uppercase tracking-wider text-shrink">Now</p>
              <p className="mt-1 font-display text-2xl font-bold tabular">180 g</p>
              <p className="text-sm text-muted-foreground tabular">kr 44,90 · kr 249/kg</p>
            </div>
          </div>
          <div className="mt-6 flex items-end justify-between border-t border-border pt-6">
            <p className="max-w-[10rem] text-sm text-muted-foreground">Real price increase per kilo</p>
            <p className="font-display text-6xl font-extrabold text-shrink tabular sm:text-7xl">+16%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const periods: { id: Period; label: string }[] = [{ id: "week", label: "This week" }, { id: "month", label: "This month" }, { id: "year", label: "This year" }];

function Ranking({ code }: { code: CountryCode }) {
  const [period, setPeriod] = useState<Period>("week");
  const country = countries.find((c) => c.code === code)!;
  const list = [...rankings[code][period]].sort((a, b) => a.basket - b.basket);
  const win = list[0]!;
  const rest = list.slice(1);
  const max = list[list.length - 1]!.basket;
  const dig = code === "UK" ? 2 : 0;
  return (
    <section id="ranking" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-savings"><ShoppingBasket className="size-4" /> Typical household basket · 42 items</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Cheapest store in {country.name} {country.flag}</h2>
        </div>
        <div role="tablist" className="inline-flex rounded-full border border-border bg-card p-1">
          {periods.map((p) => (
            <button key={p.id} role="tab" aria-selected={period === p.id} onClick={() => setPeriod(p.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${period === p.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{p.label}</button>
          ))}
        </div>
      </div>
      <div key={code + period} className="mt-8 grid gap-4 lg:grid-cols-5">
        <div className="card-kilo bg-winner animate-rise relative overflow-hidden p-6 shadow-glow sm:p-8 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-savings"><Crown className="size-4" /> #1 Cheapest</div>
          <p className="mt-4 font-display text-4xl font-extrabold">{win.chain}</p>
          <p className="mt-6 text-sm text-muted-foreground">Basket total</p>
          <p className="font-display text-5xl font-extrabold tabular sm:text-6xl">{fmt(win.basket, country, dig)}</p>
          <p className="mt-4 inline-flex items-center gap-1 rounded-full bg-savings/15 px-3 py-1 text-sm font-semibold text-savings">
            <TrendingDown className="size-4" /> Save {fmt(max - win.basket, country, dig)} vs. priciest
          </p>
        </div>
        <ol className="grid gap-3 lg:col-span-3">
          {rest.map((s, i) => {
            const diff = ((s.basket - win.basket) / win.basket) * 100;
            return (
              <li key={s.chain} className="card-kilo animate-rise flex items-center gap-4 p-4 hover:-translate-y-0.5" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
                <span className="w-10 font-display text-3xl font-extrabold text-muted-foreground tabular">{i + 2}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-semibold">{s.chain}</p>
                    <p className="font-display text-xl font-bold tabular">{fmt(s.basket, country, dig)}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full rounded-full ${diff > 8 ? "bg-shrink" : "bg-warn"}`} style={{ width: `${Math.min(100, (s.basket / max) * 100)}%` }} />
                    </div>
                    <span className="w-14 text-right text-xs font-semibold text-muted-foreground tabular">+{diff.toFixed(1)}%</span>
                    <span className={`flex w-14 items-center justify-end text-xs tabular ${s.change <= 0 ? "text-savings" : "text-shrink"}`}>
                      {s.change <= 0 ? <ArrowDown className="size-3" /> : <ArrowUp className="size-3" />}{Math.abs(s.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center rounded-xl border border-input bg-secondary px-3 focus-within:ring-2 focus-within:ring-ring">
        <input type="number" min={0} step="any" value={value || ""} onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-transparent py-3 font-display text-lg font-bold outline-none tabular" />
        <span className="whitespace-nowrap text-sm text-muted-foreground">{suffix}</span>
      </div>
    </label>
  );
}

function CalculatorSection({ country }: { country: (typeof countries)[number] }) {
  const [v, setV] = useState({ os: 500, op: 39.9, ns: 450, np: 39.9 });
  const pct = v.os && v.ns && v.op && v.np ? shrinkflation(v.op, v.os, v.np, v.ns) : 0;
  const up = pct > 0.05, down = pct < -0.05;
  return (
    <section id="calculator" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-warn"><Calculator className="size-4" /> Unit price calculator</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Did your favourite just get smaller?</h2>
          <p className="mt-3 text-muted-foreground">Enter the old and new pack size and price. We'll show the true change per kilo.</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="space-y-3"><p className="text-sm font-semibold">Before</p>
              <Field label="Size" suffix="g / ml" value={v.os} onChange={(n) => setV({ ...v, os: n })} />
              <Field label="Price" suffix={country.currency} value={v.op} onChange={(n) => setV({ ...v, op: n })} /></div>
            <div className="space-y-3"><p className="text-sm font-semibold">Now</p>
              <Field label="Size" suffix="g / ml" value={v.ns} onChange={(n) => setV({ ...v, ns: n })} />
              <Field label="Price" suffix={country.currency} value={v.np} onChange={(n) => setV({ ...v, np: n })} /></div>
          </div>
        </div>
        <div className={`card-kilo p-8 text-center ${up ? "border-shrink/40" : down ? "border-savings/40" : ""}`}>
          <p className="text-sm text-muted-foreground">Real price change per kilo</p>
          <p className={`mt-2 font-display text-7xl font-extrabold tabular sm:text-8xl ${up ? "text-shrink" : down ? "text-savings" : ""}`}>{pct > 0 ? "+" : ""}{pct.toFixed(1)}%</p>
          <p className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${up ? "bg-shrink/15 text-shrink" : down ? "bg-savings/15 text-savings" : "bg-secondary"}`}>
            {up ? (v.ns < v.os ? "Shrinkflation detected" : "Price increase") : down ? "Better value now 🎉" : "No change"}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl bg-secondary p-4"><p className="text-xs text-muted-foreground">Before per kg/L</p><p className="font-display text-xl font-bold tabular">{fmt(unitPrice(v.op, v.os, "g"), country)}</p></div>
            <div className="rounded-2xl bg-secondary p-4"><p className="text-xs text-muted-foreground">Now per kg/L</p><p className="font-display text-xl font-bold tabular">{fmt(unitPrice(v.np, v.ns, "g"), country)}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Products({ country }: { country: (typeof countries)[number] }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products.filter((p) => !t || p.barcode.includes(t) || p.name.toLowerCase().includes(t) || p.brand.toLowerCase().includes(t));
  }, [q]);
  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-shrink"><ScanBarcode className="size-4" /> Product database</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Recently caught shrinking</h2>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-input bg-card px-4 focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, brand or barcode…" inputMode="search"
          className="w-full bg-transparent py-4 outline-none placeholder:text-muted-foreground" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const pct = shrinkflation(p.oldPrice, p.oldSize, p.newPrice, p.newSize);
          return (
            <article key={p.barcode} className="card-kilo p-5 hover:-translate-y-1 hover:border-shrink/30">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl">{p.emoji}</span>
                <span className="rounded-full bg-shrink/15 px-3 py-1 font-display text-lg font-bold text-shrink tabular">+{pct.toFixed(0)}%</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{p.brand}</p>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <div className="mt-3 flex items-center gap-2 text-sm tabular">
                <span className="text-muted-foreground line-through">{p.oldSize}{p.unit}</span>
                <span>→</span><span className="font-semibold">{p.newSize}{p.unit}</span>
                <span className="ml-auto text-muted-foreground">{p.changed}</span>
              </div>
              <p className="mt-3 border-t border-border pt-3 font-mono text-xs text-muted-foreground">{p.barcode}</p>
            </article>
          );
        })}
        {!list.length && <p className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">No products match "{q}". Try another barcode.</p>}
      </div>
    </section>
  );
}
