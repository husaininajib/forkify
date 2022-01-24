import React from "react"

const Form = (props) => {
    const styles = {
        form: "flex",
        button: "btn gap-2" 
    } 
    const {form, button} = styles 
    return (
        <form action="" className={form} onSubmit={props.value}>
            <input 
                type="text" name="search" id="search" 
                className=" border"
                onChange={props.query}
            />
            <button type="submit" className={button}>
                <span className="text-white">SEARCH</span>
                <i className="bi bi-search text-base text-white"></i>
            </button>
        </form>
    )
}

export default Form

