import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Gauge,
  GitBranch,
  Layers3,
  MapPin,
  Menu,
  Network,
  Play,
  Route,
  ShieldCheck,
  Sparkles,
  TrainFront,
  TriangleAlert,
  Users,
  Workflow,
  X,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Documentation", href: "#documentation" },
  { label: "Lean canvas", href: "#lean-canvas" },
];

const plannerTabs = [
  { label: "Today", value: "today" },
  { label: "This week", value: "week" },
  { label: "Strategic", value: "strategic" },
] as const;

type PlannerTab = (typeof plannerTabs)[number]["value"];

const taskRows = [
  { code: "TRK-001", type: "Track repair", owner: "Track", score: 96, tone: "critical" },
  { code: "SIG-042", type: "Signal inspection", owner: "Signal", score: 91, tone: "critical" },
  { code: "OHE-088", type: "Insulator maintenance", owner: "Traction", score: 82, tone: "watch" },
];

const architectureSteps = [
  {
    number: "01",
    title: "Unify the signal",
    copy: "TMS, SMMS, TDMS, COA and BDMS records become one operational picture — mapped to the same section, asset and time window.",
    icon: Network,
    accent: "teal",
  },
  {
    number: "02",
    title: "Rank what matters",
    copy: "A transparent risk and priority layer surfaces critical work using safety, failure risk, urgency, overdue days and operational impact.",
    icon: BrainCircuit,
    accent: "amber",
  },
  {
    number: "03",
    title: "Solve the safe window",
    copy: "CP-SAT scheduling groups compatible tasks and protects train headways, resources, isolation rules and the human approval step.",
    icon: ShieldCheck,
    accent: "blue",
  },
];

const documentationSections = [
  {
    number: "01",
    title: "The problem and scope",
    icon: CircleAlert,
    accent: "red",
    lead: "Railway maintenance is distributed across departments, but a railway section is shared by every train and every maintenance team.",
    points: ["TMS, SMMS and TDMS each describe a different part of infrastructure health.", "COA / NTES contributes schedules, live movement, dwell, line-clear and traffic forecasts.", "RailSync is a decision-support prototype — it recommends plans but never controls signalling, points or traction power."],
  },
  {
    number: "02",
    title: "The unified data model",
    icon: Layers3,
    accent: "teal",
    lead: "The database turns disconnected feeds into relationships that a planner can act on.",
    points: ["Stations connect to railway sections; sections contain assets, movements, forecasts and plans.", "Assets produce defects, defects produce maintenance tasks, and tasks can join a block through the plan-task bridge.", "Asset dependencies encode the compatibility matrix used to find a shadow block."],
  },
  {
    number: "03",
    title: "AI risk and priority",
    icon: BrainCircuit,
    accent: "amber",
    lead: "The AI layer ranks urgency; it does not make a safety or scheduling decision.",
    points: ["Risk features include age, tonnage, inspection history, defect severity, overdue days and failure history.", "Priority combines safety criticality, failure risk, urgency, overdue factor, operational impact and asset criticality.", "Scores are configurable, bounded from 0–100 and explainable through top feature attributions."],
  },
  {
    number: "04",
    title: "Constraint optimization",
    icon: Workflow,
    accent: "blue",
    lead: "CP-SAT searches for the best feasible window after priority has prepared the work queue.",
    points: ["Hard constraints protect train-maintenance exclusion, resource availability, task compatibility and requested windows.", "Soft objectives reduce total block time, train disruption, block count and deferred critical work.", "A bounded solver can fall back to ALNS so a feasible plan remains available under pressure."],
  },
  {
    number: "05",
    title: "Safety and accountability",
    icon: ShieldCheck,
    accent: "teal",
    lead: "The final plan must pass deterministic checks and remain understandable to the accountable operator.",
    points: ["SCV validates headways, OHE isolation, clamping / padlocking, DTS requirements and compatibility before release.", "Stale feeds beyond 15 minutes are marked Stale / Unconfirmed and handled conservatively.", "Approval, overrides, private-number confirmations and outcomes are retained in an append-only audit log."],
  },
  {
    number: "06",
    title: "Planning horizons",
    icon: CalendarDays,
    accent: "amber",
    lead: "The same model supports immediate response and strategic maintenance planning.",
    points: ["Emergency: 0–24 hours, prioritizing the earliest safe opportunity for a critical defect.", "Weekly: 1–7 days, balancing overdue work, traffic troughs and available teams.", "Strategic: 1–26 weeks, using forecasts and section health to stage work before it becomes disruptive."],
  },
];

