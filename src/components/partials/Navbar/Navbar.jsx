import logoImg from "/img/logo.png";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { QuranContext } from "../../../store/quran-context.jsx";
import SliderBar from "../SliderBar/SliderBar.jsx";
import "./Navbar.css";
import $ from "jquery";
export default function Navbar({ page }) {
  const { currentLanguage, currentIcons } = useContext(QuranContext);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navbarRef = useRef(null);
  const sidebarRef = useRef(null);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  const togglerIcon = `/img/svg/${currentIcons}/navbar/nav-toggler.svg`;
  const homeIcon = `/img/svg/${currentIcons}/navbar/home-icon.svg`;
  const quranIcon = `/img/svg/${currentIcons}/navbar/quran-icon.svg`;
  const readerIcon = `/img/svg/${currentIcons}/navbar/reader-icon.svg`;
  const radioIcon = `/img/svg/${currentIcons}/navbar/radio-icon.svg`;
  const liveIcon = `/img/svg/${currentIcons}/navbar/live-icon.svg`;
  const prayerIcon = `/img/svg/${currentIcons}/navbar/prayer-icon.svg`;
  const tasbihIcon = `/img/svg/${currentIcons}/navbar/tasbih-icon.svg`;
  const settingsIcon = `/img/svg/${currentIcons}/navbar/settings-icon.svg`;

  const buttons = [
    { to: "/", img: homeIcon },
    { to: "quran", img: quranIcon },
    { to: "reader", img: readerIcon },
    { to: "radio", img: radioIcon },
    { to: "live", img: liveIcon },
    { to: "prayer", img: prayerIcon },
    { to: "sebha", img: tasbihIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        isOpen
      ) {
        setTimeout(() => {
          setIsOpen(false);
        }, 100);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setTimeout(() => {
          setSidebarOpen(false);
        }, 100);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, sidebarOpen]);

  return (
    <>
      <nav className={`navbar ${isOpen ? "open" : ""}`} ref={navbarRef}>
        <div className="navbar-container ">
          <button className="navbar-toggler navbar-btn" onClick={toggleNavbar}>
            <img src={togglerIcon} className="svg-icon" />
          </button>

          <Link className="navbar-brand" to="/">
            <img src={logoImg} alt="Logo" className="logo" />
          </Link>

          <div className={`navbar-links ${isOpen ? "show" : ""}`}>
            {buttons.map(({ to, img }) => (
              <Link
                key={to}
                onClick={toggleNavbar}
                className={`nav-link ${
                  page.replace("/", "") === to
                    ? "nav-active"
                    : page.includes("/" + to + "/surah/")
                    ? "nav-active"
                    : page.includes("/" + to + "/")
                    ? "nav-active"
                    : page === to
                    ? "nav-active"
                    : ""
                }`}
                to={to}
                data-tooltip-id="custom-title-bottom"
                data-tooltip-content={
                  currentLanguage.data.navbar[0][to === "/" ? "home" : to]
                }
              >
                <img src={img} alt={to} className="svg-icon" />
              </Link>
            ))}
          </div>

          <button
            className="sliderBar-btn"
            onClick={toggleSidebar}
            data-tooltip-id="custom-title-bottom"
            data-tooltip-content={currentLanguage.data.navbar[0].settings}
          >
            <img src={settingsIcon} className="svg-icon" />
          </button>
        </div>
      </nav>
      <SliderBar
        sidebarOpen={sidebarOpen}
        currentLanguage={currentLanguage}
        currentIcons={currentIcons}
        ref={sidebarRef}
      />
    </>
  );
}
