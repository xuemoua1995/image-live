import { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { FaWalking, FaCar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import "./Detail.css";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import MediaViewer from "../../components/MediaViewer/MediaViewer";
import { useAppContext } from "../../context/AppContext";
import { APICHECK, APIGET, APIPOST } from "../../helper/api";
import { useRouter } from "../../router/use-router";
import { toast } from "react-toastify";
//import { Interiors, InteriorsCh, Name, Property, Surroundings } from '../../model/property';
import { fCurrency } from "../../utils/format-number";
import { dateTimeFormat } from "../../utils/dateFormat";

export default function Detail() {
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  // Access the 'id' parameter from the URL
  const { id } = useParams();

  const { toggleModal, language, user } = useAppContext();

  const [shortenDetail, setShortenDetail] = useState<boolean>(true);
  const [, setColumns] = useState<number>(3);
  const [isMediaOpen, setIsMediaOpen] = useState<boolean>(false);
  const [, setImgLength] = useState<number>(7);
  const [viewImgIndex, setViewImgIndex] = useState<number>(1);
  const [mediaActiveTab, setMediaActiveTab] = useState<string>("Pic");
  const [isFavourite, setisFavourite] = useState<boolean>(false);
  useEffect(() => {
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
    const getProperty = async () => {
      const res = await APIGET("/property/" + id);
      if (res.statusCode === 200) {
        setProperty(res.data.property);
      } else {
        toast.warn("Something went wrong!");
        router.push("/404");
      }
    };
    const checkFa = async () => {
      const res = await APICHECK(
        "/check/favourite/65c9ab44f252605bdb511fd1",
        user?.token ?? ""
      );
      if (res) {
        setisFavourite(res);
      }
    };
    handleResize();
    getProperty();
    if (user) {
      checkFa();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);
  // toggle long house description
  const toggleDetail = () => {
    setShortenDetail((shortenDetail) => !shortenDetail);
  };

  // toggle media viewer such as image, floor plans and video
  const toggleMediaView = () => {
    setIsMediaOpen((isMediaOpen) => !isMediaOpen);
  };

  // open picture tab on media view when image is clicked
  // with which image index to see first
  const handleImgClick = (index: number) => {
    setMediaActiveTab("Pic");
    setViewImgIndex(index);
    toggleMediaView();
  };

  // open floor plan tab on media view when floor plan is clicked
  const handleFloorClick = () => {
    setMediaActiveTab("FPlan");
    toggleMediaView();
  };

  // open video tab on media view when button to see vdo is clicked
  const handleVdoClick = () => {
    setMediaActiveTab("Vdo");
    toggleMediaView();
  };
  const handleAddfavourite = async () => {
    const res = await APIPOST("/favourite", {
      properties: property?._id,
      email: user?.email,
    });
    if (res.statusCode === 200) {
      setisFavourite(false);
    } else if (res.statusCode === 201) {
      setisFavourite(true);
    } else {
      toast.warn("Something went wrong!");
    }
  };

  return (
    <div className="detail-page">
      <div className="container">
        <div className="property-img-gallery">
          {Array.from({ length: property?.images.length || 0 }).map((_, i) => (
            <div className="img-item" key={i} onClick={() => handleImgClick(i)}>
              <img src={property?.images[i]} alt="" />
            </div>
          ))}
          <div className="btn-all-photo" onClick={() => handleImgClick(0)}>
            View all {property?.images.length} photos
          </div>
          <div className="btn-vdo" onClick={handleVdoClick}>
            View Video
          </div>
        </div>
        <div className="property-info">
          <div className="property-profile">
            <div
              className="property-profile-status"
              onClick={handleAddfavourite}
              style={{ color: "rgb(237, 75, 224)" }}
            >
              {isFavourite ? <FaHeart /> : <CiHeart />}
            </div>
            <div className="property-profile-header">
              <h1>{fCurrency(property?.price ?? 0)} </h1>
              <p
                className="font-title"
                dangerouslySetInnerHTML={{
                  __html:
                    property?.name[language as keyof Name]
                      ?.split("\\n")
                      .join("<br/>") ?? "",
                }}
              ></p>
              <p className="font-title property-profile-id">
                Status:{" "}
                <strong>
                  {property?.status == 1
                    ? "buy"
                    : property?.status == 2
                    ? "Rent"
                    : "Buy or Rent"}
                </strong>{" "}
                <br />
                Property ID: <strong>{property?.id}</strong>
              </p>
            </div>
            <br />
            <div className="property-info-feature font-title">
              <span>
                <strong>{property?.features.bedRoom}</strong> BedRoom
              </span>
              <span>
                <strong>{property?.features.bathRoom}</strong> BathRoom
              </span>
              <span>
                <strong>{property?.features.parking}</strong> Parking
              </span>
              <span>
                <strong>{property?.features.sqm}</strong> Sqm
              </span>
            </div>
            <div className="property-highlight-container">
              <h2 className="property-highlight-title">Highlights</h2>
              <ul className="property-highlights">
                {property?.higthligth[language as keyof Name].map(
                  (feature, index) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
            </div>
            <div className="property-about">
              <h2>About property</h2>
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
                    {" "}
                    Show <FaChevronDown />
                  </>
                ) : (
                  <>
                    {" "}
                    Hide <FaChevronUp />
                  </>
                )}
              </span>
              <p className="property-date">
                Listed on : {dateTimeFormat(property?.createDate ?? "")}
              </p>
            </div>
            <div className="property-map">
              <h2>Map (Location)</h2>
              <iframe
                className="location-map"
                src={property?.map}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
            <div className="property-features">
              <h2>Features</h2>
              <div className="feature-item-box floor-map">
                <div className="property-feature-title">Floor Plan</div>
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
              <div className="feature-item-box interior">
                <div className="property-feature-title">Property Details</div>
                <div className="property-interiors">
                  {(property?.interiors[language as keyof Interiors] || []).map(
                    (interior: InteriorsCh, i) => (
                      <div className="feature-items-list" key={i}>
                        <ul className="feature-item" key={i}>
                          <div className="title">{interior.title}</div>
                          {interior.desc.map((listItem, index) => (
                            <li key={index}>{listItem}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="feature-item-box surrounding">
                <div className="property-feature-title">Surroundings</div>
                <div className="property-surrounding">
                  {property?.surroundings[language as keyof Surroundings]?.map(
                    (item, i) => (
                      <div className="feature-item surrounding" key={i}>
                        <p className="title">{item.title}</p>
                        <p>{item.desc1}</p>
                        <p className="desc">
                          {item.icon === "Drive" && <FaCar />}
                          {item.icon === "Walk" && <FaWalking />}
                          {item.desc2}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="property-similar">
              <h2>Similar Listings</h2>
              <div className="property-similiar-items">
                <Card id={1} btn={false} footer={false} />
                <Card id={1} btn={false} footer={false} />
                <Card id={1} btn={false} footer={false} />
              </div>
            </div>
          </div>
          <div className="property-contact-box">
            <button
              className="btn-request font-default"
              onClick={() => toggleModal("Request")}
            >
              Request a Tour
            </button>
            <div className="contact-container">
              <Link to="/about" className="btn-contact">
                Contact us
              </Link>
              <p>
                <span>(856) 20 9559 5515</span>
              </p>
              <p>
                <span>(856) 20 9559 5515</span>
              </p>
            </div>
          </div>
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
    </div>
  );
}
