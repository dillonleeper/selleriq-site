import { ArrowRight, Check, CircleCheck, DatabaseZap, Radar, Workflow } from "lucide-react";
import { EmailCapture, Logo, Reveal, SiteHeader } from "./motion";
import { ActionStream, ProductStage, SignalExplorer } from "./product-stage";

const operatingLayers = [
  { number: "01", icon: DatabaseZap, label: "UNIFY", title: "One clean model of your Amazon business.", body: "SellerIQ continuously reconciles sales, traffic, inventory, advertising, fees, and finance data. No exports. No weekly rebuild. No argument over which spreadsheet is right.", proof: ["Daily-grain accuracy", "Marketplace-aware", "Fee-level economics"] },
  { number: "02", icon: Radar, label: "DETECT", title: "See the change before it becomes the problem.", body: "Every SKU is watched for shifts in velocity, conversion, buy box, stock cover, contribution margin, and ad efficiency—so the signal arrives while there is still time to act.", proof: ["Anomaly detection", "Root-cause context", "Priority scoring"] },
  { number: "03", icon: Workflow, label: "ACT", title: "Turn insight into prioritized actions.", body: "SellerIQ translates analysis into specific recommendations: what to reorder, where to investigate, which campaign to review, and which SKU needs attention first.", proof: ["Business impact", "Clear owner", "Review workflow"] },
];

const plans = [
  { name: "Starter", price: "$49", detail: "100 SKUs · 1 marketplace" },
  { name: "Growth", price: "$149", detail: "1,000 SKUs · 3 marketplaces", featured: true },
  { name: "Pro", price: "$349", detail: "Unlimited SKUs · full automation" },
];

