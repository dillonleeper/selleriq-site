"use client";

import { useId, useState } from "react";
import { ArrowDown, ArrowUp, Check, ChevronRight, CircleAlert, Package, Sparkles, TrendingUp, Wallet } from "lucide-react";

const stageViews = [
  { label: "Overview", value: "$418.9k", delta: "+18.4%", line: "M0 128 C45 130 68 94 112 104 S186 115 228 74 S305 88 345 51 S423 64 480 20" },
  { label: "Profit", value: "$96.3k", delta: "+12.7%", line: "M0 136 C45 109 77 122 118 91 S190 105 239 86 S310 54 349 67 S426 31 480 25" },
  { label: "Inventory", value: "43 days", delta: "6 risks", line: "M0 42 C52 46 74 62 118 59 S192 75 236 89 S307 91 353 112 S421 120 480 137" },
];

export function ProductStage() {
  const [active, setActive] = useState(0);
  const [queued, setQueued] = useState(false);
  const gradientId = useId();
  const view = stageViews[active];
  return <div className="product-window relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0d1a2d]/95 shadow-[0_40px_100px_rgba(0,0,0,.55)] backdrop-blur-xl">
    <div className="flex h-12 items-center justify-between border-b border-white/10 px-4"><div className="flex gap-1.5" aria-hidden>{["bg-red-400","bg-amber-400","bg-emerald-400"].map(c=><span key={c} className={`h-2 w-2 rounded-full ${c}`}/>)}</div><span className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-500">SellerIQ / Command center</span><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" /></div>
    <div className="grid min-h-[570px] md:grid-cols-[8.5rem_1fr]">
      <aside className="hidden border-r border-white/10 p-3 md:block"><div className="mb-6 px-2 pt-2 text-xs font-semibold">MERKURY</div>{["Overview","Sales","Inventory","Advertising","Profitability"].map((item,i)=><div key={item} className={`mb-1 rounded-lg px-2 py-2 text-[11px] ${i===0?"bg-blue-500/15 text-blue-300":"text-slate-500"}`}>{item}</div>)}<div className="mt-8 border-t border-white/10 pt-5"><p className="px-2 text-[9px] uppercase tracking-wider text-slate-600">Marketplaces</p><p className="mt-3 px-2 text-[11px] text-slate-400">🇺🇸 United States</p><p className="mt-2 px-2 text-[11px] text-slate-600">🇨🇦 Canada</p></div></aside>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs text-slate-500">Good morning, Dillon</p><h2 className="mt-1 text-lg font-semibold">Here’s what needs attention.</h2></div><span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] text-slate-400">Last 30 days ▾</span></div>
        <div className="mt-6 flex gap-1 border-b border-white/10" role="tablist" aria-label="Workspace view">{stageViews.map((item,index)=><button key={item.label} role="tab" aria-selected={active===index} onClick={()=>setActive(index)} className={`relative px-3 pb-3 text-xs ${active===index?"text-white":"text-slate-500"}`}>{item.label}{active===index?<span className="absolute inset-x-2 bottom-0 h-px bg-blue-400"/>:null}</button>)}</div>
        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_.72fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><div className="flex items-start justify-between"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">{view.label}</p><p className="mt-2 text-3xl font-semibold tracking-tight">{view.value}</p></div><span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">{view.delta}</span></div><svg viewBox="0 0 480 160" preserveAspectRatio="none" className="mt-5 h-40 w-full" aria-label={`${view.label} trend`} role="img"><defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#38bdf8" stopOpacity=".35"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></linearGradient></defs><path d={`${view.line} L480 160 L0 160 Z`} fill={`url(#${gradientId})`}/><path d={view.line} fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" className="console-line"/></svg><div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-[10px] text-slate-500"><span><b className="block text-xs text-white">4.7%</b>Conversion</span><span><b className="block text-xs text-white">$31.24</b>Avg order</span><span><b className="block text-xs text-white">1,842</b>Orders</span></div></div>
          <div className="flex flex-col rounded-2xl border border-amber-300/20 bg-amber-300/[.06] p-5"><div className="flex items-center justify-between"><span className="rounded-md bg-amber-300/15 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-amber-200">Priority</span><Sparkles className="h-4 w-4 text-amber-200"/></div><p className="mt-5 text-base font-semibold">Protect $18,740 in revenue</p><p className="mt-2 text-xs leading-5 text-slate-400">Transfer 480 Organic Tea units to FBA before Wednesday.</p><div className="my-5 space-y-3 border-y border-white/10 py-4 text-[11px]"><p className="flex justify-between"><span className="text-slate-500">Confidence</span><span>94%</span></p><p className="flex justify-between"><span className="text-slate-500">Stock cover</span><span className="text-amber-200">14 days</span></p></div><button onClick={()=>setQueued(true)} disabled={queued} className={`mt-auto rounded-xl px-3 py-2.5 text-xs font-semibold ${queued?"bg-emerald-400/15 text-emerald-300":"bg-blue-500 text-white hover:bg-blue-400"}`}>{queued?"Queued ✓":"Queue transfer"}</button></div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">{[["Revenue","+18.4%",ArrowUp],["TACOS","-2.1%",ArrowDown],["At risk","6 SKUs",CircleAlert]].map(([label,value,Icon])=><div key={String(label)} className="rounded-xl border border-white/10 bg-white/[.025] p-3"><p className="text-[9px] uppercase tracking-wider text-slate-600">{String(label)}</p><p className="mt-2 flex items-center gap-1 text-xs font-semibold"><Icon className="h-3 w-3 text-cyan-300"/>{String(value)}</p></div>)}</div>
      </div>
    </div>
  </div>;
}

