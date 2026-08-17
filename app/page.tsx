import {
  AlertTriangle, ArrowRight, BarChart3, Boxes, CheckCircle2, CircleDollarSign,
  FileSpreadsheet, Globe2, LineChart, Search, ShieldCheck, TrendingDown,
  TrendingUp, Warehouse,
} from "lucide-react";
import { WaitlistForm } from "./_components/waitlist-form";

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>;
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="section-intro"><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2><p>{body}</p></div>;
}

function DashboardPreview() {
  const nav = ["Sales Overview", "Product Performance", "Profitability", "Inventory", "Marketplace Compare", "Traffic & Conversion"];
  return (
    <div className="dashboard-shell" aria-label="SellerIQ Sales Overview preview">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><Mark /><b>SellerIQ</b></div>
        <small>ANALYTICS</small>
        {nav.map((item, index) => <div className={index === 0 ? "dashboard-nav active" : "dashboard-nav"} key={item}><span />{item}</div>)}
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-heading"><div><b>Sales Overview</b><small>Amazon US + CA. Last 30 days</small></div><span className="range-pill">Last 30 days</span></div>
        <div className="metric-grid">
          <div><small>ORDERED REVENUE</small><b>$184,620</b><span className="positive"><TrendingUp /> 12.4% vs prior period</span></div>
          <div><small>CONTRIBUTION PROFIT</small><b>$38,715</b><span className="positive"><TrendingUp /> 3.1% vs prior period</span></div>
          <div><small>CONTRIBUTION MARGIN</small><b>21.0%</b><span className="negative"><TrendingDown /> 1.9 pp vs prior period</span></div>
        </div>
        <div className="brief-card">
          <div className="brief-copy"><small>WHAT CHANGED?</small><b>Revenue grew, but margin tightened.</b><p>Growth came mainly from three SKUs in the US marketplace. Advertising and Amazon fees absorbed part of the gain.</p><div className="driver-bars"><span style={{ width: "84%" }} /><span style={{ width: "61%" }} /><span style={{ width: "39%" }} /></div></div>
          <div className="action-card"><span><CheckCircle2 /> Recommended action</span><b>Review ad efficiency on SL-CW079-199</b><p>Sales increased, but contribution margin fell 4.2 percentage points.</p><small>Estimated impact: $1,240 / month</small></div>
        </div>
        <small className="illustrative">Illustrative data. Interface reflects the current beta.</small>
      </div>
    </div>
  );
}

const outcomes = [
  { icon: BarChart3, title: "Explain revenue changes", body: "See which SKUs, marketplaces, traffic, conversion, or price shifts moved revenue." },
  { icon: CircleDollarSign, title: "Protect contribution margin", body: "See when ads, fees, refunds, or product costs turn sales growth into profit decline." },
  { icon: Warehouse, title: "Order inventory with context", body: "Use cover, inbound stock, lead time, and warehouse inventory to set the next purchase quantity." },
];

const workflow = [
  { number: "01", title: "See the result", body: "Start with revenue, contribution profit, margin, and units." },
  { number: "02", title: "Find the cause", body: "Trace the change to the responsible SKUs and operating metrics." },
  { number: "03", title: "Review the action", body: "Focus on the exceptions with the largest estimated impact." },
];

const capabilities = [
  { icon: Search, title: "Find the responsible SKU", body: "Move from the company result to the product that caused it." },
  { icon: Globe2, title: "Separate US and Canada", body: "Compare marketplace performance without mixing local signals." },
  { icon: LineChart, title: "Avoid false comparisons", body: "Compare equal elapsed periods for WTD, MTD, QTD, and YTD." },
  { icon: Boxes, title: "Plan the next order", body: "Factor in FBA, inbound, warehouse stock, lead time, and days of cover." },
];

