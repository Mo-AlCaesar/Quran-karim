import { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Readers.css";

import Search from "../../partials/Search/Search.jsx";

export default function Readers({ QuranContext }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { readers, fetchReaders, error, currentLanguage, currentIcons } =
    useContext(QuranContext);

  useEffect(() => {
    fetchReaders();
  }, [currentLanguage.id]);

  const sortedRecitersByLetter = readers?.reciters
    ? [...readers.reciters].sort((a, b) => {
        return a.letter.localeCompare(b.letter);
      })
    : [];

  const sortedReciters = !searchQuery
    ? sortedRecitersByLetter
    : sortedRecitersByLetter.filter((search) => {
        return search.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

  let currentLetter = "";

  function handleScrollTo(id) {
    const element = document.getElementById(`${id}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <section className="container margin-1">
        <div className="d-flex justify-content-center mb-4">
          <h1 className="page-title">
            {currentLanguage.data.readers[0].quranTitle}
          </h1>
        </div>

        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            خطا في الاتصال بالسيرفر
          </div>
        ) : (
          <div className="reader-container">
            <div className="m-4 pb-4 border-bottom">
              <Search
                handleSearch={handleSearch}
                placeHolder={currentLanguage.data.readers[0].searchPlaceHolder}
                currentIcons={currentIcons}
              />
            </div>
            <div className="row p-2">
              <div className="reader-container col-lg-10 col-md-12 custom-order-lg-10">
                <div className="scroll p-2">
                  <div className="row">
                    {sortedReciters.map((reciter) => {
                      const showLetter = reciter.letter !== currentLetter;
                      currentLetter = reciter.letter;
                      return (
                        <Fragment key={reciter.id}>
                          {showLetter && (
                            <div
                              className="reader-letter mt-4"
                              key={reciter.letter}
                            >
                              <a id={reciter.letter}>{reciter.letter}</a>
                            </div>
                          )}
                          <div
                            className="col-lg-6 col-md-12 mb-2"
                            key={reciter.id}
                          >
                            <Link className="reader-card" to={`${reciter.id}`}>
                              {reciter.name}
                            </Link>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 custom-order-lg-2">
                <div className="reader-container">
                  <div className="scroll-letter p-2">
                    <div className="filter-letter">
                      {sortedReciters.map((reciter) => {
                        const showLetter = reciter.letter !== currentLetter;
                        currentLetter = reciter.letter;
                        return (
                          showLetter && (
                            <div
                              className="d-flex justify-content-between align-items-center"
                              key={reciter.letter}
                            >
                              <button
                                onClick={() => handleScrollTo(reciter.letter)}
                                className="letter-btn"
                              >
                                {reciter.letter}
                              </button>
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
