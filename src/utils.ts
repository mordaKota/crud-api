import 'dotenv/config';

interface Response {
  code: number;
  message: string;
}

export const responses = {
  NOT_FOUND: { code: 404, message: 'Not found' } as Response,
};

export const port: string | number = process.env.PORT || 3033;
export const base = '/api/users/';