function SectionMarker({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" />{children}</span>;
}

export default function Home() {
  return <div id="top" className="overflow-clip bg-[#f5f7fb] text-slate-950">
    <div className="hero-shell relative overflow-hidden bg-[#07111f] text-white">
      <SiteHeader />
      <div aria-hidden className="hero-grid absolute inset-0 opacity-35" />
      <div aria-hidden className="absolute -left-48 top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div aria-hidden className="absolute right-[-12rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full bg-cyan-400/10 blur-[150px]" />
      <main id="main">
        <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1400px] items-center gap-14 px-6 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-xl">
            <Reveal><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300 backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />Built for operators running real catalogs</div></Reveal>
            <Reveal delay={70}><h1 className="mt-7 text-balance text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Run Amazon<span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">with signal.</span></h1></Reveal>
            <Reveal delay={140}><p className="mt-7 max-w-lg text-pretty text-lg leading-8 text-slate-300">SellerIQ turns scattered marketplace data into one live operating system—showing what changed, why it matters, and what to do next.</p></Reveal>
            <Reveal delay={210}><div className="mt-9"><EmailCapture tone="dark" buttonLabel="Join early access" /></div><p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><CircleCheck className="h-3.5 w-3.5 text-emerald-400" /> No credit card · Founding-member pricing</p></Reveal>
          </div>
          <Reveal delay={120} className="relative z-10 lg:-mr-32"><ProductStage /></Reveal>
        </section>
      </main>
    </div>

    <section aria-label="Product outcomes" className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-slate-200 px-6 lg:grid-cols-4 lg:px-10">{[["Sales + stock", "in one operating view"], ["Ads + profit", "connected to every SKU"], ["Daily", "decision-ready refresh"], ["Ranked", "actions by business impact"]].map(([value,label])=><div key={label} className="px-5 py-7 first:pl-0 lg:px-8"><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}</div></section>

    <section id="product" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]"><div><SectionMarker>How SellerIQ works</SectionMarker></div><div><h2 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl">Your data already knows what to do next. SellerIQ makes it obvious.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">Sales, inventory, advertising, and profit come together in one view—then become a ranked, explainable action plan.</p></div></Reveal>
      <div className="mt-20 border-t border-slate-300">{operatingLayers.map((layer,index)=><Reveal key={layer.number} delay={index*80}><article className="group grid gap-8 border-b border-slate-300 py-12 lg:grid-cols-[0.18fr_0.46fr_1fr] lg:items-start lg:py-16"><span className="font-mono text-sm text-slate-400">{layer.number}</span><div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[.18em] text-blue-700"><layer.icon className="h-5 w-5" />{layer.label}</div><div className="grid gap-7 md:grid-cols-[0.9fr_1.1fr]"><h3 className="text-3xl font-semibold leading-tight tracking-[-0.035em]">{layer.title}</h3><div><p className="leading-7 text-slate-600">{layer.body}</p><ul className="mt-6 flex flex-wrap gap-2">{layer.proof.map(item=><li key={item} className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">{item}</li>)}</ul></div></div></article></Reveal>)}</div>
    </section>

    <section className="relative overflow-hidden bg-[#0b1424] py-28 text-white lg:py-36"><div aria-hidden className="hero-grid absolute inset-0 opacity-20" /><div className="relative mx-auto max-w-[1400px] px-6 lg:px-10"><Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end"><div><span className="font-mono text-xs font-semibold uppercase tracking-[.22em] text-cyan-300">Live signal explorer</span><h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Move from “what happened?” to “here’s why.”</h2></div><p className="max-w-xl text-lg leading-8 text-slate-400 lg:justify-self-end">Explore the same SKU through sales, traffic, margin, and inventory context. The diagnosis updates with the view.</p></Reveal><Reveal className="mt-14"><SignalExplorer /></Reveal></div></section>

    <section id="workflow" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40"><Reveal className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]"><div><SectionMarker>From insight to action</SectionMarker></div><div><h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">A daily action list ranked by business impact.</h2></div></Reveal><Reveal className="mt-14"><ActionStream /></Reveal></section>

    <section id="pricing" className="border-y border-slate-200 bg-white"><div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10"><Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><SectionMarker>Simple pricing</SectionMarker><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Scale the system with the catalog.</h2></div><p className="max-w-md text-slate-600">Every plan starts with the same clean operating model. Add depth and automation as the business grows.</p></Reveal><div className="mt-14 grid border-y border-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-slate-200">{plans.map(plan=><Reveal key={plan.name} className={`relative border-b border-slate-200 p-7 last:border-b-0 lg:border-b-0 lg:p-9 ${plan.featured?"bg-blue-50":""}`}>{plan.featured?<span className="absolute right-6 top-6 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Best fit</span>:null}<p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">{plan.name}</p><p className="mt-6 text-5xl font-semibold tracking-[-0.05em]">{plan.price}<span className="text-base font-normal text-slate-400"> / mo</span></p><p className="mt-3 text-sm text-slate-600">{plan.detail}</p><a href="#early-access" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Get early access <ArrowRight className="h-4 w-4" /></a></Reveal>)}</div><p className="mt-6 text-sm text-slate-500">Need agency workspaces, API access, or a custom SLA? <a href="mailto:dleeper@merkuryinnovations.com" className="font-medium text-slate-900 underline underline-offset-4">Talk to us.</a></p></div></section>

    <section id="early-access" className="relative overflow-hidden bg-blue-600 px-6 py-28 text-white lg:px-10 lg:py-36"><div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(103,232,249,.35),transparent_38%),linear-gradient(125deg,transparent_40%,rgba(8,47,73,.25))]" /><Reveal className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="font-mono text-xs font-semibold uppercase tracking-[.22em] text-blue-100">Build the calmer operating system</p><h2 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[.98] tracking-[-0.055em] sm:text-7xl">Know the move before the meeting.</h2></div><div><p className="mb-7 max-w-md text-lg leading-8 text-blue-100">Join the founding group helping shape SellerIQ for ambitious Amazon operators.</p><EmailCapture tone="dark" buttonLabel="Request access" /><p className="mt-4 flex gap-2 text-xs text-blue-100"><Check className="h-4 w-4" /> No spam. Just product access and launch updates.</p></div></Reveal></section>

    <footer className="bg-[#07111f] text-white"><div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10"><Logo /><div className="flex items-center gap-6 text-sm text-slate-400"><a href="#product">Product</a><a href="#workflow">Workflow</a><a href="#pricing">Pricing</a></div><p className="text-xs text-slate-500">© 2026 SellerIQ</p></div></footer>
  </div>;
}
