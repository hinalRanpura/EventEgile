import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./venuePage.css"

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/venues/${keyword}`);
        }
        else {
            history.push("/venues")
        }
    }
    return (
        <Fragment>
            <MetaData title={"Venues"} />
            <form onSubmit={searchSubmitHandler}>
                <div className="search">
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="Search.."
                        onChange={(e) => setKeyword(e.target.value)} 
                        />
                    <button type="Submit">Search </button>
                </div>
            </form>
        </Fragment>
    );
}

export default Search;
