import { useOktaAuth } from '@okta/okta-react';

// Basic component with logout button
export const Logout = () => {
  const { oktaAuth } = useOktaAuth();

  const logout = async () => {
    console.log(oktaAuth);
    oktaAuth.tokenManager.clear();
    oktaAuth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
};
