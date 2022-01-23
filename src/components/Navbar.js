import React, { useState } from "react";

export default function Navbar(props) {
    return (
        <div 
            className="recipe-menu cursor-pointer text-2xl" 
            onClick={props.handleMenuClick}
        >
            <i className="fas fa-th"></i>
        </div>
    )
}