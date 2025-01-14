import { useState, useEffect } from "react";

function AyahTafsir({ ayahNum, currentLanguage }) {
  const [tafsir, setTafsir] = useState("");
  const [tafsirType, setTafsirType] = useState("");
  const [tafsirOptions, setTafsirOptions] = useState([]);
  const [isTafsirVisible, setIsTafsirVisible] = useState(false);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/edition?type=tafsir")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setTafsirOptions(data.data);
        } else {
          console.error("Error fetching tafsir options");
        }
      })
      .catch((error) => console.error("Error fetching tafsir options:", error));
  }, []);

  const handleShowTafsir = () => {
    setIsTafsirVisible(true);
    setTafsir("");
    fetch(`https://api.alquran.cloud/v1/ayah/${ayahNum}/${tafsirType}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setTafsir(data.data.text);
        } else {
          setTafsir(currentLanguage.data.quran[0].tafsierPlaceholder);
        }
      })
      .catch((error) => console.error("Error fetching tafsir:", error));
  };

  return (
    <>
      <div className="border-bottom mb-4 pb-2">
        <select
          className="form-select surah-custom-select"
          onChange={(e) => setTafsirType(e.target.value)}
          value={tafsirType}
        >
          <option value="">
            {currentLanguage.data.quran[0].tafsierPlaceholder}
          </option>
          {tafsirOptions.map((option) => (
            <option key={option.identifier} value={option.identifier}>
              {option.name}
            </option>
          ))}
        </select>
        <button className="btn btn-main mt-3" onClick={handleShowTafsir}>
          {currentLanguage.data.quran[0].tafsierButton}
        </button>
      </div>
      {isTafsirVisible &&
        (tafsir.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="spinner-grow text-main" role="status"></div>
          </div>
        ) : (
          <p>{tafsir}</p>
        ))}
    </>
  );
}

export default AyahTafsir;
