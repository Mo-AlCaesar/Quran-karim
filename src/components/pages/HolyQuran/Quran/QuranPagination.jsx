import { Link } from "react-router-dom";

export default function QuranPagination({
  surahApi,
  intID,
  currentLanguage,
  currentIcons,
  pathname,
}) {
  const rightIcon = `/img/svg/${currentIcons}/quran/arrow-right-icon.svg`;
  const leftIcon = `/img/svg/${currentIcons}/quran/arrow-left-icon.svg`;

  const typeDetails = {
    surah: { number: 114, name: "surah" },
    juz: { number: 30, name: "الجزء" },
    hizb: { number: 240, name: "الحزب" },
    page: { number: 604, name: "الصفحة" },
  };
  const typeName = pathname.split("/")[2];
  const typeId = typeDetails[typeName];

  return (
    <div className="row pagination-container">
      <div className="col-5">
        <div className="pagination-btn">
          <Link
            to={`/quran/${typeName}/${
              intID === typeId.number ? typeId.number : intID - 1
            }`}
          >
            <img src={rightIcon} className="svg-icon" />
            {typeId.name === "surah"
              ? surahApi.find((key) => key.number === intID - 1)?.name[
                  currentLanguage.id
                ] || ""
              : intID !== 1 && `${typeId.name} ${intID - 1}`}
          </Link>
        </div>
      </div>
      <div className="col-2"></div>
      <div className="col-5">
        <div className="pagination-btn">
          <Link
            to={`/quran/${typeName}/${
              intID === typeId.number ? typeId.number : intID + 1
            }`}
          >
            {typeId.name === "surah"
              ? surahApi.find((key) => key.number === intID + 1)?.name[
                  currentLanguage.id
                ] || ""
              : `${typeId.name} ${intID + 1}`}
            <img src={leftIcon} className="svg-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
