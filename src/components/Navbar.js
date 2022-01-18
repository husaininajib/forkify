import React from "react";

export default function Navbar() {
    return (
        <header>
            <nav className="flex justify-between px-6 py-7 ">
                <div className="recipe-menu">
                    <i className="fas fa-th"></i>
                </div>
                <article className="flex gap-4">
                    <div className="searc-icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="write-icon">
                        <i className="far fa-edit"></i>
                    </div>
                    <div className="bookmark-icon">
                        <i className="far fa-bookmark"></i>
                    </div>
                </article>
            </nav>
        </header>
    )
}