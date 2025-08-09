import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Tab, Tabs, TextField, Typography } from '@mui/material';
import './manageRentals.css'
import { Fragment, useEffect, useState } from 'react';
import img from '../../../assest/ad.png'
import { useAppContext } from '../../../context/AppContext';
import img1 from '../../../assest/manage/listing.png'
import { useTranslation } from 'react-i18next';
import { useRouter } from '../../../router/use-router';
import { Helmet } from 'react-helmet-async';
import { APIGETAUT } from '../../../helper/api';
import { dateTimeFormat } from '../../../utils/dateFormat';
// import { MdDelete } from 'react-icons/md';
import { mainColor } from '../../../model/theme';
import { FaEdit } from 'react-icons/fa';


function ManageRentals() {
  const [activeTab, setActiveTab] = useState(0); // State to hold active tab index
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const router = useRouter();
  const { user } = useAppContext();
  const [_isLoading, setisLoading] = useState(true);
  const [properties, setProperties] = useState<Properties[]>([]);
  const [totals, setTotals] = useState({ totals: 0, totalsSale: 0, totalsRent: 0 });
  const [qvue, setQ] = useState("");

  const handleTabChange = (_event: any, newValue: number) => {
    setActiveTab(newValue); // Update active tab index
  };

  const getProperty = async (activeTab: number) => {
    //const res = await APIGET('/property/?limit=8&type=1');
    const status = activeTab == 0 ? "" : activeTab == 1 ? 4 : 5
    const res = await APIGETAUT(`/property/byuser?status=${status}&q=${qvue}`, user?.token || "");
    if (res.statusCode === 200) {
      setProperties(res.data.properties);
      setTotals(res.data.totals)
      setisLoading(false);
    }
  };

  useEffect(() => {
    getProperty(activeTab);
  }, [activeTab, qvue])

  //console.log(qvue);

  return (
    <>
      <Helmet>
        <title> Manage Property - Real Estate</title>
      </Helmet>
      <Box sx={{ paddingTop: '25px', maxWidth: 1200 }}>
        <Grid container className='jzExRP'>
          <Grid item xs={12} className='kPxckL'>
            <Grid
              container
              display={{ xs: 'flex', md: 'space-between' }}
              justifyContent={{ xs: 'space-between', md: 'space-between' }} // Center on small screens, space-between on medium screens and above
              alignItems="center"
            >
              <Grid item>
                <h1 className='iQwzHD'>
                  {t('manage_property.properties')}
                </h1>
              </Grid>
              <Grid item>
                <Button variant="outlined" className="cOkTHM" onClick={() => router.push('/new-property')}>
                  <span className="hbyXSX">
                    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" role="img" className="Icon-c11n-8-100-1__sc-13llmml-0 dzJOgx">
                      <path stroke="none" d="M25.9 6.1a14 14 0 100 19.8 14 14 0 000-19.8zM23.1 17H17v6a1 1 0 11-2 0v-6H9a1 1 0 010-2h6V9a1 1 0 012 0v6h6a1 1 0 010 2z"></path>
                    </svg>
                  </span>
                  {t('manage_property.add_property')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} className='jzExRP'>
          <Grid item xs={12} md={6} sx={{ marginTop: { xs: 2, md: 0 } }}>
            <TextField
              fullWidth
              value={qvue}
              label={t('manage_property.search')}
              variant="outlined"
              onChange={(e) => setQ(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderTop: qvue ? 'none' : '', // Corrected from qvue to q
                  },
                  '&.Mui-focused fieldset': {
                    borderTop: 'none',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange} // Handle tab change event
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs"
              centered
            >
              <Tab label={t('manage_property.all', { totals: totals.totals })} />
              <Tab label={t('manage_property.for_rent', { totals: totals.totalsRent })} />
              <Tab label={t('manage_property.for_sale', { totals: totals.totalsSale })} />
            </Tabs>
          </Grid>
          <Grid container spacing={1} sx={{ marginTop: 2 }} justifyContent="center" alignItems="center">
            {/* Your content area */}
            {
              properties.length === 0 ? (
                <>
                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <div style={{ padding: 25 }}>
                        {/* First Item */}
                        <Grid item xs={12} style={{ marginRight: 0 }}>
                          <img src={img1} alt="Image" style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                        </Grid>
                        {/* Second Item */}
                        <Grid item xs={12}>
                          <h2 style={{color:"#7236b2"}}>{t('manage_property.ready_to_add', { name: user?.given_name })}</h2>
                        </Grid>
                        {/* Third Item */}
                        <Grid item xs={12}>
                          <h3>{t('manage_property.providing_info')}</h3>
                        </Grid>
                        {/* Fourth Item */}
                        <Grid item xs={12}>
                          <p>{t('manage_property.find_renter')}</p>
                        </Grid>
                        {/* Fifth Item */}
                        <Grid item xs={12} sx={{ marginTop: 5 }}>
                          <Button 
                           sx={{ backgroundColor: '#582C86', '&:hover': { backgroundColor: '#7236b2' } }} 
                          variant="contained" onClick={() => router.push('/new-property')}>{t('manage_property.add_property')}</Button>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div style={{ border: '1px solid #ccc', minHeight: '200px', padding: '50px' }}>
                      <img src={img} alt="Image" style={{ width: '10%', height: 'auto' }} />
                      <p>{t('manage_property.solution_saves_time')}</p>
                      <ul style={{ marginTop: 10 }}>
                        <li>{t('manage_property.list_property')}</li>
                        <li>{t('manage_property.receive_contact')}</li>
                        <li>{t('manage_property.create_sign_leases')}</li>
                        <li>{t('manage_property.receive_payments')}</li>
                      </ul>
                    </div>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} lg={12}>
                  <List>
                    {properties.map((property, index) => (
                      <Fragment key={property._id}>
                        <ListItem>
                          <Grid container spacing={1}>
                            <Grid item xs={12} lg={4}>
                              <Box sx={{ ml: 0, maxWidth: { xs: '100%', md: 200 }, borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <img
                                  src={property.images[0]}
                                  alt={property.name[lang as keyof District]}
                                  style={{ width: '100%', height: 'auto', display: 'block', }}
                                />
                              </Box>

                            </Grid>
                            <Grid item xs={12} lg={4}>
                              <ListItemText
                                sx={{ ml: 0 }}
                                primary={property.name[lang as keyof Name].replace(/[\\n]/gm, '')}
                                secondary={
                                  <>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                     ID: {property.id} <br />
                                      {t('addNewProperty.Create_at')} {dateTimeFormat(property.createDate)}
                                    </Typography>
                                  </>
                                }
                              />
                            </Grid>
                            <Grid item xs={12} lg={4} container justifyContent="flex-end">
                              <Box sx={{ mr: 0 }}>
                                <IconButton edge="start" color="inherit" aria-label="delete" sx={{ color: property.available ? 'green' : 'orange', marginRight: 3, fontSize: 14 }}>
                                  {property.available ? 'Available' : 'Checking'}
                                </IconButton >
                                <IconButton edge="start" color="inherit" aria-label="delete" onClick={() => router.push(`/new-property?id=${property._id}`)} sx={{ marginRight: 3 }}>
                                  <FaEdit style={mainColor} />
                                </IconButton >
                                {/* <IconButton edge="start" color="inherit" aria-label="delete" onClick={() => { }} sx={{ marginRight: 3 }}>
                                  <MdDelete style={{ color: 'orange' }} />
                                </IconButton> */}
                              </Box>
                            </Grid>
                          </Grid>
                        </ListItem>
                        {index !== properties.length - 1 && (
                          <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <hr style={{ width: '50%', border: '0.1px solid #ccc' }} />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </List>
                </Grid>
              )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ManageRentals;