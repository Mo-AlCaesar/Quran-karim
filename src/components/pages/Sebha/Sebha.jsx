import { useReducer, useContext } from "react";
import { numToAr } from "/public/js/main.js";
import "./Sebha.css";
import Loading from "../../partials/Loading/Loading";

const initialState = { count: 0, currentTasbih: 0, afterPrayer: false };

const sebhaReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (state.afterPrayer) {
        if (state.count < 33) {
          return { ...state, count: state.count + 1 };
        } else {
          return {
            ...state,
            count: 0,
            currentTasbih: (state.currentTasbih + 1) % 3,
          };
        }
      } else {
        return { ...state, count: state.count + 1 };
      }
    case "RESET":
      return { count: 0, currentTasbih: 0, afterPrayer: false };
    case "TOGGLE_AFTER_PRAYER":
      return {
        ...state,
        afterPrayer: !state.afterPrayer,
        count: 0,
        currentTasbih: 0,
      };
    default:
      return state;
  }
};

export default function Sebha({ QuranContext }) {
  const { currentLanguage, currentIcons } = useContext(QuranContext);
  const [state, dispatch] = useReducer(sebhaReducer, initialState);

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
              ? numToAr(state.count)
              : state.count}
          </h1>
          {state.afterPrayer && (
            <span>
              {
                currentLanguage.data.tasbeh[0].tasbihLetters[
                  state.currentTasbih
                ]
              }
            </span>
          )}
        </div>
        <div className="sebha-controls-1">
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="sebha-button reset"
          >
            {" "}
            <img
              src={`/img/svg/${currentIcons}/sebha/restart.svg`}
              className="svg-icon mx-2"
            />
          </button>
        </div>
        <div className="sebha-controls-2">
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="sebha-button add"
          >
            {" "}
            <img
              src={`/img/svg/${currentIcons}/sebha/add.svg`}
              className="svg-icon mx-2"
            />
          </button>
        </div>
        <div className="sebha-controls-3 margin-1 w-100">
          <button
            onClick={() => dispatch({ type: "TOGGLE_AFTER_PRAYER" })}
            className="btn btn-main prayer w-100 p-3 rounded-4"
          >
            {state.afterPrayer
              ? currentLanguage.data.tasbeh[0].buttonTasbehStop
              : currentLanguage.data.tasbeh[0].buttonTasbehStart}
          </button>
        </div>
      </div>
    </section>
  );
}
