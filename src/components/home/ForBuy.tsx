import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APIGET } from '../../helper/api';
import Card from '../Card/Card';
//import { Swiper, SwiperSlide } from 'swiper/react';
//import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
//import { respondSive } from '../../pages/Home/Initials';
import emptyImage from '../../assest/empty.png'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa";
import CardLoading from '../Card/CardLoading'
const NewtomarketComponent = () => {
  const [properties, setProperties] = useState<Properties[]>([]);
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(true);
  const [_isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [_showNa, setShowNav] = useState(false);

  const getProperty = useCallback(async () => {
    const res = await APIGET('/property/?type=newTomarket&limit=4');
  
    if (res.statusCode === 200) {
      const sortedData = [...res.data.properties].sort((a, b) => a.price - b.price); // Sort by price (low to high)
      setProperties(sortedData);
      setisLoading(false);
    }
  }, []);
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    getProperty();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getProperty]);
  //console.log(isMobile);

  return (
    <Box component={'section'}
      onMouseEnter={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
      className="new-section section-padding">
      <div className='container'>
        <div className='new-section-header'>
        <h1 style={{marginTop:20}} className="font-subheader">{t("home.forBuy")}</h1>
        </div>
        <div>
          {isLoading ? 
          <div>
            <CardLoading/>
          </div> : properties?.length > 0 ? (
            <>
            <div className='feature-card-wrapper'>
              {properties?.map((item, i) => (
                <Card key={i} id={i} item={item} />
              ))}
            </div>
            </>
          ): <img className='img-empty' src={emptyImage} alt="Empty" />}
        </div>
        <div className='new-section-header'>
          <h1 className='font-subheader'></h1>
          <h1 style={{fontSize:16 }} className='font-subheader'><Link to={'/explore/page/1'}>{t('home.more')} <FaArrowRight size={14} color="#582C86"/></Link></h1>
        </div>
      </div>
    </Box>
  );
};

export default NewtomarketComponent;