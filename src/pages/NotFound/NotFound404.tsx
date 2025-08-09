
import { Link } from 'react-router-dom';
import './NotFound404.css'; // Import the CSS file
import { useTranslation } from "react-i18next"; // Import useTranslation
const NotFound = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">{t("home.notfound")}</p>
      <Link to="/" className="not-found-link">
        {t('home.back')}
      </Link>
    </div>
  );
};

export default NotFound;
