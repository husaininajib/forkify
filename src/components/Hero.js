import React from "react";
import Loading from "./Loading";

export default function Hero(props) {
    if (props.loading) {
        return <Loading />
    }

    return (
        <section className="hero img-container">
                <img src={props.imageUrl} alt="" />
                <h1 className="recipe-title"> 
                <span>{props.title}</span>
                </h1>
        </section>
    )
}