import { useContext } from "react";
import { QuranContext } from "../../../store/quran-context.jsx";
export default function ChangeFont({ font, icon, name }) {
  const { handleCurrentFont } = useContext(QuranContext);
  return (
    <button
      onClick={() => {
        handleCurrentFont(font);
        localStorage.setItem("currentFont", font);
      }}
      className="sidebar-btn"
    >
      <img src={icon} className="svg-icon" />
      <span>{name}</span>
    </button>
  );
}
