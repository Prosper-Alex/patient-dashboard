function DiagnosticTable({ items }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="mb-4 text-2xl font-extrabold text-[#072635]">Diagnostic List</h2>

      <div className="dashboard-scrollbar max-h-[220px] overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-[#f6f7f8] text-[11px] text-[#072635]">
            <tr>
              <th className="rounded-l-full px-4 py-3 font-semibold">Problem/Diagnosis</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="rounded-r-full px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-b border-[#f0f2f5] align-top">
                <td className="px-4 py-3 text-xs font-semibold text-[#072635]">{item.name}</td>
                <td className="px-4 py-3 text-xs text-[#072635]">{item.description}</td>
                <td className="px-4 py-3 text-xs text-[#072635]">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DiagnosticTable
