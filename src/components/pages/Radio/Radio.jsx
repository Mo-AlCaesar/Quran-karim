import "./Radio.css";
import { useContext, useState, useEffect } from "react";

import Player from "../../partials/Player/Player.jsx";

export default function Radio({ QuranContext }) {
  const { radio, fetchRadio, currentLanguage, currentIcons, handleNum } =
    useContext(QuranContext);
  const [audioUrl, setAudioUrl] = useState();
  const [playingStatue, setPlayingStatue] = useState(false);

  useEffect(() => {
    fetchRadio();
  }, [currentLanguage.id]);

  function handlePlayAudio(url) {
    setAudioUrl(url);
    setPlayingStatue(true);
  }
  const playIcon = `/img/svg/${currentIcons}/reader/play-icon.svg`;
  return (
    <>
      <section className="container margin-1">
        <div className="d-flex justify-content-center mb-4">
          <h1 className="page-title">
            {currentLanguage.data.radio[0].quranTitle}
          </h1>
        </div>
        <div className="border rounded shadow p-2">
          <div className="scroll p-2">
            <div className="row">
              {radio?.radios
                ? radio.radios.map((data) => {
                    return (
                      <div className="col-lg-4 col-md-12 mb-2" key={data.id}>
                        <div className="radio-card row">
                          <div className="col-8 d-flex justify-content-center text-center">
                            {data.name}
                          </div>
                          <div className="col-4 border-end d-flex justify-content-center text-center">
                            <a>
                              <img
                                src={playIcon}
                                className="svg-icon"
                                data-audio={data.url}
                                onClick={() => handlePlayAudio(data.url)}
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
        <Player
          audioUrl={audioUrl}
          playingStatue={playingStatue}
          currentIcons={currentIcons}
          currentLanguage={currentLanguage}
          handleNum={handleNum}
        />
      </section>
    </>
  );
}
