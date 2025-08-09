import { Box, Grid,List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { Fragment, useEffect, useState } from "react";
import { APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import { dateTimeFormatIncludeTime } from "../../utils/dateFormat";
import { MdCancel, MdPendingActions } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { mainColor } from "../../model/theme";



export default function Schedules() {
  const {i18n, t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<Requests[] | null>()
  const { user, } = useAppContext();
  // If user is not available, open the SignIn modal
  const getSchedule = async () => {
    setLoading(true);
    try {
      const res = await APIPOST('/request/one', { email: user?.email });
      if (res.statusCode === 200) {
        setRequests(res.data.requests)
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      toast.warn('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      {loading && <p>{t('loading')}</p>}
      {!loading && requests && requests.length === 0 && <p> {t('no-favourite')}</p>}
      {!loading && requests && (
        <List>
        {requests.map((request, index) => (
            <Fragment key={request._id}>
                <ListItem sx={{ display: { xs: 'grid', lg: 'flex' }, alignItems: 'center' }}>
                    <img
                        
                        src={request.property.images[0]}
                        alt={request.property.name.en}
                        style={{  borderRadius: 2, width: '100%', maxWidth: 200, marginRight: { xs: 0, lg: '10px' } as any }}
                    />
                    <ListItemText
                        sx={{ marginLeft: { xs: 0, lg: '25px' } as any }}
                        primary={request.property.name[i18n.language as keyof Name].replace(/[\\n]/gm, '')}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {request.property.id}
                                </Typography>
                                {` - ${t('edit_profile.tour_date')}: ${dateTimeFormatIncludeTime(request.date)}`}
                            </Fragment>
                        }
                    />
                    <Box>
                        {request.status === 0 ? <MdPendingActions style={mainColor} /> : request.status === 2 ? <GiConfirmed style={{ color: 'red' }} /> : <MdCancel style={{ color: 'red' }} />}
                        {request.status === 0 ? t('edit_profile.pending') : request.status === 2 ? t('edit_profile.confirm') : t('edit_profile.cancel')}
                    </Box>
                </ListItem>
                {index !== requests.length - 1 && <hr />} 
            </Fragment>
        ))}
    </List>
      )}
    </Grid>
  </Grid>
  );
}