import ClapprPlayer from "./ClapprPlayer";
import { useState, useEffect, useContext } from "react";

export default function LiveStream({ QuranContext }) {
  const { currentLanguage } = useContext(QuranContext);
  const [channels, setChannels] = useState(null);
  const [error, setError] = useState(null);
  const [playerUrl, setPlayerUrl] = useState();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          `https://mp3quran.net/api/v3/live-tv?language=${currentLanguage.id}`
        );
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات");
        }
        const data = await response.json();
        setChannels(data);
        setPlayerUrl(data.livetv[0].url);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchChannels();
  }, [currentLanguage.id]);

  if (error) {
    return <div></div>;
  }

  if (!channels) {
    return <div></div>;
  } else {
    ("");
  }

  function handleChannelClick(url) {
    setPlayerUrl(url);
  }
  return (
    <>
      <section className="container margin-1">
        <div className="d-flex justify-content-center mb-4">
          <h1 className="page-title">
            {currentLanguage.data.tv[0].quranTitle}
          </h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-2 col-md-12">
            <div className="d-flex flex-column flex-lg-column flex-md-row flex-sm-row flex-wrap gap-2 border rounded p-2 mb-2">
              {channels.livetv.map((channel) => {
                return (
                  <a
                    className="btn-main"
                    onClick={() => handleChannelClick(channel.url)}
                    key={channel.id}
                  >
                    {channel.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-lg-10 col-md-12 rounded border">
            <ClapprPlayer key={playerUrl} source={playerUrl} />
          </div>
        </div>
      </section>
    </>
  );
}
