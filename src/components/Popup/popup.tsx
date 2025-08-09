import { useEffect, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import image from "../../assest/newcondo.jpg";
import { useTranslation } from "react-i18next";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%", // Full width on small screens
    sm: "70%", // 70% width on small and medium screens
    md: "50%", // 50% width on medium screens and above
    lg: "50%", // 50% height on large screens and above
  },
  height: {
    xs: "25%", // Full height on small screens
    sm: "30%", // 70% height on small and medium screens
    md: "30%", // 50% height on medium screens and above
    lg: "45%", // 50% height on large screens and above
  },
  boxShadow: 24,
  padding: 5,
  textAlign: "center",
  backgroundColor: "#7236b2",
  borderRadius: "10px", // Adding rounded corners
};


export default function HomePopup() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isPopUpVisible, setIsPopUpVisible] = useState(true);

  const closePopUp = () => {
    localStorage.setItem("seenPopUp", "true");
    setIsPopUpVisible(false);
  };

  useEffect(() => {
    const hasSeenPopUp = localStorage.getItem("seenPopUp");
    setIsPopUpVisible(!hasSeenPopUp);
  }, []);

  return (
    <div>
      {isPopUpVisible && (
        <Modal
          open={true}
          onClose={closePopUp}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={modalStyle}>
            <img
              src={image}
              alt="Condo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Button
              variant="contained"
              onClick={closePopUp}
              sx={{ mt: 3, backgroundColor: "#ffffff", color: "#7236b2" }}
            >
              {t('close')}
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}
