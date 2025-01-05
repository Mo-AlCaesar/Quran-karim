import { useState, useEffect } from "react";

export default function QuranTranslation({
  id,
  activeAyah,
  handleNum,
  currentLanguage,
  pathname,
}) {
  const [translationList, setTranslationList] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [translationText, setTranslationText] = useState("");

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition?type=translation")
      .then((response) => response.json())
      .then((data) => {
        const translations = data.data.reduce((acc, translation) => {
          const language = translation.language;
          if (!acc[language]) {
            acc[language] = [];
          }
          acc[language].push(translation);
          return acc;
        }, {});
        setTranslationList(translations);
      })
      .catch((error) =>
        console.error("Error fetching translation list:", error)
      );
  }, [id]);

  const getType = pathname.split("/");

  const fetchSurahTranslation = () => {
    if (id && selectedTranslation) {
      fetch(
        `https://api.alquran.cloud/v1/${getType[2]}/${id}/${selectedTranslation}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK") {
            setTranslationText(data.data);
          } else {
            setTranslationText("الترجمة غير متاحة لهذه السورة");
          }
        })
        .catch((error) =>
          console.error("Error fetching surah translation:", error)
        );
    }
  };

  return (
    <>
      <div className=" border p-5 rounded-3 shadow fs-3">
        <div className="d-flex flex-column gap-2 align-items-center border-bottom mb-4 pb-2">
          <div>
            <select
              className="form-select surah-custom-select w-100 mb-2"
              onChange={(e) => setSelectedTranslation(e.target.value)}
            >
              <option value="">
                {currentLanguage.data.quran[0].translationPlaceholder}
              </option>

              {Object.keys(translationList).map((language) => (
                <optgroup label={language} key={language}>
                  {translationList[language].map((translation) => (
                    <option
                      key={translation.identifier}
                      value={translation.identifier}
                    >
                      {translation.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <button
              className="btn btn-main w-100"
              onClick={fetchSurahTranslation}
            >
              {currentLanguage.data.quran[0].translationButton}
            </button>
          </div>
        </div>

        <div className="scroll p-2 ">
          {translationText.length === 0 ? (
            <p className="text-main">
              {currentLanguage.data.quran[0].translationNotes}
            </p>
          ) : (
            translationText.ayahs?.map((ayah) => (
              <>
                <p
                  id={`ayah-${handleNum(ayah.numberInSurah)}`}
                  className={`ayah-p ${
                    activeAyah === handleNum(ayah.numberInSurah)
                      ? "text-green font-weight-bold"
                      : ""
                  }`}
                >
                  {`﴿${ayah.numberInSurah}﴾ `}
                  {ayah.text}
                </p>
                <hr className="my-4" />
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}
