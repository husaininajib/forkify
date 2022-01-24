import React, {useState, useEffect} from "react";

export default function ServingDetail(props) {
    const Time = () => {
        return (
            <div className="minutes-container flex items-center">
                <i className="bi bi-clock mr-2 text-lg"></i>
                <p>
                    <span className="font-bold">{props.time} </span> MINUTES
                </p>
            </div>
        )
    }
    const ServingInfo = () => {
        return (
            <div className="flex items-center">
                <i className="bi bi-people mr-2 text-xl"></i>
                <p>
                    <span className="font-bold">{props.serving} </span> SERVINGS
                </p>
                <div className="add-minus-container flex gap-2 ml-2">
                    <i className="bi bi-plus-circle" onClick={props.handleAdd}></i>
                    <i className="bi bi-dash-circle" onClick={props.handleReduce}></i>
                </div>
            </div>
        )
    } 

    return (
        <div className="info-container flex justify-center items-center  px-4 pb-6 pt-16">
            <div className="left-side flex gap-4">
                <Time />
                <ServingInfo />
            </div>
            {/* <div className="right-side" onClick={props.handleAddToBookmark}>
                <i className={`bi bi-bookmark-fill`}></i>
            </div> */}
        </div>
    )
}