import { useEffect, useState, useContext } from "react";
import "./PrayerTimes.css";
import { monthToAr, numToAr } from "/public/js/main.js";
import { countries } from "/api/Country.js";

export default function PrayerTimes({ QuranContext }) {
  const { currentLanguage } = useContext(QuranContext);
  const [prayerData, setPrayerData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("القاهرة");
  const [country, setCountry] = useState("مصر");
  const [method, setMethod] = useState(5);

  useEffect(() => {
    const fetchPrayerTimes = async (city, method) => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`
        );
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        setPrayerData(data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPrayerTimes(city, method);
  }, [city, method, country, currentLanguage]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setCity(countries[e.target.value][0]);
  };

  if (!prayerData) {
    return <div className="loading-message">{}</div>;
  }

  function handleNum(num) {
    return ["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
      ? numToAr(num)
      : num;
  }

  const { timings, date } = prayerData;

  function convertTime(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const period =
      hours >= 12
        ? currentLanguage.data.prayerTime[0].pm
        : currentLanguage.data.prayerTime[0].am;
    const adjustedHours = hours % 12 || 12;
    return handleNum(
      `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`
    );
  }

  return (
    <section className="container margin-1">
      <div className="d-flex justify-content-center mb-4">
        <h1 className="page-title">
          {currentLanguage.data.prayerTime[0].quranTitle}
        </h1>
      </div>

      <div className="prayer-times-container">
        <div className="date-info">
          <div className="date-card">
            <h5>{currentLanguage.data.prayerTime[0].gregorianDate}</h5>
            <p>{handleNum(date.gregorian.date)}</p>
            <p className="border-top pt-3">
              {currentLanguage.data.prayerTime[0].month} :{" "}
              {["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
                ? monthToAr(date.gregorian.month.en)
                : date.gregorian.month.en}
            </p>
          </div>
          <div className="date-card">
            <h5>{currentLanguage.data.prayerTime[0].hijriDate}</h5>
            <p>{handleNum(date.hijri.date)}</p>
            <p className="border-top pt-3">
              {currentLanguage.data.prayerTime[0].month} :{" "}
              {["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
                ? date.hijri.month.ar
                : date.hijri.month.en}
            </p>
          </div>
        </div>

        <select
          value={country}
          onChange={handleCountryChange}
          className="form-select custom-select"
        >
          {Object.keys(countries).map((countryName) => (
            <option key={countryName} value={countryName}>
              {["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
                ? countryName
                : countries[countryName].nameEn}
            </option>
          ))}
        </select>

        {country && (
          <select
            value={city}
            onChange={handleCityChange}
            className="form-select custom-select mt-3"
          >
            {countries[country] &&
              (["ar", "ur", "ug", "fa"].includes(currentLanguage.id)
                ? countries[country].ar.map((cityName, index) => (
                    <option key={index} value={cityName}>
                      {cityName}
                    </option>
                  ))
                : countries[country].en.map((cityName, index) => (
                    <option key={index} value={cityName}>
                      {cityName}
                    </option>
                  )))}
          </select>
        )}

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="form-select custom-select"
        >
          {currentLanguage.data.prayerTime[0].methods.map((methodOption, i) => (
            <option key={i} value={i + 1}>
              {methodOption}
            </option>
          ))}
        </select>

        <div className="prayer-times-grid">
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Fajr} :{" "}
            </span>
            {convertTime(timings.Fajr)}
          </div>
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Sunrise} :{" "}
            </span>
            {convertTime(timings.Sunrise)}
          </div>
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Dhuhr} :{" "}
            </span>
            {convertTime(timings.Dhuhr)}
          </div>
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Asr} :{" "}
            </span>
            {convertTime(timings.Asr)}
          </div>
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Maghrib} :{" "}
            </span>
            {convertTime(timings.Maghrib)}
          </div>
          <div className="prayer-time-item">
            <span className="prayer-name">
              {currentLanguage.data.prayerTime[0].Isha} :{" "}
            </span>
            {convertTime(timings.Isha)}
          </div>
        </div>
      </div>
    </section>
  );
}
