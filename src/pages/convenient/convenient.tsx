import {
  Backdrop,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import "./convenient.css";
import ServiceCard from "./component/ServiceCard";
import PartnerCard from "./component/Partnert";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { IoMdCloseCircle } from "react-icons/io";
import { TbPhoneCall, TbWorldWww } from "react-icons/tb";
import { partnersList, servicesList } from "../../utils/convenientModal";
import { v4 as uuidv4 } from "uuid";
import DropdownProvinince from "../../components/Dropdown/Dropdown_Province_any";
import { useAppContext } from "../../context/AppContext";
import imgPC from "../../assest/services/header/headerPc.jpg";
import imgM from "../../assest/services/header/headerM.jpg";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import AnimateInView from "../../components/Animation/AnimateInView";
export interface Partner {
  type: string;
  rating: number;
  id: number;
  location: string[];
  name: {
    en: string;
    cn: string;
    la: string;
  }; // Change name to be an object with language keys

  description: string | { en: string; cn: string; la: string }; // Accept either a string or a translation object
  imageUrl: string;
  phone: string;
  map: string;
  website: string;
}

const Convenient = () => {
  const { t, i18n } = useTranslation();
  const { Province } = useAppContext();
  const lang = i18n.language;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>();

  const [provice, setProvice] = useState<string | null>(null);
  const [type, setType] = useState("");
  const ourPartnersRef = useRef<HTMLDivElement>(null);
  let newpartners: Partner[] = [];
  const [first, setFirst] = useState(true);

  const partners: Partner[] = partnersList;
  const services: Service[] = servicesList;

  if (type !== "" && provice !== null) {
    newpartners = partners
      .filter((partner) => {
        const formattedLocations = partner.location.map((location) =>
          location.replace(/\s+/g, "").toLowerCase()
        );
        const formattedProvince = provice.replace(/\s+/g, "").toLowerCase();
        return (
          partner.type === type &&
          formattedLocations.includes(formattedProvince)
        );
      })
      .sort((a, b) => b.rating - a.rating); // Sort by rating in descending order
  } else if (type !== "") {
    newpartners = partners
      .filter((partner) => partner.type === type)
      .sort((a, b) => b.rating - a.rating); // Sort by rating in descending order
  } else if (provice !== null) {
    newpartners = partners
      .filter((partner) => {
        const formattedLocations = partner.location.map((location) =>
          location.replace(/\s+/g, "").toLowerCase()
        );
        const formattedProvince = provice.replace(/\s+/g, "").toLowerCase();
        return formattedLocations.includes(formattedProvince);
      })
      .sort((a, b) => b.rating - a.rating); // Sort by rating in descending order
  } else {
    newpartners = partners.slice().sort((a, b) => b.rating - a.rating); // Sort by rating in descending order
  }

  const openModal = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };
  const setTypes = (e: string) => {
    setType(e);
  };

  function truncateWebiste(webiste: string, maxLength: number) {
    if (webiste.length <= maxLength) {
      return webiste;
    } else {
      return webiste.substring(0, maxLength) + "...";
    }
  }

  /* const bgss = {
        backgroundImage: `url("https://wphix.com/template/pixen/pixen/assets/images/bg/breadcrumb-bg-1.jpeg")`,
        backgroundSize: 'cover', // Cover the entire header area
        backgroundPosition: 'center', // Center the background image
    }*/

  const setPrivess = (value: string) => setProvice(value);

  // Scroll to "Our_Partners" section when setTypes is called
  useEffect(() => {
    if (ourPartnersRef.current && first == false) {
      ourPartnersRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      setFirst(false);
    }
  }, [type]);

  return (
    <>
      <Helmet>
        <title> {t("nav.Convenient_servicesM")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView direction="center">
        <Box
          component="div"
          className="grbKwn"
          sx={{
            backgroundImage: { xs: `url("${imgM}")`, md: `url("${imgPC}")` },
            backgroundSize: "cover",
          }}
        >
          <Box
            component={"header"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderBottom: "2px solid #fff",
              position: "relative", // To contain absolutely positioned Typography
              minHeight: { xs: "40vh", md: "500px", lg: "550px" }, // Add min-height
              color: "rgb(255, 255, 255)", // Add text color
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              paddingTop: "18%",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            <Typography
              variant="h2"
              align="left"
              sx={{
                width:'100%',
                color: "#fff",
                position: "absolute",
                top: { xs: "80%", md:"40%", lg: "50%" }, // Set different top positions for extra small and large screens
                left: { xs: "50%", md:"40%", lg: "30%" },
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                fontSize: ["2rem", "3rem", "4rem"],
                textAlign:"center"
              }}
              dangerouslySetInnerHTML={{
                __html: `<b>${t("services.title")}</b>`,
              }}
            />
          </Box>
        </Box>
      </AnimateInView>

      <Grid container spacing={1}>
        {/* Main Services Section */}
        <Grid container spacing={2} sx={{ padding: { xs: 3, md: 10 } }}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="left"
              sx={{
                fontSize: { xs: "23px", md: "30px", lg: "40px" },
                marginTop: { xs: "60px", sm: "10px", lg: "10px" },
              }}
              gutterBottom
            >
              <b className="services-title">{t("services.We_choose_the")}</b>
            </Typography>
          </Grid>
          {services.map((service) => (
            <Grid item key={service.id} xs={4} md={3} lg={3} xl={3}>
              <ServiceCard Service={service} setTypes={setTypes} />
            </Grid>
          ))}
        </Grid>

        {/* Our Partners Section */}
        <Grid item xs={12} md={12}>
          <div ref={ourPartnersRef} id="Our_Partners">
            <Typography
              sx={{ fontSize: { xs: "40px", md: "50px" } }}
              align="center"
              gutterBottom
            >
              <b>{t("services.Our_Partners")}</b>
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                paddingLeft: { xs: 3, md: 15 },
                paddingRight: { xs: 3, md: 15 },
              }}
            >
              <Grid item xs={6}>
                <DropdownProvinince
                  setSelection={setPrivess}
                  selection={provice}
                  items={Province}
                  filterKey="province"
                  lang={lang}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {newpartners.length > 0 && (
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      onClick={() => setTypes("")}
                      variant="contained"
                      color="primary"
                      sx={{
                        marginRight: 0,
                        fontSize: { xs: 12, md: 20 },
                        backgroundColor: "#582C86", // Custom background color
                        color: "#ffffff", // Custom text color
                        "&:hover": {
                          backgroundColor: "#4a226a", // Custom hover background color
                        },
                        "&:active": {
                          backgroundColor: "#371b50", // Custom active background color
                        },
                      }}
                    >
                      {t("services.All_Services")}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={2} sx={{ padding: { xs: 0, md: 10 } }}>
          {/* Assuming partners is an array of objects containing information about each partner */}
          {newpartners.length > 0 ? (
            newpartners.map((partner, _index) => (
              <Grid item xs={12} md={6}>
                <div onClick={() => openModal(partner)}>
                  <Fragment key={uuidv4()}>
                    <PartnerCard {...partner} />
                    <Box marginBottom={5}></Box>
                  </Fragment>
                </div>
              </Grid>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 10,
                marginTop: 30,
              }}
            >
              <Typography variant="h5" align="center" gutterBottom>
                No any {type} service
              </Typography>
              <Button
                onClick={() => setTypes("")}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#582C86", // Custom background color
                  color: "#ffffff", // Custom text color
                  "&:hover": {
                    backgroundColor: "#4a226a", // Custom hover background color
                  },
                  "&:active": {
                    backgroundColor: "#371b50", // Custom active background color
                  },
                }}
              >
                {t("services.All_Services")}
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <div
          style={{
            maxWidth: 900,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              position: "relative",
              overflowY: "auto",
            }}
          >
            <IconButton
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={closeModal}
            >
              <IoMdCloseCircle color="#582C86" />
            </IconButton>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontSize: { xs: "1.5rem", lg: "1.5rem" } }}
            >
              {
                selectedPartner?.name[
                  lang as keyof { en: string; cn: string; la: string }
                ]
              }
            </Typography>
            <img
              src={selectedPartner?.imageUrl}
              alt={
                selectedPartner?.name[
                  lang as keyof { en: string; cn: string; la: string }
                ]
              }
              style={{
                display: "block",
                margin: "auto",
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: 16,
              }}
            />
            {selectedPartner?.phone && (
              <Typography variant="body1" marginTop={2}>
                <TbPhoneCall color="#582C86" style={{ marginRight: 5 }} />
                <a
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href={`tel:${selectedPartner?.phone}`}
                >
                  <b>{selectedPartner?.phone}</b>
                </a>
              </Typography>
            )}
            {selectedPartner?.website && (
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
                <TbWorldWww color="#582C86" style={{ marginRight: 5 }} />
                <a
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  href={selectedPartner?.website}
                >
                  <b>{truncateWebiste(selectedPartner?.website, 30)}</b>
                </a>
              </Typography>
            )}
            {/* <Typography
            sx={{textAlign: 'justify'}}
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: selectedPartner?.description[lang as keyof { en: string; cn: string; la: string; }] || "",
              }}
            /> */}
            <Typography sx={{ textAlign: "justify" }} variant="body1">
              {selectedPartner?.description?.[
                lang as keyof typeof selectedPartner.description
              ] || ""}
            </Typography>
            {/* Add map display here */}
            {selectedPartner?.map && (
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <iframe
                  width="100%"
                  height="250"
                  title="Google Map"
                  src={`https://maps.google.com/maps?q=${selectedPartner?.map}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Convenient;
