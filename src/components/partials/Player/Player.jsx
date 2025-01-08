import React, { useRef, useState, useEffect } from "react";
import "./Player.css";

const Player = ({
  pathname,
  typeData,
  audioUrl,
  surahName,
  lastAyah,
  playingStatue,
  fullAyah,
  onAyahChange,
  currentIcons,
  currentLanguage,
  handleNum,
}) => {
  const rightIcon = `/img/svg/${currentIcons}/player/arrow-right-icon.svg`;
  const leftIcon = `/img/svg/${currentIcons}/player/arrow-left-icon.svg`;
  const playIcon = `/img/svg/${currentIcons}/player/play-icon.svg`;
  const pauseIcon = `/img/svg/${currentIcons}/player/pause-icon.svg`;
  const volumeIcon = `/img/svg/${currentIcons}/player/volume-icon.svg`;
  const volumeCloseIcon = `/img/svg/${currentIcons}/player/volume-close-icon.svg`;

  const audioRef = useRef(null);
  const [mp3AudioUrl, setMp3AudioUrl] = useState(audioUrl);
  const [isPlaying, setIsPlaying] = useState(playingStatue);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const [currentAyah, setCurrentAyah] = useState();

  useEffect(() => {
    if (typeData && typeData.ayahs && typeData?.ayahs?.[0]?.number) {
      setCurrentAyah(typeData.ayahs[0].number);
    }
  }, [typeData]);

  useEffect(() => {
    setIsPlaying(playingStatue);
  }, [playingStatue]);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    };
    playAudio();
  }, [isPlaying, mp3AudioUrl, audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const skipTime = (seconds) => {
    audioRef.current.currentTime += seconds;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleAudioEnd = () => {
    if (fullAyah) {
      let url = mp3AudioUrl.split("/");
      let mp3Url = url[7].replace(".mp3", "");
      if (JSON.stringify(lastAyah.number) !== mp3Url) {
        setCurrentAyah(parseInt(currentAyah) + 1);
        onAyahChange(parseInt(currentAyah) + 1);
        setMp3AudioUrl(
          mp3AudioUrl.replace(url[7], `${parseInt(mp3Url) + 1}.mp3`)
        );
      } else {
        resetPlayer();
      }
    } else {
      resetPlayer();
    }
  };

  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current !== pathname) {
      resetPlayer();
      prevPath.current = pathname;
    }
  }, [pathname]);

  const resetPlayer = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.currentTime = 0;
    setVolume(1);
    setShowVolumePopup(false);
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const tL = ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? ["س", "د", "ث"]
      : ["h", "m", "s"];
    return `${hours}${tL[0]} ${minutes}${tL[1]} ${remainingSeconds}${tL[2]}`;
  }

  return (
    <div className="audio-player">
      <div className="progress-container text-align-center">
        <div className="custom-column time-display">
          <span>{handleNum(formatTime(Math.floor(currentTime) || 0))}</span>
        </div>

        <div className="custom-column slider-container">
          <input
            type="range"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="custom-slider slider"
          />
        </div>
        <div className="custom-column time-display">
          <span>
            {handleNum(
              formatTime(Math.floor(duration) || 0)
                .replace("Infinity", "0")
                .replace("NaN", "0")
                .replace("NaN", "0")
            )}
          </span>
        </div>
      </div>

      <div className="controls">
        <h2>{surahName}</h2>
        <button onClick={() => skipTime(-5)} className="control-btn">
          <img src={rightIcon} className="svg-icon" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="control-btn control-btn-big fa-2x"
        >
          <img
            src={isPlaying ? pauseIcon : playIcon}
            className={isPlaying ? "svg-icon play-animation" : "svg-icon"}
          />
        </button>
        <button onClick={() => skipTime(5)} className="control-btn">
          <img src={leftIcon} className="svg-icon" />
        </button>

        {/* volume */}
        <button
          className="volume-btn"
          onClick={() => setShowVolumePopup(!showVolumePopup)}
        >
          <img src={volumeIcon} className="svg-icon" />
        </button>

        {showVolumePopup && (
          <div className="volume-popup">
            <div className="popup-content">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="slider volume-slider"
              />
              <button
                className="close-popup"
                onClick={() => setShowVolumePopup(false)}
              >
                <img src={volumeCloseIcon} className="svg-icon" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Original audioPlayer */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleAudioEnd}
        src={fullAyah === true ? mp3AudioUrl : audioUrl}
      />
    </div>
  );
};

export default Player;
