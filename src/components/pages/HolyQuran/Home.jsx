import { Link } from "react-router-dom";
import { useEffect, useState, useContext, Fragment } from "react";
import "./Home.css";
import Search from "../../partials/Search/Search.jsx";
import { numToAr, getNum, removeTashkeel } from "/public/js/main.js";
import { surahApi } from "/api/Surah.js";
export default function Quran({ QuranContext }) {
  const { currentLanguage, currentIcons } = useContext(QuranContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [suwar, setSuwar] = useState([]);
  const [error, setError] = useState(null);

  const [ayahFavourite, setAyahFavourite] = useState({
    action: "",
    surahNum: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah`);
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات");
        }
        const data = await response.json();
        const modifiedData = data.data.map((surah) => ({
          ...surah,
          name: removeTashkeel(surah.name),
        }));
        setSuwar(modifiedData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleNum(num) {
    return ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? numToAr(num)
      : num;
  }

  let array = JSON.parse(localStorage.getItem("surahFavoritesArray")) || [];

  function handelAddToFavourite(action, surahNumber) {
    const idx = array.findIndex((key) => key.surahNum === surahNumber);
    action === "addValue"
      ? idx === -1
        ? array.push({
            surahNum: surahNumber,
          })
        : (array[idx].surahNum = surahNumber)
      : idx !== -1 && array.splice(idx, 1);
    localStorage.setItem("surahFavoritesArray", JSON.stringify(array));
    setAyahFavourite({ action, surahNum: surahNumber });
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <section className="container margin-1">
        <div className="d-flex justify-content-center mb-4">
          <h1 className="page-title">
            {currentLanguage.data.quran[0].quranTitle}
          </h1>
        </div>

        <div className="surah-container">
          <div className="m-4 pb-4 border-bottom">
            <Search
              handleSearch={handleSearch}
              placeHolder={currentLanguage.data.quran[0].searchPlaceHolder}
              currentIcons={currentIcons}
            />
          </div>
          <div className="scroll p-2">
            <div className="row">
              {suwar
                .filter((surah) => {
                  const surahNameInLanguage =
                    surahApi[surah.number - 1]?.name[currentLanguage.id] || "";
                  return surahNameInLanguage
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })
                .map((surah) => {
                  const surahName = getNum(String(surah.number));

                  return (
                    <Fragment key={surah.number}>
                      <div
                        className="col-lg-6 col-sm-12 mb-2 "
                        key={handleNum(surah.number)}
                      >
                        <div className="surah-card">
                          <Link
                            to={`surah/${surah.number}`}
                            className="row text-center custom-row"
                          >
                            <div className="col-2 border-start d-flex align-items-center justify-content-center mb-2">
                              <span>{handleNum(surah.number)}</span>
                            </div>

                            <div className="col-6">
                              <div className="surah-font" title={surah.name}>
                                <span>{surahName}</span>
                              </div>
                            </div>

                            <div className="col-4 border-end d-flex align-items-center justify-content-center mb-2 overflow-hidden">
                              <span>
                                {`${handleNum(surah["numberOfAyahs"])} ${
                                  currentLanguage.data.quran[0].ayat
                                }`}
                              </span>
                            </div>
                          </Link>
                          <div className="surah-lang-name pt-3">
                            <div className="row">
                              <div className="col-8 d-flex align-items-center justify-content-center gap-2 pt-2">
                                {
                                  surahApi[surah.number - 1].name[
                                    currentLanguage.id
                                  ]
                                }
                              </div>
                              <div className="col-4 border-end text-center">
                                {array.find(
                                  (key) => key.surahNum === surah.number
                                ) ? (
                                  <img
                                    src={`/img/svg/${currentIcons}/quran/added-favourite-icon.svg`}
                                    className="svg-icon mx-2"
                                    onClick={() =>
                                      handelAddToFavourite(
                                        "removeValue",
                                        surah.number
                                      )
                                    }
                                  />
                                ) : (
                                  <img
                                    src={`/img/svg/${currentIcons}/quran/favourite-icon.svg`}
                                    className="svg-icon mx-2"
                                    onClick={() =>
                                      handelAddToFavourite(
                                        "addValue",
                                        surah.number
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
