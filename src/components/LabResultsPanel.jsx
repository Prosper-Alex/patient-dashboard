import downloadIcon from "../assets/icons/downloadicon.svg";

function LabResultsPanel({ results }) {
  const normalizeResult = (result) => {
    if (typeof result === "string") {
      return { label: result, url: null };
    }

    if (result && typeof result === "object") {
      return {
        label: result.name || result.title || result.label || "Lab Result",
        url: result.url || result.report_url || result.file_url || null,
      };
    }

    return { label: "Lab Result", url: null };
  };

  const handleDownload = (result) => {
    const { label, url } = normalizeResult(result);

    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    const resultName = label;
    const safeName = resultName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `${safeName || "lab-result"}-${timestamp}.txt`;
    const content = `Lab Result Report\n\nTest: ${resultName}\nGenerated: ${new Date().toLocaleString()}\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    const blobUrl = URL.createObjectURL(blob);

    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <h2 className="mb-3 text-2xl font-extrabold text-[#072635]">
        Lab Results
      </h2>

      {results.length ? (
        <ul className="dashboard-scrollbar max-h-52.5 space-y-1 overflow-y-auto pr-1">
          {results.map((result) => (
            <li
              key={typeof result === "string" ? result : JSON.stringify(result)}
              className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-[#072635] hover:bg-[#f8fafc]">
              <span>{normalizeResult(result).label}</span>
              <button
                type="button"
                className="rounded-md p-1 hover:bg-white"
                onClick={() => handleDownload(result)}
                aria-label={`Download ${normalizeResult(result).label} report`}>
                <img
                  src={downloadIcon}
                  alt="Download report"
                  className="h-4 w-4"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#707070]">No lab results available.</p>
      )}
    </section>
  );
}

export default LabResultsPanel;
