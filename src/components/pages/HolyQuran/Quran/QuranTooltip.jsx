import { useEffect, useState } from "react";
import $ from "jquery";

export default function QuranTooltip({
  typeName,
  array,
  findSurahIndex,
  ayah,
  typeData,
  handleBookmarkAction,
  handlePlayAudio,
  currentLanguage,
  currentIcons,
  selectedShaikh,
  handleAyahTafsir,
}) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const handleAyahTooltipClick = (e) => {
      if ($(e.target).hasClass("ayah-p")) {
        const ayahId = `#tooltip-${e.target.id}`;

        if ($(ayahId).hasClass("tooltip-show")) {
          setTimeout(() => {
            $(ayahId).removeClass("tooltip-show");
            setActiveTooltip(null);
          }, 100);
        } else {
          if (activeTooltip) {
            setTimeout(() => {
              $(activeTooltip).removeClass("tooltip-show");
            }, 100);
          }
          setTimeout(() => {
            $(ayahId).addClass("tooltip-show");
            setActiveTooltip(ayahId);
          }, 100);
        }
      } else if (activeTooltip) {
        setTimeout(() => {
          $(activeTooltip).removeClass("tooltip-show");
        }, 100);
      }
    };

    $(document).on("click", handleAyahTooltipClick);

    return () => {
      $(document).off("click", handleAyahTooltipClick);
    };
  }, [activeTooltip]);

  return (
    <>
      <span id={`tooltip-ayah-${ayah.number}`} className="tooltiptext">
        <a
          onClick={() =>
            handlePlayAudio(
              `https://cdn.islamic.network/quran/audio/${selectedShaikh.num}/${selectedShaikh.id}/${ayah.number}.mp3`,
              false,
              ayah.numberInSurah
            )
          }
          className="border-2 border-start px-2"
          data-tooltip-id="custom-title"
          data-tooltip-content={currentLanguage.data.quran[0].ayahPlay}
        >
          <img
            src={`/img/svg/${currentIcons}/quran/play-icon.svg`}
            className="svg-icon ms-2"
          />
        </a>

        <a
          onClick={() => handleAyahTafsir(ayah.number)}
          data-bs-toggle="modal"
          className="px-2"
          data-bs-target="#tafsirModal"
          data-tooltip-id="custom-title"
          data-tooltip-content={currentLanguage.data.quran[0].ayahTafsier}
        >
          <img
            src={`/img/svg/${currentIcons}/quran/tab-tafsir-icon.svg`}
            className="svg-icon mx-2"
          />
        </a>

        {typeName === "surah" && (
          <a
            className="border-2 border-end px-2"
            data-tooltip-id="custom-title"
            data-tooltip-content={currentLanguage.data.quran[0].ayahBookmark}
          >
            {array[findSurahIndex]?.ayahNum === ayah.number ? (
              <img
                src={`/img/svg/${currentIcons}/quran/bookmark-remove-icon.svg`}
                className="svg-icon mx-2"
                onClick={() =>
                  handleBookmarkAction(
                    "removeValue",
                    ayah.number,
                    ayah.numberInSurah
                  )
                }
              />
            ) : (
              <img
                src={`/img/svg/${currentIcons}/quran/bookmark-add-icon.svg`}
                className="svg-icon mx-2"
                onClick={() =>
                  handleBookmarkAction(
                    "addValue",
                    ayah.number,
                    ayah.numberInSurah
                  )
                }
              />
            )}
          </a>
        )}
      </span>
    </>
  );
}
