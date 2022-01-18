import React from "react";
// import heroImage from "./"

export default function Hero() {
    return (
        <section className="hero">
            <div className="img-container">
                <img src="./images/u1.png" alt="" />
                <h1 className="recipe-title">
                    <span className="text-white uppercase">pizza dinner</span>    
                </h1>
            </div>

            <article className="flex justify-between items-center  px-4 pb-6 pt-14">
                <div className="left-side flex gap-4">
                    <div className="minutes-container flex gap-2 items-center">
                        <i className="far fa-clock"></i>
                        <span>60 MINUTES</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <i class="fas fa-users"></i>
                        <span>1 SERVINGS</span>
                        <div className="add-minus-container flex gap-2">
                            <i className="fas fa-plus-circle"></i>
                            <i className="fas fa-minus-circle"></i>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <i className="fas fa-bookmark"></i>
                </div>
            </article>
        </section>
    )
}