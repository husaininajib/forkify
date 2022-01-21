import React, {useState} from "react";


export default function EditServing(props) {
    const [currentServing, setCurrentServing] = useState(props.servingCount || 1)

    function addServing() {
        setCurrentServing(prevState => {
            return prevState + 1
        })
    }

    function reduceServing() {
        if (currentServing > 1) {
            setCurrentServing(prevState => {
                return prevState - 1
            })
        }
    }

    return (
        <div className="flex items-center">
            <i className="fas fa-users mr-2"></i>
            <p>
                <span className="font-bold">{currentServing} </span> SERVINGS
            </p>
            <div className="add-minus-container flex gap-2 ml-2">
                <i className="fas fa-plus-circle" onClick={addServing}></i>
                <i className="fas fa-minus-circle" onClick={reduceServing}></i>
            </div>
        </div>
    )
}