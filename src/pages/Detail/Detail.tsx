import { useState, useEffect, useCallback } from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaBath,
  FaHeart,
  FaBed,
  FaMugHot,
} from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { useTranslation } from "react-i18next"; // Import useTranslation
import "./Detail.css";
import { MdBalcony } from "react-icons/md";
import ContactBTT from "../../components/contactBtt/ContactBTT";
import {
  FaWalking,
  FaCar,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaDumbbell,
  FaSquare,
  FaConciergeBell,
  FaCouch,
  FaCocktail,
  FaTshirt,
  FaChalkboard,
  FaPagelines,
  FaBasketballBall,
  FaVideo,
  FaImages,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useParams } from "react-router-dom";
import MediaViewer from "../../components/MediaViewer/MediaViewer";
import { useAppContext } from "../../context/AppContext";
import { APICHECK, APIGET, APIPOST } from "../../helper/api";
import { useRouter } from "../../router/use-router";
import { toast } from "react-toastify";
import { NumberTostring, fCurrency } from "../../utils/format-number";
import { dateTimeFormat } from "../../utils/dateFormat";
import Request from "../../components/Request/Request";
import Similar from "./Similar";
import { Helmet } from "react-helmet-async";
import ContactComponent from "./Contact";

import { InlineShareButtons } from "sharethis-reactjs";

