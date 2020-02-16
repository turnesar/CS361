import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
    return (
        <div className="page-wrapper">
            <nav>
                <ul>
                    <li key="home"><Link to="/home">Subscriptions</Link></li>
                    <li key="costs"><Link to="/costs">Costs</Link></li>
                    {/* Add any other nav links here: */}
                </ul>
                <Link to="/new">
                    <Button className="add-button" color="primary" startIcon={<AddIcon />}>
                        Add
                    </Button>
                </Link>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    );
}

