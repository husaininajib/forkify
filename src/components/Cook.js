import React from "react";

export default function Cook(props) {
    const styles = {
        cookContainer: "grid place-items-center pt-10 pb-10 px-4",
        button: "btn border-none",
        cookText: "pb-7 text-center md:w-7/12"
    }
    const {cookContainer, button, cookText} = styles

    return (
        <section id="cook" className={cookContainer}>
            <h2 className="mb-6 font-bold">HOW TO COOK IT</h2>
            <p className={cookText}>
                This recipe was carefully designed and tested by Closet Cooking. Please check out directions at their website.
            </p>
            <button className={button}>
                <a href={props.source} className="text-white">
                    DIRECTIONS 
                </a>
                <i className="bi bi-arrow-right ml-2 text-white text-lg"></i>
            </button>
        </section>
    )
}