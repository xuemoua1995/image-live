import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./popularquestion.css";
import { useTranslation } from "react-i18next";
export default function AccordionUsage() {
  const { t } = useTranslation();
  return (
    <div className="accodion-body container">
      <h2>{t("topic")}</h2>
      <div className="accodion-content">
        <div
          className="content-info"
         
        >
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              1. {t("question1")}
            </AccordionSummary>
            <AccordionDetails>{t("answer1")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              2. {t("question2")}
            </AccordionSummary>
            <AccordionDetails>{t("answer2")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              3. {t("question3")}
            </AccordionSummary>
            <AccordionDetails>{t("answer3")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              4. {t("question4")}
            </AccordionSummary>
            <AccordionDetails>{t("answer4")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              5. {t("question5")}
            </AccordionSummary>
            <AccordionDetails>{t("answer5")}</AccordionDetails>
          </Accordion>
        </div>
        <div className="content-info">
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              6. {t("question6")}
            </AccordionSummary>
            <AccordionDetails>{t("answer6")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              7. {t("question7")}
            </AccordionSummary>
            <AccordionDetails>{t("answer7")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              8. {t("question8")}
            </AccordionSummary>
            <AccordionDetails>{t("answer8")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              9. {t("question9")}
            </AccordionSummary>
            <AccordionDetails>{t("answer9")}</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
              style={{
                fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
                fontSize:14
              }}
            >
              10. {t("question10")}
            </AccordionSummary>
            <AccordionDetails>{t("answer10")}</AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
