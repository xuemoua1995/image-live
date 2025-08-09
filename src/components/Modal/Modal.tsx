import { ReactNode } from "react";
// import { Link } from "react-router-dom";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
// import { useTranslation } from "react-i18next"; // Import useTranslation
// import { FaSearch } from "react-icons/fa";

interface ModalProps {
  children: ReactNode;
  title: string;
  rightModal: boolean;
  small?: boolean;
}

const Modal = ({ children, title, rightModal, small }: ModalProps) => {
  const { isModalOpen, toggleModal, modalType } = useAppContext();
  // const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className={`modal ${rightModal && isModalOpen && "open"}`}>
      <div className="modal-overlay" onClick={() => toggleModal(modalType)} />
      <div className={`modal-content ${small && "small"} `}>
        <div
          style={{ marginBottom: 10, border: "none" }}
          className="modal-header font-subheader"
        >
          {title}
        </div>
        <div className="modal-close" onClick={() => toggleModal(modalType)}>
          <IoMdClose />
        </div>
        <div className="modal-body">
          {children}
          {/* <div>
            <Link to="/explore" className=" btn-search cancel">
              <span style={{ alignItems: "center", padding: 8 }}>
                <FaSearch style={{ margin: "auto 2 -3" }} />
                <b style={{ marginLeft: 10 }}>{t("home.search")}</b>
              </span>{" "}
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
