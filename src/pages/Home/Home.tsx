import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { FaSearch } from "react-icons/fa";
import DropdownProvinince from "../../components/Dropdown/Dropdown_Province";
import DropdownCities from "../../components/Dropdown/Dropdown_Cities";
import DropdownProperty from "../../components/Dropdown/DropdownProperty";
import { useAppContext } from "../../context/AppContext";
import "./Home.css";
import AnimateInView from "../../components/Animation/AnimateInView";
import City from "../../components/City/City";
import Forrent from "../../components/home/ForRent";
import vangvieng from "../../assest/place/vangvieng.jpg";
import vientiane from "../../assest/place/vientiane.jpg";
import lungprabang from "../../assest/place/luagPrabang.jpg";
import savan from "../../assest/place/savanakey.jpg";
import pakse from "../../assest/place/paksecity.webp";
import { Helmet } from "react-helmet-async";
import { GiArchiveResearch } from "react-icons/gi";
import { MdHighQuality } from "react-icons/md";
import { GiChaingun } from "react-icons/gi";
import DropdownMaincity from "../../components/Dropdown/Dropdown_Cities_main";
import ForbuyComponent from "../../components/home/ForBuy";
import ForRecomment from "../../components/home/ForRecomment";
// import ThreeDanimation from "../../components/3D-Animation/3D";
import Promotion from "../../components/home/Promotion";
import VideoProperty from "../../components/VideoProperty/videoproprty";
import VideoLavie from "../../components/VideoProperty/videoLavie";
import VideoContent from "../../components/VideoProperty/videocontent";
import CardPopularRecomment from "../../components/home/CardPopularRecomment";
import Partner from "../../components/Partner/Partner";
import Popup from "../../components/Popup/popup";
import { cities } from "../../locale/laosData/cities";
import { VscSettings } from "react-icons/vsc";
import Newtomartket from "../../components/home/Newtomartket";
import React, { useEffect, useState } from "react";
import main_img from "../../assest/home/home.jpg";
import main_img1 from "../../assest/home/mainbg.png";
import main_img3 from "../../assest/home/mainbg1.png";
import main_img5 from "../../assest/home/mainggb2.png";
import OwnerRent from "../../components/home/OwnerRent";
import OwnerBuy from "../../components/home/OwnerBuy";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import { Box } from "@mui/material";
import champasak from "../../assest/place/champasock.jpg";
import paksong from "../../assest/place/paksongview.jpg";
import Accordion from "../../components/Accordion/Accordion";
import OurProperty from "../../components/OurProperty/ourProperty";
import PopularQuestion from "../../components/PopularQA/popularquestion";
import Plansection from "../../components/Plansection/plansection";

