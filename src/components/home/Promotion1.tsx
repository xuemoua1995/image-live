
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Optional Swiper modules for additional features
import { Pagination, Navigation } from 'swiper/modules';

const SlideCarousel = () => {
  return (
    <Swiper
      spaceBetween={20} // Adjusted space between slides
      navigation={true} // Enable navigation arrows
      pagination={{ clickable: false }} // Enable pagination dots
      modules={[Pagination, Navigation]} // Import Swiper modules
      slidesOffsetBefore={30} // Padding before first slide
      slidesOffsetAfter={30} // Padding after last slide
      breakpoints={{
        640: {
          slidesPerView: 1, // 1 slide on small screens (xs)
        },
        768: {
          slidesPerView: 2, // 2 slides on medium screens (sm)
        },
        1024: {
          slidesPerView: 3, // 3 slides on large screens (lg)
        },
      }}
    >
      {[...Array(4)].map((_, index) => (
        <SwiperSlide key={index}>
          <div>
            <img
              style={{ backgroundSize: 'cover', width: '100%', height: '100%' }}
              src="https://www.investopedia.com/thmb/NbO5ImNorjCmeAOnSeqNQ8Po4dM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1649404865-1e88c7d1fee845b1b1d52953191a1f75.jpg"
              alt={`Slide ${index + 1}`}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideCarousel;
