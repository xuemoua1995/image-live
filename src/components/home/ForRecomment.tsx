//import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { APIGET } from '../../helper/api';
import Card from '../Card/CardSlide';
import { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { respondSive } from '../../pages/Home/Initials';
//import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import emptyImage from '../../assest/empty.png'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Box } from '@mui/material';
import CardLoading from '../Card/CardLoading'

const ForOwnerComponent = () => {
  const [properties, setProperties] = useState<Properties[]>([]);

  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showNa, setShowNav] = useState(false);

  const getProperty = useCallback(async () => {
   const res = await APIGET('/property/?type=newTomarket');

    if (res.statusCode === 200) {
      setProperties(res.data.properties);
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
 // console.log(isMobile);
  
  return (
    <Box component={'section'}  onMouseEnter={() => setShowNav(true)}
    onMouseLeave={() => setShowNav(false)} className="new-section section-padding" style={{marginTop: 20}}>
      <div className='container first-section'>
        <div className='new-section-header'>
          <h1 className='font-subheader recomment-title'>{t('home.byOwner')}</h1>
        </div>
        <div>
           {isLoading ? 
           <div>
            <CardLoading/>
           </div> : properties?.length > 0 ?  (
            <Swiper
            spaceBetween={20}
            slidesPerView={2}
            centeredSlides={false}
            loop={false}
            navigation={!isMobile && showNa}
            autoplay={{
              delay: 3000, // Auto slide every 3 seconds
              disableOnInteraction: false, // Continue autoplay after user interaction
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            breakpoints={respondSive}
          >
            {properties?.map((item, i) => (
              <SwiperSlide key={i}>
                <Card id={i} footer={false} btn={false} item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          
             
            //  <Swiper
            //    spaceBetween={20}
            //    slidesPerView={2}
            //    centeredSlides={true}
            //    loop={true}
            //    navigation={!isMobile && showNa}
            //    modules={[Autoplay, Navigation]}
            //    className="mySwiper"
            //    breakpoints={respondSive}
            //  >
            //    {properties?.map((item, i) => (
            //      <SwiperSlide key={i}><Card id={i} footer={false} btn={false} item={item} /></SwiperSlide>
            //    ))}
            //  </Swiper>
           ): <img className='img-empty' src={emptyImage} alt="Empty"   />}
        </div>
       
      </div>
    </Box>
  );
};

export default ForOwnerComponent;