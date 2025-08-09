import { Box, Container, CssBaseline, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoIosHeart } from 'react-icons/io';
import { IoTimeSharp, IoPersonCircleSharp  } from 'react-icons/io5';
import Profile from "./profile";
import { mainColor } from "../../model/theme";
import Favourite from "./favourite";
import Schedules from "./schedule";
import { useTranslation } from "react-i18next";


export default function SignIn() {
    const {t } = useTranslation();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tabs = queryParams.get('tabs'); // profile, schedules, favourites
    
    const [value, setValue] = useState(tabs === "profile"? 0 : tabs === "favourites" ? 1 : tabs === "schedules" ? 2 : 0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(tabs === 'profile' ? 0 : tabs === 'favourites' ? 1 : tabs === 'schedules' ? 2 : 0);
    }, [tabs]);
    
    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={t('edit_profile.account')} icon={<IoPersonCircleSharp style={mainColor} />} {...a11yProps(0)} />
                            <Tab label={t('edit_profile.favourites')} icon={<IoIosHeart style={mainColor}  />} {...a11yProps(1)} />
                            <Tab label={t('edit_profile.schedule')} icon={<IoTimeSharp style={mainColor} />} {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                       <Profile />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Favourite />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Schedules />
                    </CustomTabPanel>
                </Box>
            </Container>
        </Fragment>
    );
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', borderTopRightRadius: 0,  borderTopLeftRadius: 0,  borderTop: 'none',  marginBottom: 15 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
