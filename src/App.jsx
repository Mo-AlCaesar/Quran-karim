import { Outlet } from "react-router-dom";
import { useLayoutEffect, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { QuranProvider, QuranContext } from "./store/quran-context.jsx";
import { Tooltip } from "react-tooltip";
import Navbar from "./components/partials/Navbar/Navbar.jsx";
import Loading from "./components/partials/Loading/Loading.jsx";
import Home from "./components/pages/Home/Home.jsx";

const Readers = lazy(() => import("./components/pages/Readers/Readers.jsx"));
const Reader = lazy(() =>
  import("./components/pages/Readers/Reader/Reader.jsx")
);
const Quran = lazy(() => import("./components/pages/HolyQuran/Home.jsx"));
const Surah = lazy(() =>
  import("./components/pages/HolyQuran/Quran/Quran.jsx")
);
const LiveStream = lazy(() =>
  import("./components/pages/LiveStream/LiveStream.jsx")
);
const Radio = lazy(() => import("./components/pages/Radio/Radio.jsx"));
const PrayerTimes = lazy(() =>
  import("./components/pages/PrayerTimes/PrayerTimes.jsx")
);
const Tasbeeh = lazy(() => import("./components/pages/Sebha/Sebha.jsx"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar page={pathname} />
      <Tooltip
        className="custom-tooltip"
        id="custom-title"
        place="top"
        effect="solid"
      />
      <Tooltip
        className="custom-tooltip"
        id="custom-title-bottom"
        place="bottom"
        effect="solid"
      />
      <Outlet />
    </>
  );
}

function AppRoutes() {
  useEffect(() => {
    document.body.classList.add(localStorage.getItem("currentTheme"));
  }, []);

  const { pathname } = useLocation();
  if (pathname === "/home") {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home QuranContext={QuranContext} />} />
          <Route path="home" element={<Home QuranContext={QuranContext} />} />
          <Route path="quran" element={<Quran QuranContext={QuranContext} />} />
          <Route
            path="reader"
            element={<Readers QuranContext={QuranContext} />}
          />
          <Route
            path="reader/:id"
            element={<Reader QuranContext={QuranContext} />}
          />
          <Route
            path="quran/surah/:id"
            element={<Surah QuranContext={QuranContext} pathname={pathname} />}
          />
          <Route
            path="quran/juz/:id"
            element={<Surah QuranContext={QuranContext} pathname={pathname} />}
          />
          <Route
            path="quran/page/:id"
            element={<Surah QuranContext={QuranContext} pathname={pathname} />}
          />
          <Route
            path="quran/hizb/:id"
            element={<Surah QuranContext={QuranContext} pathname={pathname} />}
          />
          <Route path="radio" element={<Radio QuranContext={QuranContext} />} />
          <Route
            path="live"
            element={<LiveStream QuranContext={QuranContext} />}
          />
          <Route
            path="prayer"
            element={<PrayerTimes QuranContext={QuranContext} />}
          />
          <Route
            path="sebha"
            element={<Tasbeeh QuranContext={QuranContext} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <QuranProvider>
        <ScrollToTop />
        <AppRoutes />
      </QuranProvider>
    </Router>
  );
}

export default App;
