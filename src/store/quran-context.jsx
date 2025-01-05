import { createContext, useState } from "react";
import { MultiLanguage, availableLanguages } from "/api/MultiLanguage.js";
import { numToAr } from "/public/js/main.js";
export const QuranContext = createContext();

export const QuranProvider = ({ children }) => {
  const [readers, setReaders] = useState([]);
  const [radio, setRadio] = useState([]);
  const [error, setError] = useState(null);

  // ayahBookmark

  let ayahBookmarkArray = [];
  localStorage.getItem("ayahBookmarkArray")
    ? null
    : localStorage.setItem(
        "ayahBookmarkArray",
        JSON.stringify(ayahBookmarkArray)
      );

  // surahFavorites

  let surahFavorites = [];
  localStorage.getItem("surahFavoritesArray")
    ? null
    : localStorage.setItem(
        "surahFavoritesArray",
        JSON.stringify(surahFavorites)
      );

  // Languages

  let langId =
    localStorage.getItem("currentLanguage") !== null
      ? localStorage.getItem("currentLanguage")
      : "ar";

  const [currentLanguage, setCurrentLanguage] = useState({
    id: langId,
    data: MultiLanguage[0][langId],
  });

  let idIsExiest =
    availableLanguages.find((key) => key.id === currentLanguage.id)?.id ||
    "eng";

  const fetchReaders = async () => {
    try {
      const response = await fetch(
        `https://www.mp3quran.net/api/v3/reciters?language=${idIsExiest}`
      );
      if (!response.ok) {
        throw new Error("فشل في جلب البيانات");
      }
      const data = await response.json();
      setReaders(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchRadio = async () => {
    try {
      const response = await fetch(
        `https://mp3quran.net/api/v3/radios?language=${idIsExiest}`
      );
      if (!response.ok) {
        throw new Error("فشل في جلب البيانات");
      }
      const data = await response.json();
      setRadio(data);
    } catch (error) {
      setError(error.message);
    }
  };

  function handleCurrentLanguage(language) {
    setCurrentLanguage({
      id: language,
      data: MultiLanguage[0][language],
    });
  }

  // Icons

  let iconId =
    localStorage.getItem("currentIcon") !== null
      ? localStorage.getItem("currentIcon")
      : "Broken-Line";

  const [currentIcons, setCurrentIcons] = useState(iconId);

  function handleCurrentIcons(icons) {
    setCurrentIcons(icons);
  }

  // Fonts

  let fontId =
    localStorage.getItem("currentFont") !== null
      ? localStorage.getItem("currentFont")
      : "Qaloun";

  const [currentFont, setCurrentFont] = useState(fontId);

  function handleCurrentFont(font) {
    setCurrentFont(font);
  }

  function handleNum(num) {
    return ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? numToAr(num)
      : num;
  }

  return (
    <QuranContext.Provider
      value={{
        readers,
        fetchReaders,
        radio,
        fetchRadio,
        error,
        currentLanguage,
        handleCurrentLanguage,
        currentIcons,
        handleCurrentIcons,
        currentFont,
        handleCurrentFont,
        handleNum,
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};
