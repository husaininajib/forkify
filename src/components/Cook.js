import React from "react";

export default function Cook(props) {
    const style = "border-none flex justify-center items-center transition-all duration-200 btn-inline"
    return (
        <section id="cook" className="grid place-items-center pt-10 pb-10 px-4">
            <h2 className="mb-6 font-bold">HOW TO COOK IT</h2>
            <p className="pb-7 text-center md:w-7/12">
                This recipe was carefully designed and tested by Closet Cooking. Please check out directions at their website.
            </p>
            <button className={style}>
                <a href={props.source} className="text-white">
                    DIRECTIONS 
                </a>
                <i className="bi bi-arrow-right ml-2 text-white text-lg"></i>
            </button>
        </section>
    )
}