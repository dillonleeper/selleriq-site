"use client";

import { track } from "@vercel/analytics";
import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  MousePointer2,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";

const tourItems = [
  {
    id: "sales",
    icon: BarChart3,
    label: "Sales",
    prompt: "Why did revenue rise?",
    title: "Three US SKUs drove most of the gain.",
    explanation: "Sessions grew 11%. Conversion held steady. Canada contributed 8% of the increase.",
    tone: "blue",
    metrics: [
      { label: "Ordered revenue", value: "$184,620", delta: "+12.4%", direction: "up" },
      { label: "Units", value: "10,384", delta: "+9.1%", direction: "up" },
      { label: "Conversion", value: "15.8%", delta: "+0.2 pp", direction: "up" },
    ],
    bars: [42, 55, 49, 62, 58, 74, 68, 84, 79, 92],
    prior: [39, 43, 46, 48, 53, 57, 61, 64, 68, 72],
    action: "Review the three SKUs adding $18.4K in revenue.",
    impact: "$18.4K explained",
  },
  {
    id: "profit",
    icon: CircleDollarSign,
    label: "Profit",
    prompt: "Where did margin go?",
    title: "Advertising absorbed part of the sales gain.",
    explanation: "Contribution profit increased, but TACOS rose on two high-volume products.",
    tone: "violet",
    metrics: [
      { label: "Contribution profit", value: "$38,715", delta: "+3.1%", direction: "up" },
      { label: "Margin", value: "21.0%", delta: "-1.9 pp", direction: "down" },
      { label: "TACOS", value: "11.7%", delta: "+1.4 pp", direction: "down" },
    ],
    bars: [71, 76, 68, 79, 72, 65, 61, 67, 58, 55],
    prior: [64, 65, 66, 67, 68, 68, 69, 70, 70, 71],
    action: "Review ad efficiency on SL-CW079-199.",
    impact: "$1,240 monthly impact",
  },
  {
    id: "inventory",
    icon: Boxes,
    label: "Inventory",
    prompt: "What should I order next?",
    title: "Two products need a purchase decision this week.",
    explanation: "The recommendation includes FBA, inbound units, warehouse stock, and supplier lead time.",
    tone: "amber",
    metrics: [
      { label: "SKUs to review", value: "2", delta: "This week", direction: "neutral" },
      { label: "Units suggested", value: "4,860", delta: "Across 2 POs", direction: "neutral" },
      { label: "Lowest cover", value: "24 days", delta: "Lead time 31d", direction: "down" },
    ],
    bars: [88, 82, 76, 69, 62, 55, 49, 43, 36, 29],
    prior: [91, 86, 81, 76, 71, 66, 61, 56, 51, 46],
    action: "Review 2,400 units for SL-CW079-199.",
    impact: "Order by Aug 21",
  },
  {
    id: "traffic",
    icon: Users,
    label: "Traffic",
    prompt: "Why did conversion move?",
    title: "Traffic quality changed, not the listing.",
    explanation: "Sessions shifted toward branded mobile traffic while Buy Box percentage stayed stable.",
    tone: "green",
    metrics: [
      { label: "Sessions", value: "68,420", delta: "+14.2%", direction: "up" },
      { label: "Conversion", value: "15.8%", delta: "+0.2 pp", direction: "up" },
      { label: "Buy Box", value: "98.4%", delta: "Stable", direction: "neutral" },
    ],
    bars: [47, 51, 48, 57, 54, 63, 61, 70, 73, 82],
    prior: [44, 46, 49, 51, 53, 55, 57, 59, 61, 63],
    action: "Compare branded mobile traffic by SKU.",
    impact: "+8.7K sessions",
  },
] as const;

export function InteractiveProductTour() {
  const [activeId, setActiveId] = useState<(typeof tourItems)[number]["id"]>("sales");
  const active = tourItems.find((item) => item.id === activeId) ?? tourItems[0];

  function selectView(id: (typeof tourItems)[number]["id"]) {
    setActiveId(id);
    track("product_tour_viewed", { view: id });
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? tourItems.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tourItems.length) % tourItems.length;
    const next = tourItems[nextIndex];
    selectView(next.id);
    document.getElementById(`tour-tab-${next.id}`)?.focus();
  }

  return (
    <div className="product-tour" data-tone={active.tone} aria-label="Interactive SellerIQ product walkthrough">
      <div className="tour-topbar">
        <div className="tour-brand"><span className="tour-brand-dot" />SellerIQ workspace</div>
        <div className="tour-freshness"><span />Data through Aug 16</div>
      </div>

      <div className="tour-body">
        <aside className="tour-sidebar" aria-label="Choose a SellerIQ view">
          <div className="tour-hint"><MousePointer2 />Choose a question</div>
          <div role="tablist" aria-label="SellerIQ product views">
            {tourItems.map((item, index) => {
              const Icon = item.icon;
              const selected = item.id === active.id;
              return (
                <button
                  key={item.id}
                  id={`tour-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`tour-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={selected ? "tour-tab is-active" : "tour-tab"}
                  onClick={() => selectView(item.id)}
                  onKeyDown={(event) => moveTab(event, index)}
                >
                  <span><Icon /></span>
                  <span><b>{item.label}</b><small>{item.prompt}</small></span>
                  <ArrowUpRight className="tour-tab-arrow" />
                </button>
              );
            })}
          </div>
        </aside>

        <div
          key={active.id}
          id={`tour-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tour-tab-${active.id}`}
          aria-live="polite"
          className="tour-panel tour-panel-enter"
        >
          <div className="tour-panel-heading">
            <div><small>{active.label} overview</small><h2>{active.prompt}</h2></div>
            <span>Last 30 days</span>
          </div>

          <div className="tour-metrics">
            {active.metrics.map((metric) => (
              <article key={metric.label}>
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
                <span className={`tour-delta ${metric.direction}`}>
                  {metric.direction === "up" ? <TrendingUp /> : metric.direction === "down" ? <TrendingDown /> : null}
                  {metric.delta}
                </span>
              </article>
            ))}
          </div>

          <div className="tour-analysis-grid">
            <article className="tour-chart-card">
              <div className="tour-card-heading"><div><small>PERFORMANCE</small><b>Current vs prior period</b></div><div className="tour-legend"><span>Current</span><span>Prior</span></div></div>
              <div className="tour-chart" aria-label={`${active.label} current and prior period chart`}>
                {active.bars.map((height, index) => (
                  <div className="tour-bar-group" key={`${active.id}-${index}`}>
                    <span className="tour-bar prior" style={{ height: `${active.prior[index]}%` }} />
                    <span className="tour-bar current" style={{ height: `${height}%`, animationDelay: `${index * 35}ms` }} />
                  </div>
                ))}
              </div>
            </article>

            <article className="tour-explanation-card">
              <span className="tour-answer-label">WHAT CHANGED?</span>
              <h3>{active.title}</h3>
              <p>{active.explanation}</p>
              <div className="tour-action">
                <span><ArrowUpRight /></span>
                <div><small>REVIEW NEXT</small><b>{active.action}</b><em>{active.impact}</em></div>
              </div>
            </article>
          </div>

          <p className="tour-disclosure">Illustrative data. The interaction reflects current beta workflows.</p>
        </div>
      </div>
    </div>
  );
}
