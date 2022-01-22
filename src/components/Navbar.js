import React, { useState } from "react";

export default function Navbar(props) {
    const Edit = () => {
        return(
            <div className="write-icon text-2xl">
                <i className="far fa-edit"></i>
            </div>
        )
    }

    const Bookmark = () => {
        return (
            <div className="bookmark-icon text-2xl">
                <i className="far fa-bookmark"></i>
            </div>
        )
    }

    const Form = () => {
        return (
            <form action="" className="" onSubmit={props.handleSubmit}>
                <input 
                    type="text" name="search" id="search" 
                    className={`p-2 border`}
                    onChange={props.handleSearch}
                />
                <button type="submit">
                    <i className="fas fa-search text-2xl"></i>
                </button>
            </form>
        )
    }


    return (
        <div 
            className="recipe-menu cursor-pointer text-2xl" 
            onClick={props.handleMenuClick}
        >
            <i className="fas fa-th"></i>
        </div>
    )
}