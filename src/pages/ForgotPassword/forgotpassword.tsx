import "./forgotpassword.css";
import { Typography, Box } from "@mui/material";
// import { styled } from "@mui/system";
import ForgotPassForm from "./forgotPassForm";

import { useTranslation } from "react-i18next";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import { Helmet } from "react-helmet-async";

import imgPC from "../../assest/services/header/gift-zion.jpg";
import imgM from "../../assest/services/header/bgmobilefeedback.jpg";
import AnimateInView from "../../components/Animation/AnimateInView";

const Feedback = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <>
      <Helmet>
        <title>{t("signIn.forgotPassword")} - Zion Group</title>
      </Helmet>
      <ContactBTT />

      <AnimateInView>
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
              minHeight: { xs: "30vh", md: "400px", lg: "500px" }, // Add min-height
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
                width: { xs: 400, md: 700 },
                color: "#fff",
                position: "absolute",
                top: { xs: "20%", md: "25%", lg: "50%" }, // Set different top positions for extra small and large screens
                left: { xs: "50%", md: "35%", lg: "25%" },
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: ["2rem", "3rem", "4rem"],
              }}
              dangerouslySetInnerHTML={{
                __html: `<b>${t("nav.resetpass")}</b> <br/>`,
              }}
            />
          </Box>
        </Box>
      </AnimateInView>

      <div className="subtitle">
        <h2>{t("nav.resetpass-desc")}</h2>
        {/* <p>{t("feedback.sub2")}</p> */}
      </div>
      <ForgotPassForm/>
    </>
  );
};

export default Feedback;
