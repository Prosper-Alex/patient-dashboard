import downloadIcon from "../assets/icons/downloadicon.svg";

function LabResultsPanel({ results }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="mb-3 text-2xl font-extrabold text-[#072635]">
        Lab Results
      </h2>

      <ul className="dashboard-scrollbar max-h-52.5 space-y-1 overflow-y-auto pr-1">
        {results.map((result) => (
          <li
            key={result}
            className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-[#072635] hover:bg-[#f8fafc]">
            <span>{result}</span>
            <button type="button" className="rounded-md p-1 hover:bg-white">
              <img
                src={downloadIcon}
                alt="Download report"
                className="h-4 w-4"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LabResultsPanel;
