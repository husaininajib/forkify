import React from "react";
// flex justify-between items-center px-4 h-12
export default function Navbar(props) {
    return (
        <header>
            <nav className="flex justify-between items-center px-4 h-12">
                <div className="recipe-menu cursor-pointer" onClick={props.toggle}>
                    <i className="fas fa-th"></i>
                </div>
                <article className="flex gap-4">
                    <div className="search-icon cursor-pointer">
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