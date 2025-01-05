import { useContext } from "react";
import { QuranContext } from "../../../store/quran-context.jsx";
import "./ChangeLanguage.css";

export default function ChangeLanguage({ onLanguageChange }) {
  const { handleCurrentLanguage, currentLanguage } = useContext(QuranContext);

  const languages = [
    { id: "ar", name: "العربية" },
    { id: "eng", name: "English" },
    { id: "fr", name: "Français" },
    { id: "ru", name: "Русский" },
    { id: "de", name: "Deutsch" },
    { id: "es", name: "Español" },
    { id: "tr", name: "Türkçe" },
    { id: "cn", name: "中文" },
    { id: "th", name: "ไทย" },
    { id: "ur", name: "اردو" },
    { id: "bn", name: "বাংলা" },
    { id: "bs", name: "Bosanski" },
    { id: "ug", name: "ئۇيغۇرچە" },
    { id: "fa", name: "فارسی" },
    { id: "tg", name: "Тоҷикӣ" },
    { id: "ml", name: "മലയാളം" },
    { id: "tl", name: "Tagalog" },
    { id: "id", name: "Bahasa" },
    { id: "pt", name: "Português" },
    { id: "ha", name: "Hausa" },
    { id: "sw", name: "Kiswahili" },
  ];

  function handleLanguageChange(lang) {
    handleCurrentLanguage(lang.id);
    localStorage.setItem("currentLanguage", lang.id);
  }

  return (
    <div className="p-3 w-100 language-contanier">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="dropdown w-100">
          <button
            className="language-custom-select"
            type="button"
            id="languageMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={`img/language/${currentLanguage.id}.png`}
              className="language-img"
            />
            {languages.find((lang) => lang.id === currentLanguage.id)?.name}
          </button>
          <ul
            className="dropdown-menu scroll w-100"
            aria-labelledby="languageMenu"
          >
            {languages.map((lang) => (
              <li key={lang.id}>
                <button
                  className="dropdown-item d-flex align-items-center border-bottom"
                  onClick={() => handleLanguageChange(lang)}
                >
                  <img
                    src={`img/language/${lang.id}.png`}
                    alt={lang.name}
                    className="language-img"
                  />
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
