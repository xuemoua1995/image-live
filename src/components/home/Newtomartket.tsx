//import { useState } from 'react'
import { useTranslation } from "react-i18next";
import { APIGET } from "../../helper/api";
import Card from "../Card/Card";
import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";
// import emptyImage from '../../assest/empty.png'
import CardLoading from '../Card/CardLoading'
import { toast } from "react-toastify";
const Newtomartket = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(true);

  const getProperty = useCallback(async () => {
    try {
      const res = await APIGET("/property/?type=newTomarket&limit=4");

      const sortedData = res.data.properties.reverse();

      if (res.statusCode === 200) {
        setProperties(sortedData);
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false);
    }
  }, []);

  useEffect(() => {
    getProperty();
  }, [getProperty]);
  //console.log(isMobile);

  return (
    <section className="new-section section-padding">
      <div className="container">
        <div className="new-section-header">
          <h1 className="font-subheader">{t("home.Brand_New")}</h1>
        </div>
        <div>
          {isLoading ? (
            <div>
              <CardLoading/>
            </div>
          ) : properties?.length > 0 ? (
            <div className="feature-card-wrapper">
              {properties?.map((item, i) => (
                <Card key={i} id={i} item={item} />
              ))}
            </div>
          ) : (
            <div>
              <CardLoading/>
            </div>
            
            // <img className="img-empty" src={emptyImage} alt="Empty" />
          )}
        </div>
        <div className='new-section-header'>
          <h1 className='font-subheader'></h1>
          <h1 style={{fontSize:16 }} className='font-subheader'><Link to={'/explore/page/1'}>{t('home.more')} <FaArrowRight size={14} color="#582C86"/></Link></h1>
        </div>
      </div>
    </section>
  );
};

export default Newtomartket;
