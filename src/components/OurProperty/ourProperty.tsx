import "./ourproperty.css";
import { useTranslation } from "react-i18next";

export default function AccordionUsage() {
  const { t } = useTranslation();
  return (
    <div className="container property-section" style={{display:'none'}}>
      <h3>{t("topic")}</h3>
      <div className="ag-format-container">
        <div className="ag-courses_box">
          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                UI/Web&amp;Graph design for teenagers 11-17&#160;years old
              </div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">04.11.2022</span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                UX/UI Web-Design&#160;+ Mobile Design
              </div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">04.11.2022</span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                Annual package "Product+UX/UI+Graph designer&#160;2022"
              </div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">04.11.2022</span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">Graphic Design</div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">04.11.2022</span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">Motion Design</div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">30.11.2022</span>
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                Front-end development&#160;+ jQuery&#160;+ CMS
              </div>
            </div>
          </div>

          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">Digital Marketing</div>
            </a>
          </div>

          <div className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">Interior Design</div>

              <div className="ag-courses-item_date-box">
                Start:
                <span className="ag-courses-item_date">31.10.2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
