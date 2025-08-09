import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";

import { IoMdMail } from "react-icons/io";
import logo from "../../assest/logo/logow.png";
import { useTranslation } from "react-i18next";
import "./Footer1.css";

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-intro">
          <h1 className="font-header">{t("hotline.title")}</h1>
          <p>{t("hotline.infos")}</p>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-menu">
          <div className="footer-menu-item">
            <h3 className="item-title">{t(`nav.aboutUs`)}</h3>
            <ul className="item font-small">
              <li>
                <Link to="/about#contact">{t(`nav.contact`)}</Link>
              </li>
              <li>
                <Link to="/story">{t(`nav.ourStory`)}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-menu-item">
            <h3 className="item-title">{t(`nav.aboutUs`)}</h3>
            <ul className="item font-small">
              <li>
                <Link to="">{t(`nav.contact`)}</Link>
              </li>
              <li>
                <Link to="">{t(`nav.aboutUs`)}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-menu-item">
            <h3 className="item-title">{t(`nav.aboutUs`)}</h3>
            <ul className="item font-small">
              <li>
                <Link to="">{t(`nav.aboutUs`)}</Link>
              </li>
              <li>
                <Link to="">{t(`nav.aboutUs`)}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-menu-item">
            <div className="footer-icon">
              <img src={logo} alt="" />
            </div>
            <div className="footer-desc">
              <p
                style={{ textAlign: "center" }}
                className="font-title"
                dangerouslySetInnerHTML={{
                  __html: ` © ${new Date().getFullYear()} Zion Group Sole Co., Ltd.`,
                }}
              />
            </div>
            <ul
              className="media-lists font-subheader"
              data-menu-section="social medias"
            >
              <Link
                to="https://www.facebook.com/profile.php?id=61554763555021"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  {" "}
                  <FaFacebookF />{" "}
                </li>
              </Link>
              <Link
                to="https://www.youtube.com/@ZionGroup-m9v"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  {" "}
                  <FaYoutube />{" "}
                </li>
              </Link>
              <Link
                to="https://www.linkedin.com/company/maxhub-overseas/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li>
                  {" "}
                  <FaTiktok />{" "}
                </li>
              </Link>
              <Link to="mailto:ziongroupsole@163.com">
                <li>
                  {" "}
                  <IoMdMail />{" "}
                </li>
              </Link>
            </ul>
            {/* <div
              style={{ marginTop: 30, paddingBottom: 20, textAlign: "center" }}
            >
              <span>{t("footer.develop-by")}</span>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div style={{ marginTop: 30, paddingBottom: 20, textAlign: "center" }}>
        <span>{t("footer.develop-by")}</span>
      </div> */}
    </div>
  );
}

export default Footer;
