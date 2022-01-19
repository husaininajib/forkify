import React, {useState, useEffect} from "react";
import { nanoid } from 'nanoid'

export default function RecipeList(props) {
    function displayRecipeList() {
        const recipeList = props.recipeIngredients
        const ingredientsElement = recipeList.map(item => {
            return (
                <li key={nanoid()}>
                    <i className="fas fa-check"></i> 
                    <span>{item}</span>
                </li>
            )
        })
        return ingredientsElement
    }

    return (
        <section id="recipe" className="grid place-items-center pb-10 px-4">
            <h2 className="mt-8 mb-7 font-bold">RECIPE INGREDIENTS</h2>
            <ul className="grid justify-start gap-6">
                {props.recipeIngredients && displayRecipeList()}
            </ul>
        </section>
    )
}