const faqs = [
  ["Who is the private beta for?", "Amazon brand owners and operators managing multiple SKUs across the US, Canada, or both."],
  ["Does SellerIQ make changes in Seller Central?", "No. SellerIQ supports decisions. It does not change listings, prices, ads, or inventory."],
  ["How does onboarding work?", "We establish the supported data inputs and reconcile the numbers with you before you use the dashboard."],
  ["Is profitability included?", "Yes. Profit appears only when the required ad, fee, refund, and landed-cost periods are complete."],
  ["What does the beta cost?", "Joining is free. We are validating paid pricing with beta users."],
];

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://selleriq-app-git-daily-dev-dillonleepers-projects.vercel.app";
  return (
    <div id="top" className="site-frame">
      <header className="site-header">
        <a href="#top" className="site-logo" aria-label="SellerIQ home"><Mark /><b>SellerIQ</b></a>
        <nav aria-label="Main navigation"><a href="#product">Product</a><a href="#how-it-works">How it works</a><a href="#beta">Private beta</a><a href="#faq">FAQ</a></nav>
        <div className="header-actions">{appUrl ? <a className="login-link" href={appUrl}>Beta login</a> : null}<a className="button button-small" href="#join">Join the private beta <ArrowRight /></a></div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span />Private beta for Amazon operators</span>
              <h1>Know what changed in your Amazon business. See what to do next.</h1>
              <p>SellerIQ helps Amazon operators managing US and Canada find the SKUs driving revenue, margin, and inventory risk.</p>
              <WaitlistForm idPrefix="hero" location="hero" compact />
              <p className="form-note">Join free. No credit card.</p>
            </div>
          </div>
          <DashboardPreview />
        </section>

        <section id="product" className="section outcomes-section">
          <SectionIntro eyebrow="One operating picture" title="Find the cause before you open another report." body="Start with the business result, then trace it to the SKU and metric that moved." />
          <div className="outcome-grid">{outcomes.map((item) => <article className="outcome-card" key={item.title}><div className="icon-box"><item.icon /></div><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section className="section workflow-section">
          <div className="workflow-copy"><span className="eyebrow light"><span />The daily briefing</span><h2>Get from result to action.</h2><p>SellerIQ organizes each review in the order you make decisions.</p></div>
          <div className="workflow-list">{workflow.map((item) => <div key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div>
        </section>

        <section className="section capabilities-section">
          <SectionIntro eyebrow="What is live" title="Make decisions without hiding the inputs." body="Every conclusion stays tied to the source metric and marketplace behind it." />
          <div className="capability-grid">{capabilities.map((item) => <article key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section id="how-it-works" className="section how-section">
          <SectionIntro eyebrow="How it works" title="Start with numbers you can trust." body="Guided onboarding confirms the inputs before you use SellerIQ to make decisions." />
          <div className="steps">
            <article><span>1</span><FileSpreadsheet /><h3>Bring in the inputs</h3><p>Connect the seller, advertising, profitability, and inventory data the beta supports.</p></article>
            <article><span>2</span><ShieldCheck /><h3>Reconcile the periods</h3><p>Confirm freshness and completeness before relying on profit or comparison metrics.</p></article>
            <article><span>3</span><BarChart3 /><h3>Review the decisions</h3><p>Use the overview, diagnostics, and replenishment views to choose the next action.</p></article>
          </div>
        </section>

        <section id="beta" className="section beta-section">
          <div className="beta-heading"><span className="eyebrow"><span />Private beta</span><h2>Use the current product.<br />Help set the priorities.</h2></div>
          <div className="beta-columns">
            <div><h3><CheckCircle2 />Available now</h3><ul><li>Sales overview with fair comparisons</li><li>SKU and marketplace drivers</li><li>Profitability with completeness controls</li><li>Replenishment and reorder planning</li></ul></div>
            <div><h3><AlertTriangle />Still being validated</h3><ul><li>Onboarding speed</li><li>Action ranking and impact estimates</li><li>Additional integrations</li><li>Pricing</li></ul></div>
          </div>
        </section>

        <section className="section founder-section">
          <div className="founder-mark"><Mark /></div>
          <blockquote>“We built SellerIQ to explain the result, show the evidence, and point to the next decision in our own Amazon operation.”</blockquote>
          <div><b>Built by Amazon operators</b><span>Inside Merkury Innovations</span></div>
        </section>

        <section id="faq" className="section faq-section">
          <SectionIntro eyebrow="Private beta details" title="What to expect before you join." body="Current access, onboarding, and pricing in plain terms." />
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section id="join" className="final-cta">
          <div className="final-copy"><span className="eyebrow light"><span />Private beta</span><h2>See if SellerIQ fits your operation.</h2><p>Join the private beta with your work email.</p></div>
          <div className="signup-panel"><h3>Join the private beta</h3><p>Share your email. The follow-up questions are optional.</p><WaitlistForm idPrefix="final" location="final" /></div>
        </section>
      </main>

      <footer><div className="footer-brand"><a href="#top" className="site-logo"><Mark /><b>SellerIQ</b></a><p>Decision-ready analytics for Amazon operators.</p></div><div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:dleeper@merkuryinnovations.com">Contact</a></div><small>© {new Date().getFullYear()} Merkury Innovations. SellerIQ is not affiliated with Amazon.</small></footer>
    </div>
  );
}
