import React, { useState } from "react";

export default function Navbar(props) {
    return (
        <>
            <div 
                className="recipe-menu cursor-pointer text-2xl lg:hidden" 
                onClick={props.handleMenuClick}
            >
                <i className="fas fa-th"></i>
            </div>
            <div className="hidden lg:flex">
                <h1>Husaini</h1>
            </div>
        </>
    )
}