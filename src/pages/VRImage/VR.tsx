
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import VR_Image from '../../components/VRImages/vr'
function VRImage() {
 const { t } = useTranslation(); // Initialize useTranslation
  return (
    <>
      <Helmet>
        <title>{t("nav.News-detail")} - Zion Group</title>
      </Helmet>
      <section className="feature-section-detail section-padding">
        <div className="blogs-info" style={{ marginTop: 30 }}>
          <VR_Image/>
        </div>
      </section>
    </>
  );
}

export default VRImage;
