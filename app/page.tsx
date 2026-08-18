import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpDown,
  CalendarClock,
  Check,
  FileSpreadsheet,
  HelpCircle,
  LineChart,
  Plug,
  Rocket,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Truck,
} from "lucide-react";
import {
  AccuracyDial,
  CountUp,
  CoverMeter,
  EmailCapture,
  FeatureSpotlight,
  ForecastSparkline,
  GainersLosers,
  HeroBackdrop,
  LiveDashboard,
  OperatorConsole,
  Logo,
  Reveal,
  SiteHeader,
  SupplierOrder,
  TrafficHealth,
} from "./motion";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const heroStats = [
  { value: 2.4, decimals: 1, prefix: "$", suffix: "B", label: "GMV analyzed" },
  { value: 12000, decimals: 0, suffix: "+", label: "SKUs under management" },
  { value: 9.1, decimals: 1, suffix: "%", label: "avg TACOS reduction" },
  { value: 30, decimals: 0, suffix: " min", label: "to first insight" },
];

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Drowning in spreadsheets",
    body: "Exports from Seller Central, ad consoles, and a dozen tabs that never quite reconcile. You spend more time wrangling data than acting on it.",
  },
  {
    icon: AlertTriangle,
    title: "Can't trust your numbers",
    body: "Different tools tell you different things. By the time you've stitched it together, the moment to act has already passed.",
  },
  {
    icon: HelpCircle,
    title: "No idea what's actually profitable",
    body: "Top-line revenue looks great — but after fees, ads, and storage, which SKUs actually make money? You're guessing.",
  },
  {
    icon: Activity,
    title: "Reacting instead of planning",
    body: "Stockouts, runaway ad spend, surprise fee changes. You're always putting out fires instead of building the business.",
  },
];

const capabilities = [
  {
    icon: CalendarClock,
    title: "FBA Replenishment",
    blurb: "Reorder-by dates and days-of-cover, so you never miss a shipment window.",
    visual: <CoverMeter />,
  },
  {
    icon: Truck,
    title: "Supplier Reorder",
    blurb: "Exact order quantities across production, transit, and up to 4 warehouses.",
    visual: <SupplierOrder />,
  },
  {
    icon: Search,
    title: "Per-SKU Deep Dive",
    blurb: "Every product's full story — trend, velocity, conversion, buy box — with a forecast.",
    visual: <ForecastSparkline />,
  },
  {
    icon: Stethoscope,
    title: "Traffic Health Diagnostics",
    blurb: "Auto-classified traffic health, with the why and where to look first.",
    visual: <TrafficHealth />,
  },
  {
    icon: Target,
    title: "Daily-Grain Accuracy",
    blurb: "Daily granularity that matches Amazon Business Reports to within 0.01%.",
    visual: <AccuracyDial />,
  },
  {
    icon: ArrowUpDown,
    title: "Gainers & Losers",
    blurb: "What's accelerating vs slipping, across any period vs its prior window.",
    visual: <GainersLosers />,
  },
];

