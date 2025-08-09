import { Avatar, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoCallOutline, IoLogoWechat, IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import wechat from "../../assest/WechatZion.png";
import whatsapp from "../../assest/whatsApp.jpeg";
import qrphone from "../../assest/img/qr phone.png";
import qremail from "../../assest/img/qr email.png";

const ContactInfomation = () => {
  const { t } = useTranslation();
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };
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
    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Call the function on component mount
    scrollToContact();

    // Add a listener to handle scrolling when the hash changes
    window.addEventListener("hashchange", scrollToContact);

    // Cleanup the listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", scrollToContact);
    };
  }, []);
  const subStyle = {
    margin: windowSize < 600 ? 10 : 0,
    fontSize: windowSize < 600 ? 25 : 30,
    marginTop: 20,
  };
  const cStyle = {
    fontSize: windowSize < 600 ? 16 : 14,
  };
  const Mstyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
  };
  const imgstyle = {
    height: windowSize < 600 ? 100 : 70,
    marginBottom: "15px",
  };
  return (
    <Box sx={{ mt: 5 }}>
      <Box className="container">
        <Box className="background">
          <h2 style={subStyle}>
            <b>{t("Our_contact")}</b>
          </h2>
          <Grid
            container
            spacing={5}
            sx={{
              marginTop: 1,
              marginLeft: windowSize < 600 ? 5 : "-40px",
              maxWidth: windowSize < 600 ? "75%" : null,
            }}
            className="company_commitment"
          >
            <Grid
              className={windowSize < 600 ? "linetB" : "linett"}
              style={{ paddingLeft: 0 }}
              sx={Mstyle}
              item
              xs={12}
              sm={6}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Avatar>
                <IoCallOutline />
              </Avatar>
              <Box>
                <p style={{ ...cStyle, marginTop: 5 }}>
                  {t("contact.hotline")}
                </p>
                <img src={qrphone} alt="" style={imgstyle} />

                <Box>
                  <a
                    onClick={() => window.open(`tel:8562091555123`, "_blank")}
                    // href="mailto:aqsiqexpert@163.com"
                    // target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "bold",
                      ...cStyle,
                    }}
                  >
                    (+856) 20-91 555 123
                  </a>
                </Box>
              </Box>
            </Grid>
            <Grid
              className={windowSize < 600 ? "linetB" : "linett"}
              style={{ paddingLeft: 0 }}
              item
              xs={12}
              sm={6}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
              sx={Mstyle}
            >
              <Avatar style={{ marginBottom: 10 }}>
                <IoLogoWechat />
              </Avatar>
              <Box>
                <p style={{ ...cStyle }}>{t("knowledge.wechatTitle")}</p>
                <img src={wechat} alt="" style={imgstyle} />
                <br />
                <p
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "bold",
                    ...cStyle,
                  }}
                >WeChat ID: Zion_Real_Estate</p>
              </Box>
            </Grid>
            <Grid
              className={windowSize < 600 ? "linetB" : "linett"}
              style={{ paddingLeft: 0 }}
              item
              xs={12}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
              sx={Mstyle}
            >
              <Avatar style={{ marginBottom: 10 }}>
                <IoLogoWhatsapp />
              </Avatar>
              <Box>
                <p style={{ ...cStyle }}>{t("knowledge.whatsappTitle")}</p>
                <Box style={{}}>
                  <img src={whatsapp} alt="" style={imgstyle} />
                  <br />
                  <a
                    href="https://wa.me/+8562091555123"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      ...cStyle,
                    }}
                  >
                    (+856) 20-91 555 123
                  </a>
                </Box>
              </Box>
            </Grid>
            <Grid
              style={{ paddingLeft: 0 }}
              item
              xs={12}
              sm={6}
              md={3}
              container
              justifyContent="center"
              alignItems="center"
              sx={Mstyle}
            >
              <Avatar>
                <MdOutlineEmail />
              </Avatar>
              <Box>
                <p style={{ ...cStyle, marginTop: 5 }}>
                  {t("edit_profile.email")}
                </p>
                <img src={qremail} alt="" style={imgstyle} />

                <Box style={{ marginBottom: "15px" }}>
                  <a
                    href="mailto:ziongroupsole@163.com"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "bold",
                      marginBottom: "15px",
                      ...cStyle,
                    }}
                  >
                    ziongroupsole@163.com
                  </a>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactInfomation;
