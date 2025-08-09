import { useTranslation } from "react-i18next";
// import { LANGS } from "../../../../utils/modal";
import "./style.css";
import { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import LanguageDetail from "./sub/DetailItem";

const Detail: React.FC<NewPropertyCreate> = ({ initProperty, setProperty }) => {
  const { t } = useTranslation(); // Initialize useTranslation
  // const lang = i18n.language;
  // const [langs, _setLangs] = useState(LANGS[lang] || LANGS["en"]);
  // const [langs, _setLangs] = useState(LANGS[lang] || LANGS["en"]);
  // const [singleLang, setSingleLang] = useState({
  //   value: "la",
  //   label: "Lao",
  //   icon: "/assets/icons/ic_flag_la.svg",
  // });
  const [singleLang] = useState({
    value: "la",
    label: "Lao",
    icon: "/assets/icons/ic_flag_la.svg",
  });
  const [detailla, setDetailla] = useState({
    title: "",
    desc: [],
  });

  const [detailen, setDetailen] = useState({
    title: "",
    desc: [],
  });
  const [detailch, setDetailch] = useState({
    title: "",
    desc: [],
  });
  const handleInputChange = (event: any, lang: string, property: string) => {
    // console.log(lang, property);
    if (property === "desc") {
      if (lang === "en") {
        const descArray = event.target.value.split(",");
        setDetailen((prevDetails) => ({
          ...prevDetails,
          desc: descArray,
        }));
      } else if (lang === "la") {
        const descArray = event.target.value.split(",");
        setDetailla((prevDetails) => ({
          ...prevDetails,
          desc: descArray,
        }));
      } else if (lang === "cn") {
        const descArray = event.target.value.split(",");
        setDetailch((prevDetails) => ({
          ...prevDetails,
          desc: descArray,
        }));
      }
    } else if (property === "title") {
      if (lang === "en") {
        setDetailen((prevDetails) => ({
          ...prevDetails,
          title: event.target.value,
        }));
      } else if (lang === "la") {
        setDetailla((prevDetails) => ({
          ...prevDetails,
          title: event.target.value,
        }));
      } else if (lang === "cn") {
        setDetailch((prevDetails) => ({
          ...prevDetails,
          title: event.target.value,
        }));
      }
    }
  };
  const handleAdd = (Lang: string) => {
    // Determine the current selected language
    const currentLang = Lang;

    // Create a new item based on the selected language
    const newItem =
      currentLang === "en"
        ? detailen
        : currentLang === "la"
        ? detailla
        : detailch;

    // Update the newProperty state with the new item
    setProperty((prevProperty) => ({
      ...prevProperty,
      interiors: {
        ...prevProperty.interiors,
        [currentLang]: [
          ...initProperty.interiors[
            currentLang as keyof {
              la: { title: string; desc: string[] }[];
              en: { title: string; desc: string[] }[];
              cn: { title: string; desc: string[] }[];
            }
          ],
          newItem,
        ],
      },
    }));

    // Reset the title and desc for the selected language
    if (currentLang === "en") {
      setDetailen({
        title: "",
        desc: [],
      });
    } else if (currentLang === "la") {
      setDetailla({
        title: "",
        desc: [],
      });
    } else if (currentLang === "cn") {
      setDetailch({
        title: "",
        desc: [],
      });
    }
  };
  const handleDelete = (index: number, lang: string) => {
    // Create a copy of the interiors array for the specified language
    const updatedInteriors = [
      ...initProperty.interiors[
        lang as keyof {
          la: { title: string; desc: string[] }[];
          en: { title: string; desc: string[] }[];
          cn: { title: string; desc: string[] }[];
        }
      ],
    ];

    // Remove the item at the specified index
    updatedInteriors.splice(index, 1);

    // Update the newProperty state with the modified interiors array
    setProperty((prevProperty) => ({
      ...prevProperty,
      interiors: {
        ...prevProperty.interiors,
        [lang]: updatedInteriors,
      },
    }));
  };

  return (
    <Container maxWidth="xl">
      <Grid
        item
        xs={12}
        sm={12}
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Grid item xs={6} sm={6}>
          <Typography variant="h6">
            {t("addNewProperty.detail.propertyDetailTitle")}
          </Typography>
        </Grid>
        {/* <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
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
            {langs.map((language) => (
              <li
                key={language.value}
                style={{
                  margin: "0 10px",
                  cursor: "pointer",
                  borderBottom: `2px solid ${
                    language.value === singleLang.value ? "blue" : "transparent"
                  }`,
                }}
                onClick={() => setSingleLang(language)}
              >
                <img
                  src={language.icon}
                  alt={language.label}
                  style={{ width: "24px", height: "24px" }}
                />
              </li>
            ))}
          </ul>
        </Grid> */}
      </Grid>
      {/* Item */}
      <LanguageDetail
        key={singleLang.value}
        t={t}
        newProperty={initProperty}
        language={singleLang}
        handleInputChange={handleInputChange}
        detail={
          singleLang.value == "la"
            ? detailla
            : singleLang.value == "en"
            ? detailen
            : detailch
        }
        handleAdd={handleAdd}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default Detail;
