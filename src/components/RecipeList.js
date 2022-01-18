import React, {useState, useEffect} from "react";

export default function RecipeList(props) {

    return (
        <section id="recipe" className="grid place-items-center pb-10 px-4">
            <h2 className="mt-8 mb-7 font-bold">RECIPE INGREDIENTS</h2>
            <ul className="grid place-items-center gap-6">
                <li>
                    <i className="fas fa-check"></i> 
                    <span></span>
                </li>
                <li>
                    <i className="fas fa-check"></i> 
                    <span>1 1/2 cups warm water</span>
                </li>
                <li>
                    <i className="fas fa-check"></i> 
                    <span>1 1/2 cups warm water</span>
                </li><li>
                    <i className="fas fa-check"></i> 
                    <span>1 1/2 cups warm water</span>
                </li>
                <li>
                    <i className="fas fa-check"></i> 
                    <span>1 1/2 cups warm water</span>
                </li>
            </ul>
        </section>
    )
}