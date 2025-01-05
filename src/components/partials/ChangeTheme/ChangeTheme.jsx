import { useState, useEffect } from "react";
import "./ChangeTheme.css";

export default function ThemeToggle({ theme, icon, name }) {
  const [themes, setThemes] = useState(
    () => localStorage.getItem("currentTheme") || "light"
  );

  useEffect(() => {
    document.body.classList.add(themes);
  }, []);

  function toggleDarkThemes(theme) {
    setThemes(() => {
      localStorage.removeItem("currentTheme");
      localStorage.setItem("currentTheme", theme);
      document.body.classList.remove("light", "simpledark", "dark");
      document.body.classList.add(theme);
      return theme;
    });
  }

  return (
    <button onClick={() => toggleDarkThemes(theme)} className="sidebar-btn">
      <img src={icon} className="svg-icon" />
      <span>{name}</span>
    </button>
  );
}
