import { IconButton } from "@mui/material";
import { IoArrowUp } from "react-icons/io5";
import { useRef } from "react";

const ScrollUpButton = () => {
  const scrollUpRef = useRef(null);

  // Logic to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      ref={scrollUpRef}
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: "#582C86",
        color: "#fff",
      }}
    >
      <IoArrowUp />
    </IconButton>
  );
};

export default ScrollUpButton;
