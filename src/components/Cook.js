import React from "react";

export default function Cook(props) {
    return (
        <section id="cook" className="grid place-items-center pt-10 pb-6 px-4">
            <h2 className="mb-6 font-bold">HOW TO COOK IT</h2>
            <p className="pb-7 text-center">This recipe was carefully designed and tested by Closet Cooking. Please check out directions at their website.</p>

            <button>
                <a href={props.source}>
                    DIRECTIONS 
                </a>
                <i className="fas fa-arrow-right ml-2"></i>
            </button>
        </section>
    )
}