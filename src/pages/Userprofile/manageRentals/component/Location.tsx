import { useTranslation } from "react-i18next";
import "./style.css";
import { useState } from "react";
import { cities, mainCiy } from "../../../../locale/laosData/cities";
import {
  Autocomplete,
  Box,
  Container,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Provinces } from "../../../../locale/laosData/Province";

const LocationDetial: React.FC<NewPropertyCreate> = ({
  initProperty,
  setProperty,
}) => {
  const { i18n, t } = useTranslation();
  const [cicyItems, setcicyItems] = useState(
    cities[
      initProperty &&
        initProperty.province &&
        (initProperty.province.key as keyof Cities)
    ] || {}
  );
  const [_onPrinice, setOnprovice] = useState(
    initProperty.province as any | {}
  );
  const [_onCicy, setOnCicy] = useState(initProperty.district as any | {});
  const lang = i18n.language;

  /*console.log(newProperty && newProperty.province && newProperty.province.key);
      console.log(cicyItems);*/
  //--------------------------------------------
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    // Ensure that value is always defined to prevent the input from becoming uncontrolled
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //----------------------------------------------
  const handleInputProvince = (_event: any, value: any) => {
    setcicyItems(value ? cities[value.value.key as keyof Cities] || {} : {});
    setOnprovice(value);
    if (!value) {
      setOnCicy({});
      setProperty((prev) => ({
        ...prev,
        district: {}, // Add a null check before accessing value.value
      }));
      setProperty((prev) => ({
        ...prev,
        city: {}, // Add a null check before accessing value.value
      }));
    }
    setProperty((prev) => ({
      ...prev,
      province: value ? value.value ?? "" : "", // Add a null check before accessing value.value
    }));
  };

  //----------------------------------------
  const handleInputdistrict = (_event: any, value: { value: any }) => {
    //console.log(value);
    setOnCicy(value);
    setProperty((prev) => ({
      ...prev,
      district: value ? value.value ?? "" : "", // Add a null check before accessing value.value
    }));
  };
  const handleInputCity = (_event: any, value: { value: any }) => {
    //console.log(value);
    setProperty((prev) => ({
      ...prev,
      city: value ? value.value ?? "" : "", // Add a null check before accessing value.value
    }));
  };
  //-------------------------------------------
  const districtOptions = Object.entries(cicyItems).map(([key, value]) => ({
    label: value[lang as keyof cityName] || "", // Ensure a fallback to an empty string if label is undefined
    value: { key, ...value, label: value[lang as keyof cityName] },
  }));

  const mainCitys =
    mainCiy[
      initProperty.province && (initProperty.province.key as keyof Cities)
    ];

  const mainCitysToauto = Object.entries(mainCitys ?? {}).map(
    ([key, value]) => ({
      value: key,
      label: value[lang as keyof cityName],
    })
  );

  return (
    <Container maxWidth="xl">
      <Grid
        item
        xs={12}
        sm={12}
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h6">
            {t("addNewProperty.location.propertyLocationTitle")}
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{ "& > :not(style)": { m: 1, width: "100%", marginBottom: 2 } }}
      >
        <FormLabel>{t("addNewProperty.location.addressLabel")}</FormLabel>
        <TextField
          fullWidth
          style={{ marginBottom: 20 }}
          value={initProperty.address}
          name="address"
          placeholder={t("addNewProperty.location.addressLabel")}
          variant="outlined"
          onChange={handleInputChange}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} style={{ padding: 2, marginBottom: 10 }}>
            <Autocomplete
              defaultValue={initProperty.province || ""}
              options={Object.entries(Provinces).map(([key, value]) => ({
                label: value[lang],
                value: { key, ...value, label: value[lang] },
              }))}
              getOptionLabel={(option) =>
                option && option.label
                  ? option.label
                  : option && option[lang]
                  ? option[lang]
                  : ""
              }
              onChange={(event, value) => handleInputProvince(event, value)}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option ? option.label : ""}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("addNewProperty.location.chooseProvinceLabel")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderTop: initProperty.province ? "none" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderTop: "none",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{ padding: 2, marginBottom: 10 }}>
            <Autocomplete
              defaultValue={initProperty.city || ""}
              options={mainCitysToauto}
              autoHighlight
              getOptionLabel={(option) =>
                option && option.label
                  ? option.label
                  : option && option[lang]
                  ? option[lang]
                  : ""
              }
              onChange={handleInputCity}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("addNewProperty.location.chooseCityLabel")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderTop: initProperty.city ? "none" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderTop: "none",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{ padding: 2, marginBottom: 10 }}>
            <Autocomplete
              value={initProperty.district || ""}
              options={districtOptions}
              autoHighlight
              getOptionLabel={(option) =>
                option && option.label
                  ? option.label
                  : option && option[lang]
                  ? option[lang]
                  : ""
              }
              onChange={handleInputdistrict}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("addNewProperty.location.chooseDistrictLabel")}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderTop: initProperty.district ? "none" : "",
                      },
                      "&.Mui-focused fieldset": {
                        borderTop: "none",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component={"div"} style={{ height: 50 }}></Box>
      <Box
        component="div"
        sx={{ "& > :not(style)": { m: 1, width: "100%", marginBottom: 2 } }}
      >
        <FormLabel>{t("addNewProperty.location.mapLocationLabel")}</FormLabel>
        <TextField
          fullWidth
          style={{ marginBottom: 20 }}
          value={initProperty.map}
          name="map"
          placeholder={t(
            "addNewProperty.location.latitudeLongitudePlaceholder"
          )}
          variant="outlined"
          onChange={handleInputChange}
        />
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            "& > :not(style)": { m: 0, width: "100%" },
          }}
        >
          {initProperty.map && (
            <iframe
              width="100%"
              height="300"
              title="Google Map"
              src={`https://maps.google.com/maps?q=${initProperty.map}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LocationDetial;
