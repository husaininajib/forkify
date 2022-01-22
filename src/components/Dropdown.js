import React from "react"

export default function Dropdown(props) {
    return (
        <div className={`dropdown ${props.handleBookmark ? "inline-block" : "hidden"}`}>
            <div 
                className="menu-card flex items-center gap-3 py-4 border pl-2"
                
            >
                <figure className="menu-img">
                    <img src={props.image} alt="" />
                </figure>
                <div className="menu-detail">
                    <h3 
                        className="font-semibold uppercase">{props.title || "No item"}
                    </h3>
                    <p className="mt-1">{props.publisher}</p>
                </div>
            </div>
        </div>
    )
}