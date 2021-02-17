import React, { useEffect, useState } from 'react';
import { LoginCallback, SecureRoute, Security, useOktaAuth } from '@okta/okta-react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Logout } from './logout';
import { api } from '../config/';

interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
}

export const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();

      console.log('axxess', accessToken);
    } else {
      console.log('isnt authenticated');
    }

    const getUser = async () => {
      const user = await oktaAuth.getUser();

      console.log('this is the user', user);
    };

    getUser();
  });

  useEffect(() => {
    const getUsers = async () => {
      const accessToken = oktaAuth.getAccessToken();
      const users = await axios.get(`${api.baseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(users);
      setUsers(users.data);
    };

    getUsers();
  }, [oktaAuth]);

  return (
    <div className="App">
      Hey... <Logout />
      {users.map((user: IUser, index: number) => (
        <div>
          {user._id} {user.first_name} {user.last_name}
        </div>
      ))}
    </div>
  );
};
