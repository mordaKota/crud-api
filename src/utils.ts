import 'dotenv/config';
import {IncomingMessage} from "http";
import crypto from 'crypto';
import {User} from "./repository";

interface Response {
  code: number;
  message: string;
}

export const responses = {
  NOT_FOUND: { code: 404, message: 'Not found' } as Response,
  ID_NOT_VALID: { code: 400, message: 'User ID is not valid'} as Response,
  DATA_NOT_VALID: { code: 400, message: 'User data is not valid'} as Response,
  SERVER_ERROR: { code: 500, message: 'Server error occurred'} as Response,
};

export const port: string | number = process.env.PORT || 3033;
export const base = '/api/users/';

export const parseBody = (req: IncomingMessage) => {
  return new Promise( (res) => {
    let body: string = '';
    req.on('data', chunk => {
      body += chunk.toString();
    })
    req.on('end', () => {
      console.log(JSON.parse(body))
      res(JSON.parse(body));
    })

  });
}

export const isUserValid = (userObj: User): boolean => {
  return !(typeof userObj.username !== 'string' ||
    typeof userObj.age !== 'number' ||
    userObj.age < 0 ||
    !Array.isArray(userObj.hobbies));
};

export const generateUuid = (): string => crypto.randomUUID();

export const isIdValid = (id: string): RegExpMatchArray => {
  const uuidRegExp = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/;
  return id.match(uuidRegExp);
}

