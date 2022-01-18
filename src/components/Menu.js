import React from "react";

export default function Menu(props) {
    return (
        <article className={`menu-list ${props.toggleStatus ? "show-menu" : "show"}`}>
            <div className="menu-card flex items-center gap-3 py-4 border pl-2">
                <div className="menu-img">
                    <img src="./logo192.png" alt="" />
                </div>
                <div className="menu-detail">
                    <h3 className="font-semibold">HOMEMADE PIZZA</h3>
                    <p className="uppercase">closet cooking</p>
                </div>
            </div>
        </article>
    )
}