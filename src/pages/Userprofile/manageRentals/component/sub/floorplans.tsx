import { useState, useMemo, useEffect } from 'react';
import { Box, FormLabel, Grid, IconButton, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { baseStyle, focusedStyle, acceptStyle, rejectStyle } from '../newPropertyStyle';
import { APIPOST } from '../../../../../helper/api';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import imgPlus from '../../../../../assest/play/plus.png'

/*const listItemStyle: any = {
  position: 'relative',
  marginBottom: '10px',
};*/

const FloorplansMedia: React.FC<NewPropertyCreate> = ({ initProperty, setProperty }) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: { 'image/*': [] } });

  const dropzoneStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUpload = async () => {
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append('img', file);
      try {
        setUploading(true);
        const { statusCode, message, data } = await APIPOST('/upload', formData);
        if (statusCode !== 200) {
          toast.warn(message);
        } else {
          //console.log(data);
          handleImageUpload(data.img.downloadUrl);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
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
      floorplans: [...prev.floorplans, img],
    }));
  };

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleUpload(); // Auto call handleUpload after dropping files
    }
  }, [acceptedFiles]);

  const handleDeleteImages = (index: number) => {
    setProperty((prev) => {
      const updatedImages = [...prev.floorplans];
      updatedImages.splice(index, 1);
      return {
        ...prev,
        floorplans: updatedImages,
      };
    });
  };

  return (
    <Box component="div" mt={5} sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
      <FormLabel>{t('addNewProperty.media.floorPlanTitle')}</FormLabel>
      <Grid container spacing={2}>
        {!uploading ? (
          <Grid item xs={6} md={3}>
            <div {...getRootProps({ style: dropzoneStyle as any })} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', border: '2px dashed #aaa', borderRadius: '5px', cursor: 'pointer' }}>
              <input {...getInputProps()} />
                 <Box component="img" src={imgPlus} sx={{width: {xs: '30%', md: '20%'}}}></Box>
            </div>
          </Grid>
        ) : (
          <Grid item xs={6} md={3}>
            <div style={baseStyle as any}>{t('addNewProperty.media.uploadingLabel')}</div>
          </Grid>
        )}
        <Grid item xs={6} md={5} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Typography className='floopan-title' align="center" color='rgba(0, 0, 0, 0.6)'><span>({t('addNewProperty.media.uploadFloorPlanLabel')})</span></Typography>
        </Grid>
      </Grid>
      {initProperty.floorplans.length > 0 && (
        <aside>
          <h4 style={{ margin: 10 }}>{t('addNewProperty.media.floorPlanImagesLabel')}</h4>
          <Grid container spacing={2}>
            {initProperty.floorplans.map((file, index) => (
              <Grid item key={index} xs={4} lg={2}>
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                  <img src={file} alt={`Image ${index}`} style={{ width: '100%', height: '100px' }} />
                  <IconButton
                    onClick={() => handleDeleteImages(index)}
                    aria-label="delete"
                    style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
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
  );
}

export default FloorplansMedia;
