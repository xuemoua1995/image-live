import "./feedback.css";
import { Typography, Box } from "@mui/material";
// import { styled } from "@mui/system";
import FeedbackForm from "./FeedbackForm";
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
        <title>{t("nav.feedback")} - Zion Group</title>
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
              minHeight: { xs: "40vh", md: "500px", lg: "600px" }, // Add min-height
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
                top: { xs: "12%", md: "25%", lg: "40%" }, // Set different top positions for extra small and large screens
                left: { xs: "50%", md: "35%", lg: "25%" },
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: ["2rem", "3rem", "4rem"],
              }}
              dangerouslySetInnerHTML={{
                __html: `<b>${t("feedback.feedback")}</b> <br/>`,
              }}
            />
            <Typography
              variant="h6"
              align="left"
              sx={{
                width: { xs: 400, md: 700 },
                color: "#fff",
                position: "absolute",
                top: { xs: "85%", md: "60%", lg: "70%" }, // Set different top positions for extra small and large screens
                left: { xs: "50%", md: "35%", lg: "25%" },
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: { xs: 14, md: 25 },
              }}
              dangerouslySetInnerHTML={{
                __html: `<b>${t("feedback.sub2")}</b> <br/>`,
              }}
            />
          </Box>
        </Box>
      </AnimateInView>

      <div className="subtitle">
        <h2>{t("feedback.sub1")}</h2>
        {/* <p>{t("feedback.sub2")}</p> */}
      </div>

      <FeedbackForm />
    </>
  );
};

export default Feedback;
