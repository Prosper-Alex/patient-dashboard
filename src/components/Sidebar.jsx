import searchIcon from '../assets/icons/searchicon.svg'
import horizontalDotIcon from '../assets/icons/horizontaldot.svg'

function Sidebar({ patients, selectedPatientName }) {
  return (
    <aside className="flex h-full min-h-0 flex-col rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#072635]">Patients</h2>
        <button type="button" className="rounded-full p-1.5 hover:bg-[#f8fafc]">
          <img src={searchIcon} alt="Search patients" className="h-4 w-4" />
        </button>
      </div>

      <ul className="dashboard-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
        {patients.map((patient) => {
          const isSelected = patient.name === selectedPatientName

          return (
            <li
              key={patient.id}
              className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
                isSelected ? 'bg-[#d8fcf7]' : 'hover:bg-[#f8fafc]'
              }`}
            >
              <img
                src={patient.profileImage}
                alt={`${patient.name} profile`}
                className="h-12 w-12 rounded-full object-cover"
                loading="lazy"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#072635]">{patient.name}</p>
                <p className="text-xs text-[#707070]">
                  {patient.gender}, {patient.age}
                </p>
              </div>

              <button type="button" className="rounded-md p-1 hover:bg-white/70">
                <img src={horizontalDotIcon} alt="Patient options" className="h-4 w-4" />
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
