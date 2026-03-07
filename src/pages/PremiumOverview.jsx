import TopNavbar from "../components/TopNavbar";

const premiumMetrics = [
  { label: "Monthly Revenue", value: "$128,940", delta: "+18.4%" },
  { label: "Active Premium Users", value: "4,762", delta: "+9.1%" },
  { label: "Retention Rate", value: "94.8%", delta: "+2.7%" },
  { label: "Support SLA", value: "99.2%", delta: "+0.8%" },
];

const activityFeed = [
  {
    title: "Enterprise plan upgraded",
    detail: "Helix Medical Group moved to Platinum tier.",
    time: "5m ago",
  },
  {
    title: "Compliance report generated",
    detail: "Q1 privacy and access logs exported.",
    time: "18m ago",
  },
  {
    title: "Automated alerts resolved",
    detail: "3 critical workflow alerts closed by SmartOps.",
    time: "42m ago",
  },
];

const planBreakdown = [
  { name: "Platinum", share: 52, color: "#ff7a18" },
  { name: "Gold", share: 31, color: "#f7b42c" },
  { name: "Silver", share: 17, color: "#2ec4b6" },
];

function PremiumOverview() {
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#fff8ef] px-4 py-6 sm:px-6 lg:px-10"
      style={{ fontFamily: "'Space Grotesk', 'Poppins', sans-serif" }}>
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#ff7a18]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-60px] bottom-[-60px] h-80 w-80 rounded-full bg-[#2ec4b6]/20 blur-3xl" />

      <div className="premium-fade-up mx-auto mb-5 w-full max-w-7xl">
        <TopNavbar />
      </div>

      <section className="premium-fade-up mx-auto w-full max-w-7xl rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(30,35,90,0.12)] backdrop-blur sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#9a7f69] uppercase">
              Premium Intelligence
            </p>
            <h1 className="mt-1 text-3xl font-bold text-[#1f2a44] sm:text-4xl">
              Executive Overview
            </h1>
          </div>
          <a
            href="/"
            className="rounded-full bg-[#1f2a44] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2b3b5f]">
            Open Dashboard
          </a>
        </div>
      </section>

      <section className="mx-auto mt-5 grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {premiumMetrics.map((metric, index) => (
          <article
            key={metric.label}
            className="premium-fade-up rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_14px_40px_rgba(23,40,87,0.10)]"
            style={{ animationDelay: `${index * 80}ms` }}>
            <p className="text-sm text-[#6d7386]">{metric.label}</p>
            <p className="mt-3 text-3xl font-bold text-[#1f2a44]">{metric.value}</p>
            <p className="mt-2 text-sm font-semibold text-[#ff7a18]">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-5 grid w-full max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="premium-fade-up rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_14px_40px_rgba(23,40,87,0.10)]">
          <h2 className="text-xl font-bold text-[#1f2a44]">Premium Plan Mix</h2>
          <p className="mt-1 text-sm text-[#6d7386]">
            Distribution of premium subscriptions this cycle.
          </p>
          <div className="mt-5 space-y-4">
            {planBreakdown.map((plan) => (
              <div key={plan.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#1f2a44]">{plan.name}</span>
                  <span className="text-[#6d7386]">{plan.share}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-[#f3ede6]">
                  <div
                    className="h-2.5 rounded-full transition-[width] duration-700"
                    style={{ width: `${plan.share}%`, backgroundColor: plan.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article
          className="premium-fade-up rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_14px_40px_rgba(23,40,87,0.10)]"
          style={{ animationDelay: "120ms" }}>
          <h2 className="text-xl font-bold text-[#1f2a44]">Live Activity</h2>
          <div className="mt-4 space-y-3">
            {activityFeed.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-[#efe3d8] bg-[#fffaf4] p-3">
                <p className="text-sm font-semibold text-[#1f2a44]">{item.title}</p>
                <p className="mt-1 text-xs text-[#6d7386]">{item.detail}</p>
                <p className="mt-2 text-[11px] font-semibold tracking-wide text-[#ff7a18] uppercase">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default PremiumOverview;
