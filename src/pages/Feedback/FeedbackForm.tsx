import {
  Box,
  TextField,
  styled,
  Grid,
  Rating,
  IconContainerProps,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { green, red, yellow, grey } from "@mui/material/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentNeutral,
  MdOutlineSentimentSatisfied,
  MdSentimentDissatisfied,
  MdSentimentVerySatisfied,
} from "react-icons/md";
import { toast } from "react-toastify";
import { APIPOST } from "../../helper/api";

interface Feedback {
  name: string;
  email: string;
  phone: string;
  desc: string;
  rating: number;
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

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const initForm: Feedback = {
  name: "",
  email: "",
  phone: "",
  desc: "",
  rating: 0,
};

const FeedbackForm = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [isLoading, setIsLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(0);
  const [form, setForm] = useState<Feedback>(initForm);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // APIPOST is not defined, replace it with your actual API call
      const res = await APIPOST("/user/create-feedback", form);
      if (res.statusCode === 201) {
        setForm(initForm);
        toast.success("Thank You!, submitted successfully!");
      } else {
        toast.warn("Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.warning("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  const customIcons: {
    [index: string]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: (
        <MdOutlineSentimentDissatisfied
          color={selectValue == 1 ? red[500] : (grey as any)}
        />
      ),
      label: "Very Dissatisfied",
    },
    2: {
      icon: (
        <MdSentimentDissatisfied
          color={selectValue == 2 ? red[500] : (grey as any)}
        />
      ),
      label: "Dissatisfied",
    },
    3: {
      icon: (
        <MdOutlineSentimentNeutral
          color={selectValue == 3 ? yellow[500] : (grey as any)}
        />
      ),
      label: "Neutral",
    },
    4: {
      icon: (
        <MdOutlineSentimentSatisfied
          color={selectValue == 4 ? green[500] : (grey as any)}
        />
      ),
      label: "Satisfied",
    },
    5: {
      icon: (
        <MdSentimentVerySatisfied
          color={selectValue == 5 ? green[500] : (grey as any)}
        />
      ),
      label: "Very Satisfied",
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) {
      setSelectValue(newValue);
      setForm((prevForm) => ({
        ...prevForm,
        rating: newValue,
      }));
    }
  };
  function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  return (
    <>
      <StyledBox>
        <StyledForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t('requestForm.namePlaceholder')}
                variant="outlined"
                fullWidth
                required
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t('requestForm.emailPlaceholder')}
                variant="outlined"
                fullWidth
                type="email"
                required
                name="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                  label={t('requestForm.phonePlaceholder')}
                variant="outlined"
                fullWidth
                type="tel"
                required
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 label={t('feedback.Description')}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                name="desc"
                value={form.desc}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <StyledRating
            name="highlight-selected-only"
            value={selectValue}
            onChange={(_event, newValue) => {
              handleRatingChange(newValue);
            }}
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
            highlightSelectedOnly
          />
          <StyledButton variant="contained" type="submit" loading={isLoading}>
            {t("feedback.Submit_Feedback")}
          </StyledButton>
        </StyledForm>
      </StyledBox>
    </>
  );
};

export default FeedbackForm;
