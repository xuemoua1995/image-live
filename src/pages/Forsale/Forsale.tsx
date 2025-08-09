import { Box, Grid } from "@mui/material/";
import { FaAngleRight, FaCheck } from "react-icons/fa";
import "./Forsale.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import AgentModal from "../../components/Agent/AgentModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import img1 from "../../assest/img/10000.jpg";
import img2 from "../../assest/img/10001.jpg";
import img3 from "../../assest/about/vientianes.jpg";
import client from "../../assest/corperation/client1.png";
import woner from "../../assest/corperation/owner1.png";
import { useRouter } from "../../router/use-router";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import AnimateInView from "../../components/Animation/AnimateInView";
import poolside from '../../assest/corperation/Poolside.webp'
export default function Forsale() {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const lang = i18n.language;
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { modalType, toggleModal, user } = useAppContext();
  const router = useRouter();

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const listItems = [
    t("forsale.sell_traditionally.why_sell_traditionally.list.list1"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list2"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list3"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list4"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list5"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list6"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list7"),
    t("forsale.sell_traditionally.why_sell_traditionally.list.list8"),
  ];
  const bgss = {
    backgroundImage: `url(${img3})`,
    backgroundSize: "cover", // Cover the entire header area
    backgroundPosition: "center", // Center the background image
  };
  return (
    <>
      <Helmet>
        <title style={{fontFamily:
                          'Times New Roman, "PT Serif", "NotoSanLao", Times, serif'}}>{t("nav.advertise")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView>
      <div className="grbKwn" style={bgss}>
        <header
          className="dNUTcE"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="Spacer-c11n-8-99-0__sc-17suqs2-0 gpXWHo"></div>
          {/* <h3
            className="jvYpug hUFKQo h1sssss"
            dangerouslySetInnerHTML={{ __html: t("forsale.header.title") }}
          /> */}
        </header>
      </div>
      </AnimateInView>
     
      <div className="titleClass">{t("nav.advertise")}</div>
      <div className="grbKwn">
        <div id="1" className="hRWLII">
          <AnimateInView direction="right">
            <section className="home-banner">
              <img
                src={poolside}
                alt=""
              />
              <div className="banner-text">
                <h1 className="goCPUH hUFKQo">
                  {t("forsale.options.sell_partner_agent.title")}
                </h1>
                <p
                  className="font-title text-style"
                  style={{
                    lineHeight: lang === "en" ? 1.7 : "inherit", // Set a default value if lang is not "cn"
                    textAlign: 'justify',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t("forsale.options.sell_partner_agent.description"),
                  }}
                />
              </div>
            </section>
          </AnimateInView>
          <AnimateInView direction="left">
            <section className="home-banner reverse">
              <img src={img1} alt="" />
              <div className="banner-text">
                <h1 className="goCPUH hUFKQo">
                  {t("forsale.options.sell_opendoor.title")}
                </h1>
                <p
                  className="font-title text-style"
                  style={{
                    lineHeight: lang === "en" ? 1.7 : "inherit", // Set a default value if lang is not "cn"
                    textAlign: 'justify',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t("forsale.options.sell_opendoor.description"),
                  }}
                />
              </div>
            </section>
          </AnimateInView>
          <AnimateInView direction="center">
            <section className="home-banner">
              <img src={img2} alt="" />
              <div className="banner-text">
                <h1 className="goCPUH hUFKQo">
                  {t("forsale.options.sell_agent.title")}
                </h1>
                <p
                  className="font-title text-style"
                  style={{
                    lineHeight: lang === "cn" ? 1.7 : "inherit", // Set a default value if lang is not "cn"
                    textAlign: 'justify',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t("forsale.options.sell_agent.description"),
                  }}
                />
              </div>
            </section>
          </AnimateInView>
        </div>
        <section id="2" className="kEEqpb">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <div className="btn-knowledge">
                  <Grid container spacing={2}>
                    {
                      <Grid item xs={12} sm={4}>
                        <div className="gXktJd">
                          <div className="foHGRe jAxOVw">
                            <a
                              onClick={() =>
                                user
                                  ? router.push("/rental-manager")
                                  : toggleModal("SignIn")
                              }
                              className="kdwlNk"
                            >
                              {t("manage_property.add_property")}
                            </a>
                          </div>
                        </div>
                      </Grid>
                    }
                    <Grid item xs={12} sm={4}>
                      <div className="gXktJd">
                        <div className="foHGRe jAxOVw">
                          <Link to="/about#contact">
                            <li
                              style={{ background: "rgb(161, 47, 47)" }}
                              className="kdwlNk"
                            >
                              {t("forsale.sell_traditionally.contact_us")}
                            </li>
                          </Link>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <div style={{ paddingTop: 48 }}></div>
                </div>
              </Grid>

              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12} sm={12}>
                  <AnimateInView direction="center">
                    <Box className="grid-item">
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          alignItems: "center",
                          marginBottom: 3,
                        }}
                      >
                        {/* Image icon */}
                        <img
                          src={client}
                          alt="Icon"
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                        {/* Title */}
                        <h2 style={{ margin: 0 }}>
                          {t("forsale.more.one.title")}
                        </h2>
                      </Box>
                      <p className="paragraph" style={{ textAlign: 'justify' }}>
                        <FaAngleRight /> {t("forsale.more.one.infos")}
                      </p>
                      <p className="paragraph" style={{ textAlign: 'justify' }}>
                        <FaAngleRight /> {t("forsale.more.one.infos2")}
                      </p>
                    </Box>
                  </AnimateInView>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <AnimateInView direction="center">
                    <Box className="grid-item">
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          alignItems: "center",
                          marginBottom: 3,
                        }}
                      >
                        {/* Image icon */}
                        <img
                          src={woner}
                          alt="Icon"
                          style={{ width: "100px", marginRight: "10px" }}
                        />
                        {/* Title */}
                        <h2 style={{ margin: 0 }}>
                          {t("forsale.more.two.title")}
                        </h2>
                      </Box>
                      <p className="paragraph" style={{ textAlign: 'justify' }}>
                        <FaAngleRight /> {t("forsale.more.two.infos")}
                      </p>
                      <p className="paragraph" style={{ textAlign: 'justify' }}>
                        <FaAngleRight /> {t("forsale.more.two.infos2")}
                      </p>
                    </Box>
                  </AnimateInView>
                </Grid>
              </Grid>
              <AnimateInView direction="center">
                <Grid
                  item
                  xs={12}
                  className="Showwww"
                  style={{
                    display: windowSize < 600 ? "contents" : "flex",
                    marginTop: windowSize < 600 ? 25 : 0,
                  }}
                >
                  <Grid item xs={12} sm={12}>
                    <h3 className="cXHQiH" style={{ padding: 10 }}>
                      {t("forsale.sell_traditionally.title")}
                    </h3>
                    <ul className="gQolNJ">
                      {listItems.map((item, index) => (
                        <li
                          key={index}
                          className="hnwVfO daYpon circle-check-li"
                        >
                          <FaCheck />{" "}
                          <span style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </AnimateInView>
            </Grid>
          </Box>
        </section>
      </div>
      <AgentModal type={modalType} />
    </>
  );
}
