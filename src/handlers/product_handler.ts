import express, { Request, Response } from 'express';
import auth_token from '../middlewares/auth_token';
import { Product, ProductStore } from '../models/products_model';
const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const result = await productStore.index();
        return res.json(result);
    } catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const result = await productStore.show(req.params.id);
        return res.json(result);
    } catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
};
const addNewProduct = async (req: Request, res: Response) => {
    try {
        const result = await productStore.create(req.body);
        return res.json(result);
    } catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
};
const del = async (req: Request, res: Response) => {
    try {
        const result = await productStore.delete(req.params.id);
        return res.json(result);
    } catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
};
const getProductBycat = async (req: Request, res: Response) => {
    try {
        const result = await productStore.getProductBycat(req.params.cat);
        return res.json(result);
    } catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
};

const productHandler = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_token, addNewProduct);
    app.delete('/products/:id', auth_token, del);
    app.get('/products/category/:cat', auth_token, getProductBycat);
};
export default productHandler;
