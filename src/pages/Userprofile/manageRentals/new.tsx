import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Typography, Box, Button } from "@mui/material";
import "./new.css"; // Import your CSS file here
import Description from "./component/Description";
import Media from "./component/Media";
import LocationDetial from "./component/Location";
import Detail from "./component/Detail";
import Amenities from "./component/Amenities";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { APIGETAUT, APIPATCH, APIPOSTAUT } from "../../../helper/api";
import { useAppContext } from "../../../context/AppContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import GuideLine from "../../../components/GuideLine/GuideLine";

const AddNewproperty = () => {
  const { user } = useAppContext();
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState({
    editMode: false,
    loadItem: false,
  });

  const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };
  // Get the current URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const initProperty: RealEstate = {
    name: { en: "", cn: "", la: "" },
    type: "",
    available: false,
    subType: [],
    description: { la: "", en: "", cn: "" },
    price: "",
    status: "",
    features: {},
    higthligth: { la: [], en: [], cn: [] },
    images: [],
    floorplans: [],
    address: "",
    province: {},
    district: {},
    city: {},
    map: "",
    video: {
      type: 0,
      from: "",
      url: "",
    },
    interiors: {
      la: [],
      en: [],
      cn: [],
    },
    surroundings: {
      la: [],
      en: [],
      cn: [],
    },
    owner_id: {
      name: "",
      email: "",
      phone: [],
    },
    user: true,
  };
  const initialState: RealEstate = JSON.parse(
    localStorage.getItem("newProperty") ?? JSON.stringify(initProperty)
  );
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [property, setProperty] = useState<RealEstate>(initialState);

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    // Specify number type for newValue
    setActiveTab(newValue);
  };
  const handleClear = () => {
    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to clear all property data?"
    );
    // Check if the user confirmed
    if (confirmed) {
      // Clear property data
      setProperty(initProperty);
    }
  };
  const handleSave = async () => {
    // Validation checks
    // if (!property.name.en || !property.name.cn || !property.name.la) {
    //   return toast.warn("Please fill in all name fields. (EN, LA CN)");
    // }

    // if (!property.name.en || !property.name.cn || !property.name.la) {
    //   return toast.warn("Please fill in all name fields. (EN, LA CN)");
    // }

    if (!property.type) {
      return toast.warn("Please select a property type.");
    }

    if (!property.price) {
      return toast.warn("Please enter the price.");
    }

    if (!property.address) {
      return toast.warn("Please enter the address.");
    }

    if (!property.province.key) {
      return toast.warn("Please select a province.");
    }

    if (!property.district.key) {
      return toast.warn("Please select a district.");
    }

    // if (
    //   !property.description.en ||
    //   !property.description.cn ||
    //   !property.description.la
    // ) {
    //   return toast.warn("Please fill in all description fields.");
    // }

    if (property.images.length === 0) {
      return toast.warn("Please upload at least one image.");
    }

    if (property.floorplans.length === 0) {
      return toast.warn("Please upload at least one floor plan.");
    }

    // if (
    //   property.interiors.en.length === 0 ||
    //   property.interiors.cn.length === 0 ||
    //   property.interiors.la.length === 0
    // ) {
    //   return toast.warn(
    //     "Please add at least one interior description for each language (EN, LA CN) "
    //   );
    // }

    // if (
    //   property.surroundings.en.length === 0 ||
    //   property.surroundings.cn.length === 0 ||
    //   property.surroundings.la.length === 0
    // ) {
    //   return toast.warn(
    //     "Please add at least one surrounding description for each language (EN, LA CN)"
    //   );
    // }

    if (
      !property.owner_id ||
      !property.owner_id.name ||
      !property.owner_id.phone
    ) {
      return toast.warn("Please provide owner details.");
    }

    // If all validations pass, proceed with saving
    setIsLoading(true);
    try {
      const token = user?.token;
      const res = !editMode.editMode
        ? await APIPOSTAUT(`/property/create`, property, token as string)
        : await APIPATCH(`/property`, property);
      // console.log(res)
      if (res && res.statusCode !== 201) {
        toast.warn(res.message ?? "Error occurred");
      } else {
        //console.log("ssss", res);
        toast.success("Property saved successfully.");
        //loginUser( res.data.user)
        setProperty(initProperty);
        setTimeout(() => (window.location.href = "/rental-manager"), 1000);
        /*if (modeEdit) {
                    setTimeout(() => router.push('/properties'), 1000);
                }*/
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const getItem = async () => {
    try {
      const res = await APIGETAUT(`property/byuser/${id}`, user?.token ?? "");
      if (res.statusCode === 200) {
        setProperty(res.data.property);
        //console.log(res.data);
        setEditMode((prevState) => ({
          ...prevState,
          loadItem: true,
        }));
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setEditMode((prevState) => ({
        ...prevState,
        editMode: true,
      }));
    }
  };

  useEffect(() => {
    if (id && editMode.loadItem === false) {
      getItem();
    }

    localStorage.setItem("newProperty", JSON.stringify(property));
  }, [property]);
  //console.log(property.subType);

  // const handleNextStep = () => {

  //   console.log("handleNextStep:::");
  // };

  return (
    <>
      <Helmet>
        <title> Add new Property - Real Estate</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ padding: "25px" }}>
        <div style={{ marginBottom: 12 }}>
          <Typography variant="h6">{t("addNewProperty.title")}</Typography>
          {/* <button onClick={handleClickOpen}>Guideline</button> */}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <h4 style={{ textAlign: "center" }}>Guideline Add property</h4>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* Center the image */}
                <div style={{ textAlign: "center" }}>
                  <GuideLine />
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <div className="tab-top">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              indicatorColor="primary"
            >
              <Tab label={t("addNewProperty.tabs.Description")} />
              <Tab label={t("addNewProperty.tabs.Media")} />
              <Tab label={t("addNewProperty.tabs.Location")} />
              <Tab label={t("addNewProperty.tabs.Amenities")} />
              <Tab label={t("addNewProperty.tabs.Detail")} />
            </Tabs>
          </div>

          <hr style={{ marginBottom: 20 }} />
          {/* Render content based on activeTab value */}
          {activeTab === 0 && (
            <div>
              <Description initProperty={property} setProperty={setProperty} />
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <Media initProperty={property} setProperty={setProperty} />
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <LocationDetial
                initProperty={property}
                setProperty={setProperty}
              />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <Amenities initProperty={property} setProperty={setProperty} />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <Detail initProperty={property} setProperty={setProperty} />
            </div>
          )}
          <Box mt={3} display="flex" justifyContent="flex-end">
            {" "}
            {/* Align items to the end (right) */}
            <Button
              variant="contained"
              color="warning"
              startIcon={<MdDeleteSweep size={18} />}
              onClick={handleClear}
            >
              {t("addNewProperty.clearButtonLabel")}
            </Button>
            <Box mx={1} /> {/* Add space between buttons */}
            <LoadingButton
              loading={isLoading}
              variant="contained"
              sx={{ backgroundColor: '#582C86', '&:hover': { backgroundColor: '#7236b2' } }} 
              startIcon={<FaSave size={16} />}
              onClick={handleSave}
            >
              {t("addNewProperty.saveButtonLabel")}
            </LoadingButton>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default AddNewproperty;
