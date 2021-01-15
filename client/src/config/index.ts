const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
const ISSUER = process.env.REACT_APP_ISSUER || 'yablewit';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const REDIRECT_URI = `${window.location.origin}/callback`;

export const oidc = {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
};

export const api = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
};
