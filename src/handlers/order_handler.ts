import express, { Request, Response } from 'express';
import auth_token from '../middlewares/auth_token';
import { OrderStore, Order } from '../models/orders_model';
const orderStore = new OrderStore();
const index = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.index();
        res.json(result);
    } catch (e) {
        throw new Error(`Could not get orders. Error: ${e}`);
    }
};
const create = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.create(req.body);
        res.json(result);
    } catch (e) {
        throw new Error(`Could not create order. Error: ${e}`);
    }
};
const show = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.show(req.params.id);
        res.json(result);
    } catch (e) {
        throw new Error(`Could not get order. Error: ${e}`);
    }
};
const del = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.delete(req.params.id);
        res.json(result);
    } catch (e) {
        throw new Error(`Could not delete order. Error: ${e}`);
    }
};
const getUserOrders = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.getUserOrders(req.params.id);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};
const getCompletedOrdersByUser = async (req: Request, res: Response) => {
    try {
        const result = await orderStore.completedOrderByUser(req.params.id);
        return res.json(result);
    } catch (e) {
        return res.json(e);
    }
};

const orderHandler = (app: express.Application) => {
    app.get('/orders', auth_token, index);
    app.get('/orders/:id', auth_token, show);
    app.post('/orders', auth_token, create);
    app.delete('/orders/:id', auth_token, del);
    app.get('/users/:id/orders', auth_token, getUserOrders);
    app.get('/users/:id/orders/complete', auth_token, getCompletedOrdersByUser);
};
export default orderHandler;