const signals = [
  { label: "Sales velocity", value: "+22.8%", note: "Demand accelerated after the promo ended.", tone: "text-emerald-300", icon: TrendingUp },
  { label: "Buy box", value: "91.4%", note: "Stable; not the source of conversion pressure.", tone: "text-blue-300", icon: Package },
  { label: "Contribution", value: "18.2%", note: "Margin expanded 1.8 points despite higher CPC.", tone: "text-violet-300", icon: Wallet },
];

export function SignalExplorer() {
  const [active, setActive] = useState(0);
  const signal = signals[active];
  const Icon = signal.icon;
  return <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[.035] lg:grid-cols-[.42fr_1fr]">
    <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:p-6"><p className="px-3 pb-4 font-mono text-[10px] uppercase tracking-wider text-slate-500">Signal stack · SKU-4471</p>{signals.map((item,index)=><button key={item.label} onClick={()=>setActive(index)} className={`mb-2 flex w-full items-center justify-between rounded-xl px-3 py-4 text-left transition ${active===index?"bg-white/10":"hover:bg-white/[.05]"}`}><span className="text-sm">{item.label}</span><span className={`text-xs font-semibold ${item.tone}`}>{item.value}</span></button>)}</div>
    <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_.7fr]"><div><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/15 text-blue-300"><Icon className="h-5 w-5"/></span><div><p className="text-xs text-slate-500">Current diagnosis</p><h3 className="font-semibold">{signal.label}</h3></div></div><p className="mt-7 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{signal.note}</p><div className="mt-8 flex gap-6 text-xs text-slate-500"><span>Compared with prior 30d</span><span>Confidence 92%</span></div></div><div className="rounded-2xl border border-white/10 bg-[#07111f] p-5"><p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">SellerIQ readout</p><p className="mt-5 text-sm leading-6 text-slate-300">Traffic is healthy. Conversion pressure is isolated to mobile sessions on the top variation.</p><div className="mt-5 border-t border-white/10 pt-5"><p className="text-[10px] uppercase tracking-wider text-slate-500">Recommended check</p><p className="mt-2 flex items-center justify-between text-sm">Review mobile listing <ChevronRight className="h-4 w-4 text-blue-300"/></p></div></div></div>
  </div>;
}

const actions = [
  { impact: "$18.7k", title: "Transfer Organic Tea inventory", owner: "Supply", status: "Ready", color: "bg-amber-400" },
  { impact: "$6.4k", title: "Reduce broad-match bid by 12%", owner: "Ads", status: "Review", color: "bg-violet-400" },
  { impact: "$4.1k", title: "Reprice Bamboo Cutlery", owner: "Pricing", status: "Ready", color: "bg-cyan-400" },
  { impact: "$2.8k", title: "Resolve stranded FBA inventory", owner: "Ops", status: "Investigate", color: "bg-rose-400" },
];

export function ActionStream() {
  const [done, setDone] = useState<string[]>([]);
  return <div className="overflow-hidden rounded-[1.75rem] border border-slate-300 bg-white shadow-[0_30px_80px_rgba(15,23,42,.08)]"><div className="grid grid-cols-[1fr_auto] border-b border-slate-200 bg-slate-50 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500 sm:grid-cols-[7rem_1fr_8rem_8rem] sm:px-7"><span className="hidden sm:block">Impact</span><span>Recommended move</span><span className="hidden sm:block">Owner</span><span>State</span></div>{actions.map(action=>{const complete=done.includes(action.title);return <div key={action.title} className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-200 px-5 py-5 last:border-0 sm:grid-cols-[7rem_1fr_8rem_8rem] sm:px-7 ${complete?"bg-emerald-50/60":""}`}><span className="hidden text-lg font-semibold sm:block">{action.impact}</span><div><p className={`font-medium ${complete?"text-slate-400 line-through":""}`}>{action.title}</p><p className="mt-1 text-xs text-slate-400 sm:hidden">{action.impact} impact · {action.owner}</p></div><span className="hidden text-sm text-slate-500 sm:block">{action.owner}</span><button onClick={()=>setDone(v=>complete?v.filter(item=>item!==action.title):[...v,action.title])} className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${complete?"border-emerald-200 bg-emerald-50 text-emerald-700":"border-slate-200 bg-white text-slate-600"}`}>{complete?<Check className="h-3 w-3"/>:<span className={`h-1.5 w-1.5 rounded-full ${action.color}`}/>} {complete?"Done":action.status}</button></div>})}</div>;
}
