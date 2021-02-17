import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security, useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { oidc } from './config';
import './App.scss';
import Login from './components/login';
import { JournalEntry } from './components/journal-entry';
import { Logout } from './components/logout';
import { Form, Nav, Navbar } from 'react-bootstrap';
import createHistory from 'history/createBrowserHistory';
import { nav } from '.';
import { RoyalRumble } from './components/royal-rumble';

// TODO: Remove when foundationally sound
console.log(process.env);

const oktaAuth = new OktaAuth(oidc);

const Header = () => {
  const { authState, oktaAuth } = useOktaAuth();
  if (!authState.isAuthenticated) {
    return <></>;
  }
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark" className="mr-auto">
        <Navbar.Brand href="/">The Daily Good</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Form inline>
          <Logout></Logout>
        </Form>
      </Navbar>
    </>
  );
  // return (
  //   <div>
  //     <Logout></Logout>
  //   </div>
  // );
};

const App = () => {
  const history = createHistory(); // example from react-router
  const customAuthHandler = (oktaAuth: OktaAuth): Promise<void> => {
    console.log(history);
    nav('/login');
    return Promise.resolve();
  };

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
      <Header />
      <Switch>
        <SecureRoute path="/" exact={true} component={JournalEntry} />
        <SecureRoute path="/history/:dateSelected" component={JournalEntry} />
        <Route path="/login" component={Login} />
        <Route path="/rumble" component={RoyalRumble} />
        <Route path="/callback" component={LoginCallback} />
        <Route path="/version" component={() => <div>version 0.0.0</div>} />
      </Switch>
    </Security>
  );
};

export default App;
