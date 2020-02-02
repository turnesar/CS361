import React from 'react';
import './header.css';

export const Header: React.FunctionComponent = () => {
    return (
        <header className="header" >
            <h1>App Name</h1>
            <div className="button-wrapper">
                <button>sign in</button>
            </div>
        </header>
    );
}