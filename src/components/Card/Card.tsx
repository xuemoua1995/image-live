import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { LiaBathSolid } from "react-icons/lia";
import {
  IoBedOutline,
  IoRestaurantOutline,
  IoTvOutline,
} from "react-icons/io5";
import { GoCalendar, GoLocation } from "react-icons/go";
import { fCurrency } from "../../utils/format-number";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useAppContext } from "../../context/AppContext";
import { APICHECK, APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./Card.css";

interface CardProps {
  item?: Properties;
  footer?: boolean;
  btn?: boolean;
  id: number;
}

const Card: React.FC<CardProps> = ({ item, footer = true }) => {
  const { t } = useTranslation();
  const { language, user, toggleModal, propertyType } = useAppContext();
  const [isFavourite, setisFavourite] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for the current image index

  // Check if the property is in the user's favourites
  const checkFa = useCallback(async () => {
    const res = await APICHECK(
      "/check/favourite/" + item?._id,
      user?.token ?? ""
    );
    if (res) {
      setisFavourite(res);
    }
  }, [user]);

  // Toggle favourite status
  const handleAddfavourite = useCallback(async () => {
    if (user) {
      const res = await APIPOST("/favourite", {
        type: item?._id,
        email: user?.email,
      });
      if (res.statusCode === 200) {
        setisFavourite(false);
      } else if (res.statusCode === 201) {
        setisFavourite(true);
      } else {
        toast.warn("Something went wrong!");
      }
    } else {
      toggleModal("SignIn");
    }
  }, [user]);

  // Initialize favourite status
  useEffect(() => {
    if (user) {
      checkFa();
    }
  }, [user, checkFa]);

  // Function to navigate to the next image
  const nextImage = () => {
    if (item?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    if (item?.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="card">
      <div className="card-wrapper" style={{ height: "100%" }}>
        <div className="card-thumb">
          <div className="image-slider">
            <img
              src={item?.images[currentImageIndex]}
              alt=""
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                verticalAlign: "top",
                transition: "opacity 0.5s ease-in-out",
              }}
            />
            <button
              className="prev-button"
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            >
              &#8592;
            </button>
            <button
              className="next-button"
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                padding: "10px",
                cursor: "pointer",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            >
              &#8594;
            </button>
          </div>
          <div className="card-price">
            <div className="button-animate">
              <h3>{fCurrency(item?.price ?? 0)}</h3>
            </div>
          </div>

          <div
            className="card-heart"
            onClick={handleAddfavourite}
            style={{ color: isFavourite ? "rgb(237, 75, 224)" : "" }}
          >
            <IoIosHeart className="card-fav-icon-heart" />
          </div>
        </div>

        {item?.bestSellerStatus === false ? (
          <div className="box" style={{ display: "none" }}>
            <div className="ribbon">
              <span>{t("card.best-sale")}</span>
            </div>
          </div>
        ) : (
          <div className="box">
            <div className="ribbon">
              <span>{t("card.best-sale")}</span>
            </div>
          </div>
        )}

        <div className="card-body">
          <div className="truncate">
            <h3>{item?.name[language as keyof Name]}</h3>
          </div>
          <address className="font-small truncate">
            <GoLocation size={15} color="#582c86" />
            {item?.address[language as keyof Name]}
          </address>

          <div className="card-info">
            <ul>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoBedOutline className="card-info-icon" />
                  <span>{item?.features.bedRoom}</span>
                </div>
                <p className="title-bed">{t("card.bedrooms")}</p>
              </li>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <LiaBathSolid className="card-info-icon" />
                  <span>{item?.features?.bathRoom}</span>
                </div>
                <p className="title-bed">{t("card.bathrooms")}</p>
              </li>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoTvOutline className="card-info-icon" />
                  <span>{item?.features?.livingRoom}</span>
                </div>
                <p className="title-bed">{t("card.livingrooms")}</p>
              </li>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoRestaurantOutline className="card-info-icon" />
                  <span>{item?.features?.kitchen}</span>
                </div>
                <p className="title-bed">{t("card.kitchen")}</p>
              </li>
            </ul>
            <ul style={{ marginTop: 30 }}>
              <li className="card-roomtype">
                <div className="card-icon-box font-default">
                  <span>{t("data.roomtype")}</span>
                </div>
                <p style={{fontWeight:"bold"}} className="title-sqm">{item?.features?.roomtype ?? "0"}</p>
              </li>
              <li className="card-roomtype">
                <div className="card-icon-box font-default">
                  <span>{t("area")}</span>
                </div>
                <p className="title-sqm" style={{fontWeight:"bold"}}>
                  {item?.features?.sqm ?? "0"} <b> m&#178;</b>
                </p>
              </li>
            </ul>
            <div className="card-info-list">
              <div className="card-type">
                (
                {item?.type &&
                  propertyType[item?.type as keyof PropertyTypes] &&
                  propertyType[item?.type as keyof PropertyTypes][
                    language as keyof langType
                  ]}
                )
              </div>
            </div>
          </div>

          <div className="btn-detail">
            <Link to={`/property/${item?._id}`}>
              <div className="box-1">
                <div className="btn btn-one">
                  <span>
                    {t("card.details")}{" "}
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
                  </span>
                </div>
              </div>
            </Link>

            {footer && (
              <>
                <div className="card-divider" />
                <div className="card-footer">
                  <div className="card-footer-item">
                    <CiUser />
                    <span>({item?.user_id?.fname})</span>
                  </div>
                  <div className="card-footer-item">
                    <GoCalendar />
                    <span>({dateTimeFormat(item?.createDate ?? "")})</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
