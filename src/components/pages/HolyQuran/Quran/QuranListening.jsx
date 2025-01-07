import { useState, useEffect } from "react";
import { saikhApi } from "/api/Shaik.js";

export default function QuranListening({
  typeData,
  handlePlayAudio,
  showPlayer,
  onSaikhChange,
  currentLanguage,
  currentIcons,
}) {
  const listeningIcon = `/img/svg/${currentIcons}/quran/listening-icon.svg`;
  const [selectedShaikh, setSelectedShaikh] = useState({
    id: "ar.minshawi",
    num: "128",
  });

  const [aduioAyah, setAduioAyah] = useState({
    aduioData: [],
    aduioIdentifier: "",
  });

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition/format/audio")
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
        setAduioAyah({ aduioData: translations });
      })
      .catch((error) =>
        console.error("Error fetching translation list:", error)
      );
  }, []);

  const handleSelectChange = (e) => {
    const data = e.target.value.split("|");
    setSelectedShaikh({ id: data[0], num: data[1] });
    onSaikhChange({ id: data[0], num: data[1] });
  };

  return (
    <>
      {showPlayer && (
        <div className="row surah-listening-select">
          <div className="surah-listening-title">
            {currentLanguage.data.quran[0].listening}
          </div>
          <div className="col-9">
            <select
              className="form-select surah-custom-select"
              onChange={handleSelectChange}
              value={`${selectedShaikh.id}|${selectedShaikh.num}`}
            >
              {Object.keys(aduioAyah.aduioData).map((language) => (
                <optgroup label={language} key={language}>
                  {aduioAyah.aduioData[language]?.map((reader) => (
                    <option
                      key={reader.identifier}
                      value={`${reader.identifier}|${
                        saikhApi.find((item) => item.name === reader.identifier)
                          ?.value || null
                      }`}
                    >
                      {currentLanguage.id === "ar"
                        ? reader.name
                        : reader.englishName}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="col-2 d-flex flex-column align-items-center text-center justify-content-center">
            <a
              onClick={() =>
                handlePlayAudio(
                  `https://cdn.islamic.network/quran/audio/${selectedShaikh.num}/${selectedShaikh.id}/${typeData.ayahs[0].number}.mp3`,
                  true
                )
              }
              data-tooltip-id="custom-title"
              data-tooltip-content={currentLanguage.data.quran[0].listening}
            >
              <img src={listeningIcon} className="svg-icon" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
