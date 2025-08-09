import { Grid, Typography } from "@mui/material";
import "./NewOne.css";
import { Helmet } from "react-helmet-async";

// import { Fragment } from "react";
import { FaRegUser, FaArrowLeft } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function NewsOne() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize useTranslation

  const backWard = () => {
    navigate("/news");
  };
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    padding: "8px 25px",
    backgroundColor: "#7236b2",
    border: "1px solid #ccc",
    borderRadius: "20px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
  };

  // Access the state data
  const { item } = (location.state || {}) as { item: Blogs };

  return (
    <>
      <Helmet>
        <title>{t("nav.News-detail")} - Zion Group</title>
      </Helmet>
      <section className="feature-section-detail section-padding">
        <div className="">
          <button onClick={backWard} style={buttonStyle}>
            <FaArrowLeft size={16} style={{ marginRight: "5px" }} />
            {t("home.back-ward")}
          </button>
        </div>
        <div className="blogs-info" style={{ marginTop: 30 }}>
          <div className="blogs-container">
            <div className="blogs-item">
              <Typography
                variant="h4"
                color="CaptionText"
                component="span"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font sizes for different screen sizes
                  // Add any other responsive styles here
                }}
              >
                {item.title}
              </Typography>
              <br />

              <div className="blogs-header">
                <img src={item.cover} alt="rover" />
              </div>
              <Typography
                variant="caption"
                color="textSecondary"
                component="span"
              >
                <FaRegUser /> {item.author.gname}{" "}
                <IoMdTime style={{ marginLeft: 10 }} />{" "}
                {dateTimeFormat(item.createDate)}
              </Typography>
              <Grid
                item
                xs={10}
                md={11}
                style={{ marginTop: 10, textAlign: "justify" }}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="span"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsOne;
