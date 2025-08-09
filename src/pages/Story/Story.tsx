import "./Story.css";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import ContactBTT from "../../components/contactBtt/ContactBTT";

import AnimateInView from "../../components/Animation/AnimateInView";
//import img1 from '../../assest/story/toget.png'
//import img2 from '../../assest/story/help.png'
//import img3 from '../../assest/story/bigthink.png'
//import img4 from '../../assest/story/time.png'

function Story() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  /*const imageBorderStyle = {
      width: '100%',
      border: '2px solid #ccc', // Adjust the border properties as needed
   };*/
  return (
    <>
      <Helmet>
        <title>{t("nav.ourStory")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView>
      <div className="hero-intro text-white no-media onStoryMain">
        <div
          className="inner py-8 py-md-11"
          style={{ backgroundColor: "rgba(0, 23, 81, 0.6)" }}
        >
          <div className="containerStory">
            <div className="row align-items-center">
              <Grid container spacing={2}>
                <Grid item xs={12} lg={12} className="Plsasda">
                  {/*<div className='eyebrow'>{t('story.our_story')}</div>*/}
                  <Box
                    component={"h1"}
                    sx={{
                      fontSize: {
                        xs: lang === "cn" ? "1.8rem" : "1.1rem", // Extra small screens
                        sm: lang === "cn" ? "2.5rem" : "1.8rem", // Small screens
                        md: lang === "cn" ? "3rem" : "2rem", // Medium screens
                        lg: lang === "cn" ? "4rem" : "2rem", // Large screens
                      },
                      fontFamily: lang === "cn" ? "ChinaFont" : "",
                    }}
                    className="h2-ivar"
                    dangerouslySetInnerHTML={{ __html: t("story.sub_title") }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      </AnimateInView>
      
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#fff", marginTop: 5, marginBottom: 10 }}
      >
        <Box>
          {/*<h2>{t('story.company_commitment')}</h2>
               <p style={{ margin: 10, textAlign: 'justify' }}>
                  {t('story.sub_company').replace(/<br \/>/g, '')}
               </p>*/}
          <h2 style={{ marginTop: 10 }}>{t("story.origin_of_group.title")}</h2>
          <p
            style={{ margin: 10, textAlign: "justify", lineHeight: "170%" }}
            dangerouslySetInnerHTML={{
              __html: t("story.origin_of_group.subtitle"),
            }}
          />
          <p
            style={{ margin: 10, textAlign: "justify", lineHeight: "170%" }}
            dangerouslySetInnerHTML={{ __html: t("story.origin_of_group.z") }}
          />
          <p
            style={{ margin: 10, textAlign: "justify", lineHeight: "170%" }}
            dangerouslySetInnerHTML={{ __html: t("story.origin_of_group.i") }}
          />
          <p
            style={{ margin: 10, textAlign: "justify", lineHeight: "170%" }}
            dangerouslySetInnerHTML={{ __html: t("story.origin_of_group.o") }}
          />
          <p
            style={{ margin: 10, textAlign: "justify", lineHeight: "170%" }}
            dangerouslySetInnerHTML={{ __html: t("story.origin_of_group.n") }}
          />
        </Box>
      </Container>
      {/* <Container maxWidth="lg" sx={{ backgroundColor: '#fff', marginTop: 10, marginBottom: 24}}>
            <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center" alignItems="center">
               <Grid item xs={6} md={3} sx={{ flex: '0 0 25%', maxWidth: '25%', textAlign: 'center' }}>
                  <img alt="" src={img1} style={imageBorderStyle} />
                  <p>{t('story.Onimg.title1')}</p>
               </Grid>
               <Grid item xs={6} md={3} sx={{ flex: '0 0 25%', maxWidth: '25%', textAlign: 'center' }}>
                  <img alt="" src={img2} style={imageBorderStyle} />
                  <p>{t('story.Onimg.title2')}</p>
               </Grid>
               <Grid item xs={6} md={3} sx={{ flex: '0 0 25%', maxWidth: '25%', textAlign: 'center' }}>
                  <img alt="" src={img3} style={imageBorderStyle} />
                  <p>{t('story.Onimg.title3')}</p>
               </Grid>
               <Grid item xs={6} md={3} sx={{ flex: '0 0 25%', maxWidth: '25%', textAlign: 'center' }}>
                  <img alt="" src={img4} style={imageBorderStyle} />
                  <p>{t('story.Onimg.title4')}</p>
               </Grid>
            </Grid>
         </Container>*/}
    </>
  );
}

export default Story;
