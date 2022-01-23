import React, {useState, useEffect} from "react";

export default function ServingDetail(props) {
    const Time = () => {
        return (
            <div className="minutes-container flex items-center">
                <i className="far fa-clock mr-2"></i>
                <p>
                    <span className="font-bold">{props.time} </span> MINUTES
                </p>
            </div>
        )
    }
    const ServingInfo = () => {
        return (
            <div className="flex items-center">
                <i className="fas fa-users mr-2"></i>
                <p>
                    <span className="font-bold">{props.serving} </span> SERVINGS
                </p>
                <div className="add-minus-container flex gap-2 ml-2">
                    <i className="fas fa-plus-circle" onClick={props.handleAdd}></i>
                    <i className="fas fa-minus-circle" onClick={props.handleReduce}></i>
                </div>
            </div>
        )
    } 

    return (
        <div className="flex justify-between items-center  px-4 pb-6 pt-14">
            <div className="left-side flex gap-4">
                <Time />
                <ServingInfo />
            </div>
            <div className="right-side" onClick={props.handleAddToBookmark}>
                <i className={`fas fa-bookmark `}></i>
            </div>
        </div>
    )
}