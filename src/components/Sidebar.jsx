import { useMemo, useState } from "react";
import searchIcon from "../assets/icons/searchicon.svg";
import horizontalDotIcon from "../assets/icons/horizontaldot.svg";
import downBoldIcon from "../assets/icons/downbold.svg";
import upBoldIcon from "../assets/icons/upbold.svg";

function Sidebar({
  patients,
  selectedPatientName,
  onPatientSelect,
  collapsed = false,
  onToggleCollapse,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredPatients = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return patients
      .map((patient, index) => ({ patient, index }))
      .filter(({ patient }) => {
        if (!normalized) {
          return true;
        }

        return (
          patient.name.toLowerCase().includes(normalized) ||
          patient.gender.toLowerCase().includes(normalized) ||
          String(patient.age).includes(normalized)
        );
      });
  }, [patients, searchTerm]);

  const selectedPatient = useMemo(
    () => patients.find((patient) => patient.name === selectedPatientName) ?? patients[0],
    [patients, selectedPatientName]
  );

  return (
    <aside
      className={`flex h-full min-h-0 flex-col rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 ${
        collapsed ? "p-2" : "p-4"
      }`}>
      <div
        className={`mb-3 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}>
        {!collapsed ? <h2 className="text-2xl font-extrabold text-[#072635]">Patients</h2> : null}
      </div>

      {selectedPatient ? (
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`mb-3 flex items-center rounded-xl border border-[#e6ebef] hover:bg-[#f8fafc] ${
            collapsed ? "justify-center p-1.5" : "gap-3 px-2.5 py-2"
          }`}
          aria-label={collapsed ? "Expand patient list" : "Collapse patient list"}>
          <img
            src={selectedPatient.profileImage}
            alt={`${selectedPatient.name} profile`}
            className="h-12 w-12 rounded-full object-cover"
            loading="lazy"
          />

          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold text-[#072635]">
                  {selectedPatient.name}
                </p>
                <p className="text-xs text-[#707070]">
                  {selectedPatient.gender}, {selectedPatient.age}
                </p>
              </div>
              <img
                src={upBoldIcon}
                alt=""
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            </>
          ) : (
            <img
              src={downBoldIcon}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          )}
        </button>
      ) : null}

      {showSearch && !collapsed ? (
        <div className="mb-3 relative">
          <img
            src={searchIcon}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search patients"
            className="w-full rounded-xl border border-[#e6ebef] bg-white py-2 pr-3 pl-9 text-sm text-[#072635] outline-none transition focus:border-[#01f0d0]"
          />
        </div>
      ) : null}

      {!collapsed ? (
        <>
          <div className="mb-2 flex items-center justify-end">
            <button
              type="button"
              className="rounded-full p-1.5 hover:bg-[#f8fafc]"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label={showSearch ? "Hide search" : "Show search"}>
              <img src={searchIcon} alt="Search patients" className="h-4 w-4" />
            </button>
          </div>

          <ul className="dashboard-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {filteredPatients.map(({ patient, index }) => {
              const isSelected = patient.name === selectedPatientName;

              return (
                <li
                  onClick={() => {
                    onPatientSelect(index);
                    onToggleCollapse?.();
                  }}
                  key={patient.id}
                  className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
                    isSelected ? "bg-[#d8fcf7]" : "hover:bg-[#f8fafc]"
                  }`}>
                  <img
                    src={patient.profileImage}
                    alt={`${patient.name} profile`}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#072635]">
                      {patient.name}
                    </p>
                    <p className="text-xs text-[#707070]">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>

                  <button type="button" className="rounded-md p-1 hover:bg-white/70">
                    <img
                      src={horizontalDotIcon}
                      alt="Patient options"
                      className="h-4 w-4"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          {!filteredPatients.length ? (
            <p className="pt-2 text-sm text-[#707070]">No matching patients.</p>
          ) : null}
        </>
      ) : null}
    </aside>
  );
}

export default Sidebar;
