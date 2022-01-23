import React, {useState, useEffect} from "react";

export default function RecipeList({quantity, defaultServing, unit, count, description}) {
    return (
        <li>
            <i className="fas fa-check"></i> 
            <span className="capitalize">
                {quantity && quantity * count / defaultServing} 
                {` ${unit && unit} 
                ${description && description}`}
            </span>
        </li>
    )
}