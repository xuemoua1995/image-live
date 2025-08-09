import React, { useEffect, useState } from "react";
import "./Footer.css";
import logo from "../../assest/logo/logow.png";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";

import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";

import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import wechat from "../../assest/WechatZion.png";
import hotline from "../../assest/hotline.png";
import whatsapp from "../../assest/whatsapp.jpg";
import { IoLogoWechat } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

// import bg from "../../assest/about/help.jpg";
import { FaWhatsapp } from "react-icons/fa";

//import { BiFontSize } from 'react-icons/bi';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { propertyType } = useAppContext();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const location = useLocation();
  const [_isknowledge, setisknowledge] = useState(
    location.pathname === "/knowledge"
  );
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

  useEffect(() => {
    // Perform actions when router changes and isknowledge is true
    if (location.pathname === "/knowledge") {
      setisknowledge(true);
    } else {
      setisknowledge(false);
    }
  }, [location.pathname]);
  const subStyle = {
    margin: windowSize < 600 ? 10 : 0,
    fontSize: windowSize < 600 ? 25 : 30,
    marginTop: 20,
  };
  const pstyle = { fontSize: windowSize < 600 ? 14 : 18 };

  const moreHelpStyle = {
    color: "#582C86",
    marginTop: "0px",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ padding: "25px" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#2C3E50", textAlign:'center' }}>
          <b>{t("knowledge.getMoreHelpTitle")}</b>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <FiPhoneCall
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />
                      <br />
                      <a
                        onClick={() =>
                          window.open(`tel:8562091555123`, "_blank")
                        }
                      >
                        (+856) 20-91 555 123
                      </a>
                    </Box> 
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={hotline} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <IoLogoWechat
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />{" "}
                      <br />
                      <b>{t("knowledge.wechatTitle")}</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={wechat} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <FaWhatsapp
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />{" "}
                      <br />
                      <b>{t("knowledge.whatsappTitle")}</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={whatsapp} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <div className="footer" id="footer">
        <div className="container">
          <div className="company_commitment">
            <h2 style={subStyle}>{t("hotline.title")}</h2>
            <p style={{ textAlign: "justify", marginTop: 10 }}>
              <span
                style={pstyle}
                dangerouslySetInnerHTML={{
                  __html:
                    windowSize < 600
                      ? t("hotline.infosMobile")
                      : t("hotline.infos"),
                }}
              />
            </p>
          </div>
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <hr style={{ width: "50%", border: "0.5px solid #ccc" }} />
          </div>
          <div>
            <div className="title font-subheader" style={{ marginBottom: 40 }}>
              {/*t('footer.categories')*/}
            </div>
            <div
              className=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Object.keys(propertyType)
                .filter((key) => propertyType[key][lang])
                .map((key, index) => (
                  <a
                    className="aaaaaa"
                    key={index}
                    href={"/explore/page/1?types=" + key}
                    style={{
                      fontSize: 24,
                      wordWrap: "break-word",
                      margin: "20px",
                    }}
                  >
                    {propertyType[key][lang]}
                  </a>
                ))}
            </div>
          </div>
          <div className="footer-wrapper">
            <main className="footer-widget">
              <div className="footer-icon">
                <img src={logo} alt="" />
              </div>
              <div className="footer-desc">
                <p
                  style={{ textAlign: "center" }}
                  className="font-title"
                  dangerouslySetInnerHTML={{
                    __html: ` © ${new Date().getFullYear()} Zion Group Sole Co., Ltd.`,
                  }}
                />
              </div>
              {
                <ul className="footer-socials font-subheader">
                  <a
                    href="https://www.facebook.com/profile.php?id=61554763555021"
                    target="_blant"
                  >
                    {" "}
                    <li>
                      {" "}
                      <FaFacebookF />
                    </li>{" "}
                  </a>
                  <Link
                    to="https://www.youtube.com/@ZionGroup-m9v"
                    target="_blant"
                  >
                    <li>
                      {" "}
                      <FaYoutube />{" "}
                    </li>
                  </Link>
                  <Link
                    to="https://www.tiktok.com/@zionrealestatelao?lang=en"
                    target="_blant"
                  >
                    <li>
                      {" "}
                      <FaTiktok />{" "}
                    </li>
                  </Link>
                </ul>
              }
              {/*<Box onClick={() => window.location.href = '/feedback'} sx={{ mt: 2, cursor: 'pointer', border: '1px solid #ffffff', padding: '2px', borderRadius: 2, width: '50%'}}>
               {t('feedback.Give_feedback')}
            </Box>*/}
            </main>
          </div>
          <div style={{ marginTop: 30, marginBottom: 10 }}>
            <span>{t("footer.develop-by")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
