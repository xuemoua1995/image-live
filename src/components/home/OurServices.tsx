import {
  FaHandshake,
  FaBuilding,
  FaKey,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
const OurServices = () => {
  const { t } = useTranslation();

  return (
    <section className="land-section section-padding">
      <div className="container">
        <section className="service-section">
          <div className="service-section-img">
            <img
              src="https://preview.colorlib.com/theme/leramiz/img/service.jpg"
              alt=""
            />
          </div>
          <div className="header-service">
            <div>
              <h1>{t("home.service")}</h1>
              {/* <p>We provide the perfect service for</p> */}
            </div>

            <div className="service-option">
              <ul>
                <li className="title-service">
                  <p>
                    <FaHandshake size={30} />
                  </p>
                  <span>{t("home.agents")}</span>
                </li>
                <li className="title-service">
                  <p>
                    <FaBuilding size={30} />
                  </p>
                  <span>{t("home.landlords")}</span>
                </li>
                <li className="title-service">
                  <p>
                    <FaKey size={30} />
                  </p>
                  <span>{t("home.Rents")}</span>
                </li>
                <li className="title-service">
                  <p>
                    <FaHandHoldingUsd size={30} />
                  </p>
                  <span>{t("home.Buyers")}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OurServices;
