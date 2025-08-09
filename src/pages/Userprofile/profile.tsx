import {
  Avatar,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "../../router/use-router";
import { IoMdPerson } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoMdSave } from "react-icons/io";
import { mainBackgroud } from "../../model/theme";
import { APIGET, APIPATCH } from "../../helper/api";
import { toast } from "react-toastify";
import { dateTimeFormat } from "../../utils/dateFormat";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAppContext();
  const [userLocal, setuserLocal] = useState<UserEdit | null>();

  console.log("user profile:", user);

  const router = useRouter();
  // If user is not available, open the SignIn modal
  if (!user) {
    router.push("/");
    return null; // Return null or some placeholder if you don't want to render anything
  }
  async function handleClick() {
    setLoading(true);
    try {
      const res = await APIPATCH("/user/" + user?.id, userLocal);

      if (res.statusCode === 200) {
        toast.success("Update successfully");
        // toast.success('Successfully');
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      toast.warn("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  async function handleGetUser() {
    setLoading(true);
    try {
      const res = await APIGET("/user/" + user?.id);

      if (res.statusCode === 200) {
        setuserLocal(res.data.user);
        // toast.success('Successfully');
      } else {
        toast.warn(res.message);
      }
    } catch (error) {
      toast.warn("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser: UserType) => {
      if (!prevUser) {
        // Handle the case where prevUser is null
        return { [name]: value } as UserType;
      }
      return {
        ...prevUser,
        [name]: value,
      };
    });
    setuserLocal((prevUser: any) => {
      if (!prevUser) {
        // Handle the case where prevUser is null
        return {
          [name == "given_name"
            ? "gname"
            : name == "family_name"
            ? "fname"
            : name == "phone"
            ? "phone"
            : "email"]: value,
        } as UserType;
      }
      return {
        ...prevUser,
        [name == "given_name"
          ? "gname"
          : name == "family_name"
          ? "fname"
          : name == "phone"
          ? "phone"
          : "email"]: value,
      };
    });
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <Grid container spacing={3}>
      {/* Avatar */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={user?.given_name}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 100, height: 100, marginLeft: 0 }}
        />
      </Grid>

      {/* Form Inputs */}
      <Grid item xs={12} lg={6} sx={{ margin: 3 }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment">
            {t("edit_profile.first_name")}
          </InputLabel>
          <Input
            value={user.given_name}
            name="given_name"
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <IoMdPerson />
              </InputAdornment>
            }
            style={{ width: "100%" }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6} sx={{ margin: 3 }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment">
            {t("edit_profile.last_name")}
          </InputLabel>
          <Input
            value={user.family_name}
            name="family_name"
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </FormControl>
      </Grid>

      {/* Email */}
      <Grid item xs={12} lg={6} sx={{ margin: 3 }}>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="input-with-icon-adornment">
            {t("edit_profile.email")}
          </InputLabel>
          <Input
            value={user.email}
            name="email"
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </FormControl>
      </Grid>
      {/*  Phone */}

      <Grid item xs={12} lg={6} sx={{ margin: 3 }}>
        {userLocal?.isActive == true ? (
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-with-icon-adornment">
              {t("edit_profile.phone")}
            </InputLabel>
            <Input
              value={user.phone}
              name="phone"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </FormControl>
        ) : (
          <Grid item xs={12} lg={6} sx={{ margin: 3, display: "none" }}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="input-with-icon-adornment">
                {t("edit_profile.phone")}
              </InputLabel>
              <Input
                value={user.phone}
                name="phone"
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </FormControl>
          </Grid>
        )}
      </Grid>

      {/* {userLocal && (
        <Grid item xs={12} lg={6} sx={{ margin: 3 }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel htmlFor="input-with-icon-adornment">
              {t("edit_profile.phone")}
            </InputLabel>
            <Input
              value={userLocal?.phone}
              name="phone"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </FormControl>
        </Grid>
      )} */}

      {/* Dates and Save Button */}

      {userLocal?.isActive == true ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: { xs: "flex-start", lg: "flex-end" },
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <p>
            {t("edit_profile.join_date")}{" "}
            <b>{dateTimeFormat(userLocal?.createDate ?? "")}</b>
          </p>
          <p>
            {t("edit_profile.last_update_date")}{" "}
            <b>{dateTimeFormat(userLocal?.updateDate ?? "")}</b>
          </p>

          <br />
          <LoadingButton
            sx={mainBackgroud}
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<IoMdSave />}
            variant="contained"
          >
            <span>{t("edit_profile.save")}</span>
          </LoadingButton>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: { xs: "flex-start", lg: "flex-end" },
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <p>
            {t("edit_profile.join_date")}{" "}
            <b>{dateTimeFormat(userLocal?.createDate ?? "")}</b>
          </p>
          <p>
            {t("edit_profile.last_update_date")}{" "}
            <b>{dateTimeFormat(userLocal?.updateDate ?? "")}</b>
          </p>
          <br />
          <LoadingButton
            sx={mainBackgroud}
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<IoMdSave />}
            variant="contained"
          >
            <span>{t("edit_profile.save")}</span>
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
}
