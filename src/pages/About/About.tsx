import "./About.css";
//import wechat from '../../assest/wechat.jpg'
//import whatsapp from '../../assest/whatsapp.jpg'
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import bg from "../../assest/about/Image_20240314155718.jpg";
import { Box, Grid, Typography, styled } from "@mui/material";
// import ContactComponent from "../Detail/Contact";
import { useAppContext } from "../../context/AppContext";
import Request from "../../components/Request/Request";
import ContactInfomation from "./contactInfomation";
import ContactBTT from "../../components/contactBtt/ContactBTT";
// import { LG } from '../../locale/i18n';
import AnimateInView from "../../components/Animation/AnimateInView";
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function About() {
  const { modalType } = useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    // Function to handle scrolling to the target element
    const scrollToContact = () => {
      const { hash } = window.location;
      if (hash) {
        const targetElement = document.getElementById(hash.substring(1));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Call the function on component mount
    scrollToContact();

    // Add a listener to handle scrolling when the hash changes
    window.addEventListener("hashchange", scrollToContact);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("hashchange", scrollToContact);
    };
  }, []);
  //const styleH = { fontSize: windowSize < 600 ? 34 : 40 }

  return (
    <>
      <Helmet>
        <title>{t("about.hero.title")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView direction="center">
        <div className="sc-pqvou8-0 grbKwn">
          <header className="sc-50qjnk-0 dNUTcE">
            <picture className="sc-1mn78nr-0 bUtRth">
              <div style={{ backgroundColor: "red" }}>
                <img
                  src={bg}
                  loading="eager"
                  id="1610"
                  className="imgSell fiBXdZ"
                  alt="Header Image"
                />
              </div>
            </picture>
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: "#fff",
                position: "absolute",
                top: { xs: "70%", lg: "50%" }, // Set different top positions for extra small and large screens
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: ["2rem", "3rem", "4rem"],
              }}
              dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
            />
          </header>
        </div>
      </AnimateInView>

      <div>
        <Box className="container about-zion">
          <Grid spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Item>
                <Box sx={{ fontSize: "2.5rem" }}>{t("about.Our_location")}</Box>
              </Item>
              <Item>
                <Box sx={{ fontSize: "1.5rem" }}>{t("about.Headquarter")}</Box>
              </Item>
              <Item
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    mt: 2,
                    textAlign: "left",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    padding: "15px",
                    // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 3,
                    cursor: "pointer",
                    // "&:hover": {
                    //   boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)", // Change boxShadow on hover
                    // },
                  }}
                >
                  <b>{t("about.Address")}: </b>

                  <span>{t("about.Address2")}</span>
                  {/* <span
                  dangerouslySetInnerHTML={{ __html: t("about.Address2") }}
                /> */}
                </Box>
              </Item>
              <Item sx={{ mt: 2 }}>
                <Box
                  style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <iframe
                    width="100%"
                    height="450"
                    title="Google Map"
                    src={`https://maps.google.com/maps?q=17.972472,102.578944&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </Box>
              </Item>
            </Grid>
            {/* <Grid item xs={12} md={2} lg={2}>
              <Box width={1200} sx={{ ml: {xs:-20, md: -40, lg:-35 }, xs:{width:100}, md:{width:100},  }}>
                {" "}
                <ContactComponent
                  property={null}
                  author={null}
                  title={t("about.Contact_us")}
                />
              </Box>
          </Grid> */}
          </Grid>
        </Box>
      </div>

      <ContactInfomation />

      <Box className="about-page">
        <Box className="about-intro">
          <Box className="container about-contact" style={{ maxWidth: 2000 }}>
            {/*<h1>{t('about.intro.title')}</h1>*/}
            <p
              style={{ textAlign: "start" }}
              className="font-title"
              dangerouslySetInnerHTML={{ __html: t("about.intro.content") }}
            />
          </Box>
        </Box>
      </Box>
      <Request type={modalType} property={null} author={""} />
    </>
  );
}

export default About;
