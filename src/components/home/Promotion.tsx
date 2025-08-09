import { useState, useEffect, useCallback } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Box, MobileStepper, Button } from "@mui/material";
// import { Box } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

// import img_promote1 from "../../assest/services/header/WechatIMG1.jpg";
// import img_promote2 from "../../assest/services/header/WechatIMG38.jpg";
// import img_promote3 from "../../assest/services/header/banner.jpg";
// import img_promote4 from "../../assest/services/header/bannerzion.jpg";

// import { APIGET } from "../../helper/api";

import axios from "axios";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const tutorialSteps = [
//   {
//     label: "image",
//     imgPath: img_promote1,
//   },
//   {
//     label: "image",
//     imgPath: img_promote2,
//   },
//   {
//     label: "image",
//     imgPath: img_promote3,
//   },
//   {
//     label: "image",
//     imgPath: img_promote4,
//   }
// ];

const HalfHeightCarousel = () => {
  const [promotion, setPromotion] = useState<Promotion[]>([]);

  const getPromotion = useCallback(async () => {
    try {

      // const res = await APIGET('/promotion');

      const res = await axios.get("https://api.zionrealestates.com/promotion");

      const data = res?.data?.data?.promotion;

      if (res.status === 200) {
        setPromotion(data || []); // Ensure default empty array if no data
      } else {
        console.log("Failed to fetch promotions data:", res);
      }
    } catch (err) {
      console.error("Error fetching promotion data:", err);
    }
  }, []);

  const handleImageClick = (step: Promotion) => {
    console.log("Image clicked:", step.property_url);
    window.location.href = `${step.property_url}`;
  };

  useEffect(() => {
    getPromotion();
  }, [getPromotion]);

  // const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const slidesPerStep = isLargeScreen ? 2 : 1;
  const maxSteps = Math.ceil(promotion.length / slidesPerStep);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1, borderRadius: 5}}>
      {/* <h2 className="promotion-title">{t("home.promotion")}</h2> */}

      {/* <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: { xs: "-35px", sm: "-20px" },
          height: 50,
          pl: 2,
        }}
      /> */}

      <AutoPlaySwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {Array.from({ length: maxSteps }).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              borderRadius: 5,
              flexDirection: { xs: "column", sm: "row" },
              gap: { sm: 2, lg: 2 }, // Add spacing between the slides
            }}
          >
            {promotion
              .slice(
                index * slidesPerStep,
                index * slidesPerStep + slidesPerStep
              )
              .map((step, stepIndex) => (
                <Box
                  key={stepIndex}
                  sx={{
                    // width: { xs: "100%", sm: "700px", lg: "1200px" },
                    // height: { xs: "160px", sm: "250px", lg: "380px" },
                    overflow: "hidden",
                    mb: { xs: 0, sm: 0, lg: 0 },
                    cursor: "pointer", // Change cursor to pointer to indicate clickability
                  }}
                  onClick={() => handleImageClick(step)} // Handle image click event
                >
                  <Box
                    component="img"
                    sx={{
                      display: "block",
                      borderRadius: 5, // Adjust the radius as needed
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src={step.cover}
                    alt={step.cover}
                  />
                </Box>
              ))}
          </Box>
        ))}
      </AutoPlaySwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ fontSize: { xs: "10px", sm: "12px" } }}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ fontSize: { xs: "10px", sm: "12px" } }}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    </Box>
  );
};

export default HalfHeightCarousel;
