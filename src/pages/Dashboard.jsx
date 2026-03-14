import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import DiagnosisChart from "../components/DiagnosisChart";
import VitalsCard from "../components/VitalsCard";
import PatientProfile from "../components/PatientProfile";
import DiagnosticTable from "../components/DiagnosticTable";
import LabResultsPanel from "../components/LabResultsPanel";
import usePatientData from "../hooks/usePatientData";
import { useState } from "react";

function Dashboard() {
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const { patients, selectedPatientName, loading, error, dashboardData } =
    usePatientData(selectedPatientIndex);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f7f8]">
        Loading dashboard...
      </main>
    );
  }

  if (error || !dashboardData) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f6f7f8] text-red-600">
        {error || "No data found"}
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f6f7f8] p-3 sm:p-4 lg:h-screen lg:overflow-hidden lg:p-5">
      <div className="mx-auto flex min-h-full w-full max-w-400 flex-col gap-3 lg:h-full lg:gap-4 lg:overflow-hidden">
        <TopNavbar />

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:gap-4 xl:grid-cols-[320px_minmax(0,1fr)_320px]">
          <div className="min-h-0 xl:block">
            <Sidebar
              patients={patients}
              selectedPatientName={selectedPatientName}
              onPatientSelect={setSelectedPatientIndex}
            />
          </div>

          <div className="dashboard-scrollbar min-h-0 space-y-3 lg:space-y-4 lg:overflow-y-auto lg:pr-1">
            <DiagnosisChart
              chartData={dashboardData.chartData}
              bpSummary={dashboardData.bpSummary}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4 2xl:grid-cols-3">
              {dashboardData.vitals.map((vital) => (
                <VitalsCard
                  key={vital.id}
                  title={vital.title}
                  value={vital.value}
                  unit={vital.unit}
                  status={vital.status}
                  iconPath={vital.iconPath}
                  tone={vital.tone}
                />
              ))}
            </div>

            <DiagnosticTable items={dashboardData.diagnosticList} />
          </div>

          <div className="dashboard-scrollbar min-h-0 space-y-3 lg:space-y-4 lg:overflow-y-auto lg:pr-1">
            <PatientProfile profile={dashboardData.profile} />
            <LabResultsPanel results={dashboardData.labResults} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
