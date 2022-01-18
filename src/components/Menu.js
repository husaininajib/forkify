import React from "react";

export default function Menu(props) {
    return (
            <div 
                className="menu-card flex items-center gap-3 py-4 border pl-2"
                onClick={props.getRecipe}
            >
                <div className="menu-img">
                    <img src={props.imageUrl} alt="" />
                </div>
                <div className="menu-detail">
                    <h3 className="font-semibold uppercase">{props.title}</h3>
                    <p className="">{props.publisher}</p>
                </div>
            </div>
    )
}