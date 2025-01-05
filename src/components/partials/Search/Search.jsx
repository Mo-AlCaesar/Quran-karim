import "./Search.css";

export default function Search({
  placeHolder,
  handleSearch,
  additionalClass,
  currentIcons,
}) {
  const searchIcon = `/img/svg/${currentIcons}/search/search-icon.svg`;
  return (
    <>
      <div className={`search-wrapper ${additionalClass}`}>
        <input
          type="text"
          className="form-control search-input"
          placeholder={placeHolder}
          onChange={handleSearch}
        />
        <img src={searchIcon} className="svg-icon search-icon" />
      </div>
    </>
  );
}
