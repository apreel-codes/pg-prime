import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    

    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');

        
        setQuery('');
    };

    return(
        <div class="search-box">
            <form method="GET" onSubmit={submitHandler}>
                <div class="relative text-gray focus-within:text-gray">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" disabled={!query} class="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </span>
                <input onChange={(e) => setQuery(e.target.value)} id="q" value={query}  type="text" name="q" class="w-full border py-2 text-sm text-gray-400 bg-white rounded-md pl-10 focus:outline-gray-500 focus:bg-white focus:text-gray-900" placeholder="search products, brands.." autocomplete="off" />
                </div>
            </form>
        </div>
       
    )
}
export default SearchBox;