function Home() {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const lang = i18n.language;
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [windowSizeH, setWindowSizeH] = useState(window.innerHeight);

  const {
    updateFilters,
    toggleModal,
    filters,
    Province,
    Cities,
    mCities,
    propertyType,
    propertyStatus,
  } = useAppContext();

  const searchCities = Cities[filters.province as keyof Cities];
  const searchmCities = mCities[filters.province as keyof Cities];

  const updateSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const inputValue = event.target.value;
    updateFilters({ search: inputValue });
  };
  const handleResize = () => {
    setWindowSize(window.innerWidth);
    setWindowSizeH(window.innerHeight);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [main_img, main_img1, main_img3, main_img5]; // Array of background images

  useEffect(() => {
    // Change background image every 5 seconds (5000 ms)
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change this value to control the time between image transitions

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  const pstyle = {
    fontSize:
      windowSize < 600
        ? lang === "cn"
          ? 20
          : windowSizeH < 932
          ? lang === "en"
            ? 19
            : lang === "la"
            ? 23
            : ""
          : ""
        : "",
  };

  return (
    <>
      <Helmet>
        <title> Zion Group - Real Estate</title>
      </Helmet>
      <ContactBTT />

      <div className="home">
        <Box
          sx={{
            position: "relative",
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: {
              xs: windowSize < 400 ? "75vh" : "60vh",
              sm: "90vh",
              lg: "70vh",
            },
            marginTop: { xs: "0px", md: "-70px" },
            transition: "background-image 1s ease-in-out", // Smooth transition between images
          }}
        >
          {/* Video element */}
          {/* <video
            autoPlay
            muted
            loop
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
              opacity: 0.6, // Optional opacity for blending the video with the background
            }}
          >
            <source src={mutedVideo} type="video/mp4" />
          </video> */}

          {/* Overlay and content */}
          <div className="hero-overlay" style={{ zIndex: 2 }}></div>
          <div className="container hero-container" style={{ zIndex: 3 }}>
            <div className="hero-widget">
              <AnimateInView direction="center">
                <h1
                  className="hero-title title-slide font-header line-1 anim-typewriter"
                  style={pstyle}
                  dangerouslySetInnerHTML={{
                    __html: t("home.find_dream_properties"),
                  }}
                ></h1>
               
              </AnimateInView>

              <div className="search-section">
                <ul className="search-tabs">
                  {Object.keys(propertyStatus).map((key, index) => (
                    <li
                      className={
                        filters.status ===
                        propertyStatus[key as keyof PropertyStatus].key
                          ? "tab-active"
                          : ""
                      }
                      onClick={() =>
                        updateFilters({
                          status:
                            propertyStatus[key as keyof PropertyStatus].key,
                        })
                      }
                      key={index}
                    >
                      {
                        propertyStatus[key as keyof PropertyStatus][
                          lang as keyof StatusItem
                        ]
                      }
                    </li>
                  ))}
                </ul>
                <div className="search-form">
                  <div className="search-fields-box">
                    <div className="search-field">
                      <DropdownProvinince
                        setSelection={updateFilters}
                        selection={filters.province}
                        items={Province}
                        filterKey="province"
                        lang={lang}
                      />
                    </div>
                    <div className="search-field">
                      <DropdownMaincity
                        setSelection={updateFilters}
                        selection={filters.mainAreas}
                        items={searchmCities}
                        filterKey="mainAreas"
                        multiSelect={true}
                        lang={lang}
                      />
                    </div>
                    <div className="search-field">
                      <DropdownCities
                        setSelection={updateFilters}
                        selection={filters.areas}
                        items={searchCities}
                        filterKey="areas"
                        multiSelect={true}
                        lang={lang}
                      />
                    </div>
                    <div className="search-field dropdown-property">
                      <DropdownProperty
                        setSelection={updateFilters}
                        selection={filters.properties}
                        items={propertyType}
                        filterKey="properties"
                        multiSelect={true}
                        lang={lang}
                      />
                    </div>
                    <div
                      className="search-field"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <FaSearch
                        style={{
                          position: "absolute",
                          left: 10, // Adjust the position of the icon
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#aaa",
                          fontSize: "16px",
                        }}
                      />
                      <input
                        style={{
                          fontFamily:
                            "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                          paddingLeft: "35px", // Add padding to leave space for the icon
                        }}
                        type="text"
                        value={filters.search}
                        className="search-input dd-selected font-default"
                        onChange={updateSearchQuery}
                        placeholder={t("home.search_property_id_name")}
                      />
                    </div>
                  </div>
                  <div className="" style={{ marginTop: 15 }}>
                    <a
                      className="search-filter"
                      onClick={() => toggleModal("Setting")}
                    >
                      <b style={{ padding: 10 }}>
                        <VscSettings style={{ margin: "auto 2 -3" }} />

                        <b style={{ marginLeft: 10 }}>{t("home.filter")}</b>
                      </b>{" "}
                    </a>
                    <Link to="/explore" className="search-btn cancel">
                      <span style={{ alignItems: "center", padding: 8 }}>
                        <FaSearch style={{ margin: "auto 2 -3" }} />
                        <b style={{ marginLeft: 10 }}>{t("home.search")}</b>
                      </span>{" "}
                    </Link>
                    {/* <button className='search-btn cancel'>{t('home.cancel')}</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>

        <div className="home-page">
          <div className="image" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <section className="feature-section section-padding">
            <div className="container first-title">
              <h1 className="font-subheader">
                {t("home.our_featured_exclusives")}
              </h1>
              <p>{t("home.feature_section_description")}</p>
            </div>
          </section>

          <section>
            {/* <LayoutAnimation /> */}
            {/* <ThreeDanimation /> */}
            <section className="container promotion-section">
              <VideoProperty />
            </section>
            {/* Our recommend */}
            <ForRecomment />
            {/* Rent or buy*/}
            <ForbuyComponent />
            <section className="container promotion-section">
              <Promotion />
            </section>
            <Forrent />
            {/* Rent By Landlord */}
            <OwnerRent type={4} title={t("home.OwnerRent")} />
            {/* Buy By Landlord*/}
            <OwnerBuy type={5} title={t("home.OwnerSale")} />
            <Newtomartket />

            <Popup />
            <CardPopularRecomment />

            <Accordion />
            <OurProperty />
            <PopularQuestion />
            <Plansection />
          </section>
          <section
            className="container video-section"
            style={{ display: "none" }}
          >
            <div className="video-background-container">
              <video autoPlay loop muted className="background-video">
                {/* <source src={mutedVideo} type="video/mp4" /> */}
                {/* <source src={mutedVideo} type="video/webm" /> */}
                Your browser does not support the video tag.
              </video>
              <div className="overlay">
                <h1>{t("zion-property")}</h1>
                <p>{t("zion-property-find")}</p>
              </div>
            </div>
          </section>
          <section style={{ paddingTop: 30 }} className="container">
            <div className="strength">
              <div className="strength-message">
                <div className="strength-list">
                  <GiArchiveResearch className="icon font-header" />
                  <h5 className="font-subheader">{t("home.largest")}</h5>
                  <p>{t("home.largest1")}</p>
                </div>
                <div className="strength-list">
                  <GiChaingun className="icon font-header" />
                  <h5 className="font-subheader">{t("home.professional")}</h5>
                  <p>{t("home.professiona1")}</p>
                </div>
                <div className="strength-list">
                  <MdHighQuality className="icon font-header" />
                  <h5 className="font-subheader">{t("home.free")}</h5>
                  <p>{t("home.free1")}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <Partner />
          </section>

          <section className="popular-places container">
            <h1 className="font-subheader">{t("home.popular-places")}</h1>
            <p>{t("home.popular-desc")}</p>
          </section>
          <section style={{ paddingBottom: 0 }} className="container">
            <div className="province-widget reverse">
              <AnimateInView direction="center">
                <div className="province-item-base">
                  <City
                    img={vientiane}
                    title={Province.vientiane[lang as keyof ProvinceData]}
                    word={"vientiane"}
                  />
                </div>
              </AnimateInView>
            </div>
          </section>

          <section className="province-section container">
            {/* <AnimateInView direction="left"> */}
            <div className="province-widget">
              <div className="province-item">
                <City
                  img={savan}
                  title={Province.savannakhet[lang as keyof ProvinceData]}
                  word={"savannakhet"}
                />
              </div>
              <div className="province-item">
                <City
                  img={pakse}
                  title={Cities.champasak.pakse[lang as keyof cityName]}
                  word={"pakse"}
                />
              </div>
            </div>
            {/* </AnimateInView> */}

            {/* <AnimateInView direction="bottom"> */}
            <div className="province-widget reverse">
              <div className="province-item">
                <City
                  img={paksong}
                  title={cities.champasak.paksong[lang as keyof cityName]}
                  word={"paksong"}
                />
              </div>
              <div className="province-item">
                <City
                  img={vangvieng}
                  title={
                    cities.vientianeprovince.vangvieng[
                      lang as keyof ProvinceData
                    ]
                  }
                  word={"vangvieng"}
                />
              </div>
            </div>
            {/* </AnimateInView> */}

            {/* <AnimateInView direction="right"> */}
            <div className="province-widget">
              <div className="province-item">
                <City
                  img={lungprabang}
                  title={Province.luangprabang[lang as keyof ProvinceData]}
                  word={"luangprabang"}
                />
              </div>
              <div className="province-item">
                <City
                  img={champasak}
                  title={Province.champasak[lang as keyof ProvinceData]}
                  word={"champasak"}
                />
              </div>
            </div>
            {/* </AnimateInView> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
