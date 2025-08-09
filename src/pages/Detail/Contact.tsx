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
import { useTranslation } from "react-i18next";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa6";
import { useAppContext } from "../../context/AppContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { IoCallOutline, IoLogoWechat } from "react-icons/io5";
import { FormDataType } from "../../components/Request/Request";
import { APIPOST } from "../../helper/api";
import { LoadingButton } from "@mui/lab";
import wechat from "../../assest/WechatZion.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalContainerProps {
  property: Property | null;
  author: string | null;
  title: String;
}

const formDataInitial: FormDataType = {
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
  gap: "10px",
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

const ContactComponent = ({
  property,
  author = "",
  title,
}: ModalContainerProps) => {
  const { t } = useTranslation(); // Initialize useTranslation
  const { user, toggleModal } = useAppContext();
  const [formDatas, setFormData] = useState<FormDataType>(formDataInitial);
  const [isLoading, setisLoading] = useState(false);
  const options = [
    { id: "buy", label: t("requestForm.buy") },
    { id: "rent", label: t("requestForm.rent") },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      select: value,
    }));
  };
  const fieldhandleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Access form data using event.currentTarget
    const formData = new FormData(event.currentTarget);

    // Extract form values
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("contactemail") as string;
    const select = formData.get("select") as string;
    // const moreInfo = formData.get("desc") as string;

    // Validate form data
    if (!name) {
      toast.warning("Please enter your name.");
      return;
    }
    if (!phone) {
      toast.warning("Please enter your phone number.");
      return;
    }
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }
    if (!select) {
      toast.warning("Please select the option.");
      return;
    }
    formDatas.useremail = user && user.email ? user.email : "";
    formDatas.property = property?._id ?? null;
    formDatas.author = author ?? null;
    setFormData(formDatas);
    setisLoading(true);
    try {
      // Introduce a 2-second delay before sending the request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await APIPOST("/request", formDatas);
      //console.log(res.statusCode);
      if (res.statusCode === 201) {
        setFormData(formDataInitial);
        toast.success("Successfully");
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      toast.warn("Something went wrong try again, please");
    } finally {
      // Reset the form fields if needed
      setisLoading(false);
      event.currentTarget.reset();
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
    <Box
      className="property-contact-box"
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow
        transition: "box-shadow 0.3s", // Transition for hover effect
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.6)", // Hover shadow
        },
      }}
    >
      {/* for mobile */}
      <Button
        onClick={() => window.open(`tel:8562091555123`, "_blank")}
        sx={{
          display: { xs: "block", md: "none" },
          textTransform: "none",
          backgroundColor: "#582C86",
        }}
        variant="contained"
        className="btn-request font-default"
      >
        <IoCallOutline /> {t("data.call")}
      </Button>
      <Button
        variant="outlined"
        sx={{ display: { xs: "block", md: "none" }, textTransform: "none" }}
        onClick={() => toggleModal("Request")}
      >
        {t("data.request_tour")}
      </Button>
      {/* for Pc */}
      <Typography
        sx={{ display: { xs: "none", md: "block" } }}
        variant="h6"
        className="property-contact-title"
        dangerouslySetInnerHTML={{ __html: title }}
      ></Typography>
      <StyledBox sx={{ display: { xs: "none", md: "block" } }}>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            onChange={fieldhandleChange}
            value={formDatas.name}
            name="name"
            label={t("requestForm.nameLabel")}
            variant="outlined"
            size="small"
            fullWidth
            // required
          />
          <StyledTextField
            name="phone"
            value={formDatas.phone}
            onChange={fieldhandleChange}
            label={t("requestForm.phoneLabel")}
            variant="outlined"
            size="small"
            fullWidth
            type="tel"
            // required
          />
          <StyledTextField
            name="contactemail"
            value={formDatas.contactemail}
            onChange={fieldhandleChange}
            label={t("requestForm.emailPlaceholder")}
            variant="outlined"
            size="small"
            fullWidth
            type="email"
            // required
          />
          <StyledTextField
            name="desc"
            value={formDatas.desc}
            onChange={fieldhandleChange}
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
              name="select"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formDatas.select}
              onChange={handleChange}
              inputProps={{
                sx: {
                  borderTop: formDatas.select
                    ? "none"
                    : "1px solid rgba(0, 0, 0, 0.42)",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LoadingButton
            loading={isLoading}
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
          {/* <Button
            variant="outlined"
            onClick={() =>
              window.open(
                `weixin://contacts/profile/yia_57`,
                "_blank"
              )
            }
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
          </Button> */}

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
      <Box
        component="p"
        className="dddddd"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <BiPhoneCall /> <span>(+856) 20-91555123 </span>
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
    </Box>
  );
};

export default ContactComponent;
