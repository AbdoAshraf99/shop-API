import { DashboardQueries } from '../service/dashboard';
import express, { Request, Response } from 'express';
import auth_token from '../middlewares/auth_token';

const Dashboard = new DashboardQueries();

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const result = await Dashboard.addProductsToOrder(req.body);
        return res.json(result);
    } catch (e) {
        throw new Error(`Could not add this product . Error: ${e}`);
    }
};
const showAllProductsInOrder = async (req: Request, res: Response) => {
    try {
        const result = await Dashboard.getOrderProduct(req.params.id);
        return res.json(result);
    } catch (e) {
        throw new Error(
            `Could not get all products in this order. Error: ${e}`
        );
    }
};

const serviceHandler = (app: express.Application) => {
    app.post('/orders/products', addProductToOrder);
    app.get('/orders/:id/products', auth_token, showAllProductsInOrder);
};
export default serviceHandler;
