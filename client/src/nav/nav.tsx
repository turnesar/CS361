import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
    return (
        <div className="page-wrapper">
            <nav>
                <Link to="/new"><button className="add-button">Add subscription</button></Link>

                <ul>
                    <li key="home"><Link to="/home">Subscriptions</Link></li>
                    <li key="costs"><Link to="/costs">Costs</Link></li>
                    {/* Add any other nav links here: */}
                </ul>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    );
}