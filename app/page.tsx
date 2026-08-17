import {
  AlertTriangle, ArrowRight, BarChart3, Boxes, Check, CheckCircle2, CircleDollarSign,
  FileSpreadsheet, Globe2, LineChart, PackageCheck, Search, ShieldCheck, TrendingDown,
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
    <div className="dashboard-shell" aria-label="Illustration of the SellerIQ Sales Overview">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><Mark /><b>SellerIQ</b></div>
        <small>ANALYTICS</small>
        {nav.map((item, index) => <div className={index === 0 ? "dashboard-nav active" : "dashboard-nav"} key={item}><span />{item}</div>)}
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-heading"><div><b>Sales Overview</b><small>Amazon US + CA · Last 30 days</small></div><span className="range-pill">Last 30 days</span></div>
        <div className="metric-grid">
          <div><small>ORDERED REVENUE</small><b>$184,620</b><span className="positive"><TrendingUp /> 12.4% vs prior period</span></div>
          <div><small>CONTRIBUTION PROFIT</small><b>$38,715</b><span className="positive"><TrendingUp /> 3.1% vs prior period</span></div>
          <div><small>CONTRIBUTION MARGIN</small><b>21.0%</b><span className="negative"><TrendingDown /> 1.9 pp vs prior period</span></div>
        </div>
        <div className="brief-card">
          <div className="brief-copy"><small>WHAT CHANGED?</small><b>Revenue grew, but margin tightened.</b><p>Growth came mainly from three SKUs in the US marketplace. Advertising and Amazon fees absorbed part of the gain.</p><div className="driver-bars"><span style={{ width: "84%" }} /><span style={{ width: "61%" }} /><span style={{ width: "39%" }} /></div></div>
          <div className="action-card"><span><CheckCircle2 /> Recommended action</span><b>Review ad efficiency on SL-CW079-199</b><p>Sales increased, but contribution margin fell 4.2 percentage points.</p><small>Estimated impact: $1,240 / month</small></div>
        </div>
        <small className="illustrative">Illustrative data · Interface reflects the current private beta</small>
      </div>
    </div>
  );
}

const outcomes = [
  { icon: BarChart3, title: "Know what changed", body: "Compare equal periods and see whether revenue moved because of traffic, conversion, selling price, marketplace, or specific SKUs.", detail: "Prior period, prior year, and percentage-point changes where they belong." },
  { icon: CircleDollarSign, title: "Know what is profitable", body: "Bring sales, advertising, Amazon fees, refunds, and landed product cost together at the SKU level.", detail: "Profit views clearly disclose missing or incomplete cost periods." },
  { icon: Warehouse, title: "Know what to reorder", body: "Use days of cover, inbound inventory, supplier lead time, and warehouse stock to plan the next purchase order.", detail: "FBA replenishment and supplier reorder workflows in one operating view." },
];

const workflow = [
  { number: "01", title: "Business outcome", body: "Start with revenue, contribution profit, margin, units, and the health signals that matter." },
  { number: "02", title: "What changed?", body: "See the SKUs, marketplaces, traffic, conversion, and price movements behind the result." },
  { number: "03", title: "What needs action?", body: "Review prioritized exceptions with the evidence and expected impact attached." },
];

const capabilities = [
  { icon: Search, title: "SKU-level diagnostics", body: "Move from the company result to the product that caused it." },
  { icon: Globe2, title: "US + Canada together", body: "Compare marketplaces without losing the local context." },
  { icon: LineChart, title: "Fair comparisons", body: "Equal elapsed periods prevent misleading WTD, MTD, QTD, and YTD deltas." },
  { icon: PackageCheck, title: "Replenishment planning", body: "See cover, inbound units, reorder timing, and suggested quantities." },
  { icon: Boxes, title: "Warehouse-aware ordering", body: "Factor stock across production, transit, FBA, and warehouse uploads." },
  { icon: ShieldCheck, title: "Evidence-first actions", body: "Recommendations explain the signal instead of asking you to trust a black box." },
];

