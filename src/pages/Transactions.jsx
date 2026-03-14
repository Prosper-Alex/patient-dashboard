import TopNavbar from "../components/TopNavbar";

const transactions = [
  {
    id: "txn-1",
    date: "Mar 10, 2026",
    patient: "Harper Lane",
    description: "Premium plan renewal",
    amount: "$250.00",
    status: "Paid",
  },
  {
    id: "txn-2",
    date: "Mar 08, 2026",
    patient: "Ethan Reed",
    description: "Telehealth consultation",
    amount: "$110.00",
    status: "Pending",
  },
  {
    id: "txn-3",
    date: "Mar 05, 2026",
    patient: "Jade Morales",
    description: "Diagnostics panel",
    amount: "$320.00",
    status: "Paid",
  },
];

const summary = [
  { label: "Total Collected", value: "$680.00" },
  { label: "Pending", value: "$110.00" },
  { label: "Refunds", value: "$0.00" },
];

function Transactions() {
  return (
    <main className="min-h-screen w-full bg-[#f6f7f8] p-3 sm:p-4 lg:p-5">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4">
        <TopNavbar />

        <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a8a9a]">
                Billing Overview
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#072635] sm:text-3xl">
                Transactions
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#edf2f6] bg-[#f9fbfc] px-4 py-2">
                  <p className="text-[11px] text-[#7a8a9a]">{item.label}</p>
                  <p className="text-sm font-semibold text-[#072635]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-bold text-[#072635]">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#edf2f6] bg-[#f9fbfc] p-4">
                <div>
                  <p className="text-sm font-semibold text-[#072635]">
                    {txn.patient}
                  </p>
                  <p className="text-xs text-[#5c6b79]">{txn.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#072635]">
                    {txn.amount}
                  </p>
                  <p className="text-xs text-[#7a8a9a]">{txn.date}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    txn.status === "Paid"
                      ? "bg-[#e8faf5] text-[#0f766e]"
                      : "bg-[#fff7ed] text-[#b45309]"
                  }`}>
                  {txn.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Transactions;
