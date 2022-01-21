import React from 'react';
import { useState } from 'react/cjs/react.development';

function Search(props) {
    const [searchOpen, setSearchOpen] = useState(false)

    const preventDefault = (ev) => {
        ev.preventDefault()
    }

    const toggleSearch = () => {
        setSearchOpen(prev => !prev)
    }

    return (
        <form action="" className="" onSubmit={preventDefault}>
            <input 
                type="search" name="search" id="search" 
                className={`p-2 border ${searchOpen && "show"}`}
                onChange={props.searchInput}
            />
            <button type="submit" onClick={toggleSearch}>
                {/* {searchOpen ? <i className="fas fa-times text-2xl"></i> : <i className="fas fa-search text-2xl"></i>} */}
                <i className="fas fa-search text-2xl"></i>
            </button>
        </form>
    )
}

export default Search;
