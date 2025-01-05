import { useState, useEffect } from "react";

export default function SurahTafsir({ id, handleNum, currentLanguage }) {
  const [tafsirList, setTafsirList] = useState([]);
  const [selectedTafsir, setSelectedTafsir] = useState("ar.muyassar");
  const [tafsirText, setTafsirText] = useState("");
  const [activeAyah, setActiveAyah] = useState(null);
  const [isTafsirVisible, setIsTafsirVisible] = useState(false);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition?type=tafsir")
      .then((response) => response.json())
      .then((data) => setTafsirList(data.data))
      .catch((error) => console.error("Error fetching tafsir list:", error));
  }, []);

  const handleShowTafsir = () => {
    setTafsirText("");
    setIsTafsirVisible(true);
    fetch(`https://api.alquran.cloud/v1/surah/${id}/${selectedTafsir}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setTafsirText(data.data);
        } else {
          setTafsirText("تفسير غير متاح");
        }
      })
      .catch((error) => console.error("Error fetching surah tafsir:", error));
  };

  return (
    <div className="border p-5 rounded-3 shadow fs-3">
      <div className="d-flex flex-column gap-2 align-items-center border-bottom mb-4 pb-2">
        <select
          className="form-select surah-custom-select w-100 mb-2"
          onChange={(e) => setSelectedTafsir(e.target.value)}
        >
          <option value="">
            {currentLanguage.data.quran[0].tafsierPlaceholder}
          </option>
          {tafsirList.map((tafsir) => (
            <option key={tafsir.identifier} value={tafsir.identifier}>
              {`${tafsir.language} - ${
                currentLanguage.id === "ar" ? tafsir.name : tafsir.englishName
              }`}
            </option>
          ))}
        </select>
        <button className="btn btn-main" onClick={handleShowTafsir}>
          عرض التفسير
        </button>
      </div>

      {isTafsirVisible && (
        <div className="scroll p-2">
          {tafsirText.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="spinner-grow text-main" role="status"></div>
              <p className="m-2 text-main">جاري التحميل</p>
            </div>
          ) : (
            tafsirText.ayahs?.map((ayah) => (
              <div key={ayah.numberInSurah}>
                <p
                  id={`ayah-${handleNum(ayah.numberInSurah)}`}
                  className={`ayah-p ${
                    activeAyah === handleNum(ayah.numberInSurah)
                      ? "text-green font-weight-bold"
                      : ""
                  }`}
                >
                  {`﴿${handleNum(ayah.numberInSurah)}﴾ `}
                  {ayah.text}
                </p>
                <hr className="my-4" />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
