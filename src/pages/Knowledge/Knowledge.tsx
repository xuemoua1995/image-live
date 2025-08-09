import { Helmet } from "react-helmet-async";
import "./Knowledge.css";
import { useEffect, useState } from "react";
import {
  // Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  Box,
} from "@mui/material";
// import wechat from "../../assest/WechatZion.png";
// import hotline from "../../assest/hotline.png";
// import pdfViewer from "../../pdf/law.pdf";
// import pdfViewer1 from "../../pdf/landlaw.pdf";
// import pdfViewer2 from "../../pdf/taxland.pdf";
// import whatsapp from "../../assest/whatsapp.jpg";
// import { IoLogoWechat } from "react-icons/io5";
// import { FiPhoneCall } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import bg from "../../assest/about/help.jpg";
// import { FaWhatsapp } from "react-icons/fa";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import { APIGET } from "../../helper/api";
import { toast } from "react-toastify";

import AnimateInView from "../../components/Animation/AnimateInView";
import knowledgeimg from "../../assest/knowlage/knowledge.png";
import knowledgeimg1 from "../../assest/knowlage/knowledge1.png";
// Sample data for categories and articles

const KnowledgeBase = () => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const lang = i18n.language;
  // const [ SetKnowledges] = useState<KnowledgeModel[]>([]);
  const [knowledges, SetKnowledges] = useState<KnowledgeModel[]>([]);


  const knowledges0 = knowledges[0];
  const knowledges1 = knowledges[1];
  const knowledges2 = knowledges[2];

  const titile0 = knowledges0?.title;
  const titile1 = knowledges1?.title;
  const titile2 = knowledges2?.title;

  // console.log("knowledges0::", knowledges0);
  // console.log("knowledges1::", knowledges1);
  // console.log("knowledges2::", knowledges2);
  // console.log("titile0::", titile0);
  // console.log("titile1::", titile1);
  // console.log("titile2::", titile2);
  
  const [selectedSection, setSelectedSection] = useState<string>("section1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSection(event.target.value);
    getProperty()
  };
  const [pages, setPage] = useState<Pagination>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  });

  const getProperty = async () => {
    const res = await APIGET(
      `/knowledge/all?page=${pages.currentPage}&limit=500&lang=${lang}`
    );

    if (res.statusCode === 200) {
      SetKnowledges(res.data.knowladges);
      setPage(res.data.pagination);
    } else {
      toast.warn("Something went wrong!");
    }
  };
  // Scroll to the top of the page when searchTerm changes
  useEffect(() => {
    getProperty();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ContainerStyle = {
    padding: { md: "100px", xs: "30px" },
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow effect
    color: "#fff", // Text color
    textAlign: "lelt", // Center-aligns text content
  };
  // const moreHelpStyle = {
  //   color: "#582C86",
  //   marginTop: "0px",
  //   display: "grid",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flexDirection: "row",
  // };
  return (
    <>
      <Helmet>
        <title>{t("knowledge.pageTitle")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView>
        <Box
          component={"div"}
          sx={{
            ...ContainerStyle,
            maxWidth: "none",
            height: { xs: "20vh", md: "60vh", lg: "60vh" },
            overflow: "auto",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#ffff",
              fontSize: { xs: "24px", md: "45px", lg: "70px" },
            }}
          >
            <b>{t("knowledge.Legal_Knowledge")}</b>
          </Typography>
        </Box>
      </AnimateInView>

      <div>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#2C3E50", textAlign: "center" }}
        >
          <b> {t("knowledge.topArticlesTitle")}</b>
        </Typography>

        <div>
          <div className="radio-inputs">
            <label>
              <input
                className="radio-input"
                type="radio"
                value="section1"
                checked={selectedSection === "section1"}
                onChange={handleRadioChange}
                name="engine"
              />
              <span className="radio-tile">
                <span className="radio-icon">
                  <img src={knowledgeimg1} alt="" />
                </span>
                <span className="radio-label">
                  {t("knowledge.topArticlesTitle1")}
                  {/* {knowledges1?.title} */}
                </span>
              </span>
            </label>
            <label>
              <input
                className="radio-input"
                type="radio"
                value="section2"
                checked={selectedSection === "section2"}
                onChange={handleRadioChange}
                name="engine"
              />
              <span className="radio-tile">
                <span className="radio-icon">
                  <img src={knowledgeimg} alt="" />
                </span>
                <span className="radio-label">
                  {t("knowledge.topArticlesTitle2")}
                  {/* {knowledges1?.title} */}
                </span>
              </span>
            </label>
            <label>
              <input
                className="radio-input"
                type="radio"
                value="section3"
                checked={selectedSection === "section3"}
                onChange={handleRadioChange}
                name="engine"
              />
              <span className="radio-tile">
                <span className="radio-icon">
                  <img src={knowledgeimg1} alt="" />
                </span>
                <span className="radio-label">
                  {t("knowledge.topArticlesTitle3")}
                </span>
              </span>
            </label>
          </div>

          <div className="law-content" style={{ marginTop: "20px" }}>
            {selectedSection === "section1" && (
              <div className="pdf-viewer">
                <div>
                  {lang === "la" && titile2 === "Land law la" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                         
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges2.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "en" && titile2 === "Land law en" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges2.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                       
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "cn" && titile2 === "Land law cn" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges2.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedSection === "section2" && (
              <div className="pdf-viewer">
                <div>
                  {lang === "la" && titile1 === "Condominium Law la" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges1.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "en" && titile1 === "Condominium Law en" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges1.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "cn" && titile1 === "Condominium Law cn" && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges1.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedSection === "section3" && (
              <div className="pdf-viewer">
                <div>
                  {lang === "la" && titile0 === 'Tax land law la' && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges0.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "en" && titile0 === 'Tax land law en' && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges0.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {lang === "cn" && titile0 === 'Tax land law cn' && (
                    <div>
                      <div style={{ padding: "10px" }}>
                        <Grid container justifyContent="center">
                          {/* {knowledges1.map((item, index) => ( */}
                            <Grid item xs={12} md={12} lg={12}>
                              <Paper
                                elevation={3}
                                sx={{
                                  padding: "1px",
                                  backgroundColor: "#fff",
                                  justifyContent: "center",
                                  justifyItems: "center",
                                }}
                              >
                                <List>
                                  <ListItem sx={{ cursor: "pointer" }}>
                                    <ListItemText
                                      sx={{ padding: { xs: 2, md: 2 } }}
                                      primary={
                                        <Typography
                                          component="div"
                                          sx={{
                                            "& img": {
                                              width: "100%", // Set width of images to 100%
                                            },
                                            textAlign: "justify",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html: knowledges0.desc,
                                          }}
                                        />
                                      }
                                    />
                                  </ListItem>
                                </List>
                              </Paper>
                            </Grid>
                          {/* ))} */}
                        </Grid>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Container maxWidth="xl" sx={{ padding: "25px" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#2C3E50" }}>
          <b>{t("knowledge.getMoreHelpTitle")}</b>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <FiPhoneCall
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />
                      <br />
                      <b>(+856) 20-91 555 123</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={hotline} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <IoLogoWechat
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />{" "}
                      <br />
                      <b>{t("knowledge.wechatTitle")}</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={wechat} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                backgroundColor: "#ECF0F1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <Box sx={moreHelpStyle}>
                      <FaWhatsapp
                        style={{ fontSize: "3em", color: "#582C86" }}
                      />{" "}
                      <br />
                      <b>{t("knowledge.whatsappTitle")}</b>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Box
                    sx={{
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(236, 240, 241, 0.5)",
                    }}
                  >
                    <img src={whatsapp} alt="" width="80px" height="80px" />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container> */}
    </>
  );
};

export default KnowledgeBase;
