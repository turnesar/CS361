import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { SubscriptionForm, SubscriptionList, CostList } from './pages'
import './app.css';

const App: React.FunctionComponent = () => {
  
  return (
    <>
    <Router>
      <Header />
      <Nav>
        <Switch>
          <Route path="/home">
            {/* this will be replaced with a component */}
            <SubscriptionList />
          </Route>
          <Route path="/new">
            {/* this will be replaced with a component */}
            <SubscriptionForm />
          </Route>
          <Route path = "/costs" >
            {/* this will be replaced with a component */}
            <CostList />
           </Route>
          <Route path="/signin">
            <span>signin page</span>
          </Route>
        </Switch>
      </Nav>
      </Router>
    </>
  );
}

//add all the front end representation here
export default App;
