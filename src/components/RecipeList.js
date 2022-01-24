import React, {useState, useEffect} from "react";
import { Fraction } from "fractional";

function RecipeList({quantity, defaultServing, unit, count, description}) {
    const fractionalQuantity = (new Fraction(quantity * count)).divide(new Fraction(defaultServing)).toString()
    return (

        <li className="flex items-center">
            <i className="bi bi-check2 text-2xl"></i>
            <span className="capitalize">
                {quantity && fractionalQuantity} 
                {` ${unit && unit} 
                ${description && description}`}
            </span>
        </li>
    )
}

export default RecipeList