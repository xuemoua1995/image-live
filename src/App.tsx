import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Story from "./pages/Story/Story";
import ScrollToTop from "./resetRouter";
import { useTranslation } from "react-i18next";
import { useAppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import Nav from "./layout/Nav/Nav";
import Home from "./pages/Home/Home";
import Footer from "./layout/Footer/Footer";
import Explore from "./pages/Explore/Explore";
import FilterFacility from "./pages/Explore/FilterFacility";
import Detail from "./pages/Detail/Detail";
import About from "./pages/About/About";
import FilterModal from "./pages/Explore/FilterModal";
import Map from "./components/Map/Map";
import SignIn from "./pages/SignIn/SignIn";
import UserProfile from "./pages/Userprofile/Userprofile";
import News from "./pages/News/News";
import Knowledge from "./pages/Knowledge/Knowledge";

import Forsale from "./pages/Forsale/Forsale";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import NewsOne from "./pages/News/News_one";
import ManageRentals from "./pages/Userprofile/manageRentals/manageRentals";
import SignInPage from "./pages/SignInpage/SignIn";
import Convenient from "./pages/convenient/convenient";
import AddNewproperty from "./pages/Userprofile/manageRentals/new";
import Feedback from "./pages/Feedback/Feedback";
import Services from "./pages/OurService/service";
import Forgotpass from "./pages/ForgotPassword/forgotpassword";
import ResetPassword from "./pages/ForgotPassword/resetPassword";
import VRImage from "./pages/VRImage/VR";
import NotFound404 from "./pages/NotFound/NotFound404";

// tracking user visit website
import ReactGA from "react-ga4"; // GA4 version

const TRACKING_ID = "G-HDEXMC114J"; // Replace with your Google Analytics tracking ID

// const chineseFont = 'Microsoft Yahei';
const engFont =
  "Nexa, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
const laoFont = "NotoSanLao";
//const chFont = "ChinaFont";

function App() {
  const { i18n } = useTranslation(); // Initialize useTranslation
  const theme = createTheme({
    typography: {
      fontFamily: i18n.language == "en" ? engFont : laoFont,
    },
  });

  const { isModalOpen, modalType, user } = useAppContext();
  const RedirectToExplorePage = () => {
    return <Navigate to="/explore/page/1" replace={true} />;
  };

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send("pageview"); // Send pageview on the initial load
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <div className={`App ${isModalOpen && "modal-open"} font-default`}>
          <BrowserRouter>
            <Box
              sx={{
                fontFamily:
                  i18n.language == "en"
                    ? engFont
                    : i18n.language == "la"
                    ? laoFont
                    : laoFont,
              }}
            >
              <ScrollToTop />
              {/* nav */}
              <Nav />

              {/* pages */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/explore" element={<RedirectToExplorePage />} />
                <Route path="/explore/page/:page" element={<Explore />} />
                <Route
                  path="/filter-facility/page/:page"
                  element={<FilterFacility />}
                />
                <Route path="/property/:id" element={<Detail />} />
                <Route path="/about" element={<About />} />
                <Route path="/story" element={<Story />} />
                <Route path="/advertise" element={<Forsale />} />
                <Route
                  path="/profile"
                  element={user ? <UserProfile /> : <Navigate to="/login" />}
                />
                <Route
                  path="/rental-manager"
                  element={user ? <ManageRentals /> : <Navigate to="/login" />}
                />
                <Route
                  path="/new-property"
                  element={user ? <AddNewproperty /> : <Navigate to="/login" />}
                />
                <Route path="/news" element={<News />} />
                <Route path="/news/item/:id" element={<NewsOne />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/convenient_services" element={<Convenient />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/service" element={<Services />} />
                <Route path="/forgotpassword" element={<Forgotpass />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/vr-image" element={<VRImage />} />
                <Route path="/404" element={<NotFound404 />} />
              </Routes>

              {/* modal */}
              <FilterModal type={modalType} />
              <Map type={modalType} />
              <SignIn type={modalType} />

              {/* footer */}
              <Footer />
              <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
              />
            </Box>
          </BrowserRouter>
        </div>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;
