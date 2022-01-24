import React from "react";

export default function Menu(props) {
    return (
            <div 
                className="menu-card flex items-center gap-3 py-4"
                onClick={props.handleClickMenu}
            >
                <figure className="menu-img">
                    <img src={props.image} alt="" />
                </figure>
                <div className="menu-detail">
                    <h3 className="font-semibold uppercase">{props.title}</h3>
                    <p className="mt-1">{props.publisher}</p>
                </div>
            </div>
    )
}