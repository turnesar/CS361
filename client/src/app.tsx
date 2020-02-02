import React from 'react';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import './app.css';

const App: React.FunctionComponent = () => {
  
  return (
    <>
      <Header />
      <Nav>
        <div>hello world</div>
      </Nav>
    </>
  );
}

//add all the front end representation here
export default App;
