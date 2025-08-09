import React from "react";
import "./ChatBox.css"; // CSS file for styling
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, Divider } from "@mui/material"; // Import Material-UI components
import WeChatQRCode from "../../assest/WechatZion.png"; // Import WhatsApp icon image
import WhatsAppIcon from "../../assest/whatsapp.jpg"; // Import WeChat QR code image
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  handleChatboxToggle: () => void;
}

const ChatBox: React.FC<Props> = ({ handleChatboxToggle }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        zIndex: 100,
        position: "fixed",
        bottom: "0px",
        right: "2px",
        width: "190px",
        border: "1px solid #ccc",
        borderRadius: "10px 10px 0 0",
        backgroundColor: "#fff",
        transition: "box-shadow 0.3s", // Add transition for smooth effect
        "&:hover": {
          boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.5)",
        },
      }}
    >
      <Box className="chat-box-header">
        <h3>{t("nav.contact")}</h3>
        <Button onClick={handleChatboxToggle}>
          <IoIosCloseCircleOutline color="red" size={20} />
        </Button>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} sx={{ marginRight: 0 }}>
          <Grid item xs={12}>
            <Box component={"p"} style={{ fontWeight: "bold" }}>
              {t("knowledge.hotlineTitle")}:
            </Box>
            <Box
              component={"p"}
              sx={{ fontSize: { xs: 14, md: 14 }, color: "#582C86" }}
            >
              (856) 20-20 91 555 123
            </Box>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold" }}>
              {t("knowledge.whatsappTitle")}:
            </p>
            <img src={WhatsAppIcon} alt="WhatsApp Icon" width="100%" />
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: "bold" }}>{t("knowledge.wechatTitle")}: </p>
            <img src={WeChatQRCode} alt="WeChat QR Code" width="100%" />
          </Grid>
        </Grid>
      </Box>
      <Box
        onClick={() => window.open(`tel:8562091555123`, "_blank")}
        sx={{ display: { xs: "block", md: "none" } }}
        className="chat-box-footer"
      >
        {t("data.call")}
      </Box>
      <Divider />
    </Box>
  );
};

export default ChatBox;
