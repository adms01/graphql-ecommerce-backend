import * as jwt from 'jsonwebtoken';
export declare const validateToken: (auth: string) => Promise<string | jwt.JwtPayload>;
