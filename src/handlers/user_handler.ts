import express, { Request, Response } from 'express';
import auth_token from '../middlewares/auth_token';
import { User, UserStore } from '../models/user_model';
const userStore = new UserStore();
const index = async (req: Request, res: Response) => {
    try {
        const result = await userStore.index();
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await userStore.show(id);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const customerBody: User = req.body;
        const result = await userStore.create(customerBody);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};
const del = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await userStore.delete(id);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};
const auth = async (req: Request, res: Response) => {
    try {
        const result = await userStore.auth(req.body);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};

const userHandler = (app: express.Application) => {
    app.get('/users', auth_token, index);
    app.get('/users/:id', auth_token, show);
    app.post('/users', create);
    app.delete('/users/:id', del);
    app.post('/users/auth', auth);
};

export default userHandler;
