import calendarIcon from "../assets/icons/calendaricon.svg";
import chatIcon from "../assets/icons/chatbubble.svg";
import cardIcon from "../assets/icons/creditcard.svg";
import femaleIcon from "../assets/icons/femaleicon.svg";
import settingIcon from "../assets/icons/settingicon.svg";
import verticalDotIcon from "../assets/icons/verticaldot.svg";
import homeIcon from "../assets/icons/home.svg";

const navItems = [
  { label: "Overview", icon: homeIcon },
  { label: "Patients", icon: femaleIcon, active: true },
  { label: "Schedule", icon: calendarIcon },
  { label: "Message", icon: chatIcon },
  { label: "Transactions", icon: cardIcon },
];

function TopNavbar({ doctorImage }) {
  return (
    <header className="rounded-3xl bg-white px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:px-4 lg:h-18.5lg:rounded-[70px] lg:px-5 lg:py-0">
      <div className="flex h-full flex-wrap items-center justify-between gap-2 lg:flex-nowrap lg:gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-8">
          <img
            src="/testcare.svg"
            alt="Tech.Care"
            className="h-7 w-auto shrink-0 sm:h-8"
          />

          <nav className="hidden xl:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                      item.active
                        ? "bg-[#01f0d0] text-[#072635]"
                        : "text-[#072635] hover:bg-[#f1f5f9]"
                    }`}>
                    <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <img
              src={doctorImage}
              alt="Doctor profile"
              className="h-9 w-9 rounded-full border border-[#e5e7eb] object-cover lg:h-10 lg:w-10"
            />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-[#072635]">
                Dr. Jose Simmons
              </p>
              <p className="text-[11px] text-[#707070]">General Practitioner</p>
            </div>
          </div>

          <button type="button" className="rounded-full p-2 hover:bg-[#f8fafc]">
            <img src={settingIcon} alt="Settings" className="h-4 w-4" />
          </button>
          <button type="button" className="rounded-full p-2 hover:bg-[#f8fafc]">
            <img src={verticalDotIcon} alt="Menu" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
