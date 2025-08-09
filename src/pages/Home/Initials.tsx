export const newPropertySliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  //autoplay: true,  // Enable autoplay
  //autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 370,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 3,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 360,
      settings: {
        slidesToShow: 1.4,
        slidesToScroll: 3,
        initialSlide: 0,
      },
    },
  ],
};

export const respondSive = {
  360: {
    slidesPerView: 1.4,
    slidesToScroll: 3,
    initialSlide: 0,
  },
  370: {
    slidesPerView: 1.4,
    slidesToScroll: 3,
  },

  480: {
    slidesPerView: 1.4,
    slidesToScroll: 1,
  },
  800: {
    slidesPerView: 2,
    slidesToScroll: 3,
  },
  1024: {
    slidesPerView: 3,
    slidesToScroll: 3,
  },
};
