import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import thumbnailUrl from "../../assest/poster/image2.png";
import "./videoproprty.css"; // <- import CSS

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.34315 2.87109C5.22436 2.22706 3.875 2.99335 3.875 4.28318V19.7168C3.875 21.0067 5.22436 21.773 6.34315 21.1289L19.3431 13.4121C20.4424 12.7791 20.4424 11.2209 19.3431 10.5879L6.34315 2.87109Z" />
  </svg>
);

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useTranslation();

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="video-player-container">
      <div className="video-wrapper">
        {isPlaying ? (
          <div className="video-frame-container">
            <iframe
              src={`https://www.youtube.com/embed/acMG1YvHEBg?autoplay=1&rel=0&showinfo=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="video-frame"
            />
          </div>
        ) : (
          <div className="thumbnail-container" onClick={handlePlay}>
            <img
              src={thumbnailUrl}
              className="thumbnail-image"
              alt="Video thumbnail"
            />
            <div className="gradient-overlay" />
            <div className="play-button-wrapper">
              <button className="play-button">
                <PlayIcon className="play-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlayer;
