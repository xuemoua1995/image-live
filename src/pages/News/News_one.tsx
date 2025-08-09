import { Grid, Typography } from "@mui/material";
import "./NewOne.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { APIGET } from "../../helper/api";
// import { Fragment } from "react";
import { FaRegUser, FaArrowLeft } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function NewsOne() {
  const location = useLocation();
  const [_windowSize, setWindowSize] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const backWard = () => {
    navigate("/news");
  };
  function truncateDescription(description: string, maxLength: number) {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + "...";
    }
  }
  function truncateTile(title: string, maxLength: number) {
    if (title.length <= maxLength) {
      return title;
    } else {
      return title.substring(0, maxLength) + "...";
    }
  }
  const getNewsData = async () => {
    const res = await APIGET(`/news/all?page=1&lang=${i18n.language}`);

    if (res.statusCode === 200) {
      setBlogs(res.data.news);
    } else {
      toast.warn("Something went wrong!");
    }
  };
  const handleItemClick = (item: Blogs) => {
    // Navigate to the desired route and pass the item data
    getNewsData();
    navigate(`/news/item/${item._id}`, { state: { item } });
  };
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    getNewsData();
    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // [i18n.language]
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
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
                    xs={12}
                    md={12}
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
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{paddingLeft:2}} variant="h5">{t("Recent_News")}</Typography>

                {blogs.map((itemNews, index) => (
                  <Card
                    onClick={() => handleItemClick(itemNews)}
                    key={index}
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      padding: "10px", // Consistent padding for all cards
                      marginBottom: "16px", // Space between cards
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional for better appearance
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151, borderRadius: "4px" }} // Added border-radius for better visuals
                      image={itemNews.cover}
                      alt="Recent news cover"
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        paddingLeft: "16px",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto", padding: 0 }}>
                        <Typography
                          component="div"
                          variant="h6"
                          sx={{ marginBottom: "8px", 
                            textDecoration: 'underline',
                            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" }, // Responsive font sizes
                           }}
                        >
                          {truncateTile(itemNews.title, 23)}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ color: "text.secondary", fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem" } }}
                          dangerouslySetInnerHTML={{
                            __html: truncateDescription(itemNews.desc, 100),
                          }}
                        />
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Box>
        </div>
      </section>
    </>
  );
}

export default NewsOne;
