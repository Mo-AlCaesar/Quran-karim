import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Search from "../../../partials/Search/Search";

export default function QuranFilter({
  typeData,
  surahApi,
  activeAyah,
  handleNum,
  handleAyahClick,
  currentLanguage,
  currentIcons,
  pathname,
}) {
  const ayahIcon = `/img/svg/${currentIcons}/quran/tab-ayah-icon.svg`;
  const surahIcon = `/img/svg/${currentIcons}/quran/tab-surah-icon.svg`;
  const [searchQueries, setSearchQueries] = useState({
    ayah: "",
    surah: "",
    juz: "",
    page: "",
    hizb: "",
  });

  function handleSearch(type, e) {
    setSearchQueries((prevState) => ({
      ...prevState,
      [type]: handleNum(e.target.value),
    }));
  }

  const typeName = pathname.split("/")[2];
  const ayahDivRef = useRef(null);

  useEffect(() => {
    typeName === "surah" && ayahDivRef.current.scrollTo(0, 0);
  }, [typeData, typeName]);

  const filteredAyahs = typeData.ayahs
    ? typeData.ayahs.filter((ayah) =>
        handleNum(String(ayah.numberInSurah)).includes(searchQueries.ayah)
      )
    : [];

  const filteredSurahs =
    surahApi && surahApi.length > 0
      ? surahApi.filter((surah) => {
          const surahNameInLanguage =
            surahApi[surah.number - 1]?.name[currentLanguage.id] || "";
          return surahNameInLanguage
            .toLowerCase()
            .includes(searchQueries.surah.toLowerCase());
        })
      : [];

  const filterNumbers = (length, searchQuery) =>
    Array.from({ length }, (_, index) => index + 1).filter((num) =>
      handleNum(String(num)).includes(searchQuery)
    );

  const filteredJuz = filterNumbers(30, searchQueries.juz);
  const filteredPage = filterNumbers(604, searchQueries.page);
  const filteredHizb = filterNumbers(240, searchQueries.hizb);

  const tabsData = [
    {
      id: "surah",
      label: "alsurah",
    },
    {
      id: "juz",
      label: "aljuz",
    },
    {
      id: "hizb",
      label: "alhizb",
    },
    {
      id: "page",
      label: "alsafha",
    },
  ];

  return (
    <div className="tabs-surah-data">
      <ul className="tabs-tabs" id="myTab" role="tablist">
        {tabsData.map(({ id, label }) => (
          <li className="tabs-item" role="presentation" key={id}>
            <button
              className={`tabs-link ${typeName === id ? "active" : ""}`}
              id={`${id}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${id}`}
              type="button"
              role="tab"
              aria-controls={id}
              aria-selected={typeName === id ? "true" : "false"}
              data-tooltip-id="custom-title"
              data-tooltip-content={currentLanguage.data.quran[0][label]}
            >
              <img src={surahIcon} className="svg-icon" />
              {currentLanguage.data.quran[0][label]}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content w-100" id="myTabContent">
        <div
          className={`tab-pane fade ${typeName === "surah" && "show active"}`}
          id="surah"
          role="tabpanel"
          aria-labelledby="surah-tab"
        >
          <div className="d-flex flex-row ">
            {typeName === "surah" && (
              <div className="filter-ayah-data">
                <div>
                  <Search
                    handleSearch={(e) => handleSearch("ayah", e)}
                    additionalClass="border-bottom py-2 mb-2"
                    currentIcons={currentIcons}
                  />
                </div>
                <div ref={ayahDivRef} className="tabs-scroll">
                  <div className="tabs-page">
                    {filteredAyahs.map((ayah) => (
                      <div
                        key={handleNum(ayah.number)}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <a
                          id={`btn-ayah-${ayah.number}`}
                          onClick={() => handleAyahClick(ayah.number)}
                          className={`tabs-btn ${
                            activeAyah === ayah.number ? "tabs-btn-active" : ""
                          }`}
                        >
                          {`${currentLanguage.data.quran[0].ayah} : ${handleNum(
                            ayah.numberInSurah
                          )}`}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div
              className={`filter-surah-data ${
                (typeName === "surah") !== true && "w-100"
              }`}
            >
              <div className="tab-container">
                <Search
                  handleSearch={(e) => handleSearch("surah", e)}
                  additionalClass="border-bottom py-2 mb-2"
                  currentIcons={currentIcons}
                />

                <div className="tabs-scroll">
                  <div className="tabs-page">
                    {filteredSurahs.map((surah) => (
                      <div
                        key={surah.number}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <Link
                          className="tabs-btn"
                          to={`/quran/surah/${surah.number}`}
                        >
                          <div className="row">
                            <div className="col-4 border-start">
                              <span>{handleNum(surah.number)}</span>
                            </div>
                            <div className="col-8">
                              <span>{surah.name[currentLanguage.id]}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`tab-pane fade ${typeName === "juz" && "show active"}`}
          id="juz"
          role="tabpanel"
          aria-labelledby="juz-tab"
        >
          <div>
            <Search
              handleSearch={(e) => handleSearch("juz", e)}
              additionalClass="border-bottom py-2 mb-2"
              currentIcons={currentIcons}
            />
          </div>
          <div className="tabs-scroll">
            <div className="tabs-page">
              {filteredJuz.map((number) => (
                <div
                  key={number}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Link className="tabs-btn" to={`/quran/juz/${number}`}>
                    <div className="row">
                      <div className="col-4 border-start">
                        <span>{handleNum(number)}</span>
                      </div>
                      <div className="col-8">
                        <span>الجزء</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`tab-pane fade ${typeName === "hizb" && "show active"}`}
          id="hizb"
          role="tabpanel"
          aria-labelledby="hizb-tab"
        >
          <div>
            <Search
              handleSearch={(e) => handleSearch("page", e)}
              additionalClass="border-bottom py-2 mb-2"
              currentIcons={currentIcons}
            />
          </div>
          <div className="tabs-scroll">
            <div className="tabs-page">
              {filteredHizb.map((number) => (
                <div
                  key={number}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Link className="tabs-btn" to={`/quran/hizb/${number}`}>
                    <div className="row">
                      <div className="col-4 border-start">
                        <span>{handleNum(number)}</span>
                      </div>
                      <div className="col-8">
                        <span>الحزب</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`tab-pane fade ${typeName === "page" && "show active"}`}
          id="page"
          role="tabpanel"
          aria-labelledby="page-tab"
        >
          <div>
            <Search
              handleSearch={(e) => handleSearch("hizb", e)}
              additionalClass="border-bottom py-2 mb-2"
              currentIcons={currentIcons}
            />
          </div>
          <div className="tabs-scroll">
            <div className="tabs-page">
              {filteredPage.map((number) => (
                <div
                  key={number}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Link className="tabs-btn" to={`/quran/page/${number}`}>
                    <div className="row">
                      <div className="col-4 border-start">
                        <span>{handleNum(number)}</span>
                      </div>
                      <div className="col-8">
                        <span>الصفحة</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
