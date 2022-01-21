import React, {useState} from "react";
import Time from "./Time";
import EditServing from "./EditServing";


export default function ServingDetail(props) {
    return (
        <article className="flex justify-between items-center  px-4 pb-6 pt-14">
            <div className="left-side flex gap-4">
                <Time />
                <EditServing 
                />
            </div>
            <div className="right-side" onClick={props.handleBookmarkClick}>
                <i 
                    className={`fas fa-bookmark `}
                >
                </i>
            </div>
        </article>
    )
}