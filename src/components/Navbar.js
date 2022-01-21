import React, { useState } from "react";
import Search from "./Search";
import Edit from "./Edit";
import Bookmark from "./Bookmark";

export default function Navbar(props) {
    return (
        // <header className="flex justify-between items-center px-4 ">
            <div 
                className="recipe-menu cursor-pointer text-2xl" 
                onClick={props.handleMenuClick}
            >
                <i className="fas fa-th"></i>
            </div>
            // <article className="flex gap-4 items-center">
            //     <Search />
            //     <Edit />
            //     <Bookmark />
            // </article>
        // </header>
    )
}