const steps = [
  {
    icon: Plug,
    step: "01",
    title: "Connect",
    body: "Securely link your Amazon Seller account in a couple of clicks. No CSV exports, no manual setup.",
  },
  {
    icon: LineChart,
    step: "02",
    title: "Analyze",
    body: "Your sales, inventory, advertising, and fee data is ingested and modeled automatically — clean numbers you can trust.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Act",
    body: "Get clear, prioritized recommendations and deploy them with one click. Grow on purpose, not by accident.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "$49",
    cadence: "/mo",
    tagline: "For solo sellers finding their footing.",
    features: [
      "Sales Intelligence dashboard",
      "Up to 100 active SKUs",
      "Inventory tracking & low-stock alerts",
      "1 Amazon marketplace",
      "Email support",
    ],
    cta: "Get Early Access",
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    cadence: "/mo",
    tagline: "For growing brands ready to scale.",
    features: [
      "Everything in Starter",
      "Up to 1,000 active SKUs",
      "Advertising Intelligence (ROAS, TACOS)",
      "Profitability & margin analytics",
      "Up to 3 marketplaces",
      "Weekly AI insights",
    ],
    cta: "Get Early Access",
    featured: false,
  },
  {
    name: "Pro",
    price: "$349",
    cadence: "/mo",
    tagline: "For serious operators who want the full engine.",
    features: [
      "Everything in Growth",
      "Unlimited SKUs",
      "Full AI Recommendations engine",
      "Auto-replenishment & dynamic pricing",
      "Unlimited marketplaces",
      "Priority support & onboarding",
    ],
    cta: "Get Early Access",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    tagline: "For agencies and multi-account operations.",
    features: [
      "Everything in Pro",
      "Multi-account / agency workspaces",
      "Custom integrations & API access",
      "SSO & advanced permissions",
      "Dedicated success manager",
      "Custom SLA & contracts",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

/* ------------------------------------------------------------------ */
/* Small reusable pieces                                               */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
      <span className="h-px w-6 bg-blue-600" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div id="top" className="relative bg-white">
      <SiteHeader />

      <main id="main">
        {/* ----------------------------------------------------- */}
        {/* Hero                                                   */}
        {/* ----------------------------------------------------- */}
        <section className="relative overflow-hidden">
          <HeroBackdrop />

          <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                  </span>
                  Now in early access
                </span>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Your Amazon business,{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    finally under control.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">
                  SellerIQ gives mid-market Amazon sellers the analytics,
                  inventory intelligence, and AI recommendations they need to
                  grow — without the spreadsheet chaos.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-col items-center gap-4">
                  <EmailCapture />
                  <a
                    href="#how-it-works"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                  >
                    See How It Works
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Dashboard mockup */}
            <Reveal delay={120} className="relative mt-16 sm:mt-20">
              <LiveDashboard />
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* Stat strip                                             */}
        {/* ----------------------------------------------------- */}
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-6 py-2 lg:grid-cols-4">
            {heroStats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 90}
                className="px-4 py-8 text-center"
              >
                <p className="text-3xl font-bold tabular-nums text-slate-900 sm:text-4xl">
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* Problem                                                */}
        {/* ----------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>The clarity problem</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sound familiar?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Most sellers don&apos;t have a data problem. They have a clarity
              problem.
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="group grid gap-4 py-7 sm:grid-cols-[3rem_15rem_1fr] sm:items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#fff)]">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <Reveal className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div><Eyebrow>See the decision</Eyebrow><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">One operating layer from signal to action.</h2></div>
              <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">Switch the live view, inspect the recommendation, and queue the next move. SellerIQ turns scattered Amazon data into a daily operating rhythm.</p>
            </Reveal>
            <Reveal className="mt-12"><OperatorConsole /></Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* Features — dark band for contrast & drama              */}
        {/* ----------------------------------------------------- */}
        <section
          id="features"
          className="relative overflow-hidden bg-slate-950"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(37,99,235,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(99,102,241,0.14),transparent_45%)]"
          />
          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                <span className="h-px w-6 bg-blue-400" />
                Features
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to operate.
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Five intelligence engines, working as one source of truth.
                Hover to explore — or watch it cycle.
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <FeatureSpotlight />
            </Reveal>

            {/* Deeper detail — same section, second movement */}
            <Reveal className="mx-auto mt-24 max-w-2xl text-center sm:mt-28">
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Built for operators, not spectators.
              </h3>
              <p className="mt-3 text-slate-300">
                The dashboards are the entry point. This is the depth that moves
                the needle.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 90}>
                  <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300 transition group-hover:bg-blue-600 group-hover:text-white">
                        <c.icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h4 className="text-base font-semibold text-white">
                        {c.title}
                      </h4>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {c.blurb}
                    </p>
                    <div className="mt-5">{c.visual}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* How It Works                                           */}
        {/* ----------------------------------------------------- */}
        <section
          id="how-it-works"
          className="mx-auto max-w-6xl px-6 py-24 sm:py-32"
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From connected to compounding in three steps.
            </h2>
          </Reveal>

          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            {/* connecting line */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 md:block"
            />
            {steps.map((s, i) => (
              <Reveal
                key={s.step}
                delay={i * 140}
                className="relative flex flex-col items-start"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-600 shadow-sm">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="font-mono text-sm font-semibold text-blue-600">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* Pricing                                                */}
        {/* ----------------------------------------------------- */}
        <section id="pricing" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Plans that scale with your catalog.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Start where you are. Upgrade when you&apos;re ready. No long-term
                contracts.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-4">
              {tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 80} className="flex">
                  <div
                    className={`relative flex w-full flex-col rounded-2xl border p-6 transition hover:-translate-y-1 ${
                      tier.featured
                        ? "border-blue-600 bg-white shadow-2xl shadow-blue-600/15 lg:-mt-4 lg:mb-[-1rem]"
                        : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                    }`}
                  >
                    {tier.featured && (
                      <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-blue-600/30">
                        <TrendingUp className="h-3 w-3" aria-hidden />
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-slate-900">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight text-slate-900">
                        {tier.price}
                      </span>
                      {tier.cadence && (
                        <span className="text-sm text-slate-500">
                          {tier.cadence}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{tier.tagline}</p>

                    <a
                      href="#early-access"
                      className={`mt-6 inline-flex h-11 items-center justify-center rounded-lg text-sm font-semibold transition ${
                        tier.featured
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700"
                          : "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {tier.cta}
                    </a>

                    <ul className="mt-7 space-y-3 border-t border-slate-200 pt-6">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                            aria-hidden
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- */}
        {/* Final CTA                                              */}
        {/* ----------------------------------------------------- */}
        <section id="early-access" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-16 text-center shadow-2xl shadow-blue-600/20 sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_60%)]"
              />
              <div className="relative flex flex-col items-center">
                <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Stop guessing. Start growing.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-blue-50">
                  Join the early access list and be first in line when SellerIQ
                  opens up.
                </p>
                <div className="mt-8 flex justify-center">
                  <EmailCapture tone="dark" />
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-sm text-blue-100">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  No credit card. No spam. Just early access.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ------------------------------------------------------- */}
      {/* Footer                                                   */}
      {/* ------------------------------------------------------- */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <Logo />
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#pricing" className="transition hover:text-slate-900">
              Pricing
            </a>
            <a
              href="mailto:dleeper@merkuryinnovations.com"
              className="transition hover:text-slate-900"
            >
              Contact
            </a>
          </nav>
          <p className="text-sm text-slate-500">© 2026 SellerIQ</p>
        </div>
      </footer>
    </div>
  );
}
