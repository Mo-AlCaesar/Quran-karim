import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { numToAr, getNum } from "/public/js/main.js";
import { surahApi } from "/api/Surah.js";
import QuranListening from "./QuranListening.jsx";
import QuranByType from "./QuranByType.jsx";
import SurahTafsir from "./Tafsir/SurahTafsir.jsx";
import QuranTranslation from "./QuranTranslation.jsx";
import QuranFilter from "./QuranFilter.jsx";
import QuranPagination from "./QuranPagination.jsx";
import Player from "../../../partials/Player/Player.jsx";
import "./Quran.css";
import $ from "jquery";

export default function Surah({ QuranContext, pathname }) {
  const { currentLanguage, currentIcons, currentFont, handleNum } =
    useContext(QuranContext);

  const { id } = useParams();
  const intID = parseInt(id);

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    $(document).ready(function () {
      $("#read").addClass("show active");
      $("#tafsir, #translate").removeClass("show active");
      $("#read-tab").addClass("active");
      $("#tafsir-tab, #translate-tab").removeClass("active");
    });
  }, [typeData]);

  const [typeName, setTypeName] = useState(null);

  useEffect(() => {
    setTypeName(pathname.split("/")[2]);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.alquran.cloud/v1/${
            typeName === "hizb" ? "hizbQuarter" : typeName
          }/${id}/ar.asad`
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        setTypeData(data.data);
      } catch (error) {
        // setError(error.message);
      }
    };
    typeName && fetchData();
  }, [id, typeName]);

  //
  const [activeAyah, setActiveAyah] = useState(null);

  function scrollToElementById(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  const handleActiveAyah = (ayahNumber) => {
    setActiveAyah(ayahNumber === activeAyah ? 0 : ayahNumber);
    scrollToElementById(`root-div`);
    scrollToElementById(`ayah-${ayahNumber}`);
    scrollToElementById(`btn-ayah-${ayahNumber}`);
  };

  const handleAyahChange = (ayah) => {
    setCurrentAyah(ayah);
    handleActiveAyah(ayah);
  };

  //
  const [selectedShaikh, setSelectedShaikh] = useState({
    id: "ar.minshawi",
    num: "128",
  });

  function handleSaikhChange(shaikh) {
    setSelectedShaikh(shaikh);
  }

  //

  const [fullAyah, setFullAyah] = useState(false);
  const [currentAyah, setCurrentAyah] = useState();
  useEffect(() => {
    if (typeData && typeData.ayahs && typeData?.ayahs?.[0]?.number) {
      setCurrentAyah(typeData.ayahs[0].number);
    }
  }, [typeData, pathname]);

  const [audioData, setAudioData] = useState({
    audioUrl: "",
    surahName: "",
    isPlaying: false,
    showPlayer: false,
  });

  function handlePlayAudio(url, fullAyah, name, ayahNum) {
    if (fullAyah === true) {
      handleActiveAyah(currentAyah);
      setFullAyah(true);
    } else {
      handleActiveAyah(ayahNum);
    }
    setAudioData({
      audioUrl: url,
      surahName: name,
      isPlaying: true,
      showPlayer: true,
    });
  }

  if (typeData.length >= 0) {
    return <h1></h1>;
  }

  return (
    <>
      <section className="container-fluid margin-1" dir="rtl">
        <div className="row">
          <div className="col-lg-8 col-md-12 custom-order-lg-9">
            <div className="tabs-surah-data">
              <ul className="tabs-tabs" id="myTab" role="tablist">
                <li className="tabs-item" role="presentation">
                  <button
                    className="tabs-link active"
                    id="read-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#read"
                    type="button"
                    role="tab"
                    aria-controls="read"
                    aria-selected="true"
                    data-tooltip-id="custom-title"
                    data-tooltip-content={currentLanguage.data.quran[0].reading}
                  >
                    <img
                      src={`/img/svg/${currentIcons}/quran/tab-read-icon.svg`}
                      className="svg-icon"
                    />
                    {currentLanguage.data.quran[0].reading}
                  </button>
                </li>
                {typeName === "surah" && (
                  <li className="tabs-item" role="presentation">
                    <button
                      className="tabs-link"
                      id="tafsir-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tafsir"
                      type="button"
                      role="tab"
                      aria-controls="tafsir"
                      aria-selected="false"
                      data-tooltip-id="custom-title"
                      data-tooltip-content={
                        currentLanguage.data.quran[0].interpretation
                      }
                    >
                      <img
                        src={`/img/svg/${currentIcons}/quran/tab-tafsir-icon.svg`}
                        className="svg-icon"
                      />
                      {currentLanguage.data.quran[0].interpretation}
                    </button>
                  </li>
                )}

                <li className="tabs-item" role="presentation">
                  <button
                    className="tabs-link"
                    id="translate-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#translate"
                    type="button"
                    role="tab"
                    aria-controls="translate"
                    aria-selected="false"
                    data-tooltip-id="custom-title"
                    data-tooltip-content={
                      currentLanguage.data.quran[0].translation
                    }
                  >
                    <img
                      src={`/img/svg/${currentIcons}/quran/tab-translation-icon.svg`}
                      className="svg-icon"
                    />
                    {currentLanguage.data.quran[0].translation}
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="read"
                  role="tabpanel"
                  aria-labelledby="read-tab"
                >
                  <QuranListening
                    type="surah"
                    typeData={typeData}
                    surahApi={surahApi}
                    handlePlayAudio={handlePlayAudio}
                    showPlayer={true}
                    onSaikhChange={handleSaikhChange}
                    currentLanguage={currentLanguage}
                    currentIcons={currentIcons}
                  />
                  {pathname.includes("surah") ? (
                    <QuranByType
                      type="surah"
                      typeName={typeName}
                      typeTitle="سورة"
                      intID={intID}
                      typeData={typeData}
                      surahApi={surahApi}
                      activeAyah={activeAyah}
                      getNum={getNum}
                      handleNum={handleNum}
                      numToAr={numToAr}
                      handlePlayAudio={handlePlayAudio}
                      selectedShaikh={selectedShaikh}
                      handleSaikhChange={handleSaikhChange}
                      currentLanguage={currentLanguage}
                      currentIcons={currentIcons}
                      handleAyahChange={handleAyahChange}
                      currentFont={currentFont}
                    />
                  ) : pathname.includes("juz") ? (
                    <QuranByType
                      type="juz"
                      typeName={typeName}
                      typeTitle="الجزء"
                      intID={intID}
                      typeData={typeData}
                      surahApi={surahApi}
                      activeAyah={activeAyah}
                      getNum={getNum}
                      handleNum={handleNum}
                      numToAr={numToAr}
                      handlePlayAudio={handlePlayAudio}
                      selectedShaikh={selectedShaikh}
                      handleSaikhChange={handleSaikhChange}
                      currentLanguage={currentLanguage}
                      currentIcons={currentIcons}
                      handleAyahChange={handleAyahChange}
                      currentFont={currentFont}
                    />
                  ) : pathname.includes("hizb") ? (
                    <QuranByType
                      type="hizbQuarter"
                      typeName={typeName}
                      typeTitle="الحزب"
                      intID={intID}
                      typeData={typeData}
                      surahApi={surahApi}
                      activeAyah={activeAyah}
                      getNum={getNum}
                      handleNum={handleNum}
                      numToAr={numToAr}
                      handlePlayAudio={handlePlayAudio}
                      selectedShaikh={selectedShaikh}
                      handleSaikhChange={handleSaikhChange}
                      currentLanguage={currentLanguage}
                      currentIcons={currentIcons}
                      handleAyahChange={handleAyahChange}
                      currentFont={currentFont}
                    />
                  ) : pathname.includes("page") ? (
                    <QuranByType
                      type="page"
                      typeName={typeName}
                      typeTitle="الصفحة"
                      intID={intID}
                      typeData={typeData}
                      surahApi={surahApi}
                      activeAyah={activeAyah}
                      getNum={getNum}
                      handleNum={handleNum}
                      numToAr={numToAr}
                      handlePlayAudio={handlePlayAudio}
                      selectedShaikh={selectedShaikh}
                      handleSaikhChange={handleSaikhChange}
                      currentLanguage={currentLanguage}
                      currentIcons={currentIcons}
                      handleAyahChange={handleAyahChange}
                      currentFont={currentFont}
                    />
                  ) : (
                    ""
                  )}
                </div>
                {typeName === "surah" && (
                  <div
                    className="tab-pane fade"
                    id="tafsir"
                    role="tabpanel"
                    aria-labelledby="tafsir-tab"
                  >
                    <SurahTafsir
                      id={id}
                      handleNum={handleNum}
                      currentLanguage={currentLanguage}
                      currentIcons={currentIcons}
                    />
                  </div>
                )}
                <div
                  className="tab-pane fade"
                  id="translate"
                  role="tabpanel"
                  aria-labelledby="translate-tab"
                >
                  <QuranTranslation
                    id={id}
                    activeAyah={activeAyah}
                    handleNum={handleNum}
                    currentLanguage={currentLanguage}
                    currentIcons={currentIcons}
                    pathname={pathname}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 custom-order-lg-3">
            <QuranFilter
              typeData={typeData}
              surahApi={surahApi}
              activeAyah={activeAyah}
              handleNum={handleNum}
              numToAr={numToAr}
              setActiveAyah={setActiveAyah}
              handleAyahClick={handleActiveAyah}
              currentLanguage={currentLanguage}
              currentIcons={currentIcons}
              pathname={pathname}
            />
          </div>
        </div>
        <QuranPagination
          surahApi={surahApi}
          intID={intID}
          currentLanguage={currentLanguage}
          currentIcons={currentIcons}
          pathname={pathname}
        />
        {audioData.showPlayer && (
          <Player
            key={audioData.audioUrl}
            pathname={pathname}
            typeData={typeData}
            audioUrl={audioData.audioUrl}
            surahName={audioData.surahName}
            lastAyah={typeData.ayahs[typeData.ayahs.length - 1]}
            playingStatue={audioData.isPlaying}
            fullAyah={fullAyah}
            onAyahChange={handleAyahChange}
            currentIcons={currentIcons}
          />
        )}
      </section>
    </>
  );
}
