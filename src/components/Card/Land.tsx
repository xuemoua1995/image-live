import React, { useCallback, useEffect, useState } from "react";
import "./Land.css";
import { IoIosHeart } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { fCurrency } from "../../utils/format-number";
import { APICHECK, APIPOST } from "../../helper/api";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface LandProps {
  imgUrl: string;
  property: Properties;
}

const Land: React.FC<LandProps> = ({ imgUrl, property }) => {
  const { language, user, toggleModal } = useAppContext();
  const { t } = useTranslation();
  const [isFavourite, setisFavourite] = useState<boolean>(false);

  const checkFa = useCallback(async () => {
    const res = await APICHECK(
      "/check/favourite/" + property?._id,
      user?.token ?? ""
    );
    if (res) {
      setisFavourite(res);
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      checkFa();
    }
  }, [user]);

  const handleAddfavourite = useCallback(async () => {
    if (user) {
      const res = await APIPOST("/favourite", {
        properties: property?._id,
        email: user?.email,
      });
      //console.log(res.statusCode);
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
  return (
    <div className="land-item">
      <div className="land-item-wrapper">
        <Link
          to={`/property/${property?._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="land-thumb">
            <img
              src={imgUrl}
              alt=""
              style={{
                width: "100%",
                aspectRatio: "16/9",
                verticalAlign: "top",
              }}
            />
            {/* {property?.video.from === "upload" ? (
                             <video
                             src={property.video.url}
                             loop
                             muted
                             autoPlay
                             playsInline
                             x5-playsinline="true"
                             x5-video-player-type="h5-page"
                             webkit-playsinline="true"
                             style={{
                                width: '100%',
                                aspectRatio: 16/9,
                                verticalAlign: 'top'
                             }}
                           />
                        ) : (
                            <img src={imgUrl} alt="" style={{width: '100%', aspectRatio: '16/9', verticalAlign: 'top'}}/>
                        )} */}

            <div className="land-price">{fCurrency(property?.price ?? 0)}</div>
            {/* <div className="land-status">
              {property?.status === 1 ? (
                <span>{t("card.sale")}</span>
              ) : property?.status === 2 ? (
                <span>{t("card.rent")}</span>
              ) : (
                <>
                  <span>{t("card.sale")}</span>
                  <span>{t("card.rent")}</span>
                </>
              )}
            </div> */}
            <div
              className="card-fav"
              onClick={handleAddfavourite}
              style={{ color: isFavourite ? "rgb(237, 75, 224)" : "" }}
            >
              <IoIosHeart className="card-fav-icon" />
            </div>
          </div>
          <div className="land-item-body font-small">
            <div className="land-item-area">
              {t("area")}: {property.features.sqm} m<sup>2</sup>
            </div>
            <address className="truncate">
              {property?.district[language as keyof Name]} |{" "}
              {property?.province[language as keyof Name]}
            </address>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Land;
