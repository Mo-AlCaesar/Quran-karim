import { Link } from "react-router-dom";
import { surahApi } from "/api/Surah.js";
import { useContext } from "react";
import { numToAr } from "/public/js/main.js";

export default function Home({ QuranContext }) {
  const { currentLanguage, currentIcons } = useContext(QuranContext);

  function handleNum(num) {
    return ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? numToAr(num)
      : num;
  }
  return (
    <>
      <section className="container margin-1">
        <div className="d-flex justify-content-center mb-4">
          <h1 className="page-title">
            {currentLanguage.data.quran[0].quranTitle}
          </h1>
        </div>

        <div className="row home-contanier d-flex flex-row gap-2 text-center">
          <label className="text-main border-bottom mb-2 pb-2">
            {currentLanguage.data.home[0].currentBookmarks}
          </label>

          {JSON.parse(localStorage.getItem("ayahBookmarkArray")).map((key) => {
            return (
              <Link
                key={key.surahNum}
                to={`/quran/surah/${key.surahNum}`}
                state={{ scroll: key.ayahNum }}
                className="btn-main w-auto"
              >
                {`﴿ ${handleNum(key.ayahNumberInSurah)} ﴾ - `}

                {surahApi[key.surahNum - 1]?.name[currentLanguage.id]}
              </Link>
            );
          })}
        </div>

        <div className="row home-contanier d-flex flex-row gap-2 text-center my-5">
          <label className="text-main border-bottom mb-2 pb-2">
            {currentLanguage.data.home[0].SurahFavorites}
          </label>

          {JSON.parse(localStorage.getItem("surahFavoritesArray")).map(
            (key) => {
              return (
                <Link
                  key={key.surahNum}
                  to={`/quran/surah/${key.surahNum}`}
                  className="btn-main w-25"
                >
                  {surahApi[key.surahNum - 1]?.name[currentLanguage.id]}
                </Link>
              );
            }
          )}
        </div>
      </section>
    </>
  );
}
