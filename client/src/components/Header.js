import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return(
        <div className="header">
            <Link to="/">PG PRIME</Link>
        </div>
    )
}

export default Header;