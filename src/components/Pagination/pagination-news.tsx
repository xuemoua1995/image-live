import React from "react";
// import { useTranslation } from "react-i18next";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import './pagination-news.css'
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageLimit?: number; // Optional prop for visible page limit
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageLimit = 5, // Default limit is 5
}) => {
  // const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Determine start and end page numbers for truncation
  const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
  const endPage = Math.min(totalPages, startPage + pageLimit - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div
      style={{
        padding: 10,
        textAlign: "center",
        fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
      }}
    >
      <button
        className="back-ward"
        style={{
          fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
        }}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <FaArrowLeft size={12} />
        {/* {t("home.back-ward")} */}
      </button>

      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          style={{
            fontWeight: 1 === currentPage ? "bold" : "normal",
            backgroundColor: 1 === currentPage ? "#582C86" : "transparent",
            color: 1 === currentPage ? "#fff" : "#582C86",
            borderRadius: "10px",
            padding: "10px 20px",
            border: "1px solid #582C86",
            marginLeft: "10px",
            fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
          }}
        >
          1
        </button>
      )}

      {startPage > 2 && <span style={{ marginLeft: 10 }}>...</span>}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          style={{
            fontWeight: pageNumber === currentPage ? "bold" : "normal",
            backgroundColor:
              pageNumber === currentPage ? "#582C86" : "transparent",
            color: pageNumber === currentPage ? "#fff" : "#582C86",
            borderRadius: "10px",
            padding: "10px 20px",
            border: "1px solid #582C86",
            marginLeft: "10px",
            fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
          }}
        >
          {pageNumber}
        </button>
      ))}

      {endPage < totalPages - 1 && <span style={{ marginLeft: 10 }}>...</span>}

      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          style={{
            fontWeight: totalPages === currentPage ? "bold" : "normal",
            backgroundColor:
              totalPages === currentPage ? "#582C86" : "transparent",
            color: totalPages === currentPage ? "#fff" : "#582C86",
            borderRadius: "10px",
            padding: "10px 20px",
            border: "1px solid #582C86",
            marginLeft: "10px",
            fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
          }}
        >
          {totalPages}
        </button>
      )}

      <button
        className="for-ward"
        style={{
          marginLeft: 10,
          textAlign: "center",
          fontFamily: "Times New Roman, PT Serif, NotoSanLao, Times, serif",
        }}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        {/* {t("home.for-ward")} */}
        <FaArrowRight size={12} />
      </button>
    </div>
  );
};

export default Pagination;
