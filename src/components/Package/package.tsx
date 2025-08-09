import { Box, Grid, Typography } from "@mui/material";

import "./package.css";

import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import imgPC from "../../assest/services/header/headerPc.jpg";
import imgM from "../../assest/services/header/headerM.jpg";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import AnimateInView from "../../components/Animation/AnimateInView";
import imgService from "../../assest/menu/photography.png";
import { FaCheckCircle } from "react-icons/fa";
import wechat from "../../assest/WechatZion.png";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Convenient = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [openQR, setOpenQR] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenQR = () => {
    setOpenQR(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h2
            style={{
              marginTop: 10,
              fontFamily:
                "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
            }}
          >
            {t("Our_contact")}
          </h2>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() =>
                    window.open(`https://wa.me/+8562091555123`, "_blank")
                  }
                  sx={{
                    textTransform: "none",
                    borderColor: "#25D366",
                    width: "100%",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Add shadow on hover
                    },
                  }}
                >
                  <FaWhatsapp
                    size={25}
                    style={{ margin: 0, marginRight: 2, color: "#25D366" }}
                  />{" "}
                  Whatsapp
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClickOpenQR}
                  sx={{
                    textTransform: "none",
                    borderColor: "#09B83E",
                    width: "100%",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Add shadow on hover
                    },
                  }}
                >
                  <IoLogoWechat
                    size={20}
                    style={{ margin: 0, marginRight: 2, color: "#09B83E" }}
                  />{" "}
                  Wechat
                </Button>
              </Box>
              <Box
                sx={{
                  padding: 2,
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => window.open(`tel:8562091555123`, "_blank")}
                  sx={{
                    textTransform: "none",
                    borderColor: "#25D366",
                    width: "100%",
                    "&:hover": {
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Add shadow on hover
                    },
                  }}
                >
                  <FaPhoneAlt
                    size={20}
                    style={{ margin: 0, marginRight: 10, color: "#25D366" }}
                  />{" "}
                  (+856) 20-91 555 123
                </Button>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              {t("close")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openQR}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <h4 style={{ textAlign: "center" }}>Wechat QR code</h4>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* Center the image */}
              <div style={{ textAlign: "center" }}>
                <img
                  src={wechat}
                  alt="WeChat QR code"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseQR} autoFocus>
              {t("close")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Helmet>
        <title> {t("nav.our-service")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView direction="center">
        <Box
          component="div"
          className="grbKwn"
          sx={{
            backgroundImage: { xs: `url("${imgM}")`, md: `url("${imgPC}")` },
            backgroundSize: "cover",
          }}
        >
          <Box
            component={"header"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderBottom: "2px solid #fff",
              position: "relative", // To contain absolutely positioned Typography
              minHeight: { xs: "40vh", md: "500px", lg: "550px" }, // Add min-height
              color: "rgb(255, 255, 255)", // Add text color
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingTop: "18%",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <Typography
              variant="h2"
              align="left"
              sx={{
                width: "100%",
                color: "#fff",
                position: "absolute",
                top: { xs: "80%", md: "40%", lg: "50%" }, // Set different top positions for extra small and large screens
                left: { xs: "50%", md: "40%", lg: "30%" },
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: ["2rem", "3rem", "4rem"],
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html: `<b>${t("nav.our-service-sub")}</b>`,
              }}
            />
          </Box>
        </Box>
      </AnimateInView>

      <Grid container spacing={1}>
        {/* Main Services Section */}
        <Grid container spacing={2} sx={{ padding: { xs: 3, md: 5 } }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="left"
              sx={{
                fontSize: { xs: "23px", md: "30px", lg: "40px" },
                marginTop: { xs: "60px", sm: "10px", lg: "10px" },
                textAlign: "center",
              }}
              gutterBottom
            >
              <b className="services-title">{t("nav.service-package")}</b>
            </Typography>
          </Grid>

          <div className="package-body">
            <div className="package-service">
              <div className="wrapper">
                <header>
                  <div className="package-img">
                    <img src={imgService} alt="" />
                  </div>
                </header>
                <div className="card-area">
                  <div className="cards-package">
                    <div className="row row-1">
                      <div className="price-details">
                        <span className="price">150</span>
                        <p>{t("package1.title")}</p>
                      </div>
                      <ul className="features">
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package1.list1")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package1.list2")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package1.list3")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package1.list4")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package1.list5")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    fontFamily:
                      "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                  }}
                  onClick={handleClickOpen}
                >
                  {t("home.contact_us")}
                </button>
              </div>
              <div className="wrapper">
                <header>
                  <div className="package-img">
                    <img src={imgService} alt="" />
                  </div>
                </header>
                <div className="card-area">
                  <div className="cards-package">
                    <div className="row row-1">
                      <div className="price-details">
                        <span className="price">250</span>
                        <p>{t("package2.title1")}</p>
                      </div>
                      <ul className="features">
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package2.list1")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package2.list2")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package2.list3")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package2.list4")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package2.list5")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    fontFamily:
                      "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                  }}
                  onClick={handleClickOpen}
                >
                  {t("home.contact_us")}
                </button>
              </div>
            </div>
            <div className="package-service" style={{ marginTop: 40 }}>
              <div className="wrapper">
                <header>
                  <div className="package-img">
                    <img src={imgService} alt="" />
                  </div>
                </header>
                <div className="card-area">
                  <div className="cards-package">
                    <div className="row row-1">
                      <div className="price-details">
                        <span className="price1">300</span>
                        <p>{t("package3.title")}</p>
                      </div>
                      <ul className="features">
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package3.list1")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package3.list2")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package3.list3")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package3.list4")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package3.list5")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    fontFamily:
                      "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                  }}
                  onClick={handleClickOpen}
                >
                  {t("home.contact_us")}
                </button>
              </div>
              <div className="wrapper">
                <header>
                  <div className="package-img">
                    <img src={imgService} alt="" />
                  </div>
                </header>
                <div className="card-area">
                  <div className="cards-package">
                    <div className="row row-1">
                      <div className="price-details">
                        <span className="price1">400</span>
                        <p>{t("package4.title")}</p>
                      </div>
                      <ul className="features">
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package4.list1")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package4.list2")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package4.list3")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package4.list4")}</span>
                        </li>
                        <li>
                          <FaCheckCircle color="#582C86" />
                          <span>{t("package4.list5")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  style={{
                    fontFamily:
                      "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                  }}
                  onClick={handleClickOpen}
                >
                  {t("home.contact_us")}
                </button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Convenient;
