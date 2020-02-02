import React from 'react';
import './nav.css';

interface NavProps {}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
    return (
        <div className="page-wrapper">
            <nav>
                <button>Add subscription</button>
                Navigation here.
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    );
}