import jwt from "jsonwebtoken";

const { JsonWebTokenError, TokenExpiredError } = jwt;

interface JwtPayload {
  sub: string;
}

function sign(payload: JwtPayload, secret: string, options: jwt.SignOptions) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(token);
    });
  });
}

function verify(token: string, secret: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(payload);
    });
  });
}

const jsonwebtoken = {
  sign,
  verify,
  JsonWebTokenError,
  TokenExpiredError,
};

export default jsonwebtoken;
