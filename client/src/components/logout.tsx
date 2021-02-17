import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { nav } from '..';

// Basic component with logout button
export const Logout = () => {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    console.log(oktaAuth);
    oktaAuth.tokenManager.clear();
    oktaAuth.signOut();
    nav('/');
  };

  return <Button onClick={logout}>Logout</Button>;
};
