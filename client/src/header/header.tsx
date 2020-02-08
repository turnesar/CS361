import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export const Header: React.FunctionComponent = () => {
    return (
        <header className="header" >
            <h1>App Name</h1>
            <div className="button-wrapper">
                <Link to="/signin"><button>sign in</button></Link>
            </div>
        </header>
    );
}