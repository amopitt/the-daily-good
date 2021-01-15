import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security, useOktaAuth } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';

import { oidc } from './config';
import './App.css';
import Login from './components/login';
import { Users } from './components/users';
import { Logout } from './components/logout';

console.log(process.env);

interface IJob {
  id: string;
}

console.log('api url', process.env.REACT_APP_API_URL);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const Jobs = () => {
  const [jobs, setJobs] = useState<any>([]);
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      console.log('axxess', accessToken);
    } else {
      console.log('isnt authenticated');
    }
  });
  useEffect(() => {
    const getJobs = async () => {
      const jobs = await axios.get(
        //`${environment.API_URL}/jobs?description=${description}&location=${location}${full_time}${page}`
        `${API_URL}/jobs`
      );
      console.log(jobs);
      setJobs(jobs.data);
    };

    getJobs();
  }, []);

  return (
    <div className="App">
      Hey... <Logout />
      {jobs.map((job: IJob, index: number) => (
        <div>{job.id}</div>
      ))}
    </div>
  );
};

const oktaAuth = new OktaAuth(oidc);

const App = () => {
  const history = useHistory(); // example from react-router

  const customAuthHandler = (oktaAuth: OktaAuth): Promise<void> => {
    console.log(history);
    history.push('/login');
    return Promise.resolve();
  };

  return (
    <Security oktaAuth={oktaAuth} onAuthRequired={customAuthHandler}>
      <Switch>
        <SecureRoute path="/" exact={true} component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/callback" component={LoginCallback} />
        <Route path="/version" component={() => <div>version 0.0.0</div>} />
      </Switch>
    </Security>
  );
};

export default App;
