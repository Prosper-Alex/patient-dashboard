import TopNavbar from "../components/TopNavbar";

const inbox = [
  {
    id: "msg-1",
    sender: "Nurse Team",
    subject: "Lab results ready for review",
    time: "10:12 AM",
  },
  {
    id: "msg-2",
    sender: "Jade Morales",
    subject: "Follow-up question about medication",
    time: "09:48 AM",
  },
  {
    id: "msg-3",
    sender: "Billing",
    subject: "Prior authorization needed",
    time: "Yesterday",
  },
];

const quickActions = [
  "Send discharge summary",
  "Request imaging report",
  "Message care coordinator",
];

function Messages() {
  return (
    <main className="min-h-screen w-full bg-[#f6f7f8] p-3 sm:p-4 lg:p-5">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4">
        <TopNavbar />

        <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a8a9a]">
              Patient Inbox
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-[#072635] sm:text-3xl">
              Messages
            </h1>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-[#072635]">Recent</h2>
            <div className="mt-4 space-y-3">
              {inbox.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#edf2f6] bg-[#f9fbfc] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#072635]">
                      {item.sender}
                    </p>
                    <span className="text-xs text-[#7a8a9a]">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#5c6b79]">
                    {item.subject}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-bold text-[#072635]">Quick Actions</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#5c6b79]">
              {quickActions.map((item) => (
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

export default Messages;
