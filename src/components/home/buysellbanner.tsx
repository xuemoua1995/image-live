import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import img1 from "../../assest/about/01.jpg";
import img2 from "../../assest/about/02.jpg";

const BuySellComponent = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const services = [
    {
      title: t("about.services.for_sellers.title"),
      desc: t("about.services.for_sellers.desc"),
      icon: img1,
    },
    {
      title: t("about.services.for_buyers.title"),
      desc: t("about.services.for_buyers.desc"),
      icon: img2,
    },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}></Grid>
      <Grid item xs={12} md={12}>
        <div className="about-widget container">
          {services.map((item, i) => (
            <div className="service-item" key={i}>
              <div className="service-icon font-header">
                <img className="itemImg" src={item.icon} alt="" />
              </div>
              <div
                style={{ textAlign: "start" }}
                className="service-text font-title"
              >
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};
export default BuySellComponent;
