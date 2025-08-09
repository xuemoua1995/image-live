import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  OutlinedInput,
  styled,
  Tab,
  Tabs,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import YoutubeEmbed from "../../../../../components/unti/youtubeEmbed";
import { Fragment, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { APIPOST } from "../../../../../helper/api";
import { useDropzone } from "react-dropzone";
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  rejectStyle,
} from "../newPropertyStyle";
import { FacebookEmbed, TikTokEmbed } from "react-social-media-embed";
import VideoFilePlayer from "../../../../../components/videos/fileplayer";
import { FaRegQuestionCircle } from "react-icons/fa";
import React from "react";

import youtube from "../../../../../assest/help/youtube.jpg";
import facebook from "../../../../../assest/help/facebook.jpg";
import tiktok from "../../../../../assest/help/tiktok.jpg";

import addVideo from "../../../../../assest/play/play.png";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const MediaVideos: React.FC<NewPropertyCreate> = ({
  initProperty,
  setProperty,
}) => {

  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const setVideosType = (value: number) => {
    setProperty((prev) => ({
      ...prev,
      video: { ...prev.video, type: value }, // Corrected assignment of the video type
    }));
  };
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setVideosType(newValue);
  };
  const [uploading, setUploading] = useState(false);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "video/*": [] } });

  const dropzoneStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUploadVideo = async () => {

    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        setUploading(true);
        const { statusCode, message, data } = await APIPOST(
          "/upload/upload-file",
          formData
        );
        if (statusCode !== 200) {
          toast.warn(message);
        } else {
          handleImageUpload(data.file.downloadUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  /*const files = initProperty.floorplans.map((file, index) => (
      <li key={index} style={listItemStyle}>
        <img src={file} alt={`Image ${index}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <IconButton
          onClick={() => handleDeleteImages(index)}
          aria-label="delete"
          style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
        >
          <FaRegTrashAlt />
        </IconButton>
      </li>
    ));*/

  const handleImageUpload = (img: string) => {
    setProperty((prev) => ({
      ...prev,
      video: { ...prev.video, url: img, from: "upload" },
    }));
  };
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (acceptedFiles.length > 0) {
      handleUploadVideo(); // Auto call handleUploadVideo after dropping files
    }
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [acceptedFiles]);
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
        mt={5}
      >
        {/*<FormLabel>{t('addNewProperty.media.videoOptionLabel')}</FormLabel>*/}
        <Grid item xs={6} sm={6}>
          <Typography variant="h6">
            {t("addNewProperty.media.videoOptionLabel")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          style={{
            textAlign: "right",
            display: windowSize < 600 ? "none" : "block",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <li
              key={1}
              onClick={() => setVideosType(0)}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                color: initProperty.video.type === 0 ? "#1976d2" : "",
                fontWeight: initProperty.video.type === 0 ? "bold" : "normal",
                borderBottom:
                  initProperty.video.type === 0 ? "2px solid blue" : "none", // Add border if Upload is active
                paddingBottom: "2px", // Adjust padding for better alignment
              }}
            >
              <Button sx={{ fontSize: { xs: 8, md: 16 } }} variant="outlined">
                {t("addNewProperty.media.Upload")}
              </Button>
            </li>
            <li
              key={2}
              onClick={() => setVideosType(1)}
              style={{
                cursor: "pointer",
                color: initProperty.video.type === 1 ? "#1976d2" : "",
                fontWeight: initProperty.video.type === 1 ? "bold" : "normal",
                borderBottom:
                  initProperty.video.type === 1 ? "2px solid blue" : "none", // Add border if From social is active
                paddingBottom: "2px", // Adjust padding for better alignment
              }}
            >
              <Button sx={{ fontSize: { xs: 8, md: 16 } }} variant="outlined">
                {t("addNewProperty.media.From_Social")}
              </Button>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: windowSize < 600 ? "block" : "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("addNewProperty.media.Upload")} />
          <Tab label={t("addNewProperty.media.From_Social")} />
        </Tabs>
      </Box>

      <Box
        component="div"
        mt={5}
        sx={{ "& > :not(style)": { ml: 1, width: "100%" } }}
      >
        {/* upload video from local */}
        {initProperty.video.type === 0 ? ( // Render Upload file option if type is 1
          <Grid container spacing={2}>
            {initProperty.video &&
            initProperty.video.from === "upload" &&
            initProperty.video.url ? (
              <>
                <VideoFilePlayer
                  url={initProperty.video.url}
                  setProperty={setProperty}
                />
              </>
            ) : (
              <>
                {!uploading ? (
                  <Grid item xs={6} md={3}>
                    <div
                      onClick={() => {}}
                      {...getRootProps({ style: dropzoneStyle as any })}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100px",
                        border: "2px dashed #aaa",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      {/*<CiPlay1 style={{ fontSize: '2rem' }} />
                                            <img src={addVideo} alt="" width={"20%"} />*/}
                      <Box
                        component="img"
                        src={addVideo}
                        sx={{ width: { xs: "30%", md: "20%" } }}
                      ></Box>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={6} md={3}>
                    <div style={baseStyle as any}>
                      {t("addNewProperty.media.uploadingLabel")}
                    </div>
                  </Grid>
                )}
                <Grid
                  item
                  xs={6}
                  md={5}
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    className="video-title"
                    align="center"
                    color="rgba(0, 0, 0, 0.6)"
                  >
                    <span>
                      ({t("addNewProperty.media.uploadVideosPlanLabel")})
                    </span>
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        ) : (
          <>
            {/* upload video from social media */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={{ m: 1 }}>
                  <OutlinedInput
                    fullWidth
                    name="features"
                    type="text"
                    placeholder={t(
                      "addNewProperty.media.embedVideoIdPlaceholder"
                    )}
                    onChange={(event) =>
                      setProperty((prev) => ({
                        ...prev,
                        video: { ...prev.video, url: event.target.value },
                      }))
                    }
                    value={initProperty?.video?.url || ""}
                    startAdornment={
                      <InputAdornment position="start">
                        <select
                          style={{ marginRight: 5 }}
                          onChange={(event) =>
                            setProperty((prev) => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                from: event.target.value,
                              },
                            }))
                          }
                          value={initProperty?.video?.from || ""}
                        >
                          <option value="">
                            {t("addNewProperty.media.videoFromLabel")}
                          </option>
                          <option value="tiktok">Tiktok</option>
                          <option value="youtube">
                            {t("addNewProperty.media.youtube")}
                          </option>
                          <option value="facebook">
                            {t("addNewProperty.media.facebook")}
                          </option>
                        </select>
                      </InputAdornment>
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderTop:
                            initProperty &&
                            initProperty.video &&
                            initProperty.video.url
                              ? "none"
                              : "",
                        },
                        "&.Mui-focused fieldset": {
                          borderTop: "none",
                        },
                      },
                    }}
                  />
                  <FormHelperText>
                    <HtmlTooltip
                      title={
                        <Fragment>
                          <Typography color="inherit">
                            {t("addNewProperty.media.embedVideoIdWht")}
                          </Typography>
                          <img
                            style={{ padding: 5 }}
                            src={youtube}
                            width="100%"
                            alt=""
                          />
                          <img
                            style={{ padding: 5 }}
                            src={facebook}
                            width="100%"
                            alt=""
                          />
                          <img
                            style={{ padding: 5 }}
                            src={tiktok}
                            width="100%"
                            alt=""
                          />
                        </Fragment>
                      }
                    >
                      <Button
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "start",
                          cursor: "pointer",
                          textTransform: "none",
                        }}
                      >
                        {t("addNewProperty.media.embedVideoIdWht")}{" "}
                        <FaRegQuestionCircle
                          style={{ marginLeft: 2, color: "orange" }}
                        />
                      </Button>
                    </HtmlTooltip>
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                {initProperty.video &&
                  initProperty.video.url &&
                  initProperty.video &&
                  initProperty.video.from == "youtube" && (
                    <YoutubeEmbed embedId={initProperty.video.url} />
                  )}
                {initProperty.video &&
                  initProperty.video.url &&
                  initProperty.video &&
                  initProperty.video.from == "tiktok" && (
                    <TikTokEmbed
                      url={`https://www.tiktok.com/@epicgardening/video/${initProperty.video.url}`}
                    />
                  )}
                {initProperty.video &&
                  initProperty.video.url &&
                  initProperty.video &&
                  initProperty.video.from == "facebook" && (
                    <FacebookEmbed
                      url={`https://www.facebook.com/andrewismusic/posts/${initProperty.video.url}`}
                      width={550}
                    />
                  )}
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default MediaVideos;
