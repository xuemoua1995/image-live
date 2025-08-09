import { IconButton } from "@mui/material";
import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface VideoFile {
  url: string;
  setProperty: any;
}

const VideoFilePlayer: React.FC<VideoFile> = ({ url, setProperty }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleVideoLoadedMetadata = async () => {
    if (videoRef.current) {
      // Seek to 30 seconds into the video
      videoRef.current.currentTime = 10;

      // Wait for the video to seek
      await new Promise((resolve) => {
        videoRef.current?.addEventListener("seeked", resolve, { once: true });
      });

      // Capture the frame at 30 seconds
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    }
  };
  return (
    <>
      <div
        style={{ position: "relative", width: "100%", display: "inline-block" }}
      >
        <video
          controls
          width="100%"
          ref={videoRef}
          onLoadedMetadata={handleVideoLoadedMetadata}
        >
          <source src={url} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        {setProperty && (
          <IconButton
            style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
            onClick={() =>
              setProperty((prev: { video: any }) => ({
                ...prev,
                video: { ...prev.video, url: "", from: "" },
              }))
            }
            aria-label="Delete video"
          >
            <FaTrashAlt color="red" />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default VideoFilePlayer;
