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

import "./CardSlide.css";
import { fCurrency } from "../../utils/format-number";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useAppContext } from "../../context/AppContext";
import { APICHECK, APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";

interface CardProps {
  item?: Properties;
  footer?: boolean;
  btn?: boolean;
  id: number;
}
const Card: React.FC<CardProps> = ({
  item,
  footer = true,
  btn = true,
  // available:true
}) => {
  const { t } = useTranslation();
  const { language, user, toggleModal, propertyType } = useAppContext();
  const [isFavourite, setisFavourite] = useState<boolean>(false);

  const checkFa = useCallback(async () => {
    const res = await APICHECK(
      "/check/favourite/" + item?._id,
      user?.token ?? ""
    );
    if (res) {
      setisFavourite(res);
    }
  }, [user]);

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
        // toast.success('Successfully');
      } else {
        toast.warn("Something went wrong!");
      }
    } else {
      toggleModal("SignIn");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      checkFa();
    }
  }, []);
  return (
    <div className="card">
      <div className={`card-wrapper`} style={{ height: "100%" }}>
        <Link to={`/property/${item?._id}`}>
          <div className="card-thumb">
            <img
              src={item?.images[0]}
              alt=""
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                verticalAlign: "top",
              }}
            />

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
        </Link>

        {item?.bestSellerStatus == false ? (
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
        <Link to={`/property/${item?._id}`} className="card-body">
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
                  <br />
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
                  <span>{t("data.roomtype")} </span>
                </div>
                <p className="title-sqm" style={{fontWeight:"bold"}}> {item?.features?.roomtype ?? "0"}</p>
              </li>
              <li className="card-roomtype">
                <div className="card-icon-box font-default">
                  <span>{t("area")} </span>
                </div>
                <p className="title-sqm" style={{fontWeight:"bold"}}>
                  {" "}
                  {item?.features?.sqm ?? "0"} <b> m&#178;</b>
                </p>
              </li>
            </ul>
            <div className="card-info-list">
              <div className="card-type" style={{ margin: btn ? "0" : "auto" }}>
                ({" "}
                {item?.type &&
                  propertyType[item?.type as keyof PropertyTypes] &&
                  propertyType[item?.type as keyof PropertyTypes][
                    language as keyof langType
                  ]}{" "}
                )
              </div>
            </div>
          </div>
          <div className="btn-detail">
            {btn && (
              <div className="box-1">
                <div className="btn btn-one">
                  <span>
                    {t("card.details")}{" "}
                    <FaArrowRight size={12} style={{ margin: "auto 2 -3" }} />
                  </span>
                </div>
              </div>
            )}
            {footer && (
              <>
                <div className="card-divider" />
                <div className="card-footer">
                  <div className="card-footer-item">
                    <CiUser />
                    <span>( {item?.user_id?.fname})</span>
                  </div>
                  <div className="card-footer-item">
                    <GoCalendar />
                    <span>( {dateTimeFormat(item?.createDate ?? "")})</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
