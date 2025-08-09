import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GrLanguage, GrStatusUnknown } from "react-icons/gr";
import {
  FaHandHoldingHeart,
  FaHome,
  FaHouseUser,
  FaRegHandshake,
  FaRegNewspaper,
  FaUser,
  FaCamera
} from "react-icons/fa";
//import logoB from "../../assest/logo/www.png";
//import logoW from "../../assest/logo/www.png";
import law from "../../assest/logo/law.png";
import lab from "../../assest/logo/lab.png";
import enw from "../../assest/logo/enw.png";
import enb from "../../assest/logo/enb.png";
import cnw from "../../assest/logo/cnw.png";
import cnb from "../../assest/logo/cnb.png";
import "./Nav.css";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { LANGS, LG } from "../../locale/i18n";
import { IoIosAddCircle, IoIosHeart, IoMdSettings } from "react-icons/io";
import {
  IoLogOut,
  IoTimeSharp,
} from "react-icons/io5";

import { useRouter } from "../../router/use-router";
import PrimarySearchAppBar from "./mobile";
import { Box } from "@mui/material";
import { MdOutlineFeedback } from "react-icons/md";
//import { FaHouseMedical } from 'react-icons/fa6';
//import sale from '../../assest/menu/sale.png'
//import rent from '../../assest/menu/rent.png'

