import { useState, useContext, useEffect } from "react";
import { numToAr } from "/public/js/main.js";
import "./Sebha.css";

export default function Sebha({ QuranContext }) {
  const { currentLanguage, currentIcons } = useContext(QuranContext);

  const savedCount = localStorage.getItem("sebhaCount");
  const [count, setCount] = useState(savedCount ? parseInt(savedCount, 10) : 0);
  const [currentTasbih, setCurrentTasbih] = useState(0);
  const [afterPrayer, setAfterPrayer] = useState(false);

  useEffect(() => {
    if (!afterPrayer) {
      localStorage.setItem("sebhaCount", count);
    }
  }, [count, afterPrayer]);

  const incrementCount = () => {
    if (afterPrayer) {
      if (count < 33) {
        setCount(count + 1);
      } else {
        setCount(0);
        setCurrentTasbih((currentTasbih + 1) % 3);
      }
    } else {
      setCount(count + 1);
    }
  };

  const resetCount = () => {
    setCount(0);
    setCurrentTasbih(0);
    setAfterPrayer(false);
  };

  const toggleAfterPrayer = () => {
    if (afterPrayer) {
      setCount(savedCount ? parseInt(savedCount, 10) : 0);
    } else {
      setCount(0);
    }
    setAfterPrayer(!afterPrayer);
  };

  return (
    <section className="container margin-1">
      <div className="d-flex justify-content-center mb-4">
        <h1 className="page-title">
          {currentLanguage.data.tasbeh[0].quranTitle}
        </h1>
      </div>

      <div className="sebha-container">
        <div className="sebha-display">
          <h1>
            {["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
              ? numToAr(count)
              : count}
          </h1>
          {afterPrayer && (
            <span>
              {currentLanguage.data.tasbeh[0].tasbihLetters[currentTasbih]}
            </span>
          )}
        </div>
        <div className="sebha-controls-1">
          <button onClick={resetCount} className="sebha-button reset">
            <img
              src={`/img/svg/${currentIcons}/sebha/restart.svg`}
              className="svg-icon mx-2"
            />
          </button>
        </div>
        <div className="sebha-controls-2">
          <button onClick={incrementCount} className="sebha-button add">
            <img
              src={`/img/svg/${currentIcons}/sebha/add.svg`}
              className="svg-icon increment-svg-icon mx-2"
            />
          </button>
        </div>
        <div className="sebha-controls-3 margin-1 pb-5 w-100">
          <button
            onClick={toggleAfterPrayer}
            className="btn btn-main prayer w-100 p-3 rounded-4"
          >
            {afterPrayer
              ? currentLanguage.data.tasbeh[0].buttonTasbehStop
              : currentLanguage.data.tasbeh[0].buttonTasbehStart}
          </button>
        </div>
      </div>
    </section>
  );
}
