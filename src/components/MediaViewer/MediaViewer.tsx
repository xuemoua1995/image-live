import React, { useRef } from "react";
import "./MediaViewer.css";
import { IoIosClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import VideoFilePlayer from "../videos/fileplayer";
import { FacebookEmbed, TikTokEmbed } from "react-social-media-embed";

interface ImageViewerProps {
  imgs: string[];
  viewImgIndex?: number;
  viewFloorPlans?: boolean;
  setViewImgIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface MediaProps extends ImageViewerProps {
  floorPlans: string[];
  toggleImgView: () => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  videosURL: Video | null;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  imgs,
  viewImgIndex = 0,
  viewFloorPlans = false,
  setViewImgIndex,
}) => {
  const imgSliderRef = useRef<Slider>(null);

  const sliderNextClick = () => {
    if (imgSliderRef.current) {
      imgSliderRef.current.slickNext();

      if (!viewFloorPlans) {
        if (viewImgIndex >= imgs.length - 1) {
          setViewImgIndex(0);
        } else {
          setViewImgIndex((index) => index + 1);
        }
      }
    }
  };

  const sliderPreviousClick = () => {
    if (imgSliderRef.current) {
      imgSliderRef.current.slickPrev();

      if (!viewFloorPlans) {
        if (viewImgIndex <= 0) {
          setViewImgIndex(imgs.length - 1);
        } else {
          setViewImgIndex((index) => index - 1);
        }
      }
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: viewImgIndex,
  };

  return (
    <div className="picture-container">
      <div className="img-number font-title">
        {viewImgIndex + 1} of {imgs.length}
      </div>
      <div className="img-slider-btn">
        <button className="viewer-btn" onClick={sliderPreviousClick}>
          <FaChevronLeft />
        </button>
        <button className="viewer-btn" onClick={sliderNextClick}>
          <FaChevronRight />
        </button>
      </div>
      <Slider {...settings} ref={imgSliderRef}>
        {imgs.map((img, i) => (
          <div className="img-view-item" key={i}>
            <img src={img} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const VdoViewer: React.FC<{ videosURL: Video | null }> = ({ videosURL }) => {
  return videosURL?.from === "youtube" ? (
    <div className="vdo-container">
      <iframe
        className="property-vdo"
        src={"https://www.youtube.com/embed/" + videosURL?.url}
        title="Zoin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  ) : videosURL?.from === "tiktok" ? (
    <div className="vdo-container">
      <TikTokEmbed
        className="property-vdo"
        url={`https://www.tiktok.com/@epicgardening/video/${videosURL.url}`}
      />
    </div>
  ) : videosURL?.from === "facebook" ? (
    <div className="vdo-container">
      <FacebookEmbed
        className="property-vdo"
        url={`https://www.facebook.com/andrewismusic/posts/${videosURL.url}`}
        width={550}
      />
    </div>
  ) : videosURL?.from === "upload" ? (
    <div className="vdo-container" style={{ width: "70%" }}>
      <VideoFilePlayer url={videosURL?.url} setProperty={null} />
    </div>
  ) : (
    <>No videos</>
  );
};

const MediaViewer: React.FC<MediaProps> = ({
  toggleImgView,
  imgs,
  floorPlans,
  viewImgIndex,
  setViewImgIndex,
  activeTab,
  setActiveTab,
  videosURL,
}) => {
  return (
    <div className="image-viewer">
      <div className="viewer-header">
        <ul className="font-title">
          <li
            className={`${activeTab === "Pic" && "active"}`}
            onClick={() => setActiveTab("Pic")}
          >
            Pictures
          </li>
          <li
            className={`${activeTab === "FPlan" && "active"}`}
            onClick={() => setActiveTab("FPlan")}
          >
            Floor Plan
          </li>
          <li
            className={`${activeTab === "Vdo" && "active"}`}
            onClick={() => setActiveTab("Vdo")}
          >
            Video
          </li>
        </ul>
        <IoIosClose className="close-viewer" onClick={toggleImgView} />
      </div>
      {activeTab === "Pic" && (
        <ImageViewer
          imgs={imgs}
          setViewImgIndex={setViewImgIndex}
          viewImgIndex={viewImgIndex}
        />
      )}
      {activeTab === "FPlan" && (
        <ImageViewer
          imgs={floorPlans}
          viewFloorPlans={true}
          setViewImgIndex={setViewImgIndex}
        />
      )}
      {activeTab === "Vdo" && <VdoViewer videosURL={videosURL} />}
    </div>
  );
};

export default MediaViewer;
