import "./Request.css";
import Modal from "../Modal/Modal";
import { FormEvent, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { LoadingButton } from "@mui/lab";

import wechat from "../../assest/WechatZion.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface ModalContainerProps {
  type: string;
  property: Property | null;
  author: string | "";
}
export interface FormDataType {
  name: string;
  useremail: string;
  contactemail: string;
  phone: string;
  desc: string;
  property: string | null;
  author: string | null;
  select: string;
}

const formDataInitial = {
  name: "",
  useremail: "",
  contactemail: "",
  phone: "",
  desc: "",
  property: "",
  author: "",
  select: "",
};
const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const StyledTextField = styled(TextField)({
  marginBottom: "3px",
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderTop: "none", // Hide top border on hover
    },
    "&.Mui-focused fieldset": {
      borderTop: "none", // Hide top border when focused
      borderColor: "primary.main", // Change border color when focused
    },
    "& input:valid + fieldset": {
      borderTop: "none", // Hide top border when input has a value
    },
  },
});

const StyledBox = styled(Box)({
  padding: "0px",
  margin: 0,
});

function Request({ type, property, author = "" }: ModalContainerProps) {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isloading, setIsloading] = useState<boolean>(false);
  const { user, toggleModal } = useAppContext();
  const [formData, setFormData] = useState<FormDataType>(formDataInitial);
  const options = [
    { id: "buy", label: t("requestForm.buy") },
    { id: "rent", label: t("requestForm.rent") },
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the specific field in FormData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      select: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    try {
      //if(user){
      formData.useremail = user && user.email ? user.email : "";
      formData.property = property?._id ?? "";
      formData.author = author ?? "";
      setFormData(formData);
      // Introduce a 2-second delay before sending the request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await APIPOST("/request", formData);

      if (res.statusCode === 201) {
        toast.success("Successfully");
      } else {
        toast.warn(res.message);
      }
      // }
      //else{
      //toast.warn('Please Log in first!');
      //}
    } catch (error) {
      toast.warn("something went wrong, try again please");
    } finally {
      setIsloading(false);
      setFormData(formDataInitial);
      toggleModal("Request");
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      small
      title={t("requestForm.Request_a_tour")}
      rightModal={type === "Request"}
    >
      <Box
        sx={{
          width: "100%",
          // display: "grid",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ marginBottom: 5 }}
          variant="h6"
          className="property-contact-title"
          dangerouslySetInnerHTML={{ __html: t("data.Interested") }}
        ></Typography>
        <StyledBox>
          <StyledForm onSubmit={handleSubmit}>
            <StyledTextField
              name="name"
              onChange={handleOnChange}
              label={t("requestForm.nameLabel")}
              variant="outlined"
              size="small"
              fullWidth
              required
            />
            <StyledTextField
              name="phone"
              onChange={handleOnChange}
              label={t("requestForm.phoneLabel")}
              variant="outlined"
              size="small"
              fullWidth
              type="tel"
              required
            />
            <StyledTextField
              name="contactemail"
              onChange={handleOnChange}
              label={t("requestForm.emailPlaceholder")}
              variant="outlined"
              size="small"
              fullWidth
              type="email"
              required
            />
            <StyledTextField
              name="decs"
              onChange={handleOnChange}
              label={t("requestForm.descPlaceholder")}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              // required
              rows={2}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                {t("requestForm.selectLabel")}
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.select}
                onChange={handleChange}
                inputProps={{
                  sx: {
                    borderTop: formData.select
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.42)",
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LoadingButton
              loading={isloading}
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                background: "#582C86",
                color: "#fff",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)", // Add shadow on hover
                },
              }}
            >
              {t("data.send_now")}
            </LoadingButton>
          </StyledForm>
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
                size={20}
                style={{ margin: 0, marginRight: 2, color: "#25D366" }}
              />{" "}
              Whatsapp
            </Button>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
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
        </StyledBox>
        <Box component="p">
          <BiPhoneCall /> <span>(+856) 20- 91 555 123 </span>
        </Box>
      </Box>

      {/* dialog show Wechat QR */}
      <Dialog
        open={open}
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
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}

export default Request;
