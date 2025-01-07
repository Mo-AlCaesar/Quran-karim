import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Reader.css";
import Player from "../../../partials/Player/Player.jsx";
import Search from "../../../partials/Search/Search.jsx";
import { copyToClipboard, numToAr } from "/public/js/main.js";
import { surahApi } from "/api/Surah.js";

export default function Reader({ QuranContext }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { readers, fetchReaders, error, currentLanguage, currentIcons } =
    useContext(QuranContext);
  const [moshafName, setMoshafName] = useState(0);
  const [audioData, setAudioData] = useState({
    audioUrl: "",
    surahName: "",
    isPlaying: false,
  });

  const { id } = useParams();

  useEffect(() => {
    fetchReaders();
  }, [currentLanguage.id]);

  const reader = readers?.reciters?.find(
    (reciter) => reciter.id === parseInt(id)
  );

  if (!reader) {
    return <p></p>;
  }

  const readerSurahs = reader.moshaf[moshafName].surah_list;
  const surahList = readerSurahs.split(",");

  const filterReader = surahList.filter((surahNum) => {
    const surahName =
      surahApi.find((key) => key.number === parseInt(surahNum))?.name[
        currentLanguage.id
      ] || null;

    return (
      surahNum.includes(searchQuery.toLowerCase()) ||
      (surahName && surahName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  function handleMoshafChange(e) {
    setMoshafName(e.target.value);
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handlePlayAudio(url, name) {
    setAudioData({
      audioUrl: url,
      surahName: name,
      isPlaying: true,
    });
  }
  function handleNum(num) {
    return ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? numToAr(num)
      : num;
  }

  const copyIcon = `/img/svg/${currentIcons}/reader/copy-icon.svg`;
  const downloadIcon = `/img/svg/${currentIcons}/reader/download-icon.svg`;
  const playIcon = `/img/svg/${currentIcons}/reader/play-icon.svg`;
  return (
    <>
      <section className="container margin-1">
        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            خطا في الاتصال بالسيرفر
          </div>
        ) : (
          <>
            <div className="row pt-5">
              <div className="col-lg-4 col-md-12 d-flex justify-content-center text-center">
                <p className="reader-p">{reader.name}</p>
              </div>
              <div className="col-lg-4 col-md-12 d-flex justify-content-center text-center">
                <p className="reader-p">
                  {handleNum(reader.moshaf[moshafName].surah_total)}
                </p>
              </div>
              <div className="col-lg-4 col-md-12 d-flex justify-content-center text-center">
                <p className="reader-p">{reader.moshaf[moshafName].name}</p>
              </div>
            </div>

            <div className="reader-container">
              <div className="m-4 pb-4 border-bottom">
                <Search
                  handleSearch={handleSearch}
                  placeHolder={
                    currentLanguage.data.readers[0].searchPlaceHolder2
                  }
                  currentIcons={currentIcons}
                />
              </div>

              <div className="d-flex justify-content-end m-2  pb-4">
                <select
                  className="form-select custom-select"
                  onChange={handleMoshafChange}
                >
                  {reader.moshaf.map((moshaf, index) => {
                    return (
                      <option key={moshaf.id} value={index}>
                        {moshaf.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="scroll">
                <div className="row p-2">
                  {filterReader.map((surahNum) => {
                    const surahData =
                      surahNum.length === 1
                        ? `00${surahNum}`
                        : surahNum.length === 2
                        ? `0${surahNum}`
                        : surahNum;
                    const mp3Url = `${reader.moshaf[moshafName].server}/${surahData}.mp3`;

                    return (
                      <div className="col-lg-6 col-md-12 my-2" key={surahNum}>
                        <div className="reader-aduio row">
                          <div className="col-2 border-start text-center d-flex align-items-center justify-content-center mb-2">
                            {handleNum(surahNum)}
                          </div>
                          <div className="col-5 text-center d-flex align-items-center justify-content-center surah-font">
                            <div
                              className="surah-font"
                              title={surahApi[0].name}
                            >
                              {surahData}
                            </div>
                          </div>

                          <div className="col-5 border-end d-flex align-items-center justify-content-center gap-1 mb-2">
                            <a
                              data-tooltip-id="custom-title"
                              data-tooltip-content={
                                currentLanguage.data.readers[0].copyBtn
                              }
                              onClick={copyToClipboard}
                            >
                              <img src={copyIcon} className="svg-icon" />
                            </a>

                            <a
                              data-tooltip-id="custom-title"
                              data-tooltip-content={
                                currentLanguage.data.readers[0].downloadBtn
                              }
                              href={mp3Url}
                            >
                              <img src={downloadIcon} className="svg-icon" />
                            </a>
                            <a
                              data-tooltip-id="custom-title"
                              data-tooltip-content={
                                currentLanguage.data.readers[0].playBtn
                              }
                            >
                              <img
                                src={playIcon}
                                className="svg-icon"
                                data-value={mp3Url}
                                onClick={() =>
                                  handlePlayAudio(mp3Url, surahData)
                                }
                              />
                            </a>
                          </div>
                          <div className="surah-lang-name">
                            <div className="row">
                              <div className="col-12 d-flex align-items-center justify-content-center gap-2 pt-2">
                                <span className="">
                                  {
                                    surahApi[surahNum - 1].name[
                                      currentLanguage.id
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Player
              audioUrl={audioData.audioUrl}
              surahName={audioData.surahName}
              playingStatue={audioData.isPlaying}
              fullAyah={false}
              onAyahChange
              currentIcons={currentIcons}
            />
          </>
        )}
      </section>
    </>
  );
}
