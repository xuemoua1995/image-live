import React from "react";
import { TextField, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const DescriptionOwner: React.FC<NewPropertyCreate> = ({
  initProperty,
  setProperty,
}) => {
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "phone" ? value.split(",").map((v) => v.trim()) : value;
    setProperty((prevProperty) => ({
      ...prevProperty,
      owner_id: {
        ...prevProperty.owner_id,
        [name]: updatedValue,
      },
    }));
  };
  //console.log(initProperty.owner_id);

  return (
    <>
      <div>
        <Typography variant="h6">
          {t("addNewProperty.desc.ownerInformation")}
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t("addNewProperty.desc.ownerNameLabel")}
                variant="outlined"
                fullWidth
                id="name"
                name="name"
                value={initProperty.owner_id.name}
                onChange={handleInputChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderTop: initProperty.owner_id.name ? "none" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderTop: "none",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t("addNewProperty.desc.ownerEmailLabel")}
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                type="email"
                value={initProperty.owner_id.email}
                onChange={handleInputChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderTop: initProperty.owner_id.email ? "none" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderTop: "none",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label={t("addNewProperty.desc.ownerPhoneLabel")}
                variant="outlined"
                fullWidth
                id="phone"
                name="phone"
                value={
                  initProperty.owner_id.phone.length > 0
                    ? initProperty.owner_id.phone.join(", ")
                    : ""
                }
                onChange={handleInputChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderTop: initProperty.owner_id.phone ? "none" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderTop: "none",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default DescriptionOwner;
