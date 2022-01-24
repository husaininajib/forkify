import React from "react";

export default function Footer() {
    return (
        <footer className="py-5">
            <div className="copyright-container grid place-items-center px-3">
                {/* <p><span>Husaini</span> Najib &#169; 2021</p> */}
                <p className="text-center text-sm font-semibold text-white">
                    Built by HUSAINI designed {"&"} copyright by by Jonas Schmedtmann.
                </p>
            </div>
        </footer>
    )
}