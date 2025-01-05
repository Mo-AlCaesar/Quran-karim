import React, { useEffect } from "react";
import watermarkImg from "/img/logo.png";
const VideoPlayer = ({ source }) => {
  useEffect(() => {
    const loadScript = (url) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const loadClappr = async () => {
      const scriptUrls = [
        "https://cdn.jsdelivr.net/clappr/latest/clappr.min.js",
        "https://cdn.jsdelivr.net/gh/clappr/clappr-level-selector-plugin@latest/dist/level-selector.min.js",
        "https://cdn.jsdelivr.net/npm/clappr-chromecast-plugin@latest/dist/clappr-chromecast-plugin.min.js",
        "https://cdn.jsdelivr.net/npm/clappr-pip@latest/dist/clappr-pip.min.js",
        "https://cdn.jsdelivr.net/gh/clappr/dash-shaka-playback@latest/dist/dash-shaka-playback.js",
        "https://cdn.jsdelivr.net/npm/clappr-playback-rate-plugin@latest/dist/clappr-playback-rate-plugin.min.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js",
      ];

      for (const url of scriptUrls) {
        await loadScript(url);
      }

      if (window.Clappr) {
        const player = new window.Clappr.Player({
          source: source,
          autoPlay: true,
          height: "100%",
          width: "100%",
          watermark: watermarkImg,
          position: "bottom-left",
          plugins: [
            window.LevelSelector,
            window.ChromecastPlugin,
            window.ClapprPip.PipButton,
            window.ClapprPip.PipPlugin,
            window.DashShakaPlayback,
            window.Clappr.MediaControl,
            window.PlaybackRatePlugin,
          ],
          poster: "",
          mediacontrol: {
            seekbar: "#157784",
            buttons: "#ffffff",
          },
          parentId: "#playerdiv",
        });
      }
    };

    loadClappr();

    return () => {
      const playerDiv = document.getElementById("playerdiv");
      if (playerDiv) playerDiv.innerHTML = "";
    };
  }, []);

  return <div id="playerdiv" style={{ width: "100%", height: "400px" }}></div>;
};

export default VideoPlayer;
