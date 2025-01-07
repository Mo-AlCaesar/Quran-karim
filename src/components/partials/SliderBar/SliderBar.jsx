import { forwardRef } from "react";
import ChangeTheme from "../ChangeTheme/ChangeTheme.jsx";
import ChangeFont from "../ChangeFont/ChangeFont.jsx";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage.jsx";

import "./SliderBar.css";
import ChangeIcons from "../ChangeIcons/ChangeIcons.jsx";

function SliderBar({ sidebarOpen, currentLanguage, currentIcons }, ref) {
  const lightIcon = `/img/svg/${currentIcons}/slidebar/themes/light-icon.svg`;
  const simpleDarkIcon = `/img/svg/${currentIcons}/slidebar/themes/simple-dark-icon.svg`;
  const darkIcon = `/img/svg/${currentIcons}/slidebar/themes/dark-icon.svg`;
  const fontIcon = `/img/svg/${currentIcons}/slidebar/font/font-icon.svg`;
  const contanierIcon = `/img/svg/${currentIcons}/slidebar/icons/contanier-icon.svg`;
  const brokenLineIcon = `/img/svg/${currentIcons}/slidebar/icons/broken-Line-icon.svg`;
  const boldDuotoneIcon = `/img/svg/${currentIcons}/slidebar/icons/bold-Duotone-icon.svg`;
  const languageIcon = `/img/svg/${currentIcons}/slidebar/language/language-icon.svg`;
  const palleteIcon = `/img/svg/${currentIcons}/slidebar/themes/pallete-icon.svg`;
  const faceIcon = `/img/svg/facebook.svg`;
  const gitIcon = `/img/svg/github.svg`;

  const currentYear = new Date().getFullYear();

  return (
    <aside
      className={`sidebar scroll ${sidebarOpen ? "active" : ""}`}
      ref={ref}
    >
      <div className="slider-contanier">
        <img src={languageIcon} className="svg-icon me-3" />
        <ChangeLanguage />
      </div>

      <div className="slider-contanier">
        <img src={contanierIcon} className="svg-icon" />
        <div className="slider-contanier-2">
          <ChangeIcons
            name={currentLanguage.data.icons[0].styleOne}
            iconName="Broken-Line"
            icon={brokenLineIcon}
          />
          <ChangeIcons
            name={currentLanguage.data.icons[0].styleTwo}
            iconName="Bold-Duotone"
            icon={boldDuotoneIcon}
          />
        </div>
      </div>

      <div className="slider-contanier ">
        <img src={palleteIcon} className="svg-icon" />
        <div className="slider-contanier-2">
          <ChangeTheme
            name={currentLanguage.data.themes[0].light}
            theme="light"
            icon={lightIcon}
          />
          <ChangeTheme
            name={currentLanguage.data.themes[0].simpledark}
            theme="simpledark"
            icon={simpleDarkIcon}
          />
          <ChangeTheme
            name={currentLanguage.data.themes[0].dark}
            theme="dark"
            icon={darkIcon}
          />
        </div>
      </div>

      <div className="slider-contanier">
        <img src={fontIcon} className="svg-icon" />
        <div className="slider-contanier-2">
          <ChangeFont
            name={currentLanguage.data.fonts[0].hafs}
            font="Hafs"
            icon={fontIcon}
          />
          <ChangeFont
            name={currentLanguage.data.fonts[0].qaloun}
            font="Qaloun"
            icon={fontIcon}
          />
          <ChangeFont
            name={currentLanguage.data.fonts[0].nastaleeq}
            font="Noto Nastaliq Urdu"
            icon={fontIcon}
          />
          <ChangeFont
            name={currentLanguage.data.fonts[0].amiri}
            font="Amiri"
            icon={fontIcon}
          />
        </div>
      </div>
      <div className="rights-contanier">
        <div className="social">
          <a
            href="https://github.com/Mo-AlCaesar"
            target="blank"
            className="rights-btn"
          >
            Github
            <img src={gitIcon} className="svg-icon" />
          </a>
          <a
            href="https://www.facebook.com/mohamedabdallahofficial"
            target="blank"
            className="rights-btn"
          >
            Facebook
            <img src={faceIcon} className="svg-icon" />
          </a>
        </div>
        <div className="social w-100 border-bottom pb-2 mb-2">
          <a
            href="https://github.com/Mo-AlCaesar/Quran-karim"
            target="blank"
            className="rights-btn w-100"
          >
            Github Repository
            <img src={gitIcon} className="svg-icon" />
          </a>
        </div>

        <p className="rights-font">
          Developed by : Mohamed Abdallah
          <br />© {currentYear} All rights reserved
        </p>
      </div>
    </aside>
  );
}

export default forwardRef(SliderBar);
