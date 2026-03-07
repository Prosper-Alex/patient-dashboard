import { useEffect, useRef, useState } from "react";
import calendarIcon from "../assets/icons/calendaricon.svg";
import chatIcon from "../assets/icons/chatbubble.svg";
import cardIcon from "../assets/icons/creditcard.svg";
import femaleIcon from "../assets/icons/femaleicon.svg";
import settingIcon from "../assets/icons/settingicon.svg";
import verticalDotIcon from "../assets/icons/verticaldot.svg";
import homeIcon from "../assets/icons/home.svg";
import downBoldIcon from "../assets/icons/downbold.svg";
import upBoldIcon from "../assets/icons/upbold.svg";
import doctorImg from "../assets/images/profile.png";

const navItems = [
  { label: "Overview", icon: homeIcon, href: "/premium-overview" },
  { label: "Patients", icon: femaleIcon, href: "/" },
  { label: "Schedule", icon: calendarIcon },
  { label: "Message", icon: chatIcon },
  { label: "Transactions", icon: cardIcon },
];

function TopNavbar({ doctorImage }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const resolvedDoctorImage = doctorImage || doctorImg;
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    if (!isProfileOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isProfileOpen]);

  return (
    <header className="rounded-3xl bg-white px-3 py-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:px-4 lg:h-[74px] lg:rounded-[70px] lg:px-5 lg:py-0">
      <div className="flex h-full flex-wrap items-center justify-between gap-2 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6 lg:gap-8">
          <img
            src="/testcare.svg"
            alt="Tech.Care"
            className="h-7 w-auto shrink-0 sm:h-8"
          />
        </div>

        <nav className="hidden xl:flex xl:justify-center">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = item.href ? item.href === currentPath : false;
              const className = `flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                isActive
                  ? "bg-[#01f0d0] text-[#072635]"
                  : "text-[#072635] hover:bg-[#f1f5f9]"
              }`;

              return (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className={className}>
                      <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <button type="button" className={className}>
                      <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-[#e6ebef] bg-white px-2 py-1.5 transition hover:bg-[#f8fafc]"
            aria-expanded={isProfileOpen}
            aria-controls="profile-toggle-panel"
            aria-label="Toggle profile actions">
            <img
              src={resolvedDoctorImage}
              alt="Doctor profile"
              className="h-9 w-9 rounded-full border border-[#e5e7eb] object-cover"
            />
            <img
              src={isProfileOpen ? upBoldIcon : downBoldIcon}
              alt=""
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />
          </button>

          <div
            id="profile-toggle-panel"
            className={`absolute top-[calc(100%+8px)] right-0 z-40 w-[235px] rounded-2xl border border-[#e6ebef] bg-white p-3 shadow-[0_18px_36px_rgba(7,38,53,0.12)] transition-all duration-200 ${
              isProfileOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0"
            }`}>
            <div className="flex items-center gap-2.5">
              <img
                src={resolvedDoctorImage}
                alt="Doctor profile"
                className="h-10 w-10 rounded-full border border-[#e5e7eb] object-cover"
              />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-[#072635]">
                  Dr. Jose Simmons
                </p>
                <p className="text-[11px] text-[#707070]">
                  General Practitioner
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-[#e6ebef] p-2 hover:bg-[#f8fafc]">
                <img src={settingIcon} alt="Settings" className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-full border border-[#e6ebef] p-2 hover:bg-[#f8fafc]">
                <img src={verticalDotIcon} alt="Menu" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
