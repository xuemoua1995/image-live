import "./plansection.css";
import Laotian from '../../assest/img/laotian.png'
import FullyFurni from '../../assest/img/fully-furni.png'
import Early from '../../assest/img/early.png'
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function PlanSection() {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div>
      <section className="creative-cards style-one">
        <div className="container">
          <div className="row">
            <div className="card-column">
              <div className="card-details">
                <div className="card-icons">
                  <img
                    className="light-icon"
                    src={Laotian}
                    alt="icon"
                  />
                </div>
                <h3>
                {t("laotian-title")}
                </h3>
                <p>{t("laotian-desc")}</p>
              </div>
            </div>
            <div className="card-column">
              <div className="card-details">
                <div className="card-icons">
                  <img
                    className="light-icon"
                    src={FullyFurni}
                    alt="icon"
                  />
                </div>
                <h3>
                  {t("fully-furni-title")}
                </h3>
                <p>{t("fully-furni-desc")}</p>
              </div>
            </div>
            <div className="card-column">
              <div className="card-details">
                <div className="card-icons">
                  <img
                    className="light-icon"
                    src={Early}
                    alt="icon"
                  />
                </div>
                <h3>
                {t("early-title")}
                </h3>
                <p>{t("early-desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
