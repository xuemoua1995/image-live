import {
  Box,
  Container,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./style.css";
import { useDropzone } from "react-dropzone";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "./newPropertyStyle";
import { useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { APIPOST } from "../../../../helper/api";
import { toast } from "react-toastify";
import FloorplansMedia from "./sub/floorplans";
import { useTranslation } from "react-i18next";
import MediaVideos from "./sub/mediaVideos";

import addImg from "../../../../assest/play/camera.png";

const Media: React.FC<NewPropertyCreate> = ({ initProperty, setProperty }) => {
  const [uploading, setUploading] = useState(false);
  const { t } = useTranslation(); // Initialize useTranslation
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { "image/*": [] } });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleDeleteImages = (index: number) => {
    setProperty((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        images: updatedImages,
      };
    });
  };

  const handleImageUpload = (img: string) => {
    setProperty((prev) => ({
      ...prev,
      images: [...prev.images, img],
    }));
  };
  const handleUpload = async () => {
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("img", file);
      try {
        setUploading(true);
        const { statusCode, message, data } = await APIPOST(
          "/upload",
          formData
        );
        if (statusCode !== 200) {
          toast.warn(message);
        } else {
          //console.log(data);
          handleImageUpload(data.img.downloadUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleUpload(); // Auto call handleUpload after dropping files
    }
  }, [acceptedFiles]);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">
          {t("addNewProperty.media.propertyMediaTitle")}
        </Typography>
      </Stack>

      <Box component="div" sx={{ "& > :not(style)": { m: 1, width: "100%" } }}>
        <FormLabel>{t("addNewProperty.media.uploadPhotosLabel")}</FormLabel>

        <Grid container spacing={2}>
          {!uploading ? (
            <Grid item xs={6} md={3}>
              <div
                {...getRootProps({ style })}
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
                <Box
                  component="img"
                  src={addImg}
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
              className="image-title"
              align="center"
              color="rgba(0, 0, 0, 0.6)"
            >
              <span>({t("addNewProperty.media.dragOrClickLabel")})</span>
            </Typography>
          </Grid>
        </Grid>

        {initProperty.images.length > 0 && (
          <aside>
            <h4 style={{ margin: 10 }}>
              {t("addNewProperty.media.imagesLabel")}
            </h4>
            <Grid container spacing={2}>
              {initProperty.images.map((file, index) => (
                <Grid item key={index} xs={4} lg={2}>
                  <div style={{ position: "relative", marginBottom: "10px" }}>
                    <img
                      src={file}
                      alt={`Image ${index}`}
                      style={{ width: "100%", height: "100px" }}
                    />
                    <IconButton
                      onClick={() => handleDeleteImages(index)}
                      aria-label="delete"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                    >
                      <FaRegTrashAlt fontSize={16} />
                    </IconButton>
                  </div>
                </Grid>
              ))}
            </Grid>
          </aside>
        )}
      </Box>

      {/*<Divider sx={{ margin: '20px auto', width: '50%', borderTop: '1px solid #ccc' }} />*/}
      <MediaVideos initProperty={initProperty} setProperty={setProperty} />
      {/*<Divider sx={{ margin: '20px auto', width: '50%', borderTop: '1px solid #ccc' }} />*/}
      <FloorplansMedia initProperty={initProperty} setProperty={setProperty} />
    </Container>
  );
};

export default Media;
