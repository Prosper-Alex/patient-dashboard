import TopNavbar from "../components/TopNavbar";

const appointments = [
  {
    id: "apt-1",
    time: "09:30 AM",
    patient: "Jade Morales",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: "apt-2",
    time: "11:00 AM",
    patient: "Ethan Reed",
    type: "New consult",
    status: "Pending",
  },
  {
    id: "apt-3",
    time: "02:15 PM",
    patient: "Harper Lane",
    type: "Lab review",
    status: "Confirmed",
  },
];

const reminders = [
  "Prepare vitals summary for afternoon consults.",
  "Send lab results to Harper Lane.",
  "Review referrals for next week.",
];

function Schedule() {
  return (
    <main className="min-h-screen w-full bg-[#f6f7f8] p-3 sm:p-4 lg:p-5">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4">
        <TopNavbar />

        <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a8a9a]">
                Patient Schedule
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#072635] sm:text-3xl">
                Today&#39;s Appointments
              </h1>
            </div>
            <span className="rounded-full bg-[#e9f8f6] px-3 py-1 text-xs font-semibold text-[#0f766e]">
              3 upcoming
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-[#072635]">Timeline</h2>
            <div className="mt-4 space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#edf2f6] bg-[#f9fbfc] p-4">
                  <div>
                    <p className="text-sm font-semibold text-[#072635]">
                      {apt.time} · {apt.patient}
                    </p>
                    <p className="text-xs text-[#5c6b79]">{apt.type}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      apt.status === "Confirmed"
                        ? "bg-[#e8faf5] text-[#0f766e]"
                        : "bg-[#fff7ed] text-[#b45309]"
                    }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-[#072635]">Reminders</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#5c6b79]">
              {reminders.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-[#edf2f6] bg-[#f9fbfc] px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Schedule;
