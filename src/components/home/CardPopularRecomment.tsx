// import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useTranslation } from "react-i18next";
import "./cardPopularRecomment.css";
// import { useRouter } from "../../router/use-router";
// import { FaArrowRight } from "react-icons/fa";
import image from "../../assest/img/spa-pool.jpg";
import image1 from "../../assest/img/gym.jpg";
import image2 from "../../assest/img/balcony.jpg";
import image3 from "../../assest/img/2.png";

const BeautifulCard = () => {
  // const router = useRouter();
  const { t } = useTranslation();
  const data = [
    {
      title: `${t("home.property-swimming")}`,
      desc: `${t("home.property-swimming-desc")}`,
      imgPath: image,
      buttonTitle: "Explore Vientiane",
      type: "swimming",
    },
    {
      title: `${t("home.property-gym")}`,
      imgPath: image1,
      desc: `${t("home.property-gym-desc")}`,
      type: "gym",
    },
    {
      title: `${t("home.property-balcony")}`,
      imgPath: image2,
      desc: `${t("home.property-balcony-desc")}`,
      type: "balcony",
    },
    {
      title: `${t("home.best-price")}`,
      imgPath: image3,
      desc: `${t("home.best-price-desc")}`,
      type: "price",
    },
  ];
  return (
    <div className="container">
      <div className="new-section-header popular-title">
        <h1 style={{marginTop:40}} className="">{t("home.popular")}</h1>
      </div>
      <div className="card-container">
        {data?.map((item, i) => (
          <div className="card-condo" key={i}>
            <img width="250" height="150" src={item.imgPath} alt="" />
            <h3
              style={{
                fontSize: 16,
                fontFamily:
                  "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: 12,
                fontFamily:
                  "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
              }}
            >
              {item.desc}
            </p>
            <a href="/filter-facility/page/1">
              <button
                style={{
                  fontSize: 14,
                  fontFamily:
                    "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                }}
              >
                <span>{t("card.details")} </span>

                {/* <FaArrowRight size={12} style={{ margin: "auto 2 -3" }} /> */}
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
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautifulCard;
