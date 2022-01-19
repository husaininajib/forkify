import React from "react";

export default function Hero(props) {
    

    return (
        <section className="hero">
            <div className="img-container">
                <img src={props.menuImage} alt="" />
                <h1 className="recipe-title">
                    <span className="text-white uppercase">{props.title}</span>    
                </h1>
            </div>

            <article className="flex justify-between items-center  px-4 pb-6 pt-14">
                <div className="left-side flex gap-4">
                    <div className="minutes-container flex items-center">
                        <i className="far fa-clock mr-2"></i>
                        <p>
                            <span className="font-bold">60 </span> MINUTES
                        </p>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-users mr-2"></i>
                        <p>
                            <span className="font-bold">{props.serving} </span> SERVINGS
                        </p>
                        <div className="add-minus-container flex gap-2 ml-2">
                            <i className="fas fa-plus-circle" onClick={props.addServing}></i>
                            <i className="fas fa-minus-circle" onClick={props.reduceServing}></i>
                        </div>
                    </div>
                </div>
                <div className="right-side" onClick={props.saveRecipe}>
                    <i className="fas fa-bookmark"></i>
                </div>
            </article>
        </section>
    )
}