const canvasItems = [
  { key: "Problem", value: "Track, Signal and Traction teams plan in silos. That creates duplicate blocks, high-traffic conflicts, asset downtime and overdue work. The cost is operational disruption, not only engineering effort." },
  { key: "Solution", value: "RailSync unifies defects, assets, train movements and block requests, then groups compatible tasks into one explainable, train-aware work window." },
  { key: "Unique Value Prop.", value: "AI decides what is important. Deterministic optimization decides when it is safe. Every recommendation carries a reason and stays under human statutory authority." },
  { key: "Existing Alternate", value: "Siloed TMS / SMMS / TDMS planning, spreadsheets, phone calls and manual coordination by Section Controllers. These tools hold data, but do not solve the shared window." },
  { key: "Cost Structure", value: "A modular monolith, PostgreSQL, open-source OR-Tools, cloud or on-prem deployment, feed integration, domain validation and ongoing safety workflow support." },
  { key: "Key Metrics", value: "Blocks avoided, blocked minutes, critical task coverage, maintenance completion, train disruption score, coordination gain and asset availability." },
  { key: "Unfair Advantage", value: "A railway-specific shadow-block workflow that makes cross-department compatibility, hard constraints, explainability and physical confirmation visible in one place." },
  { key: "Revenue Streams", value: "Division pilot and implementation, annual platform license, data-feed integration services, planning optimization modules and statutory workflow extensions." },
  { key: "Users", value: "Section Controllers need fast decisions; Track / Signal / TRD engineers need coordination; DRM / Sr. DOM need KPIs; administrators need configuration and feed health." },
];

const horizonContent: Record<PlannerTab, { label: string; title: string; detail: string; start: string; end: string; duration: string; tag: string }> = {
  today: {
    label: "Emergency plan",
    title: "Critical defect → safe window",
    detail: "A high-severity rail defect is grouped with two compatible maintenance tasks after the passenger path clears.",
    start: "02:30",
    end: "04:30",
    duration: "2h",
    tag: "PRIORITY 96",
  },
  week: {
    label: "Weekly plan",
    title: "15 tasks, 6 coordinated blocks",
    detail: "The week view protects peak traffic and sequences overdue work around available teams and rolling stock access.",
    start: "Tue 02:00",
    end: "Tue 06:00",
    duration: "4h",
    tag: "COVERAGE 94%",
  },
  strategic: {
    label: "Strategic plan",
    title: "26-week maintenance outlook",
    detail: "Long-range priorities are staged by section health, traffic forecasts and the availability of specialist resources.",
    start: "Wk 04",
    end: "Wk 09",
    duration: "6 wks",
    tag: "STABILITY +18%",
  },
};

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-teal-400 text-slate-950 shadow-[0_0_24px_rgba(45,212,191,0.3)]">
        <Route className="h-5 w-5" strokeWidth={2.5} />
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-amber-300" />
      </div>
      <div>
        <div className="font-display text-sm font-bold tracking-[0.18em] text-white">RAILSYNC</div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">Documentation hub</div>
      </div>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
      <span className="h-px w-7 bg-teal-400/70" />
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, value, label, change, tone = "teal" }: { icon: typeof Gauge; value: string; label: string; change: string; tone?: "teal" | "amber" | "blue" }) {
  const tones = {
    teal: "bg-teal-400/10 text-teal-300 border-teal-300/10",
    amber: "bg-amber-300/10 text-amber-200 border-amber-300/10",
    blue: "bg-sky-300/10 text-sky-200 border-sky-300/10",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-teal-300"><ArrowUpRight className="h-3 w-3" />{change}</span>
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{label}</div>
    </div>
  );
}

