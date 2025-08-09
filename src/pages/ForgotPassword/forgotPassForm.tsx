import { Box, TextField, styled, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import { APIPOST } from "../../helper/api";
import { useRouter } from "../../router/use-router";
interface ResetPassword {
  email: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  margin: "0 auto",
  marginBottom: 25,
});

const StyledButton = styled(LoadingButton)({
  background: "linear-gradient(45deg, #582C86 30%, #FF8E53 190%)",
  borderRadius: 3,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  textTransform: "none",
});

const initForm: ResetPassword = {
  email: "",
};

const ForgotPassword = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ResetPassword>(initForm);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // APIPOST is not defined, replace it with your actual API call
      const res = await APIPOST("/forgotpass/request-password", form);

      console.log("res data:::", res)
      if (res.statusCode === 200) {
        setForm(initForm);
        toast.success("Thank You!, request successfully!");
        router.push("/resetpassword")
      } else {
        toast.warn("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.warning("Something went wrong!!!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <StyledBox
        sx={{
          width: {
            xs: "100%", // Full width on small screens
            sm: "70%", // 70% width on medium screens
            md: "50%", // 50% width on larger screens
          },
          height: {
            xs: "auto", // Auto height on small screens
            sm: "auto", // Auto height for medium screens
            md: "auto", // Adjust height accordingly if needed
          },
          margin: "0 auto", // Center horizontally
        }}
      >
        <StyledForm
          sx={{
            width: "100%", // Full width of the container
            height: "auto", // Adjust height accordingly
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t("requestForm.emailPlaceholder")}
                variant="outlined"
                fullWidth
                type="email"
                required
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <StyledButton
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{
              width: "100%", // Full width of the form
              height: "50px", // Specify button height
              mt: 2, // Margin top for spacing
            }}
          >
            {t("nav.resetpass-btn")}
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </>
  );
};

export default ForgotPassword;
