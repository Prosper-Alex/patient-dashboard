import birthIcon from '../assets/icons/birthicon.svg'
import femaleIcon from '../assets/icons/femaleicon.svg'
import chatIcon from '../assets/icons/chatbubble.svg'
import cardIcon from '../assets/icons/creditcard.svg'

const infoRows = [
  { key: 'dateOfBirth', label: 'Date Of Birth', icon: birthIcon },
  { key: 'gender', label: 'Gender', icon: femaleIcon },
  { key: 'phoneNumber', label: 'Contact Info.', icon: chatIcon },
  { key: 'emergencyContact', label: 'Emergency Contacts', icon: chatIcon },
  { key: 'insuranceType', label: 'Insurance Provider', icon: cardIcon },
]

function PatientProfile({ profile }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex flex-col items-center text-center">
        <img
          src={profile.profileImage}
          alt={`${profile.name} profile`}
          className="mb-4 h-24 w-24 rounded-full object-cover"
        />
        <h2 className="text-[24px] font-extrabold text-[#072635]">{profile.name}</h2>
      </div>

      <ul className="space-y-4">
        {infoRows.map((row) => (
          <li key={row.key} className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f7f8]">
              <img src={row.icon} alt="" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-[#707070]">{row.label}</p>
              <p className="break-words text-sm font-semibold text-[#072635]">{profile[row.key]}</p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-[#01f0d0] py-2 text-xs font-bold text-[#072635]"
      >
        Show All Information
      </button>
    </section>
  )
}

export default PatientProfile
