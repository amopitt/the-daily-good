import OktaJwtVerifier from '@okta/jwt-verifier';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../error/errorModels';

dotenv.config();

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.CLIENT_ID,
  issuer: process.env.ISSUER,
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
export const authenticationRequired = (req: any, res: Response, next: NextFunction) => {
  console.log('authentication requested');
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next('aaUnauthorized');
  }

  const accessToken = match[1];
  const audience = 'api://default'; //sampleConfig.resourceServer.assertClaims.aud;
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, audience)
    .then((jwt: any) => {
      req.jwt = jwt;
      next();
    })
    .catch((err: any) => {
      console.log('auth error', err);
      res.status(401).send(err.message);
    });
};

export const expressAuthentication = (req: Request, securityName: string, scopes?: string[]) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    return Promise.reject(new UnauthorizedError('!!No token provided'));
  }

  const accessToken = match[1];
  const audience = 'api://default'; //sampleConfig.resourceServer.assertClaims.aud;
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, audience)
    .then((jwt: any) => {
      Promise.resolve(jwt);
    })
    .catch((err: any) => {
      return Promise.reject(new UnauthorizedError(err?.message));
    });
};
