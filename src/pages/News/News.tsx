import { Fragment, useEffect, useState } from "react";
import { ListItemText, Typography, Box } from "@mui/material";
import "./News.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { APIGET } from "../../helper/api";
import Pagination from "../../components/Pagination/pagination-news";

import bg from "../../assest/news/Image_20240410172701.jpg";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import { dateTimeFormat } from "../../utils/dateFormat";
import CardLoading from "../../components/Card/CardLoading";
import AnimateInView from "../../components/Animation/AnimateInView";

// import emptyImage from "../../assest/empty.png";
// import emptyImage from "../../assest/empty.png";

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

function News() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize useTranslation

  const [_windowSize, setWindowSize] = useState(window.innerWidth);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

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

  const getNewsData = async () => {
    const res = await APIGET(
      `/news/all?page=${pages.currentPage}&lang=${i18n.language}`
    );

    if (res.statusCode === 200) {
      setBlogs(res.data.news);
      setPage(res.data.pagination);
    } else {
      toast.warn("Something went wrong!");
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Get the current items based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = blogs.slice(startIndex, startIndex + itemsPerPage);

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
  // const styleH = { fontSize: windowSize < 600 ?  34 : 40}
  const bgss = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover", // Cover the entire header area
    backgroundPosition: "center", // Center the background image
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };
  //console.log(blogs);
  return (
    <>
      <Helmet>
        <title>{t("nav.News")} - Zion Group</title>
      </Helmet>
      <ContactBTT />
      <AnimateInView>
        <div className="grbKwn" style={bgss}>
          <Box
            component={"header"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderBottom: "2px solid #fff",
              position: "relative", // To contain absolutely positioned Typography
              minHeight: { xs: "40vh", md: "400px", lg: "500px" }, // Add min-height
              color: "rgb(255, 255, 255)", // Add text color
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
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
                color: "#fff",
                position: "absolute",
                top: { xs: "50%", md: "40%", lg: "50%" }, // Set different top positions for extra small and large screens
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "1",
                width: "90%",
                fontSize: ["2rem", "3rem", "4rem"],
              }}
              dangerouslySetInnerHTML={{ __html: t("news.title") }}
            />
          </Box>
        </div>
      </AnimateInView>

      <section className="feature-section section-padding">
        <div className="container search-news">
          <h2 style={{ maxWidth: 1200, marginBottom: 20, marginTop: 20 }}>
            {t("zion-news")}{" "}
          </h2>
          <h3 style={{ maxWidth: 1200, marginBottom: 20, marginTop: 20 }}>
            {t("zion-news-activities")}{" "}
          </h3>
        </div>

        <div className="" style={{ maxWidth: "100%" }}>
          {blogs.length > 0 ? (
            <>
              <div className="cards-info" style={{ maxWidth: "100%" }}>
                {currentItems.map((item) => (
                  <div className="cards-container" key={item._id}>
                    <div className="cards-item">
                      <div className="cards-header">
                        <img src={item.cover} alt="image" />
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="span"
                        >
                          <FaRegUser /> {item.author.gname}{" "}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          component="span"
                        >
                          <IoCalendarOutline />{" "}
                          {dateTimeFormat(item.createDate)}{" "}
                        </Typography>
                      </div>
                      <div className="cards-body" style={{ textAlign: "left" }}>
                        <ListItemText
                          primary={truncateTile(item.title, 40)}
                          secondary={
                            <Fragment>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="span"
                                dangerouslySetInnerHTML={{
                                  __html: truncateDescription(item.desc, 150),
                                }}
                              />
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                component="span"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: 20,
                                  alignItems: "center",
                                }}
                              >
                                {/* <button
                                  onClick={() => handleItemClick(item)}
                                  style={{
                                    fontSize: 15,
                                    // textTransform: "uppercase", // This will convert text to uppercase
                                    fontFamily:
                                      "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                                  }}
                                  className="read-more-blog"
                                >
                                  {t("news.read-more")}{" "}
                                  
                                  <svg
                                    style={{ margin: "auto 2 -8" }}
                                    className="icon"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </button> */}

                                <button
                                onClick={() => handleItemClick(item)}
                                 className="animated-button">
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="arr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                  </svg>
                                  <span className="text">{t("news.read-more")}{" "}</span>
                                  <span className="circle"></span>
                                  <svg
                                    viewBox="0 0 24 24"
                                    className="arr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                  </svg>
                                </button>
                              </Typography>
                            </Fragment>
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination
                // totalPages={pages.totalPages}
                // handleClick={handleClick}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            <>
              <CardLoading />
              {/* <img className="img-empty" src={emptyImage} alt="Empty" /> */}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default News;