function PlannerPreview() {
  const [activeTab, setActiveTab] = useState<PlannerTab>("today");
  const [isWhatIf, setIsWhatIf] = useState(false);
  const content = horizonContent[activeTab];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1726] shadow-2xl shadow-slate-950/40">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-teal-400/[0.08] to-transparent" />
      <div className="relative border-b border-white/[0.08] px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-teal-300"><Gauge className="h-4 w-4" /></div>
            <div>
              <div className="text-xs font-semibold text-white">AI block planner</div>
              <div className="text-[10px] text-slate-500">SEC-001 · NDLS — GZB</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" /> Live model</div>
        </div>
        <div className="mt-5 flex gap-1 rounded-xl bg-black/20 p-1">
          {plannerTabs.map((tab) => (
            <button key={tab.value} onClick={() => { setActiveTab(tab.value); setIsWhatIf(false); }} className={`flex-1 rounded-lg px-3 py-2 text-[11px] font-semibold transition ${activeTab === tab.value ? "bg-white/[0.1] text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative p-5 sm:p-7">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300"><CircleAlert className="h-3.5 w-3.5" /> {isWhatIf ? "Scenario re-plan" : content.label}</div>
            <h3 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{isWhatIf ? "Freight path inserted at 03:00" : content.title}</h3>
            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-400">{isWhatIf ? "The planner moved the OHE task outside the freight occupancy window while preserving the critical track repair." : content.detail}</p>
          </div>
          <div className="hidden text-right sm:block"><div className="font-display text-2xl font-bold text-white">{isWhatIf ? "03:20" : content.start}</div><div className="text-[10px] uppercase tracking-widest text-slate-500">Recommended start</div></div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#09121f]">
          <div className="grid grid-cols-[92px_1fr] border-b border-white/[0.07] text-[9px] uppercase tracking-widest text-slate-600 sm:grid-cols-[128px_1fr]">
            <div className="border-r border-white/[0.07] px-3 py-3">Asset / team</div>
            <div className="relative flex justify-between px-3 py-3"><span>00:00</span><span>02:00</span><span>04:00</span><span>06:00</span></div>
          </div>
          {[
            { name: "Track", code: "TRK-001", color: "bg-teal-300", left: "39%", width: "35%" },
            { name: "Signal", code: "SIG-042", color: "bg-amber-300", left: "39%", width: "18%" },
            { name: "Traction", code: "OHE-088", color: "bg-sky-300", left: isWhatIf ? "56%" : "39%", width: "27%" },
            { name: "Passenger", code: "12951", color: "bg-slate-600", left: "24%", width: "8%" },
          ].map((row) => (
            <div key={row.name} className="grid grid-cols-[92px_1fr] border-b border-white/[0.05] last:border-b-0 sm:grid-cols-[128px_1fr]">
              <div className="border-r border-white/[0.07] px-3 py-3"><div className="text-[11px] font-semibold text-slate-300">{row.name}</div><div className="mt-0.5 text-[9px] text-slate-600">{row.code}</div></div>
              <div className="relative min-h-[53px] bg-[linear-gradient(90deg,transparent_24.8%,rgba(255,255,255,0.045)_25%,transparent_25.2%,transparent_49.8%,rgba(255,255,255,0.045)_50%,transparent_50.2%,transparent_74.8%,rgba(255,255,255,0.045)_75%,transparent_75.2%)]">
                <div className={`absolute top-3 h-7 rounded-md ${row.color} ${row.name === "Passenger" ? "opacity-45" : "opacity-90"}`} style={{ left: row.left, width: row.width }}><span className="absolute inset-0 flex items-center truncate px-2 text-[9px] font-bold uppercase tracking-wide text-slate-950">{row.name === "Passenger" ? "TRAIN" : row.name}</span></div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-teal-300/10 bg-teal-300/[0.06] px-3 py-3 text-[10px] sm:px-4"><span className="flex items-center gap-2 font-bold uppercase tracking-widest text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Unified shadow block</span><span className="font-semibold text-teal-300">{isWhatIf ? "03:20 — 05:20" : `${content.start} — ${content.end}`}</span></div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Recommendation logic</span><span className="rounded-full bg-teal-300/10 px-2 py-1 text-[9px] font-bold text-teal-300">{isWhatIf ? "RE-OPTIMIZED" : content.tag}</span></div><div className="grid gap-2 sm:grid-cols-3">{["Low traffic trough", "No train conflict", "3 tasks grouped"].map((item) => <div key={item} className="flex items-center gap-2 text-[11px] text-slate-300"><Check className="h-3.5 w-3.5 shrink-0 text-teal-300" />{item}</div>)}</div></div>
          <button onClick={() => setIsWhatIf((value) => !value)} className="group flex items-center justify-center gap-2 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-3 text-xs font-bold text-amber-200 transition hover:border-amber-300/40 hover:bg-amber-300/15"><Sparkles className="h-4 w-4" /> {isWhatIf ? "Reset scenario" : "Run what-if"}<ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111d] text-slate-100 selection:bg-teal-300 selection:text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#07111d]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" aria-label="RailSync Documentation home"><BrandMark /></a>
          <nav className="hidden items-center gap-8 md:flex">{navItems.map((item) => <a key={item.href} href={item.href} className="text-xs font-semibold text-slate-400 transition hover:text-white">{item.label}</a>)}</nav>
          <a href="#lean-canvas" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white transition hover:border-teal-300/30 hover:bg-teal-300/10 sm:flex">Read the canvas <ArrowUpRight className="h-3.5 w-3.5 text-teal-300" /></a>
          <button onClick={() => setMobileMenuOpen((value) => !value)} className="rounded-lg p-2 text-slate-300 md:hidden" aria-label="Toggle navigation">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {mobileMenuOpen && <nav className="border-t border-white/[0.06] bg-[#07111d] px-5 py-4 md:hidden">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block border-b border-white/[0.06] py-3 text-sm font-semibold text-slate-300 last:border-0">{item.label}</a>)}</nav>}
      </header>

      <main id="top">
        <section className="relative isolate overflow-hidden pt-32 sm:pt-40" id="overview">
          <div className="absolute inset-0 -z-10 bg-grid opacity-70" />
          <div className="absolute left-1/2 top-0 -z-10 h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/[0.08] blur-[140px]" />
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
              <div className="max-w-2xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-300/20 bg-teal-300/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-200"><span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> SIH 2026 · Decision support prototype</div>
                <h1 className="font-display text-[clamp(3.2rem,7vw,6.6rem)] font-bold leading-[0.92] tracking-[-0.065em] text-white">More work.<br /><span className="text-teal-300">Fewer blocks.</span></h1>
                <p className="mt-7 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">RailSync Documentation turns a complex SIH system design into a clear story: what the railway problem is, how the architecture solves it, and why the lean canvas makes the idea viable.</p>
                <div className="mt-9 flex flex-wrap items-center gap-3"><a href="#how-it-works" className="group inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3.5 text-xs font-extrabold text-slate-950 transition hover:bg-teal-200">See how it works <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a><a href="#lean-canvas" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-xs font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.05]">Explore the idea <ChevronRight className="h-4 w-4 text-slate-500" /></a></div>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-slate-500"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-300" /> Human-in-the-loop</span><span className="flex items-center gap-2"><GitBranch className="h-4 w-4 text-amber-300" /> Constraint-optimized</span><span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-sky-300" /> Explainable by design</span></div>
              </div>
              <div className="lg:pt-5"><PlannerPreview /></div>
            </div>
          </div>
          <div className="mx-auto mt-20 max-w-7xl border-t border-white/[0.07] px-5 sm:px-8 lg:px-10"><div className="grid grid-cols-2 divide-x divide-white/[0.07] sm:grid-cols-4"><StatCard icon={Layers3} value="3 → 1" label="coordinated blocks" change="−66%" /><StatCard icon={Clock3} value="2h" label="combined work window" change="−55.6%" tone="amber" /><StatCard icon={TrainFront} value="LOW" label="train impact score" change="safe" tone="blue" /><StatCard icon={Gauge} value="94.7%" label="asset availability" change="+8.4%" /></div></div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-36" id="how-it-works">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20"><div><SectionEyebrow>One connected decision chain</SectionEyebrow><h2 className="max-w-md font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">AI ranks the work.<br /><span className="text-slate-500">Optimization finds the window.</span></h2><p className="mt-6 max-w-md text-sm leading-6 text-slate-400">Railway maintenance is not just a prediction problem. It is a coordination problem. RailSync keeps the intelligence transparent and the safety decisions deterministic.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold text-teal-300"><div className="flex -space-x-2"><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#07111d] bg-teal-300 text-[10px] text-slate-950">AI</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#07111d] bg-amber-300 text-[10px] text-slate-950">CP</span><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#07111d] bg-sky-300 text-[10px] text-slate-950">SC</span></div><span>Three layers. One accountable plan.</span></div></div><div className="grid gap-4 sm:grid-cols-3">{architectureSteps.map((step) => { const Icon = step.icon; return <div key={step.number} className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05]"><div className="mb-12 flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.accent === "teal" ? "bg-teal-300/10 text-teal-300" : step.accent === "amber" ? "bg-amber-300/10 text-amber-200" : "bg-sky-300/10 text-sky-200"}`}><Icon className="h-5 w-5" /></div><span className="font-display text-xs font-bold text-slate-600">{step.number}</span></div><h3 className="font-display text-lg font-bold text-white">{step.title}</h3><p className="mt-3 text-xs leading-5 text-slate-500">{step.copy}</p><div className="mt-6 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 transition group-hover:text-teal-300">Explore layer <ArrowUpRight className="h-3 w-3" /></div></div>})}</div></div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#091522]" id="documentation">
          <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-36">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
              <div><SectionEyebrow>RailSync Documentation</SectionEyebrow><h2 className="max-w-xl font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">The complete system,<br /><span className="text-slate-500">explained plainly.</span></h2></div>
              <p className="max-w-2xl text-sm leading-6 text-slate-400">The source documents describe more than an AI dashboard. They define a safe decision chain from infrastructure condition to maintenance priority, available train window, coordinated block, physical confirmation and measured asset availability. This is the short version of that full technical story.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{documentationSections.map((section) => { const Icon = section.icon; const accent = section.accent === "red" ? "text-red-300 bg-red-300/10" : section.accent === "amber" ? "text-amber-200 bg-amber-300/10" : section.accent === "blue" ? "text-sky-200 bg-sky-300/10" : "text-teal-300 bg-teal-300/10"; return <article key={section.number} className="group rounded-3xl border border-white/[0.08] bg-[#0b1726]/70 p-6 transition hover:-translate-y-1 hover:border-white/[0.16] hover:bg-[#0d1b2d]"><div className="mb-8 flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}><Icon className="h-5 w-5" /></div><span className="font-display text-xs font-bold text-slate-600">{section.number}</span></div><h3 className="font-display text-lg font-bold text-white">{section.title}</h3><p className="mt-3 text-xs leading-5 text-slate-400">{section.lead}</p><ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-2 text-[11px] leading-5 text-slate-500"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-300" />{point}</li>)}</ul></article>; })}</div>
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-3xl border border-teal-300/15 bg-teal-300/[0.05] p-6 sm:p-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-300/10 text-teal-300"><Route className="h-4 w-4" /></div><h3 className="font-display text-lg font-bold text-white">How the pieces connect</h3></div><div className="mt-7 grid gap-3 sm:grid-cols-5">{["Condition", "Priority", "Traffic", "Block", "Availability"].map((item, index) => <div key={item} className="flex items-center gap-3 sm:block"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-300/25 bg-teal-300/10 text-xs font-bold text-teal-200">0{index + 1}</div><div className="mt-2 text-xs font-bold text-slate-300">{item}</div>{index < 4 && <ChevronRight className="ml-auto h-4 w-4 text-teal-300/50 sm:hidden" />}</div>)}</div><p className="mt-6 max-w-2xl text-xs leading-5 text-slate-400">A defect changes the risk picture. Priority changes the queue. Traffic changes the feasible windows. The optimizer groups the work without violating hard constraints. The dashboard turns that plan into an accountable operational decision.</p></div><div className="rounded-3xl border border-amber-300/15 bg-amber-300/[0.05] p-6 sm:p-8"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><TriangleAlert className="h-4 w-4" /></div><h3 className="font-display text-lg font-bold text-white">Prototype boundary</h3></div><p className="mt-5 text-xs leading-5 text-slate-400">Synthetic data demonstrates the workflow; it does not prove real-world predictive accuracy. Any production deployment still requires railway rule validation, real historical data, feed integration and human approval procedures.</p><div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-200"><ShieldCheck className="h-3.5 w-3.5" /> Decision support only</div></div></div>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#091522]" id="signal">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-32"><div><SectionEyebrow>Designed for real decisions</SectionEyebrow><h2 className="max-w-xl font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">Every recommendation comes with a reason.</h2><p className="mt-6 max-w-xl text-sm leading-6 text-slate-400">Section Controllers should never have to trust a black box. RailSync shows the trade-offs behind every selected or rejected window, then leaves the final authority with the people accountable for the railway.</p><div className="mt-9 grid max-w-xl gap-4 sm:grid-cols-2">{["Critical defect surfaced", "Low traffic trough identified", "Passenger path protected", "Three teams coordinated", "Fallback plan available", "Decision immutably logged"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-300"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-300/10 text-teal-300"><Check className="h-3.5 w-3.5" /></span>{item}</div>)}</div></div><div className="relative"><div className="absolute -inset-8 rounded-full bg-teal-300/[0.06] blur-3xl" /><div className="relative rounded-[28px] border border-white/10 bg-[#0b1726] p-5 shadow-2xl shadow-slate-950/50 sm:p-7"><div className="flex items-center justify-between border-b border-white/[0.08] pb-5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-300/10 text-teal-300"><Sparkles className="h-4 w-4" /></div><div><div className="text-xs font-bold text-white">Why this block?</div><div className="text-[10px] text-slate-500">PLAN-001 · Explainability log</div></div></div><div className="rounded-full bg-teal-300/10 px-3 py-1 text-[10px] font-bold text-teal-300">94.2 score</div></div><div className="mt-6 space-y-5">{[{ label: "Maintenance value", value: 88, color: "bg-teal-300" }, { label: "Low train disruption", value: 76, color: "bg-sky-300" }, { label: "Task grouping gain", value: 92, color: "bg-amber-300" }].map((item) => <div key={item.label}><div className="mb-2 flex justify-between text-[11px] font-semibold"><span className="text-slate-300">{item.label}</span><span className="text-slate-500">{item.value}%</span></div><div className="h-2 rounded-full bg-white/[0.07]"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} /></div></div>)}</div><div className="mt-7 rounded-2xl border border-teal-300/15 bg-teal-300/[0.06] p-4"><div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-teal-300"><ShieldCheck className="h-3.5 w-3.5" /> Safety validator passed</div><p className="text-xs leading-5 text-slate-300">"Selected 02:30–04:30 because it avoids train 12951, fits the requested duration and groups compatible track, signal and OHE tasks."</p></div></div></div></div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-10 lg:py-36" id="lean-canvas"><div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionEyebrow>Lean canvas</SectionEyebrow><h2 className="max-w-xl font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">A practical idea,<br /><span className="text-slate-500">built for the network.</span></h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">The product, audience and business model in one operational snapshot.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{canvasItems.map((item, index) => <div key={item.key} className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 ${index === 0 ? "border-red-300/15 bg-red-300/[0.05]" : index === 1 ? "border-teal-300/15 bg-teal-300/[0.05]" : index === 2 ? "border-amber-300/15 bg-amber-300/[0.05]" : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.14]"}`}><div className="mb-4 flex items-center justify-between"><span className="text-xs font-bold text-white">{item.key}</span><span className="font-display text-[10px] font-bold text-slate-600">0{index + 1}</span></div><p className="text-xs leading-5 text-slate-400">{item.value}</p></div>)}</div></section>

        <section className="border-t border-white/[0.06] bg-[#091522]" id="demo"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><SectionEyebrow>Five-minute demo story</SectionEyebrow><h2 className="max-w-md font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">From critical defect to coordinated block.</h2><p className="mt-6 max-w-md text-sm leading-6 text-slate-400">One section. Three departments. A real operational trade-off made visible in seconds.</p><div className="mt-8 flex items-center gap-3 text-xs font-bold text-teal-300"><Play className="h-4 w-4 fill-current" /> Follow the decision chain</div></div><div className="relative"><div className="absolute left-5 top-7 bottom-7 w-px bg-gradient-to-b from-red-300/70 via-amber-300/60 to-teal-300/70" />{[{ icon: TriangleAlert, title: "A critical defect appears", copy: "TRK-001 · rail wear · severity 9/10", color: "text-red-300 bg-red-300/10" }, { icon: BarChart3, title: "Priority becomes visible", copy: "Risk 92 · priority 96 · three compatible tasks", color: "text-amber-200 bg-amber-300/10" }, { icon: CalendarDays, title: "The safe window is solved", copy: "02:30–04:30 · low traffic · no passenger conflict", color: "text-teal-300 bg-teal-300/10" }, { icon: ArrowDownRight, title: "The network gets time back", copy: "3 blocks → 1 · 4.5h → 2h · tasks completed: 3", color: "text-sky-200 bg-sky-300/10" }].map((item, index) => { const Icon = item.icon; return <div key={item.title} className="relative mb-4 flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 last:mb-0 sm:p-5"><div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}><Icon className="h-4 w-4" /></div><div><div className="mb-1 text-sm font-bold text-white">{item.title}</div><div className="text-xs leading-5 text-slate-500">{item.copy}</div></div><span className="ml-auto hidden self-start font-display text-xs font-bold text-slate-600 sm:block">0{index + 1}</span></div>})}</div></div></div></section>

        <section className="relative overflow-hidden" id="cta"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.16),transparent_48%)]" /><div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 lg:py-36"><div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-300 text-slate-950 shadow-[0_0_40px_rgba(45,212,191,0.35)]"><Route className="h-6 w-6" /></div><h2 className="font-display text-4xl font-bold tracking-[-0.05em] text-white sm:text-6xl">The next block can be<br /><span className="text-teal-300">the smarter one.</span></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-slate-400">RailSync Documentation — the technical story behind coordinated, lower-disruption maintenance on Indian Railways.</p><a href="#overview" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3.5 text-xs font-extrabold text-slate-950 transition hover:bg-teal-200">Back to overview <ArrowUpRight className="h-4 w-4" /></a></div></section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#050d17]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><BrandMark /><div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600"><span>SIH 2026</span><span>Decision support prototype</span><span>Human authority retained</span></div><div className="text-[10px] text-slate-600">© 2026 RailSync Documentation</div></div></footer>
    </div>
  );
}
