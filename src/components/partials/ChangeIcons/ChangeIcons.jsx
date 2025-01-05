import { useContext } from "react";
import { QuranContext } from "../../../store/quran-context.jsx";

export default function ChangeIcons({ iconName, icon, name }) {
  const { handleCurrentIcons } = useContext(QuranContext);

  return (
    <button
      onClick={() => {
        handleCurrentIcons(iconName);
        localStorage.setItem("currentIcon", iconName);
      }}
      className="sidebar-btn"
    >
      <img src={icon} className="svg-icon" />
      <span>{name}</span>
    </button>
  );
}
