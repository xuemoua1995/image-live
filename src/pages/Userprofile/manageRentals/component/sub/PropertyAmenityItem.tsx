// PropertyAmenityItem.jsx
import React from "react";
import { Fragment } from "react";
import {
  Box,
  FormLabel,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  Grid,
  Paper,
  IconButton,
  Container,
  Typography,
} from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

interface PropertyAmenityItemProps {
  t: (key: string) => string;
  langs: { value: string; label: string; icon: string }[];
  language: { value: string; label: string; icon: string };
  newSurround: { title: string; desc1: string; desc2: string; icon: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    language: { value: string; label: string; icon: string },
    property: string
  ) => void;
  handleAdd: (
    event: React.MouseEvent<HTMLButtonElement>,
    language: { value: string; label: string; icon: string }
  ) => void;
  handleDelete: (
    index: number,
    language: { value: string; label: string; icon: string }
  ) => void;
  index: string;
  newProperty: RealEstate;
}

const PropertyAmenityItem: React.FC<PropertyAmenityItemProps> = ({
  t,
  language,
  newSurround,
  handleInputChange,
  handleAdd,
  handleDelete,
  index,
  newProperty,
}) => {
  return (
    <Fragment key={language.value}>
      <Box
        key={index}
        component="div"
        sx={{ "& > :not(style)": { m: 1, width: "100%", marginBottom: 2 } }}
      >
        <FormLabel>
          <b>{t("addNewProperty.amenities.titleLabel")}</b>
        </FormLabel>
        <TextField
          fullWidth
          style={{ marginBottom: 20 }}
          name={`title_${language.value}`}
          placeholder={t("addNewProperty.amenities.titleLabel")}
          variant="outlined"
          value={newSurround.title ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event, language, "title")
          }
        />
        <FormLabel>{t("addNewProperty.amenities.description1Label")}</FormLabel>
        <TextField
          fullWidth
          style={{ marginBottom: 20 }}
          name={`desc1_${language.value}`}
          placeholder={t("addNewProperty.amenities.description1Label")}
          variant="outlined"
          value={newSurround.desc1 ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event, language, "desc1")
          }
        />
        <FormLabel>{t("addNewProperty.amenities.description2Label")}</FormLabel>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel
            htmlFor={`outlined-adornment-${language.value}-desc2`}
          ></InputLabel>
          <OutlinedInput
            fullWidth
            name={`desc2_${language.value}`}
            type="text"
            placeholder={t("addNewProperty.amenities.description2Label")}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(event, language, "desc2")
            }
            value={newSurround.desc2 ?? ""}
            startAdornment={
              <InputAdornment position="start">
                <select
                  style={{ marginRight: 5 }}
                  onChange={(e: any) => handleInputChange(e, language, "icon")}
                  value={newSurround.icon ?? ""}
                >
                  <option value="">
                    {t("addNewProperty.desc.selectOptions")}
                  </option>
                  <option value="Drive">
                    {t("addNewProperty.amenities.Drive")}
                  </option>
                  <option value="Walk">
                    {t("addNewProperty.amenities.Walk")}
                  </option>
                </select>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleAdd(e, language)}
        >
          {t("addNewProperty.amenities.addToListButton")}
        </Button>
      </Box>
      <Box>
        <h4>{t("addNewProperty.amenities.listTitle")}</h4>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          {newProperty.surroundings[
            language.value as keyof typeof newProperty.surroundings
          ].length === 0 ? (
            <Typography style={{ padding: 25 }}>
              {t("addNewProperty.amenities.noSurroundingsMessage")}
            </Typography>
          ) : (
            newProperty.surroundings[
              language.value as keyof typeof newProperty.surroundings
            ].map((item, index) => (
              <Grid item xs={12} md={3} key={index} sx={{ marginTop: 2 }}>
                <Paper
                  style={{ position: "relative", padding: 16, height: "100%" }}
                >
                  <p>
                    {t("addNewProperty.amenities.Title")}: <b>{item.title}</b>
                  </p>
                  <p>
                    {t("addNewProperty.amenities.Des_1")}: <b>{item.desc1}</b>
                  </p>
                  <p>
                    {t("addNewProperty.amenities.Des_2")}: <b>{item.desc2}</b>{" "}
                  </p>
                  <p>
                    {t("addNewProperty.amenities.On")}: {item.icon}
                  </p>
                  <IconButton
                    onClick={() => handleDelete(index, language)}
                    aria-label="delete"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red",
                    }}
                  >
                    <FaRegTrashAlt fontSize={14} />
                  </IconButton>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <Box>
        <Container style={{ height: 20 }}></Container>
      </Box>
      {/*index < langs.length - 1 && <hr />} {/* Add hr after each box except for the last one */}
    </Fragment>
  );
};

export default PropertyAmenityItem;
