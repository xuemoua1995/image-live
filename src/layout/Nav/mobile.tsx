import * as React from "react";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
//import Badge from '@mui/material/Badge';
import {
  IoIosAddCircle,
  IoIosHeart,
  IoIosMenu,
  IoMdSettings,
} from "react-icons/io";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuList,
  Paper,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import law from "../../assest/logo/law.png";
import enw from "../../assest/logo/enw.png";
import cnw from "../../assest/logo/cnw.png";
import { useRouter } from "../../router/use-router";
import { useAppContext } from "../../context/AppContext";
import { FaHouseUser } from "react-icons/fa";
import { IoLogOut, IoTimeSharp } from "react-icons/io5";

import { MdClose } from "react-icons/md";
import { LANGS } from "../../locale/i18n";
import langEnCN from "../../assest/lang/en-cn.png";
import langLaEn from "../../assest/lang/la-en.png";
import langLaCn from "../../assest/lang/la-cn.png";

interface MobileNavbarProps {
  toggleShowMobileMenu: () => void;
  showMobileMenu: Boolean;
  handleSignOut: () => void;
}

export default function PrimarySearchAppBar({
  toggleShowMobileMenu,
  showMobileMenu,
  handleSignOut,
}: MobileNavbarProps) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const langs = LANGS[lang];
  const router = useRouter();
  const { toggleModal, user, changeLang } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [_mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpen1 = Boolean(anchorEl1);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      toggleModal("SignIn");
    }
  };
  const handleProfileMenuOpen1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuClose1 = () => {
    setAnchorEl1(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Paper sx={{ width: 320, maxWidth: "100%" }}>
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push("/rental-manager");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <FaHouseUser style={{ color: "#582C86" }} />
            </ListItemIcon>
            <ListItemText> {t("nav.Manage_Rentals")}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/profile?tabs=favourites");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <IoIosHeart style={{ color: "#582C86" }} />
            </ListItemIcon>
            <ListItemText> {t("nav.favourites")}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/profile?tabs=schedules");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <IoTimeSharp style={{ color: "#582C86" }} />
            </ListItemIcon>
            <ListItemText> {t("nav.schedules")}</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/profile?tabs=profile");
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <IoMdSettings style={{ color: "#582C86" }} />
            </ListItemIcon>
            <ListItemText>{t("nav.setting")}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleSignOut();
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <IoLogOut style={{ color: "#582C86" }} />
            </ListItemIcon>
            <ListItemText>{t("nav.signOut")}</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Menu>
  );
  const renderMenuLang = (
    <Menu
      anchorEl={anchorEl1}
      id={menuId}
      keepMounted
      open={isMenuOpen1}
      onClose={handleMenuClose1}
    >
      <Paper sx={{ width: 150, maxWidth: "100%" }}>
        <MenuList>
          {langs.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => {
                changeLang(lang.value);
                handleMenuClose1();
              }}
            >
              <ListItemIcon>
                <img
                  src={lang.icon}
                  alt={lang.label}
                  style={{ width: "24px", height: "24px", marginRight: "8px" }}
                />
              </ListItemIcon>
              <ListItemText>{lang.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    </Menu>
  );

  const logoW = lang === "en" ? enw : lang === "la" ? law : cnw;
  //console.log(langs);

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#582C86" }}>
        <Grid container spacing={1} sx={{ mt: 1.3, mb: 1.3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 2,
              marginBottom: -1,
            }}
          >
            <Typography
              onClick={() => router.push("/")}
              variant="h6"
              noWrap
              component="div"
            >
              <img src={logoW} width="70px" alt="logo" />
            </Typography>
          </Box>

          <Box sx={{ marginRight: 0 }}>

            <Box sx={{ display: { xs: "flex" }, mt: 0 }}>
              <Button
                sx={{
                  fontSize: lang === "la" ? 12 : 9,
                  padding: 0,
                  cursor: "pointer",
                  color: "#fff",
                  borderColor: "#ffffff",
                  maxWidth: lang === "en" ? "68px" : "90px",
                  maxHeight: "30px",
                  mr: 0.5,
                  mt: user ? 1.5 : 0.8,
                  display: "flex",
                  alignItems: "center", // Center vertically
                  textAlign: "left",
                  textTransform: "none",
                }}
                variant="outlined"
                onClick={() => {
                  user ? router.push("/new-property") : toggleModal("SignIn");
                }}
              >
                <p
                  style={{
                    marginLeft: 4,
                    marginRight: 1.5,
                    marginBottom: -4.5,
                  }}
                >
                  <IoIosAddCircle
                    fontSize={16}
                    color="rgb(255, 255, 255, 0.6)"
                  />
                </p>
                <p style={{ margin: 0, marginRight: 4, lineHeight: 1.2 }}>
                  {t("manage_property.add_property")}
                </p>
              </Button>
              {user ? (
                <>
                  <IconButton
                    sx={{
                      textTransform: "none",
                      fontSize: 12,
                      padding: 0,
                      cursor: "pointer",
                      borderColor: "#ffffff",
                      maxWidth: "70px",
                      maxHeight: "30px",
                      mr: 0.5,
                      mt: user ? 1.5 : 0.8,
                      display: "flex",
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                    }}
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#ffffff",
                        width: 32,
                        height: 32,
                        color: "#582C86",
                        fontSize: 12,
                      }}
                    >
                      <span>
                        {" "}
                        {user.given_name.charAt(0).toUpperCase()}{" "}
                        {user.family_name.charAt(0).toUpperCase()}
                      </span>
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: 12,
                      padding: 0,
                      cursor: "pointer",
                      color: "#fff",
                      borderColor: "#ffffff",
                      maxWidth: "70px",
                      maxHeight: "30px",
                      mr: 0.5,
                      mt: user ? 1.5 : 0.8,
                      display: "flex",
                      alignItems: "center", // Center vertically
                      justifyContent: "center", // Center horizontally
                    }}
                    variant="outlined"
                    onClick={handleProfileMenuOpen}
                  >
                    {t("nav.signIn")}
                  </Button>
                </>
              )}

              <Box
                component={"div"}
                sx={{
                  mt: user ? 1.5 : 0.8,
                  textTransform: "none",
                  fontSize: 9,
                  cursor: "pointer",
                  color: "#fff",
                  border: "1px solid #ffffff",
                  borderRadius: "4px",
                  maxWidth: "30px",
                  maxHeight: "30px",
                  display: "flex", // Flexbox container
                  textAlign: "center",
                  alignItems: "center", // Center vertically
                  justifyContent: "center", // Center horizontally
                }}
                onClick={handleProfileMenuOpen1}
              >
                <img
                  src={
                    lang === "cn"
                      ? langLaEn
                      : lang === "la"
                      ? langEnCN
                      : langLaCn
                  }
                  alt=""
                  width={"70%"}
                />
              </Box>
              <Button
                sx={{
                  textTransform: "none",
                  lineHeight: 1.2,
                  fontSize: 9,
                  cursor: "pointer",
                  color: "#fff",
                  borderColor: "#ffffff",
                  maxWidth: "75px",
                  maxHeight: "30px",
                  mr: 0,
                  mt: user ? 1.5 : 1,
                  display: "flex",
                  textAlign: "left",
                }}
                onClick={toggleShowMobileMenu}
              >
                <span style={{ marginTop: 0 }}>
                  {showMobileMenu ? (
                    <MdClose size={40} />
                  ) : (
                    <IoIosMenu size={40} />
                  )}
                </span>
                {/* <p>{t("nav.moreInfo")}</p> */}
              </Button>
            </Box>
          </Box>
        </Grid>
      </AppBar>
      {renderMenu}
      {renderMenuLang}
    </>
  );
}
