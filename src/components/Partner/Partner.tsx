import React from "react";
import "./Partner.css";
import { useTranslation } from "react-i18next"; // Import useTranslation
import partner from "../../assest/Picture1.png";
import partner1 from "../../assest/logopartner.jpg";
import partner2 from "../../assest/RentsBuy-logo.webp";
import partner3 from "../../assest/homefind.jpg";

const imgList: string[] = [partner, partner1, partner2, partner3];

const Partner: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="partner-body">
      <section className="section-partner">
        <h1 className="our-partner-title">{t('partner')}</h1>
        <div className="slider">
          <div className="slider-items">
            {/* <img src="https://www.zarla.com/images/nike-logo-2400x2400-20220504.png?crop=1:1,smart&width=150&dpr=2"
                    alt=""/> */}
            {imgList.map((item, i) => (
            
                <img src={item} key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>

    // <div className='partners'>
    //   <h1 className='font-header'>{t('partner')}</h1>
    //   <ul className='partner-list container'>
    //     {imgList.map((item, i) => (
    //       <div className='partner-box' key={i}>
    //         <img src={item} key={i}/>
    //       </div>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default Partner;
