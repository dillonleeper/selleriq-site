"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CalendarClock,
  Check,
  Megaphone,
  Menu,
  Package,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Returns a ref + whether it has scrolled into view (fires once). */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(el);
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ------------------------------------------------------------------ */
/* Reveal — fade + rise into view on scroll                            */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("reveal--in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("reveal--in");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — animates a number when it scrolls into view               */
/* ------------------------------------------------------------------ */

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const format = (n: number) =>
    prefix +
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  // SSR / first paint shows the final value, so no-JS users see real numbers.
  const [display, setDisplay] = useState(() => format(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || !("IntersectionObserver" in window)) {
      setDisplay(format(value));
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(format(value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(format(0));
            run();
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, prefix, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function Logo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <a
      href="#top"
      className="flex items-center gap-2"
      aria-label="SellerIQ home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-600/25">
        <BarChart3 className="h-5 w-5 text-white" strokeWidth={2.5} />
      </span>
      <span className={`text-lg font-semibold tracking-tight ${tone === "dark" ? "text-white" : "text-slate-900"}`}>
        Seller<span className={tone === "dark" ? "text-cyan-300" : "text-blue-600"}>IQ</span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Site header — turns solid on scroll, with a mobile menu             */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "Workflow", href: "#workflow" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo tone={scrolled ? "light" : "dark"} />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="#product"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
          >
            Explore Product
          </a>
          <a
            href="#early-access"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Get Early Access
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`rounded-lg p-2 transition sm:hidden ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-6 py-4 sm:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Get Early Access
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Email capture — working form states                                 */
/* ------------------------------------------------------------------ */

export function EmailCapture({
  buttonLabel = "Get Early Access",
  className = "",
  tone = "light",
}: {
  buttonLabel?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const inputId = useId();

  if (submitted) {
    return (
      <div
        className={`flex w-full max-w-md items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm font-medium text-emerald-700 ${className}`}
        role="status"
      >
        <Check className="h-4 w-4" aria-hidden />
        You&apos;re on the list — we&apos;ll be in touch shortly.
      </div>
    );
  }

  const inputClasses =
    tone === "dark"
      ? "border-white/20 bg-white/10 text-white placeholder:text-slate-300 focus:border-blue-300 focus:bg-white/15"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500";

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email.trim() || status === "loading") return;
        setStatus("loading");
        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.trim() }),
          });
          if (!response.ok) throw new Error("Signup failed");
          setSubmitted(true);
        } catch {
          setStatus("error");
        }
      }}
      className={`flex w-full max-w-md flex-col gap-3 sm:flex-row ${className}`}
    >
      <label htmlFor={inputId} className="sr-only">
        Work email
      </label>
      <input
        id={inputId}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className={`h-12 flex-1 rounded-xl border px-4 text-sm outline-none transition ${inputClasses}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition hover:bg-blue-700"
      >
        {status === "loading" ? "Joining…" : buttonLabel}
        <ArrowRight
          className="h-4 w-4 transition group-hover:translate-x-0.5"
          aria-hidden
        />
      </button>
      {status === "error" && (
        <p className="text-sm font-medium text-red-600 sm:basis-full" role="alert">
          We couldn&apos;t add you just now. Please try again.
        </p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Hero backdrop — parallax glow that drifts on scroll                 */
/* ------------------------------------------------------------------ */

export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.setProperty("--py", `${y * 0.18}px`);
        el.style.setProperty("--py2", `${y * -0.1}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-blue-400/30 blur-[130px]"
        style={{ transform: "translateX(-50%) translateY(var(--py, 0px))" }}
      />
      <div
        className="absolute right-[-8rem] top-[6rem] h-[26rem] w-[26rem] rounded-full bg-indigo-400/20 blur-[120px]"
        style={{ transform: "translateY(var(--py2, 0px))" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(37,99,235,0.10),transparent_55%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Operator console — an interactive product story, not a screenshot   */
/* ------------------------------------------------------------------ */

const consoleViews = [
  { label: "Revenue", value: "$418,920", delta: "+18.4%", color: "#2563eb" },
  { label: "Profit", value: "$96,342", delta: "+12.7%", color: "#7c3aed" },
  { label: "Inventory", value: "43 days", delta: "6 risks", color: "#0891b2" },
];

export function OperatorConsole() {
  const [active, setActive] = useState(0);
  const [resolved, setResolved] = useState(false);
  const view = consoleViews[active];

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 text-white shadow-2xl shadow-blue-950/30">
      <div className="flex flex-col border-b border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-500/15 text-blue-300"><BarChart3 className="h-4 w-4" /></span>
          <div><p className="text-sm font-semibold">Daily command center</p><p className="text-xs text-slate-400">Updated 2 minutes ago</p></div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-4 sm:pb-0" role="tablist" aria-label="Dashboard metric">
          {consoleViews.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={`rounded-lg px-3 py-2 text-xs font-medium transition ${index === active ? "bg-white text-slate-950" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-[1.45fr_.75fr]">
        <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs uppercase tracking-[.18em] text-slate-500">{view.label} · last 30 days</p><p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{view.value}</p></div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">{view.delta}</span>
          </div>
          <svg viewBox="0 0 620 190" className="mt-6 h-48 w-full" preserveAspectRatio="none" role="img" aria-label={`${view.label} trend over 30 days`}>
            <defs><linearGradient id="console-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={view.color} stopOpacity=".35"/><stop offset="1" stopColor={view.color} stopOpacity="0"/></linearGradient></defs>
            {[30,70,110,150].map((y) => <line key={y} x1="0" x2="620" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />)}
            <path d="M0 154 C55 148 73 121 121 128 S198 143 244 101 S324 113 368 73 S448 92 492 51 S570 55 620 18 L620 190 L0 190 Z" fill="url(#console-fill)" />
            <path d="M0 154 C55 148 73 121 121 128 S198 143 244 101 S324 113 368 73 S448 92 492 51 S570 55 620 18" fill="none" stroke={view.color} strokeWidth="4" strokeLinecap="round" className="console-line" />
          </svg>
          <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-xs"><span><b className="block text-sm text-white">4.7%</b><span className="text-slate-500">Conversion</span></span><span><b className="block text-sm text-white">$31.24</b><span className="text-slate-500">Avg. order</span></span><span><b className="block text-sm text-white">1,842</b><span className="text-slate-500">Orders</span></span></div>
        </div>
        <aside className="p-5 sm:p-7" aria-label="Priority recommendation">
          <div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[.18em] text-slate-500">Next best action</p><Sparkles className="h-4 w-4 text-violet-300" /></div>
          <p className="mt-5 text-lg font-semibold">Protect 11 days of revenue</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">Increase the FBA transfer for Organic Tea by 480 units before Wednesday.</p>
          <div className="my-5 space-y-3 border-y border-white/10 py-5 text-sm"><p className="flex justify-between"><span className="text-slate-500">Confidence</span><span>94%</span></p><p className="flex justify-between"><span className="text-slate-500">Cash required</span><span>$3,216</span></p><p className="flex justify-between"><span className="text-slate-500">Revenue protected</span><span className="text-emerald-300">$18,740</span></p></div>
          <button type="button" onClick={() => setResolved(true)} disabled={resolved} className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${resolved ? "bg-emerald-400/15 text-emerald-300" : "bg-blue-600 text-white hover:bg-blue-500"}`}>
            {resolved ? "Action queued ✓" : "Queue replenishment"}
          </button>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live dashboard — the hero product mockup                            */
/* ------------------------------------------------------------------ */

export function LiveDashboard() {
  const reduced = usePrefersReducedMotion();
  const [grown, setGrown] = useState(false);
  const [revenue, setRevenue] = useState(418920);
  const mockRef = useRef<HTMLDivElement>(null);

  const bars = [42, 58, 48, 70, 64, 82, 76, 95, 88, 72, 90, 100];

  // Grow the bars in when the chart scrolls into view.
  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    if (reduced || !("IntersectionObserver" in window)) {
      setGrown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setGrown(true);
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Make the revenue figure feel "live" by nudging it up periodically.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setRevenue((r) => r + Math.floor(Math.random() * 240) + 40);
    }, 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const stats = [
    { label: "Revenue (30d)", node: <CountUp value={revenue} prefix="$" />, delta: "+12.4%", positive: true },
    { label: "Units sold", node: <CountUp value={9184} />, delta: "+8.1%", positive: true },
    { label: "TACOS", node: <CountUp value={9.2} decimals={1} suffix="%" />, delta: "-1.8%", positive: true },
    { label: "Contribution margin", node: <CountUp value={31.6} decimals={1} suffix="%" />, delta: "+2.3%", positive: true },
  ];

  const sidebar = [
    { label: "Overview", active: true },
    { label: "Sales" },
    { label: "Inventory" },
    { label: "Advertising" },
    { label: "Profitability" },
    { label: "AI Recs" },
  ];

  return (
    <div
      ref={mockRef}
      className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <span className="h-3 w-3 rounded-full bg-slate-300" />
        <span className="ml-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-slate-500 ring-1 ring-slate-200">
          app.selleriq.com/dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <aside className="hidden flex-col gap-1 border-r border-slate-200 bg-slate-50/60 p-4 sm:flex">
          {sidebar.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                item.active
                  ? "bg-blue-50 font-medium text-blue-700"
                  : "text-slate-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  item.active ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
              {item.label}
            </div>
          ))}
        </aside>

        {/* main panel */}
        <div className="p-5 text-left sm:p-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1.5 text-lg font-semibold tabular-nums text-slate-900">
                  {stat.node}
                </p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    stat.positive ? "text-emerald-600" : "text-blue-600"
                  }`}
                >
                  {stat.delta}
                </p>
              </div>
            ))}
          </div>

          {/* chart */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Revenue trend
                </p>
                <p className="text-xs text-slate-500">Last 12 weeks</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <TrendingUp className="h-3 w-3" aria-hidden />
                Trending up
              </span>
            </div>
            <div className="mt-6 flex h-40 items-end gap-1.5 sm:gap-2.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="bar-grow flex-1 rounded-t-sm bg-gradient-to-t from-blue-500 to-blue-400"
                  style={{
                    height: grown ? `${h}%` : "0%",
                    transitionDelay: `${i * 45}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* AI rec strip */}
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Sparkles className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                Reorder SKU-4471 — 14 days of cover left
              </p>
              <p className="truncate text-xs text-slate-600">
                Suggested PO: 1,200 units · projected to prevent a stockout
              </p>
            </div>
            <span className="hidden shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white sm:inline-block">
              Deploy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature spotlight — auto-rotating showcase                          */
/* ------------------------------------------------------------------ */

type Feature = {
  icon: IconType;
  title: string;
  body: string;
  points: string[];
  metric: { value: string; label: string };
};

const spotlightFeatures: Feature[] = [
  {
    icon: BarChart3,
    title: "Sales Intelligence",
    body: "Track trends, units, and revenue in real time. Surface conversion rates and your top movers so you always know what's working — and what's slipping.",
    points: ["Revenue & units trends", "Conversion analytics", "Top & bottom movers"],
    metric: { value: "Real-time", label: "data freshness" },
  },
  {
    icon: Package,
    title: "Inventory Intelligence",
    body: "See your true stock position at a glance. Days-of-cover modeling and reorder alerts mean you never miss a sale or tie up cash in dead stock.",
    points: ["Real-time stock position", "Days of cover", "Smart reorder alerts"],
    metric: { value: "0", label: "surprise stockouts" },
  },
  {
    icon: Megaphone,
    title: "Advertising Intelligence",
    body: "Understand spend, ROAS, and TACOS across every campaign. Automatic wasted-spend detection tells you exactly where your ad dollars are leaking.",
    points: ["ROAS & TACOS by campaign", "Wasted spend detection", "Spend pacing"],
    metric: { value: "9.1%", label: "avg TACOS reduction" },
  },
  {
    icon: Wallet,
    title: "Profitability Intelligence",
    body: "Every fee, every margin, every contribution dollar — modeled per SKU. Finally know what's actually profitable after the real cost of doing business.",
    points: ["Fee-level breakdowns", "True margins per SKU", "Contribution profit"],
    metric: { value: "Per-SKU", label: "margin clarity" },
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    body: "SellerIQ doesn't just report — it recommends. Review, approve, and deploy changes in one click, with auto-replenishment and pricing moves on autopilot.",
    points: ["Approve / reject / deploy loop", "Auto-replenishment", "Dynamic pricing suggestions"],
    metric: { value: "1-click", label: "to deploy" },
  },
];

const ROTATE_MS = 5000;

export function FeatureSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % spotlightFeatures.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [reduced, paused]);

  const feature = spotlightFeatures[active];
  const ActiveIcon = feature.icon;

  return (
    <div
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tab list */}
      <div role="tablist" aria-label="Feature areas" className="flex flex-col gap-2">
        {spotlightFeatures.map((f, i) => {
          const Icon = f.icon;
          const isActive = i === active;
          return (
            <button
              key={f.title}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl border p-4 text-left transition ${
                isActive
                  ? "border-blue-400/40 bg-white/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-blue-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={`text-base font-medium transition ${
                    isActive ? "text-white" : "text-slate-300"
                  }`}
                >
                  {f.title}
                </span>
              </span>
              {/* progress bar for the active tab */}
              {isActive && !reduced && !paused && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-blue-400">
                  <span
                    key={active}
                    className="spotlight-progress block h-full w-full origin-left bg-blue-400"
                    style={{
                      animation: `spotlight-progress ${ROTATE_MS}ms linear forwards`,
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        role="tabpanel"
        key={active}
        className="reveal reveal--in rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <ActiveIcon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">
          {feature.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {feature.body}
        </p>
        <ul className="mt-6 grid gap-2.5">
          {feature.points.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-sm text-slate-200"
            >
              <Check className="h-4 w-4 shrink-0 text-blue-400" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 inline-flex items-baseline gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="text-2xl font-semibold text-white">
            {feature.metric.value}
          </span>
          <span className="text-sm text-slate-400">{feature.metric.label}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Capability mini-visuals — one animated widget per detail card       */
/* ------------------------------------------------------------------ */

const panel = "rounded-xl border border-white/10 bg-slate-900/60 p-4";
const panelLabel = "text-xs font-medium text-slate-400";

/* FBA Replenishment — days-of-cover meter + reorder-by date */
export function CoverMeter() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={panel}>
      <div className="flex items-center justify-between">
        <span className={panelLabel}>Days of cover</span>
        <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-300">
          Critical
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums text-white">
          <CountUp value={14} />
        </span>
        <span className="text-sm text-slate-400">days left</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-[width] duration-1000 ease-out"
          style={{ width: inView ? "31%" : "0%" }}
        />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-300">
        <CalendarClock className="h-3.5 w-3.5 text-blue-300" aria-hidden />
        Reorder by <span className="font-semibold text-white">Jun 14</span>
      </div>
    </div>
  );
}

/* Supplier Reorder — order quantity + lead-time pipeline */
export function SupplierOrder() {
  return (
    <div className={panel}>
      <span className={panelLabel}>Suggested order</span>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums text-white">
          <CountUp value={1200} />
        </span>
        <span className="text-sm text-slate-400">units</span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1 text-[11px] text-slate-300">
        <span className="rounded bg-white/10 px-2 py-1">Production 30d</span>
        <span className="text-slate-500" aria-hidden>
          →
        </span>
        <span className="rounded bg-white/10 px-2 py-1">Transit 21d</span>
        <span className="text-slate-500" aria-hidden>
          →
        </span>
        <span className="rounded bg-blue-600/25 px-2 py-1 text-blue-200">
          In stock
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <span className="flex -space-x-1" aria-hidden>
          {["bg-blue-400", "bg-indigo-400", "bg-emerald-400", "bg-sky-400"].map(
            (c) => (
              <span
                key={c}
                className={`h-3 w-3 rounded-full ring-2 ring-slate-900 ${c}`}
              />
            ),
          )}
        </span>
        across 4 locations
      </div>
    </div>
  );
}

/* Per-SKU Deep Dive — sparkline with a self-drawing forecast tail */
export function ForecastSparkline() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  return (
    <div ref={ref} className={panel}>
      <div className="flex items-center justify-between">
        <span className={panelLabel}>SKU-4471 · revenue</span>
        <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
          <TrendingUp className="h-3 w-3" aria-hidden />
          forecast
        </span>
      </div>
      <svg
        viewBox="0 0 220 64"
        className="mt-2 h-16 w-full"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points="0,50 24,46 48,48 72,38 96,40 120,30 132,28"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            reduced
              ? undefined
              : {
                  strokeDasharray: 220,
                  strokeDashoffset: inView ? 0 : 220,
                  transition: "stroke-dashoffset 1.4s ease-out",
                }
          }
        />
        <polyline
          points="132,28 162,23 192,16 214,9"
          stroke="#34d399"
          strokeWidth="2.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
          style={
            reduced
              ? undefined
              : {
                  opacity: inView ? 1 : 0,
                  transition: "opacity 0.6s ease-out 0.9s",
                }
          }
        />
        <circle cx="214" cy="9" r="3.5" fill="#34d399" />
      </svg>
    </div>
  );
}

/* Traffic Health Diagnostics — status rows + a diagnosis chip */
const healthRows = [
  { label: "Traffic", status: "Healthy", dot: "bg-emerald-400", text: "text-emerald-300" },
  { label: "Conversion", status: "Watch", dot: "bg-amber-400", text: "text-amber-300" },
  { label: "Buy Box", status: "Weak", dot: "bg-red-400", text: "text-red-300" },
];

export function TrafficHealth() {
  return (
    <div className={panel}>
      <div className="space-y-2">
        {healthRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-300">
              <span className={`h-2 w-2 rounded-full ${row.dot}`} aria-hidden />
              {row.label}
            </span>
            <span className={`text-xs font-semibold ${row.text}`}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-300">
        <span className="text-slate-400">Diagnosis:</span>{" "}
        <span className="font-semibold text-white">Weak buy box</span> → check
        pricing
      </div>
    </div>
  );
}

/* Daily-Grain Accuracy — match count-up + daily vs weekly granularity */
export function AccuracyDial() {
  return (
    <div className={panel}>
      <span className={panelLabel}>Match to Amazon Business Reports</span>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums text-emerald-300">
          <CountUp value={99.99} decimals={2} suffix="%" />
        </span>
        <span className="text-sm text-slate-400">accuracy</span>
      </div>
      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-12 text-slate-400">Daily</span>
          <span className="flex gap-1" aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-sm bg-blue-400" />
            ))}
          </span>
          <span className="font-semibold text-blue-300">SellerIQ</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-slate-400">Weekly</span>
          <span className="h-2.5 w-[5.5rem] rounded-sm bg-white/15" aria-hidden />
          <span className="text-slate-500">others</span>
        </div>
      </div>
    </div>
  );
}

/* Gainers & Losers — one accelerating SKU, one slipping */
export function GainersLosers() {
  return (
    <div className={panel}>
      <div className="flex items-center justify-between text-sm">
        <span className="truncate text-slate-300">Organic Tea · 24ct</span>
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          <CountUp value={18.4} decimals={1} prefix="+" suffix="%" />
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="truncate text-slate-300">Bamboo Cutlery</span>
        <span className="inline-flex items-center gap-1 font-semibold text-red-300">
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          <CountUp value={-12.1} decimals={1} suffix="%" />
        </span>
      </div>
      <div className="mt-3 border-t border-white/10 pt-3 text-xs text-slate-400">
        MTD vs last month
      </div>
    </div>
  );
}
