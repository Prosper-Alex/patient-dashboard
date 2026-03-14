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
        collapsed ? "w-20 p-2" : "w-full p-4"
      }`}>
      
      {/* Header Section */}
      <div
        className={`mb-3 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}>
        {!collapsed ? <h2 className="text-2xl font-extrabold text-[#072635]">Patients</h2> : null}
      </div>

      {/* Profile Toggle Button */}
      {selectedPatient ? (
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`mb-3 flex w-full items-center rounded-xl border border-[#e6ebef] transition-colors hover:bg-[#f8fafc] ${
            collapsed ? "justify-center p-1.5" : "justify-between px-3 py-2"
          }`}
          aria-label={collapsed ? "Expand patient list" : "Collapse patient list"}>
          
          {/* Left Side: Avatar and Info Grouped */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={selectedPatient.profileImage}
              alt={`${selectedPatient.name} profile`}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
              loading="lazy"
            />

            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-semibold text-[#072635]">
                  {selectedPatient.name}
                </p>
                <p className="text-xs text-[#707070]">
                  {selectedPatient.gender}, {selectedPatient.age}
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Toggle Icon */}
          <img
            src={collapsed ? downBoldIcon : upBoldIcon}
            alt=""
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0"
          />
        </button>
      ) : null}

      {/* Search Input Field */}
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
          {/* Search Toggle Icon */}
          <div className="mb-2 flex items-center justify-end">
            <button
              type="button"
              className="rounded-full p-1.5 hover:bg-[#f8fafc]"
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label={showSearch ? "Hide search" : "Show search"}>
              <img src={searchIcon} alt="Search patients" className="h-4 w-4" />
            </button>
          </div>

          {/* Patient List */}
          <ul className="dashboard-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {filteredPatients.map(({ patient, index }) => {
              const isSelected = patient.name === selectedPatientName;

              return (
                <li
                  key={patient.id}
                  onClick={() => {
                    onPatientSelect(index);
                    // Optional: auto-collapse on mobile after selection
                    // onToggleCollapse?.(); 
                  }}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-2 py-2 transition-colors ${
                    isSelected ? "bg-[#d8fcf7]" : "hover:bg-[#f8fafc]"
                  }`}>
                  
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={patient.profileImage}
                      alt={`${patient.name} profile`}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                      loading="lazy"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#072635]">
                        {patient.name}
                      </p>
                      <p className="text-xs text-[#707070]">
                        {patient.gender}, {patient.age}
                      </p>
                    </div>
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
