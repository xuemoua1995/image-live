

import image from '../../assest/img/01.gif'
import image1 from '../../assest/img/1.png'
import image2 from '../../assest/img/1.gif'
import image3 from '../../assest/img/2.png'

const images = [
  image ,
  image1,
  image2,
  image3
];


import { useTranslation } from "react-i18next";
const PromotionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="land-section container section-padding">
      <h1 style={{ fontSize: 22 }}>{t("home.property_types")}</h1>
      <div className="gallery-container ">
        <div className="image-row">
          {images.map((image, index) => (
            <div className="image-item" key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
