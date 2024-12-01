import { sign } from 'jsonwebtoken';

const key = process.env.SECRET_KEY || '';

const generateToken = (payload: any) =>
    new Promise((resolve, reject) => {
        sign(payload, key, (err: any, token: unknown) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

export default generateToken;