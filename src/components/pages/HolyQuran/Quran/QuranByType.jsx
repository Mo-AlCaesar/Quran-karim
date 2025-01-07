import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import $ from "jquery";
import Modal from "../../../partials/Modal/Modal.jsx";
import AyahTafsir from "./Tafsir/AyahTafsir.jsx";
import QuranTooltip from "./QuranTooltip.jsx";
export default function QuranByType({
  type,
  typeName,
  typeTitle,
  intID,
  typeData,
  surahApi,
  activeAyah,
  getNum,
  handleNum,
  numToAr,
  handlePlayAudio,
  selectedShaikh,
  currentLanguage,
  handleAyahChange,
  currentIcons,
  currentFont,
}) {
  const { id } = useParams();

  const quranDivRef = useRef(null);

  useEffect(() => {
    $(`#${type}-ayahs`).css("font-family", currentFont);
    quranDivRef.current.scrollTo(0, 0);
  }, [typeData, currentFont, type]);

  //
  const [ayahTafsir, setAyahTafsir] = useState("");
  function handleAyahTafsir(num) {
    setAyahTafsir(num);
  }
  //

  const bookmarkState = useLocation();
  useEffect(() => {
    bookmarkState.state && handleAyahChange(bookmarkState.state.scroll);
  }, []);

  const [ayahBookmark, setAyahBookmark] = useState({
    action: "",
    surahNum: "",
    ayahNum: "",
  });

  let array = JSON.parse(localStorage.getItem("ayahBookmarkArray")) || [];

  const findSurahIndex = array.findIndex(
    (key) => key.surahNum === typeData.number
  );

  function handleBookmarkAction(action, ayahNumber, numberInSurah) {
    const idx = array.findIndex((key) => key.surahNum === typeData.number);
    action === "addValue"
      ? idx === -1
        ? array.push({
            surahNum: typeData.number,
            ayahNum: ayahNumber,
            ayahNumberInSurah: numberInSurah,
          })
        : (array[idx].ayahNum = ayahNumber)
      : idx !== -1 && array.splice(idx, 1);
    localStorage.setItem("ayahBookmarkArray", JSON.stringify(array));
    setAyahBookmark({ action, ayahNum: ayahNumber, surahNum: typeData.number });
  }

  if (!typeData || typeData.length === 0) {
    return <h1></h1>;
  }

  return (
    <>
      <Modal id="tafsirModal" label="tafsirModal" size="xl" backdrop="static">
        <AyahTafsir surahNum={intID} ayahNum={ayahTafsir} />
      </Modal>

      <div className="surah">
        <div className="surah-title mb-4">
          {type === "surah" ? (
            <>
              <div className="surah-font" title={typeData.name}>
                {getNum(String(typeData.number))}000
              </div>
              <div className="surahs-lang-name">
                {surahApi[typeData.number - 1].name[currentLanguage.id]}
              </div>
              <div className="surah-info">
                <span>
                  {currentLanguage.data.quran[0].numberOfAyahs} :
                  {handleNum(String(typeData.numberOfAyahs))}
                </span>
                <span>
                  {currentLanguage.data.quran[0].surahOrder} :
                  {handleNum(String(typeData.number))}
                </span>
                <span>
                  {currentLanguage.data.quran[0].revelation} :
                  {typeData.revelationType === "Meccan"
                    ? currentLanguage.data.quran[0].revelationType1
                    : currentLanguage.data.quran[0].revelationType2}
                </span>
              </div>
            </>
          ) : (
            `${typeTitle} ${handleNum(id)}`
          )}
        </div>
        <div ref={quranDivRef} className="quran-container">
          {typeData ? (
            <div id={`${type}-ayahs`} className="quran">
              <p className="basmala">﷽</p>
              {typeData.ayahs.map((ayah, index) => {
                const showPageData =
                  ayah.page !== typeData.ayahs[index + 1]?.page
                    ? ayah.page
                    : null;

                return (
                  <div key={index}>
                    {type !== "surah" && (
                      <p>
                        <span className="border-bottom">
                          {typeData.ayahs[index]?.surah?.name !==
                          typeData.ayahs[index - 1]?.surah?.name
                            ? ayah.surah.name
                            : null}
                        </span>
                      </p>
                    )}

                    <div className="ayah-container" key={ayah.number}>
                      <p
                        key={index}
                        id={`ayah-${ayah.number}`}
                        className={`ayah-p ${
                          activeAyah === ayah.number ? "active-p" : ""
                        }`}
                      >
                        {ayah.number === 1
                          ? ayah.text
                          : ayah.numberInSurah === 1
                          ? ayah.text.replace(
                              "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                              ""
                            )
                          : ayah.text}

                        <span className="me-2" key={array}>
                          {array[findSurahIndex]?.ayahNum === ayah.number ? (
                            <>
                              {currentFont === "Noto Nastaliq Urdu" ||
                              currentFont === "Amiri"
                                ? `﴿${numToAr(ayah.numberInSurah)}﴾`
                                : numToAr(ayah.numberInSurah)}
                              <img
                                src={`/img/svg/${currentIcons}/quran/bookmark-add-icon.svg`}
                                className="svg-icon mx-2 "
                              />
                            </>
                          ) : currentFont === "Noto Nastaliq Urdu" ||
                            currentFont === "Amiri" ? (
                            `﴿${numToAr(ayah.numberInSurah)}﴾`
                          ) : (
                            numToAr(ayah.numberInSurah)
                          )}
                        </span>
                      </p>
                      <QuranTooltip
                        typeName={typeName}
                        array={array}
                        findSurahIndex={findSurahIndex}
                        ayah={ayah}
                        typeData={typeData}
                        handleBookmarkAction={handleBookmarkAction}
                        handlePlayAudio={handlePlayAudio}
                        currentLanguage={currentLanguage}
                        currentIcons={currentIcons}
                        selectedShaikh={selectedShaikh}
                        handleAyahTafsir={handleAyahTafsir}
                      />
                      {showPageData && (
                        <div className="quran-footer-data">
                          <p>{`الجزء : ${numToAr(ayah.juz)}`}</p>
                          <p>{`﴿ ${numToAr(ayah.page)} ﴾`}</p>
                          <p>{`الحزب : ${numToAr(ayah.hizbQuarter)}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
