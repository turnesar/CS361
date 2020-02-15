import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
    return (
        <div className="page-wrapper">
            <nav>
                <Link to="/new"><button>Add subscription</button></Link>

                <Link to="/home"><button>Subscriptions</button></Link>
                
                <Link to="/costs"><button>Costs</button></Link>
                {/* Add any other nav links here: */}
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    );
}