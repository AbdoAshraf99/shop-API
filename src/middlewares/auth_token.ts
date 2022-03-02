import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        Jwt.verify(token as string, process.env.SECRET_TOKEN as string);
        return next();
    } catch (e) {
        return res.status(401).send('Invalid token');
    }
};
