import React from "react"

export default function Dropdown(props) {
    return (
        <div>
            <div 
                className="menu-card flex items-center gap-3 py-4 border pl-2"
                
            >
                <figure className="menu-img">
                    <img src={props.imageUrl} alt="" />
                </figure>
                <div className="menu-detail">
                    <h3 
                        className="font-semibold uppercase">{props.title}
                    </h3>
                    <p className="mt-1">{props.publisher}</p>
                </div>
            </div>
        </div>
    )
}