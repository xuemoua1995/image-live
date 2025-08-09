import { Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { Fragment, useEffect, useState } from "react";
import { mainColor } from "../../model/theme";
import { MdDelete } from "react-icons/md";
import { APIPOST } from "../../helper/api";
import { toast } from "react-toastify";
import { dateTimeFormat } from "../../utils/dateFormat";
//import { useRouter } from "../../router/use-router";



export default function Favourite() {
  const { i18n, t } = useTranslation();
  //const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favourites[] | null>()
  const { user, } = useAppContext();
  // If user is not available, open the SignIn modal
  const getFavourite = async () => {
    setLoading(true);
    try {
      const res = await APIPOST('/favourite/all', { email: user?.email });
      if (res.statusCode === 200) {
        setFavorites(res.data.favorites)
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      toast.warn('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }
  const handleAddfavourite = async (id: string) => {
    await APIPOST('/favourite', {
      properties: id,
      email: user?.email,
    });

  };
  useEffect(() => {
    getFavourite();
  }, []);

  const handleDelete = async (id: string, property_id: string) => {
    await handleAddfavourite(property_id)
    // Filter out the item with the specified id
    const updatedFavorites = favorites?.filter((favorite) => favorite._id !== id);
    // Update the state with the new favorites array
    setFavorites(updatedFavorites);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {loading && <p>{t('loading')}</p>}
        {!loading && favorites && favorites.length === 0 && <p>{t('no-favourite')}</p>}
        {!loading && favorites && (
          <List>
            {favorites.map((favorite, index) => (
              <Fragment key={favorite._id}>
                <ListItem>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={4}>
                      <img
                        src={favorite.properties.images[0]}
                        alt={favorite.properties.name.en}
                        style={{ width: '100%', maxWidth: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <ListItemText
                        primary={favorite.properties.name[i18n.language as keyof Name].replace(/[\\n]/gm, '')}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {favorite.properties.id} - {t('edit_profile.tour_date')}: {dateTimeFormat(favorite.createDate)}
                            </Typography>
                          </>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} lg={2}>
                      <IconButton edge="start" color="inherit" aria-label="delete" onClick={() => handleDelete(favorite._id, favorite.properties._id)}>
                        <MdDelete style={mainColor} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
                {index !== favorites.length - 1 && <hr />}
              </Fragment>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
}