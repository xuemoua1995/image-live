import React from 'react';
import './Pagination.css'
import {useParams } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";

interface PaginationProps {
  totalPages: number;
  handleClick: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, handleClick }) => {
    const { page } = useParams();
    const currentPage = parseInt(page || '1', 10);
    const maxVisiblePages = 5;

    const renderPageButtons=():number[]=>{

        let startPage:number, endPage:number;

        if(totalPages<=maxVisiblePages){
            startPage = 1;
            endPage = totalPages;
        }else{
            if(currentPage <=3){
                startPage=1;
                endPage = 5;
            }
            else if(currentPage + 2 >= totalPages){
                startPage = totalPages-4;
                endPage = totalPages;
            }
            else{
                startPage = currentPage - 2
                endPage = currentPage +2
            }
        }

        const visiblePages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return visiblePages
    }
     
    return (
        <div className='pagination'>
            <button onClick={() => handleClick(1)} disabled={currentPage === 1}>
                <HiOutlineChevronDoubleLeft/>
            </button>
            <button onClick={() => handleClick(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                <HiOutlineChevronLeft/>
            </button>

            {renderPageButtons().map((item)=>(
                <button
                    key={item}
                    onClick={() => handleClick(item)}
                    disabled={currentPage === item}
                    className={`${currentPage === item && 'active'}`}
                >
                    {item.toString()}
                </button>
            ))}

            <button
                onClick={() => handleClick(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                <HiOutlineChevronRight/>
            </button>

            <button onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                <HiOutlineChevronDoubleRight/>
            </button>
        </div>
  );
};

export default Pagination;
