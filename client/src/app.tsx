import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './header/header';
import { Nav } from './nav/nav';
import { CostList, SigninForm, SubscriptionForm, SubscriptionList } from './pages'
import './app.css';

const App: React.FunctionComponent = () => {
  
  return (
    <>
    <Router>
      <Header />
      <Nav>
        <Switch>
          <Route path="/home">
            <SubscriptionList />
          </Route>
          <Route path="/new">
            <SubscriptionForm />
          </Route>
          <Route path = "/costs" >
            <CostList />
           </Route>
          <Route path="/signin">
            <SigninForm />
          </Route>
        </Switch>
      </Nav>
      </Router>
    </>
  );
}

//add all the front end representation here
export default App;