const faqs = [
  ["Who is the private beta for?", "Amazon brand owners and operators who manage meaningful SKU complexity across the US, Canada, or both—and are tired of reconciling decisions across reports and spreadsheets."],
  ["Does SellerIQ make changes in Seller Central?", "No. The current beta is a decision-support product. It does not automatically change listings, prices, advertising, or inventory."],
  ["How does onboarding work today?", "Beta onboarding is guided. We help establish the data inputs and confirm that the numbers reconcile before you rely on the dashboard."],
  ["Is profitability included?", "Yes, when the required advertising, Amazon fee, refund, and landed-cost periods are complete. SellerIQ shows data-completeness warnings instead of presenting an unverified profit number as final."],
  ["What does private beta cost?", "Pricing is still being validated with beta users. Joining the list is free and does not require a credit card or commitment."],
];

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://selleriq-app-git-daily-dev-dillonleepers-projects.vercel.app";
  return (
    <div id="top" className="site-frame">
      <header className="site-header">
        <a href="#top" className="site-logo" aria-label="SellerIQ home"><Mark /><b>SellerIQ</b></a>
        <nav aria-label="Main navigation"><a href="#product">Product</a><a href="#how-it-works">How it works</a><a href="#beta">Private beta</a><a href="#faq">FAQ</a></nav>
        <div className="header-actions">{appUrl ? <a className="login-link" href={appUrl}>Beta login</a> : null}<a className="button button-small" href="#join">Join the beta <ArrowRight /></a></div>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span />Private beta for Amazon operators</span>
              <h1>Know what changed in your Amazon business—and what to do next.</h1>
              <p>SellerIQ brings sales, profitability, traffic, Buy Box, and inventory into one decision-ready view across Amazon US and Canada.</p>
              <WaitlistForm idPrefix="hero" location="hero" compact />
              <p className="form-note">No credit card. No sales spam. Just beta access and occasional product updates.</p>
            </div>
            <div className="hero-proof"><span>Built inside a real Amazon operation</span><span>Amazon US + Canada</span><span>Evidence behind every action</span></div>
          </div>
          <DashboardPreview />
        </section>

        <section className="proof-strip" aria-label="Product principles">
          <div><b>Daily-grain</b><span>seller data</span></div><div><b>SKU-level</b><span>decisions</span></div><div><b>Equal-period</b><span>comparisons</span></div><div><b>Transparent</b><span>data freshness</span></div>
        </section>

        <section id="product" className="section outcomes-section">
          <SectionIntro eyebrow="One operating picture" title="From reporting to a decision." body="SellerIQ is designed around the questions an Amazon operator asks every morning—not around another wall of charts." />
          <div className="outcome-grid">{outcomes.map((item) => <article className="outcome-card" key={item.title}><div className="icon-box"><item.icon /></div><h3>{item.title}</h3><p>{item.body}</p><small><Check />{item.detail}</small></article>)}</div>
        </section>

        <section className="section workflow-section">
          <div className="workflow-copy"><span className="eyebrow light"><span />The daily briefing</span><h2>A hierarchy built for operators, not spectators.</h2><p>The first screen tells you the outcome. The next layer tells you why. The action feed tells you where to focus.</p><a className="inline-link" href="#join">Help shape the beta <ArrowRight /></a></div>
          <div className="workflow-list">{workflow.map((item) => <div key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div>
        </section>

        <section className="section capabilities-section">
          <SectionIntro eyebrow="What is live" title="The connected workflows sellers actually need." body="Sales, profit, traffic, Buy Box, and inventory stay separate enough to be trustworthy—but connected enough to explain the business." />
          <div className="capability-grid">{capabilities.map((item) => <article key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </section>

        <section id="how-it-works" className="section how-section">
          <SectionIntro eyebrow="How it works today" title="Guided onboarding. Clean inputs. Clear decisions." body="The beta is intentionally hands-on while we learn which workflows create the most value for serious Amazon operators." />
          <div className="steps">
            <article><span>1</span><FileSpreadsheet /><h3>Establish the inputs</h3><p>We help bring together the seller, advertising, profitability, and inventory data the beta supports.</p></article>
            <article><span>2</span><ShieldCheck /><h3>Confirm the numbers</h3><p>Freshness and completeness are visible. We reconcile before asking you to act on the output.</p></article>
            <article><span>3</span><BarChart3 /><h3>Run the business</h3><p>Use the overview, product diagnostics, profitability, and replenishment views to decide what happens next.</p></article>
          </div>
        </section>

        <section id="beta" className="section beta-section">
          <div className="beta-heading"><span className="eyebrow"><span />Private-beta transparency</span><h2>Built far enough to use.<br />Early enough to influence.</h2></div>
          <div className="beta-columns">
            <div><h3><CheckCircle2 />Available in the current beta</h3><ul><li>Sales overview and fair period comparisons</li><li>SKU and marketplace contribution drivers</li><li>Traffic, conversion, and Buy Box diagnostics</li><li>Profitability with data-completeness controls</li><li>FBA replenishment and supplier reorder planning</li></ul></div>
            <div><h3><AlertTriangle />What we are still validating</h3><ul><li>The fastest onboarding path for new sellers</li><li>The most useful action ranking and impact estimates</li><li>Which integrations should come next</li><li>Packaging and willingness to pay</li><li>Where automation should—and should not—exist</li></ul></div>
          </div>
        </section>

        <section className="section founder-section">
          <div className="founder-mark"><Mark /></div>
          <blockquote>“SellerIQ started as the operating view we wanted for our own Amazon business: one place that could explain the result, show the evidence, and point to the next decision.”</blockquote>
          <div><b>Built by Amazon operators</b><span>Inside Merkury Innovations</span></div>
        </section>

        <section id="faq" className="section faq-section">
          <SectionIntro eyebrow="Questions, answered" title="A clear beta beats a vague promise." body="What you should know before joining." />
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section id="join" className="final-cta">
          <div className="final-copy"><span className="eyebrow light"><span />Private beta</span><h2>Build the operating system you wish Amazon gave you.</h2><p>Join the waitlist, tell us where your current workflow breaks, and help decide what SellerIQ becomes.</p><div className="cta-assurances"><span><Check />Free to join</span><span><Check />No credit card</span><span><Check />Opt out anytime</span></div></div>
          <div className="signup-panel"><h3>Request private-beta access</h3><p>Start with your email. The rest is optional.</p><WaitlistForm idPrefix="final" location="final" /></div>
        </section>
      </main>

      <footer><div className="footer-brand"><a href="#top" className="site-logo"><Mark /><b>SellerIQ</b></a><p>Decision-ready analytics for Amazon operators.</p></div><div className="footer-links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:dleeper@merkuryinnovations.com">Contact</a></div><small>© {new Date().getFullYear()} Merkury Innovations. SellerIQ is not affiliated with Amazon.</small></footer>
    </div>
  );
}
