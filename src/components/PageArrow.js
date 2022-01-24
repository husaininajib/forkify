import React from "react"

const PageArrow = ({menus, currentPage, maxMenu, handleNextPage, handlePrevPage}) => {
    const calc = Math.ceil(menus.length / maxMenu)

    return (
        <div className="move-page flex justify-end text-2xl mt-10">
            {currentPage > 1 &&
                <div className="btn-inline mr-auto flex items-center gap-2"  onClick={handlePrevPage}>
                <i className="bi bi-arrow-left"></i>
                <span>Page {currentPage - 1}</span>
                </div>
            }
            {currentPage < calc &&
                <div className={`btn-inline ml-auto flex items-center gap-2 ${currentPage === calc && "hidden"}`} onClick={handleNextPage}>
                <span>Page {currentPage + 1}</span>
                <i className="bi bi-arrow-right"></i>
                </div>
            }
        </div>
    )
}


export default PageArrow