function Nav() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const router = useRouter();
  const location = useLocation();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showColor, setShowColor] = useState<Boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<Boolean>(false);
  const { toggleModal, changeLang, language, user, setUser } = useAppContext();
  const langs = LANGS[language];
  const changeNavColor = () => {
    if (window.scrollY >= 80) setShowColor(true);
    else setShowColor(false);
  };

  const toggleShowMobileMenu = () => {
    setShowMobileMenu((showMobileMenu) => !showMobileMenu);
  };

  const handleSignOut = () => {
    setUser(null);
  };
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", changeNavColor);
    return () => {
      window.removeEventListener("scroll", changeNavColor);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isHomePage = location.pathname === "/" ? true : false;
  const logoB = lang === "en" ? enb : lang === "la" ? lab : cnb;
  const logoW = lang === "en" ? enw : lang === "la" ? law : cnw;
  return (
    <>
      {/* <div className="nav-top-header">
        <div>
          <div>
          <IoCallOutline size={30}/>
          </div>
          <ul>
            <li> (+856) 20-91 555 123</li>
            <li> ziongroupsole@163.com</li>
          </ul>
        </div>
        <div>
          <div>
          <IoTimeOutline size={30}/>
          </div>
          <ul>
            <li>{t("mon-sun")}</li>
            <li> 8:00 {t("am")} - 17:00 {t("pm")}</li>
          </ul>
        </div>
      </div> */}
      {windowSize < 1200 ? (
        <>
          <PrimarySearchAppBar
            toggleShowMobileMenu={toggleShowMobileMenu}
            showMobileMenu={showMobileMenu}
            handleSignOut={handleSignOut}
          />
        </>
      ) : (
        <>
          <nav
            className={
              isHomePage && !showColor ? "nav transparent-wrap" : "nav"
            }
          >
            <div className="navbar container">
              <div className="logo">
                <Link to="/">
                  <img
                    src={isHomePage && !showColor ? logoB : logoW}
                    width=""
                    alt="logo"
                  />
                </Link>
              </div>
              {/* on mobile nav End*/}
              <div className="nav-menu">
                <ul className="main-menu">
                  <Link className="nav-dropdown" to="/">
                    <li className="nav-link">{t("nav.home")}</li>
                  </Link>

                  <Link to="/advertise">
                    <li className="nav-link">{t("nav.advertise")}</li>
                  </Link>
                  <Link to="/news">
                    <li className="nav-link">{t("nav.News")}</li>
                  </Link>
                  <a href="/knowledge">
                    <li className="nav-link">{t("nav.Knowledge")}</li>
                  </a>
                  <Link to="/convenient_services">
                    <li
                      className="nav-link"
                      dangerouslySetInnerHTML={{
                        __html: t("nav.Convenient_services"),
                      }}
                    ></li>
                  </Link>
                </ul>
                <div className="nav-local-auth">
                  <div className="nav-link dropdown">
                    {t("nav.aboutUs")}
                    <ul className="dropdown-menu">
                      <li
                        key="1"
                        onClick={() => {
                          router.push("/about");
                        }}
                      >
                        {t("home.contact_us")}
                      </li>
                      <li
                        key="2"
                        onClick={() => {
                          router.push("/story");
                        }}
                      >
                        {t("nav.ourStory")}
                      </li>
                    </ul>
                  </div>
                  <div
                    onClick={() => {
                      router.push("/service");
                    }}
                    className="nav-link dropdown"
                  >
                    {t("nav.our-service")}
                  </div>
                  <div
                    onClick={() => {
                      router.push("/feedback");
                    }}
                    className="nav-link dropdown"
                  >
                    {t("nav.feedback")}
                  </div>
                  <div className="nav-link dropdown">
                    {/*<img src={langs.find((lang: { value: string; }) => lang.value === language)?.icon} width='25' alt='Lang' />*/}
                    <GrLanguage />
                    {langs.find((lg) => lg.value === language)?.label}
                    <ul className="dropdown-menu">
                      {langs.map((langOption: LG) => (
                        <li
                          key={langOption.value}
                          onClick={() => changeLang(langOption.value)}
                        >
                          <img
                            src={langOption.icon}
                            height="12"
                            style={{ marginRight: 5 }}
                            alt="Lang"
                          />
                          {langOption.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {user !== null ? (
                    <div className="nav-link dropdown">
                      <div className="user-name">
                        {user.given_name.charAt(0).toUpperCase()}{" "}
                        {user.family_name.charAt(0).toUpperCase()}
                      </div>
                      <ul className="dropdown-menu" style={{ width: "250px" }}>
                        <li>
                          <Link to="/rental-manager" style={{ color: "black" }}>
                            <FaHouseUser style={{ color: "#582C86" }} />{" "}
                            {t("nav.Manage_Rentals")}{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile?tabs=favourites"
                            style={{ color: "black" }}
                          >
                            <IoIosHeart style={{ color: "#582C86" }} />{" "}
                            {t("nav.favourites")}{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile?tabs=schedules"
                            style={{ color: "black" }}
                          >
                            <IoTimeSharp style={{ color: "#582C86" }} />{" "}
                            {t("nav.schedules")}{" "}
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile?tabs=profile"
                            style={{ color: "black" }}
                          >
                            <IoMdSettings style={{ color: "#582C86" }} />{" "}
                            {t("nav.setting")}{" "}
                          </Link>{" "}
                        </li>
                        <li onClick={handleSignOut}>
                          {" "}
                          <IoLogOut style={{ color: "#582C86" }} />{" "}
                          {t("nav.signOut")}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div
                      className="nav-link sign-in"
                      style={{ width: 100 }}
                      onClick={() => toggleModal("SignIn")}
                    >
                      <FaUser />
                      {t("nav.signIn")}
                    </div>
                  )}
                  <Box
                    className="nav-link sign-in"
                    sx={{ width: 110 }}
                    onClick={() =>
                      user
                        ? router.push("/new-property")
                        : toggleModal("SignIn")
                    }
                  >
                    <Box
                      component="span"
                      sx={{
                        border: "2px solid #ffff",
                        borderRadius: "10px",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <IoIosAddCircle
                        fontSize={lang === "en" || lang === "cn" ? 20 : 16}
                        color="rgb(255, 255, 255, 0.6)"
                        style={{ marginRight: lang === "la" ? 2 : "" }}
                      />
                      <Box
                        sx={{
                          fontSize: lang === "en" || lang === "cn" ? 14 : "",
                        }}
                      >
                        {" "}
                        {t("manage_property.add_property")}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      <div className={`sidebar-mobile ${showMobileMenu && "show"}`}>
        <div className="sidebar-overlay" onClick={toggleShowMobileMenu}></div>
        <div className="sidebar-menu" style={{ background: "#582C86" }}>
          <div className="flex-container-header-moblie">
            <div
              onClick={() => {
                router.push("/");
                toggleShowMobileMenu();
              }}
              className="sidebar-icon-icon icon"
            >
              <img src={logoW} width="70" alt="logo" />
            </div>
            <div
              className="sidebar-close-icon"
              onClick={toggleShowMobileMenu}
            ></div>
          </div>
          <ul className="sidebar-list" style={{ color: "#fff" }}>
            <li
            className="menu-title"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                router.push("/");
                toggleShowMobileMenu();
              }}
            >
              <FaHome style={{ color: "#fff" }} /> <b style={{paddingBottom:10}}>{t("nav.home")}</b>
            </li>

            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/advertise");
                toggleShowMobileMenu();
              }}
            >
              <FaRegHandshake /> <b>{t("nav.advertise")}</b>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/news");
                toggleShowMobileMenu();
              }}
            >
              <FaRegNewspaper /> <b>{t("nav.News")}</b>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/knowledge");
                toggleShowMobileMenu();
              }}
            >
              <GrStatusUnknown /> <b>{t("nav.Knowledge")}</b>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/convenient_services");
                toggleShowMobileMenu();
              }}
            >
              <FaHandHoldingHeart /> <b>{t("nav.Convenient_servicesM")}</b>
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/service");
                toggleShowMobileMenu();
              }}
            >
              <FaCamera /> <b>{t("nav.our-service")}</b>
            </li>
            <li>
              <FaUser /> <span>{t("nav.aboutUs")}</span>
              <ul className="sidebar-list">
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/about#contact");
                    toggleShowMobileMenu();
                  }}
                >
                  <b>{t("nav.contact")}</b>
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/story");
                    toggleShowMobileMenu();
                  }}
                >
                  <b>{t("nav.ourStory")}</b>
                </li>
              </ul>
            </li>
            <li
              style={{ cursor: "pointer", marginTop: -25 }}
              onClick={() => {
                router.push("/feedback");
                toggleShowMobileMenu();
              }}
            >
              <MdOutlineFeedback /> <b>{t("nav.feedback")}</b>
            </li>
          </ul>
          {/*<div style={{ marginBottom: 1 }} className="mobile-sidebarmenu" >
            <div className="icon-placeholder">
              <TfiWorld />
            </div>
            <div className='lang-sideline'>
              <div
                className={`lang-list ${language === 'la' && 'active'}`}
                onClick={() => changeLang('la')}

              >
                {langs.find(lg => lg.value === "la")?.label}
              </div>
              <div
                className={`lang-list ${language === 'en' && 'active'}`}
                onClick={() => changeLang('en')}
              >
                {langs.find(lg => lg.value === "en")?.label}
              </div>
              <div
                className={`lang-list ${language === 'cn' && 'active'}`}
                onClick={() => changeLang('cn')}

              >
                {langs.find(lg => lg.value === "cn")?.label}
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </>
  );
}

export default Nav;
