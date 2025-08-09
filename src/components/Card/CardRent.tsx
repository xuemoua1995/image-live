// import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { LiaBathSolid } from "react-icons/lia";
import {
  IoBedOutline,
  IoRestaurantOutline,
  IoTvOutline,
} from "react-icons/io5";
import { GoLocation, GoCalendar } from "react-icons/go";

//import card from "../../assest/card.png";
import "./Card.css";
// import { NumberTostring, fCurrency } from "../../utils/format-number";
// import { fCurrency } from "../../utils/format-number";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";
// import { FaArrowRight } from "react-icons/fa";
import img from "../../assest/img/rentproperty.jpg";

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

  return (
    <div className="card">
      <div className={`card-wrapper`} style={{ height: "100%" }}>
        <Link to="">
          <div className="card-thumb">
            <img
              src={img}
              alt=""
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                verticalAlign: "top",
              }}
            />

            <div className="card-heart">
              <IoIosHeart className="card-fav-icon-heart" />
            </div>
          </div>
        </Link>
        <Link to="" className="card-body">
          <div className="truncate">
            {t("addNewProperty.desc.propertyName")}
          </div>
          <address className="font-small truncate">
            <GoLocation size={15} color="#582c86" />
            Vientiane, Laos PDR
          </address>
          <div className="card-info">
            <ul>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoBedOutline className="card-info-icon" />
                  <span>0</span>
                  <br />
                </div>
                <p className="title-bed">{t("card.bedrooms")}</p>
              </li>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <LiaBathSolid className="card-info-icon" />
                  <span>0</span>
                </div>
                <p className="title-bed">{t("card.bathrooms")}</p>
              </li>

              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoTvOutline className="card-info-icon" />
                  <span>0</span>
                </div>
                <p className="title-bed">{t("card.livingrooms")}</p>
              </li>
              <li className="list-item-property">
                <div className="card-icon-box font-default">
                  <IoRestaurantOutline className="card-info-icon" />
                  <span>0</span>
                </div>
                <p className="title-bed">{t("card.kitchen")}</p>
              </li>
            </ul>
            <ul style={{ marginTop: 30 }}>
              <li className="card-roomtype">
                <div className="card-icon-box font-default">
                  <span>{t("data.roomtype")} </span>
                </div>
                <p className="title-sqm" style={{fontWeight:"bold"}}>A1</p>
              </li>
              <li className="card-roomtype">
                <div className="card-icon-box font-default">
                  <span>{t("area")} </span>
                </div>
                <p className="title-sqm" style={{fontWeight:"bold"}}>
                  {"0"} <b> m&#178;</b>
                </p>
              </li>
            </ul>
            <div className="card-info-list">
              <div className="card-type">
                ({t("addNewProperty.desc.propertyType")})
              </div>
            </div>
          </div>
          <div className="btn-detail">
            {btn && (
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