const Detail = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const router = useRouter();
  const { id } = useParams();
  const { toggleModal, language, user, modalType } = useAppContext();
  const [, setImgLength] = useState<number>(7);
  const [, setColumns] = useState<number>(3);
  const [property, setProperty] = useState<Property | null>(null);
  const [shortenDetail, setShortenDetail] = useState<boolean>(true);
  const [isMediaOpen, setIsMediaOpen] = useState<boolean>(false);
  const [viewImgIndex, setViewImgIndex] = useState<number>(1);
  const [mediaActiveTab, setMediaActiveTab] = useState<string>("Pic");
  const [isFavourite, setisFavourite] = useState({
    isFavourite: false,
    isCheckFa: true,
  });

  const navigate = useNavigate();



  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 500) {
      setImgLength(1);
    } else if (screenWidth <= 768) {
      setImgLength(5);
    } else {
      setImgLength(7);
    }

    if (screenWidth <= 550) {
      setColumns(2);
    } else if (screenWidth < 320) {
      setColumns(1);
    } else {
      setColumns(3);
    }
  }, []);

  const getProperty = useCallback(async () => {
    const res = await APIGET("/property/" + id);

    if (res.statusCode === 200) {
      setProperty(res.data.property);
    } else {
      toast.warn("Something went wrong!");
      router.push("/404");
    }
  }, [id, router]);

  const checkFa = async () => {
    const res = await APICHECK(
      "/check/favourite/" + property?._id,
      user?.token ?? ""
    );
    if (res) {
      setisFavourite({ isFavourite: res, isCheckFa: false });
    }
  };

  const toggleDetail = useCallback(() => {
    setShortenDetail((shortenDetail) => !shortenDetail);
  }, []);

  const toggleMediaView = useCallback(() => {
    setIsMediaOpen((isMediaOpen) => !isMediaOpen);
  }, []);

  const handleImgClick = useCallback(
    (index: number) => {
      setMediaActiveTab("Pic");
      setViewImgIndex(index);
      toggleMediaView();
    },
    [toggleMediaView]
  );
  const handleImgVRClick = () => {
    navigate("/vr-image");
  };

  const handleFloorClick = useCallback(() => {
    setMediaActiveTab("FPlan");
    toggleMediaView();
  }, [toggleMediaView]);

  const handleVdoClick = useCallback(() => {
    setMediaActiveTab("Vdo");
    toggleMediaView();
  }, [toggleMediaView]);

  const handleAddfavourite = useCallback(async () => {
    if (user) {
      const res = await APIPOST("/favourite", {
        type: property?._id,
        email: user?.email,
      });
      if (res.statusCode === 200) {
        setisFavourite({ isFavourite: true, isCheckFa: false });
      } else if (res.statusCode === 201) {
        setisFavourite({ isFavourite: true, isCheckFa: false });
      } else {
        toast.warn("Something went wrong!");
      }
    } else {
      toggleModal("SignIn");
    }
  }, [property, user, toggleModal]);

  useEffect(() => {
    if (user && isFavourite.isCheckFa) {
      checkFa();
    }
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 500) {
        setImgLength(1);
      } else if (screenWidth <= 768) {
        setImgLength(5);
      } else {
        setImgLength(7);
      }

      if (screenWidth <= 550) {
        setColumns(2);
      } else if (screenWidth < 320) {
        setColumns(1);
      } else {
        setColumns(3);
      }
    };
    handleResize();
    getProperty();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [handleResize, getProperty, user]);
  //console.log(isFavourite);

  const shareUrl = window.location.href;

  return (
    <>
      <Helmet>
        {/* Google */}
        <title>{property?.name?.en || "Property Details"} - Zion Group</title>
        <meta
          name="description"
          content={`Explore ${property?.name?.en || "this property"}, a ${
            property?.type || "property"
          } located in ${property?.district?.en || "unknown district"}, ${
            property?.province?.en || "unknown province"
          }. Learn more about its features and specifications.`}
        />

        {/* Facebook */}
        <meta
          property="og:title"
          content={property?.name?.en || "Property Details"}
        />
        <meta
          property="og:description"
          content={`Explore ${property?.name?.en || "this property"}, a ${
            property?.type || "property"
          } located in ${property?.district?.en || "unknown district"}, ${
            property?.province?.en || "unknown province"
          }. Learn more about its features and specifications.`}
        />
        <meta property="og:image" content={property?.images[0] || ""} />
        <meta property="og:url" content={window.location.href || ""} />
        <meta property="og:type" content="article" />

        {/* Instagram */}
        {/* Instagram does not support meta tags directly, but you can include the Open Graph tags for Instagram */}

        {/* X (for other platforms) */}
        {/* Add additional meta tags as needed for other platforms */}
      </Helmet>
      <ContactBTT />

      <div className="detail-page">
        <div className="container">
          <div className="property-img-gallery">
            {Array.from({
              length: Math.min(7, property?.images.length || 0),
            }).map((_, i) => (
              <div
                className="img-item"
                key={i}
                onClick={() => handleImgClick(i)}
              >
                <img
                  style={{ borderRadius: 8 }}
                  src={property?.images[i]}
                  alt=""
                />
              </div>
            ))}
            <div className="btn-all-photo" onClick={() => handleImgClick(0)}>
              <FaImages
                size={22}
                style={{ paddingTop: "5px", marginRight: "5px" }}
              />
              {t("data.view_all_photos")} {property?.images.length}{" "}
              {t("data.photos")}
            </div>
            <div className="btn-3d" onClick={handleImgVRClick}>
              <FaImages style={{ paddingTop: "3px", marginRight: "5px" }} />
              {t("data.3d-image")}
            </div>
            <div className="btn-vdo" onClick={handleVdoClick} >
              <FaVideo style={{ paddingTop: "3px", marginRight: "5px" }} />
              {t("data.view_video")}
            </div>
            
          </div>
          <div className="property-info">
            <div className="property-profile">
              <div className="social-heart">
                <div
                  className="property-profile-status"
                  onClick={handleAddfavourite}
                  style={{ color: "rgb(237, 75, 224)" }}
                >
                  {isFavourite.isFavourite ? <FaHeart /> : <CiHeart />}
                </div>
                <div className="social-media">
                  <InlineShareButtons
                    config={{
                      alignment: "left", // alignment of buttons (left, center, right)
                      color: "social", // set the color of buttons (social, white)
                      enabled: true, // show/hide buttons (true, false)
                      font_size: 16, // font size for the buttons
                      labels: "cta", // button labels (cta, counts, null)
                      language: "en", // which language to use (see LANGUAGES)
                      networks: [
                        // which networks to include (see SHARING NETWORKS)
                        "whatsapp",
                        "wechat",
                        "facebook",
                      ],
                      padding: 12, // padding within buttons (INTEGER)
                      radius: 10, // the corner radius on each button (INTEGER)
                      show_total: true,
                      size: 40, // the size of each button (INTEGER)

                      // OPTIONAL PARAMETERS

                      // min_count: 10, // (threshold for total share count to be displayed)
                      url: shareUrl, // (defaults to current url)
                      image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
                      description: "custom text", // (defaults to og:description or twitter:description)
                      title: "custom title", // (defaults to og:title or twitter:title)
                      message: "custom email text", // (only for email sharing)
                      subject: "custom email subject", // (only for email sharing)
                      username: "custom twitter handle", // (only for twitter sharing)
                    }}
                  />
                </div>
              </div>
              <div className="property-profile-header">
                <h1 style={{ color: "black", fontWeight: "bold" }}>
                  {" "}
                  {t("data.start_price")} {fCurrency(property?.price ?? 0)}{" "}
                </h1>
                <p
                  className="font-title"
                  style={{ color: "black", fontWeight: "bold" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      property?.name[language as keyof Name]
                        ?.split("\\n")
                        .join("<br/>") ?? "",
                  }}
                ></p>
                <span style={{ paddingTop: 20 }}>
                  {" "}
                  <GoLocation size={15} color="#582c86" />{" "}
                  {property?.address[language as keyof Name]}{" "}
                </span>
                <h3
                  style={{
                    marginTop: 18,
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#582c86",
                  }}
                >
                  {t("data.roomtype")} : {property?.features?.roomtype} ,{" "}
                  {t("area")} : {property?.features?.sqm} <b> m&#178;</b>
                </h3>
                {property?.type === "land" ? (
                  <div className="property-info-feature font-title">
                    <span>
                      <FaSquare
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>
                        {t("area")}{" "}
                        {NumberTostring(parseFloat(property?.features?.sqm))}
                      </strong>{" "}
                      {t("data.sqm")}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
                <p className="font-title property-profile-id">
                  {t("data.status_sale")}:{" "}
                  <strong>
                    {property?.status == 1
                      ? t("data.sale")
                      : property?.status == 2
                      ? t("data.rent")
                      : t("data.sale_or_rent")}
                  </strong>{" "}
                  <br />
                  {t("data.property_id")}: <strong>{property?.id}</strong>
                  <br />
                  {/* {t('data.unit')}: <strong>{property?.unit}</strong> */}
                </p>
              </div>
              <br />

              {property?.type === "land" ? (
                <div className="property-info-feature font-title">
                  <span>
                    <FaSquare
                      style={{ paddingTop: "3px", marginRight: "5px" }}
                    />
                    <strong>
                      {NumberTostring(parseFloat(property?.features?.sqm))}
                    </strong>{" "}
                    <span>{t("data.sqm")}</span>
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div className="property-feature-title">
                {t("data.property_details")}
              </div>

              {property?.type !== "land" &&
              (property?.features.bathRoom ||
                property?.features.kitchen ||
                property?.features.bedRoom ||
                property?.features.diningRoom ||
                property?.features.laundryRoom ||
                property?.features.balcony ||
                property?.features.livingRoom) ? (
                <div className="property-info-feature font-title">
                  {property?.features?.bedRoom && (
                    <span>
                      <FaBed
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.bedRoom}</strong>{" "}
                      <span>{t("data.bedRoom")}</span>
                    </span>
                  )}
                  {property?.features?.bathRoom && (
                    <span style={{ padding: "3px" }}>
                      <FaBath
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.bathRoom}</strong>{" "}
                      {t("data.baths")}
                    </span>
                  )}

                  {property?.features?.diningRoom && (
                    <span style={{ padding: "3px" }}>
                      <FaUtensils
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.diningRoom}</strong>{" "}
                      {t("data.dining")}
                    </span>
                  )}
                  {property?.features?.balcony && (
                    <span style={{ padding: "3px" }}>
                      <MdBalcony
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.balcony}</strong>{" "}
                      {t("data.balcony")}
                    </span>
                  )}
                  {property?.features?.laundryRoom && (
                    <span style={{ padding: "3px" }}>
                      <FaTshirt
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.laundryRoom}</strong>{" "}
                      {t("data.laundry")}
                    </span>
                  )}

                  {property?.features?.livingRoom && (
                    <span style={{ padding: "3px" }}>
                      <FaCouch
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features.livingRoom}</strong>{" "}
                      {t("allFilter.livingRoom")}
                    </span>
                  )}
                  {property?.features?.kitchen && (
                    <span>
                      <FaConciergeBell
                        style={{ paddingTop: "3px", marginRight: "5px" }}
                      />
                      <strong>{property?.features?.kitchen}</strong>{" "}
                      {t("data.kitchen")}
                    </span>
                  )}
                </div>
              ) : (
                <></>
              )}

              <div className="property-highlight-container">
                <h2 className="property-highlight-title">
                  {t("data.feasibility")}
                </h2>

                {property?.type !== "land" &&
                (property?.features.swimming_Pool ||
                  property?.features.gym ||
                  property?.features.bar ||
                  property?.features?.cafe ||
                  property?.features?.parking ||
                  property?.features?.garden ||
                  property?.features?.basketBall ||
                  property?.features?.restaurant ||
                  property?.features?.poolBar ||
                  property?.features?.meetingRoom) ? (
                  <div className="property-info-feature font-title">
                    {property?.features?.swimming_Pool && (
                      <span>
                        <FaSwimmingPool
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.swimming_Pool}</strong>{" "}
                        {t("data.swimming_Pool")}
                      </span>
                    )}
                    {property?.features?.bar && (
                      <span>
                        <FaCocktail
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.bar}</strong>{" "}
                        {t("data.bar")}
                      </span>
                    )}
                    {property?.features?.poolBar && (
                      <span>
                        <FaCocktail
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.poolBar}</strong>{" "}
                        {t("data.poolBar")}
                      </span>
                    )}
                    {property?.features?.restaurant && (
                      <span>
                        <FaUtensils
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.restaurant}</strong>{" "}
                        {t("data.restaurant")}
                      </span>
                    )}
                    {property?.features?.parking && (
                      <span>
                        <FaParking
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.parking}</strong>{" "}
                        {t("data.parking")}
                      </span>
                    )}
                    {property?.features?.gym && (
                      <span>
                        <FaDumbbell
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>
                          {NumberTostring(parseFloat(property?.features?.gym))}
                        </strong>{" "}
                        {t("data.gym")}
                      </span>
                    )}
                    {property?.features?.garden && (
                      <span>
                        <FaPagelines
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>
                          {NumberTostring(
                            parseFloat(property?.features?.garden)
                          )}
                        </strong>{" "}
                        {t("data.garden")}
                      </span>
                    )}
                    {property?.features?.basketBall && (
                      <span>
                        <FaBasketballBall
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>
                          {NumberTostring(
                            parseFloat(property?.features?.basketBall)
                          )}
                        </strong>{" "}
                        {t("data.basketBall")}
                      </span>
                    )}
                    {property?.features?.cafe && (
                      <span>
                        <FaMugHot
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>{property?.features?.cafe}</strong>{" "}
                        {t("data.cafe")}
                      </span>
                    )}
                    {property?.features?.meetingRoom && (
                      <span>
                        <FaChalkboard
                          style={{ paddingTop: "3px", marginRight: "5px" }}
                        />
                        <strong>
                          {NumberTostring(
                            parseFloat(property?.features?.meetingRoom)
                          )}
                        </strong>{" "}
                        {t("data.meeting")}
                      </span>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <div className="property-highlight-container">
                <h2 className="property-highlight-title">
                  {t("data.highlights")}
                </h2>
                <ul className="property-highlights">
                  {property?.higthligth[language as keyof Name].map(
                    (feature, index) => (
                      <li key={index}>{feature}</li>
                    )
                  )}
                </ul>
              </div>
              <div className="property-about">
                <h2>{t("data.about_this_property")}</h2>
                <p
                  className="detail"
                  style={{
                    display: shortenDetail ? "-webkit-box" : "block",
                  }}
                >
                  {property?.description[language as keyof Name]}
                </p>
                <span className="detail-btn" onClick={toggleDetail}>
                  {shortenDetail ? (
                    <>
                      {t("data.show")} <FaChevronDown />
                    </>
                  ) : (
                    <>
                      {t("data.hide")} <FaChevronUp />
                    </>
                  )}
                </span>
                <p className="property-date">
                  {t("data.listed_on")} :{" "}
                  {dateTimeFormat(property?.createDate ?? "")}
                </p>
              </div>
              <div className="property-map">
                <h2>{t("data.map_location")}</h2>
                <iframe
                  className="location-map"
                  src={`https://maps.google.com/maps?q=${property?.map}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="property-features">
                <h2>{t("data.features")}</h2>
                <div className="feature-item-box floor-map">
                  <div className="property-feature-title">
                    {t("data.floor_plan")}
                  </div>
                  {Array.from({ length: property?.floorplans.length || 0 }).map(
                    (_, i) => (
                      <img
                        key={i}
                        src={property?.floorplans[i]}
                        alt=""
                        onClick={handleFloorClick}
                      />
                    )
                  )}
                </div>
                {/* <div className="feature-item-box interior">
                  <div className="property-feature-title">
                    {t("data.property_details")}
                  </div>
                  <div className="property-interiors">
                    {(
                      property?.interiors[language as keyof Interiors] || []
                    ).map((interior: InteriorsCh, i) => (
                      <div className="feature-items-list" key={i}>
                        <ul className="feature-item" key={i}>
                          <div className="title">{interior.title}</div>
                          {interior.desc.map((listItem, index) => (
                            <li key={index}>{listItem}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="feature-item-box surrounding">
                  <div className="property-feature-title">
                    {t("data.surroundings")}
                  </div>
                  <div className="property-surrounding">
                    {property?.surroundings[
                      language as keyof Surroundings
                    ]?.map((item, i) => (
                      <div className="feature-item surrounding" key={i}>
                        <p className="title">{item.title}</p>
                        <p>{item.desc1}</p>
                        <p className="desc">
                          {item.icon === "Drive" && <FaCar />}
                          {item.icon === "Walk" && <FaWalking />}
                          {item.desc2}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="property-similar">
                <h2>{t("data.similar_listings")}</h2>
                <Similar keyToFind={property?.province.en ?? ""} />
              </div>
            </div>
            <ContactComponent
              property={property}
              author={property?.user_id?._id ?? ""}
              title={t("data.Interested")}
            />
          </div>
        </div>
        {isMediaOpen && (
          <MediaViewer
            toggleImgView={toggleMediaView}
            imgs={property?.images ?? []}
            floorPlans={property?.floorplans ?? []}
            activeTab={mediaActiveTab}
            setActiveTab={setMediaActiveTab}
            viewImgIndex={viewImgIndex}
            setViewImgIndex={setViewImgIndex}
            videosURL={property?.video ?? null}
          />
        )}
        <Request
          type={modalType}
          property={property}
          author={property?.user_id?._id ?? ""}
        />
      </div>
    </>
  );
};

export default Detail;
