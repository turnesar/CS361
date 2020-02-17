import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export const Header: React.FunctionComponent = () => {
    return (
        <header className="header" >
            <h1>Subscription Tracker</h1>
            <div className="button-wrapper">
                <Link to="/signin"><Button color="primary">Sign in</Button></Link>
            </div>
        </header>
    );
}