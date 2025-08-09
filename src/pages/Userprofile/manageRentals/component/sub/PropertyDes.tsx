import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Autocomplete,
  TextareaAutosize,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  // LANGS,
  optionsStatususer,
  propertiesSubType,
  propertyTypeForm,
} from "../../../../../utils/modal";
import { FaLevelDownAlt, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const DescriptionDESC: React.FC<NewPropertyCreate> = ({
  initProperty,
  setProperty,
}) => {
  const { i18n, t } = useTranslation(); // Initialize useTranslation
  const [featureKey, setFeatureKey] = useState("");
  const [featurevalue, setFeaturevalue] = useState("");
  const [higthligth, setHigthligths] = useState("");
  const lang = i18n.language;
  // const [langs, _setLangs] = useState(LANGS[i18n.language] || LANGS["en"]);
  // const [singleLang, setSingleLang] = useState({
  //   value: "la",
  //   label: "Lao",
  //   icon: "/assets/icons/ic_flag_la.svg",
  // });

  const [singleLang] = useState({
    value: "la",
    label: "Lao",
    icon: "/assets/icons/ic_flag_la.svg",
  });

  const handleTypeChange = (newValue: string | undefined) => {
    setProperty({ ...initProperty, type: newValue ? newValue : "" });
  };
  const types = initProperty.type;
  const transformedData = Object.entries(
    (propertiesSubType as any)[types] ?? {}
  ).map(([key, value]) => ({
    value: key,
    label: (value as any)[lang], // We're using 'any' here because TypeScript is unable to infer the correct type from PropertySubTypeSub
  }));
  // console.log(transformedData);
  // Set setFeature
  const setFeature = () => {
    if (!featureKey || !featurevalue) {
      return toast.warn("Select Feature Type and Enter Value, Please!");
    }

    // Check if featureKey already exists in features object
    if (initProperty.features.hasOwnProperty(featureKey)) {
      // If featureKey exists, update the value
      setProperty((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: featurevalue,
        },
      }));
    } else {
      // If featureKey doesn't exist, add a new entry
      setProperty((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [featureKey]: featurevalue,
        },
      }));
    }

    // Reset the featureKey and featurevalue
    setFeatureKey("");
    setFeaturevalue("");
  };
  const sethigthligth = (lang: string) => {
    if (!higthligth) {
      return toast.warn("Enter Higthligth, Please!");
    }
    // Check if higthligth already exists in the array for the specific language
    const higthligthIndex =
      initProperty.higthligth[
        lang as keyof { en: string[]; la: string[]; cn: string[] }
      ].indexOf(higthligth);
    if (higthligthIndex !== -1) {
      // If higthligth exists, remove it from the array
      setProperty((prev) => ({
        ...prev,
        higthligth: {
          ...prev.higthligth,
          [lang]: prev.higthligth[
            lang as keyof { en: string[]; la: string[]; cn: string[] }
          ].filter((item) => item !== higthligth),
        },
      }));
    } else {
      // If higthligth doesn't exist, add it to the array
      setProperty((prev) => ({
        ...prev,
        higthligth: {
          ...prev.higthligth,
          [lang]: [
            ...prev.higthligth[
              lang as keyof { en: string[]; la: string[]; cn: string[] }
            ],
            higthligth,
          ],
        },
      }));
    }
    // Reset higthligth
    setHigthligths("");
  };
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      setFeature();
    }
  };
  const SethigthligthKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    lang: string
  ) => {
    if (event.key === "Enter") {
      sethigthligth(lang);
    }
  };
  const handleSethigthligthChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setHigthligths(event.target.value);
  };
  const handleFeatureChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFeaturevalue(event.target.value);
  };
  const handleDeleteFeature = (Key: string) => {
    if (!Key) {
      return toast.warn("Invalid featureKey, Please!");
    }

    // Destructuring to remove the feature with the specified key
    const { [Key]: deletedFeature, ...remainingFeatures } =
      initProperty.features;

    setProperty((prev) => ({
      ...prev,
      features: remainingFeatures,
    }));
  };
  const handleDeleteHighlight = (index: number, lang: string) => {
    setProperty((prev) => {
      const updatedHigthligth = { ...prev.higthligth };
      // Remove the highlight at the specified index for the given language
      updatedHigthligth[
        lang as keyof { en: string[]; la: string[]; cn: string[] }
      ] = updatedHigthligth[
        lang as keyof { en: string[]; la: string[]; cn: string[] }
      ].filter((_, i) => i !== index);
      return {
        ...prev,
        higthligth: updatedHigthligth,
      };
    });
  };

  return (
    <>
      <div style={{ marginTop: 15 }}>
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
              {t("addNewProperty.desc.propertyDescription")}
            </Typography>
          </Grid>
          {/* Language */}

          {/* <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {langs.map((language) => (
                <li
                  key={language.value}
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    borderBottom: `2px solid ${
                      language.value === singleLang.value
                        ? "blue"
                        : "transparent"
                    }`,
                  }}
                  onClick={() => setSingleLang(language)}
                >
                  <img
                    src={language.icon}
                    alt={language.label}
                    style={{ width: "24px", height: "24px" }}
                  />
                </li>
              ))}
            </ul>
          </Grid> */}
        </Grid>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t("addNewProperty.desc.propertyName")}
                variant="outlined"
                fullWidth
                id="name"
                name="name"
                onChange={(event) =>
                  setProperty((prev) => ({
                    ...prev,
                    name: {
                      ...prev.name,
                      [singleLang.value as keyof {
                        en: string;
                        la: string;
                        cn: string;
                      }]: event.target.value,
                    },
                  }))
                }
                value={
                  initProperty.name[
                    singleLang.value as keyof {
                      en: string;
                      la: string;
                      cn: string;
                    }
                  ]
                }
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderTop: initProperty.name[
                        singleLang.value as keyof {
                          en: string;
                          la: string;
                          cn: string;
                        }
                      ]
                        ? "none"
                        : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderTop: "none",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={propertyTypeForm}
                getOptionLabel={(option) =>
                  option.name[
                    lang as keyof { en: string; cn: string; la: string }
                  ]
                } // Display English name in autocomplete
                value={
                  propertyTypeForm.find(
                    (option) => option.type === initProperty.type
                  ) || null
                }
                onChange={(_, newValue) => handleTypeChange(newValue?.type)}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    {...params}
                    label={t("addNewProperty.desc.propertyType")}
                    placeholder={t("addNewProperty.desc.chooseAPropertyType")}
                    variant="outlined"
                    fullWidth
                  />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderTop: initProperty.type ? "none" : "",
                    },
                    "&.Mui-focused fieldset": {
                      borderTop: "none",
                    },
                  },
                }}
              />
            </Grid>
            {transformedData.length > 0 && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="multi-select-autocomplete"
                  options={transformedData}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  value={initProperty.subType}
                  onChange={(_event, newValue) => {
                    setProperty((prev) => ({
                      ...prev,
                      subType: newValue,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t("addNewProperty.desc.propertyStatus")}
                      placeholder={t("addNewProperty.desc.chooseAStatus")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderTop:
                              initProperty.subType.length > 0 ? "none" : "",
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
            )}
            <Grid item xs={12} sm={6}>
              <OutlinedInput
                fullWidth
                type="number"
                value={initProperty.price}
                name="price"
                placeholder={t("addNewProperty.desc.inputPrice")}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(event) =>
                  setProperty((prev) => ({
                    ...prev,
                    price: event.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={(optionsStatususer as any)[lang]}
                autoHighlight
                getOptionLabel={(option) => option.label}
                value={
                  ((optionsStatususer as any)[lang].find &&
                    (optionsStatususer as any)[lang].find(
                      (option: { id: string }) =>
                        option.id === initProperty.status
                    )) ||
                  null
                }
                onChange={(_event, value) => {
                  setProperty((prev) => ({
                    ...prev,
                    status: value ? value.id : null,
                  }));
                }}
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
                    label={t("addNewProperty.desc.chooseAStatus")}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderTop: initProperty.status ? "none" : "",
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
            <Grid item xs={12}>
              <TextareaAutosize
                value={
                  initProperty.description[
                    singleLang.value as keyof {
                      en: string;
                      la: string;
                      cn: string;
                    }
                  ] || ""
                } // Use empty string as default value
                name="description"
                style={{
                  width: "100%", // Set width to 100%
                  marginBottom: 20,
                  borderRadius: 8,
                  padding: 10,
                  fontFamily: "Public Sans, Noto Sans Lao, sans-serif",
                }}
                minRows={10}
                placeholder={t("addNewProperty.desc.More_information")}
                onChange={(event) =>
                  setProperty((prev) => ({
                    ...prev,
                    description: {
                      ...prev.description,
                      [singleLang.value]: event.target.value,
                    },
                  }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OutlinedInput
                fullWidth
                name="features"
                type="number"
                placeholder={t("addNewProperty.desc.inputFeatureAndPressEnter")}
                onKeyDown={handleKeyDown}
                onChange={handleFeatureChange}
                value={featurevalue}
                startAdornment={
                  <InputAdornment position="start">
                    <select
                      style={{ marginRight: 5 }}
                      onChange={(e) => {
                        setFeatureKey(e.target.value);
                      }}
                      value={featureKey}
                    >
                      <option value="">
                        {t("addNewProperty.desc.selectOptions")}
                      </option>
                      <option value="cafe">{t("data.cafe")}</option>
                      <option value="bedRoom">{t("data.bedRoom")}</option>
                      <option value="livingRoom">
                        {t("allFilter.livingRoom")}
                      </option>
                      <option value="parking">{t("allFilter.parking")}</option>
                      <option value="kitchen">{t("allFilter.kitchen")}</option>
                      <option value="balcony">{t("allFilter.balcony")}</option>
                      <option value="swimming_Pool">
                        {t("allFilter.swimming_Pool")}
                      </option>
                      <option value="gym">{t("allFilter.gym")}</option>
                      <option value="roomtype">{t("data.roomtype")}</option>
                      <option value="sqm">{t("data.sqm")}</option>
                      <option value="bathRoom">{t("data.baths")}</option>
                      <option value="diningRoom">{t("data.dining")}</option>
                      <option value="laundryRoom">{t("data.laundry")}</option>
                      <option value="garden">{t("data.garden")}</option>
                      <option value="basketBall">{t("data.basketBall")}</option>
                      <option value="bar">{t("data.bar")}</option>
                      <option value="meetingRoom">{t("data.meeting")}</option>
                      <option value="restaurant">{t("data.restaurant")}</option>
                      <option value="poolBar">{t("data.poolBar")}</option>
                      <option value="playground">{t("data.playground")}</option>
                    </select>
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={setFeature}
                      edge="end"
                    >
                      <FaLevelDownAlt />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OutlinedInput
                fullWidth
                name="highlights"
                type="text"
                value={higthligth}
                onKeyDown={(event) =>
                  SethigthligthKeyDown(event, singleLang.value)
                } // Change 'en' to the appropriate language code
                onChange={handleSethigthligthChange}
                placeholder={t(
                  "addNewProperty.desc.inputHighlightsAndPressEnter"
                )}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => sethigthligth(singleLang.value)} // Change 'en' to the appropriate language code
                      edge="end"
                    >
                      <FaLevelDownAlt />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul>
                {Object.entries(initProperty.features).map(([key, value]) => (
                  <li key={key}>
                    {t(`allFilter.${key}`)} : {value}
                    <IconButton
                      onClick={() => handleDeleteFeature(key)}
                      aria-label="delete"
                    >
                      <FaRegTrashAlt fontSize={14} color="red" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ul>
                {initProperty.higthligth[
                  singleLang.value as keyof {
                    en: string[];
                    la: string[];
                    cn: string[];
                  }
                ]?.map((highlight, index) => (
                  <li key={index}>
                    {highlight}
                    <IconButton
                      onClick={() =>
                        handleDeleteHighlight(index, singleLang.value)
                      }
                      aria-label="delete"
                    >
                      <FaRegTrashAlt fontSize={14} color="red" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default DescriptionDESC;
