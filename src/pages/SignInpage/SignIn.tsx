import { useState, useEffect, FormEvent } from "react";
import { jwtDecode } from "jwt-decode";
import { CiWarning } from "react-icons/ci";
import "./Sign.css";
import { useAppContext } from "../../context/AppContext";
import { APIPOST, ResponseData } from "../../helper/api";
import { useTranslation } from "react-i18next";
import { useRouter } from "../../router/use-router";
import { Container } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
interface SignInFormData {
  fname?: string;
  gname?: string;
  email: string;
  password: string;
}

function SignInPage() {
  const router = useRouter();
  const { t } = useTranslation(); // Initialize useTranslation
  const [loginTab, setloginTab] = useState<boolean>(true);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [errMass, seterrMass] = useState<string>("");
  const { setUser } = useAppContext();
  const [formData, setFormData] = useState<SignInFormData>({
    // email: 'test2@gmail.com',
    // password: '12345678',
    email: "",
    password: "",
  });

  const handleCallBackResponse = async (response: any) => {
    const userObject = jwtDecode(response.credential);
    // console.log(userObject);
    // google login
    // must upload the profile to db
    setUser(userObject as UserType);
    // sub will be id of user logged to google account
  };

  useEffect(() => {
    const googleLoginDiv = document.getElementById("googleSignInDiv")!;
    // golbal google
    google.accounts.id.initialize({
      client_id:
        "786983690774-1vktlohj5aaqhshv82np74btrad5vuag.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(googleLoginDiv, {
      theme: "outline",
      size: "large",
      width: 300,
      type: "standard",
    });
  }, []);

  const toggleTab = () => {
    setloginTab((tab) => !tab);
    seterrMass("");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the specific field in FormData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setGender(event.target.value); // Update the state with the selected value
    const { name, value } = event.target;

    // Update the specific field in FormData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsloading(true);
    const urlEnpoint = loginTab ? "/user/login" : "/user/";
    try {
      const res: ResponseData = await APIPOST(`${urlEnpoint}`, formData);

      if (res?.data?.user?.isActive === false) {
        seterrMass(res.message ?? "");
      }
      if (res.statusCode != 200) {
        seterrMass(res.message ?? "");
      } else {
        // must upload the profile to db
        const userInfo: UserType = res?.data?.user;
        setUser(userInfo);
        router.push("/");
        // toggleModal(modalType);
      }
    } finally {
      setIsloading(false);
    }
  };
  //console.log(user);

  // const forgotpass = () => {
  //   router.push("/forgotpassword");
  // };

  return (
    <Container
      maxWidth="sm"
      sx={{ marginBottom: 10, marginTop: 5, padding: 5 }}
    >
      <ul className="sign-tabs">
        <li className={`${loginTab && "active"}`} onClick={toggleTab}>
          {t("signIn.signInTab")}
        </li>
        <li className={`${!loginTab && "active"}`} onClick={toggleTab}>
          {t("signIn.newAccountTab")}
        </li>
      </ul>
      <form action="" onSubmit={handleSubmit} className="sign-form">
        <div className={`sign-wrapper ${loginTab && "hide"}`}>
          <div className="input-box">
            <label htmlFor="sign-gname">
              <strong>{t("signIn.givenNameLabel")}</strong>
            </label>
            <input
              onChange={handleOnChange}
              className="font-default"
              type="text"
              name="gname"
              id="gname"
              placeholder={t("signIn.givenNameLabel")}
            />
          </div>
        </div>
        <div className={`sign-wrapper ${loginTab && "hide"}`}>
          <div className="input-box">
            <label htmlFor="sign-fname">
              <strong>{t("signIn.familyNameLabel")}</strong>
            </label>
            <input
              onChange={handleOnChange}
              className="font-default"
              type="text"
              name="fname"
              id="fname"
              placeholder={t("signIn.familyNameLabel")}
            />
          </div>
        </div>
        <div className={`sign-wrapper ${loginTab && "hide"}`}>
          <div className="input-box">
            <label htmlFor="sign-fname">
              <strong>{t("signIn.genderNameLabel")}</strong>
            </label>
            <select
              onChange={handleSelectChange}
              name="gender"
              id="gender"
              className="font-default"
              style={{
                fontFamily:
                  "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
              }}
            >
              <option value="">== {t("signIn.select-gender")} ==</option>
              <option value="Male">{t("signIn.male")}</option>
              <option value="Female">{t("signIn.female")}</option>
              <option value="Other">{t("signIn.other")}</option>
            </select>
          </div>
        </div>
        <div className={`sign-wrapper ${loginTab && "hide"}`}>
        
        <div className="phone-input">
           <label htmlFor="sign-fname">
             <strong>{t("edit_profile.phone")}</strong>
           </label>
           <div style={{ marginTop: 10 }}>
             <PhoneInput
               country={"la"}
               enableSearch={true}
               onChange={(phone) =>
                 handleOnChange({
                   target: { name: "phone", value: phone },
                 } as React.ChangeEvent<HTMLInputElement>)
               } 
               inputStyle={{ width: "100%", borderRadius: "10px" }}
               containerStyle={{ width: "100%" }} 
             />
           </div>
         </div>
       </div>
        <div className="input-box">
          <label htmlFor="sign-email">
            <strong>{t("signIn.emailLabel")}</strong>
          </label>
          <input
            onChange={handleOnChange}
            className="font-default"
            value={formData.email}
            type="text"
            name="email"
            id="email"
            placeholder={t("signIn.emailLabel")}
          />
        </div>
        <div className="input-box">
          <label htmlFor="sign-pw">
            <strong>{t("signIn.passwordLabel")}</strong>
          </label>
          <input
            onChange={handleOnChange}
            className="font-default"
            type="password"
            value={formData.password}
            name="password"
            id="password"
            placeholder={t("signIn.passwordLabel")}
          />
          {!loginTab && (
            <ul className="font-small">
              <li>{t("signIn.passwordRequirements.length")}</li>
              <li>{t("signIn.passwordRequirements.mix")}</li>
            </ul>
          )}
        </div>
        {errMass && (
          <div className="err-mass">
            <p>
              <CiWarning style={{ marginRight: 5, color: "#ff0000" }} />
              {errMass}
            </p>
          </div>
        )}
        <button
          style={{
            fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times,  serif",
          }}
          className="sign-btn font-default"
          type="submit"
          disabled={isloading}
        >
          {loginTab && !isloading
            ? t("signIn.signInButton")
            : !loginTab && !isloading
            ? t("signIn.submitButton")
            : t("signIn.loadingButton")}
        </button>
      </form>
      {/* {loginTab && (
        <a onClick={forgotpass} className="forget-pw">
          {t("signIn.forgotPassword")}
        </a>
      )} */}

      <div className="divider"></div>
      <div className="google-sign-box">
        <div id="googleSignInDiv"></div>
      </div>
    </Container>
  );
}

export default SignInPage;
