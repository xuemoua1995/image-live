import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
// import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { respondSive } from "../../pages/Home/Initials";

const Popular = () => {
  const { t } = useTranslation();

  const data = [
    {
      title: `${t("home.property-swimming")}`,
      desc: `${t("home.property-swimming-desc")}`,
      imgPath:
        "https://www.shutterstock.com/image-photo/new-modern-block-flats-green-600nw-2461488711.jpg",
      buttonTitle: "Explore Vientiane",
    },
    {
      title: `${t("home.property-gym")}`,
      imgPath:
        "https://www.shutterstock.com/image-photo/new-modern-block-flats-green-600nw-2371172245.jpg",
      desc: `${t("home.property-gym-desc")}`,
    },
    {
      title: `${t("home.property-balcony")}`,
      imgPath:
        "https://www.vancouvernewcondos.com/wp-content/uploads/2019/10/4338-cambie-768x737.jpg",
      desc: `${t("home.property-balcony-desc")}`,
    },
    {
      title: `${t("home.best-price")}`,
      imgPath:
        "https://www.winnipegregionalrealestatenews.com/uploads/publication/img_condominium.jpg",
      desc: `${t("home.best-price-desc")}`,
    },
  ];
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const [showNa, setShowNav] = useState(false);
  return (
    <div>
      <div className="new-section-header popular-title">
        <h1 className="">{t("home.popular")}</h1>
      </div>

      <div className="container">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={false}
          loop={true}
          // navigation={!isMobile && showNa}
          navigation={false}
          // modules={[Autoplay, Navigation]}
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="mySwiper"
          breakpoints={respondSive}
        >
          {data?.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="card_news_flex">
                <div className="card_news">
                  <img
                    className="card__background"
                    src={item.imgPath}
                    alt="Photo"
                  />
                  <div className="card__content | flow">
                    <div className="card__content--container | flow">
                      <h2 className="card__title">{item.title}</h2>
                      <p className="card__description">{item.desc}</p>
                    </div>
                    <button
                      style={{
                        fontSize: 15,
                        fontFamily:
                          "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
                      }}
                      className="card-btn"
                    >
                      <Link
                        style={{ color: "white" }}
                        to={"/filter-facility/page/1"}
                      >
                        {t("card.details")}{" "}
                      </Link>
                      <FaArrowRight size={12} style={{ margin: "auto 2 -3" }} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Popular;
