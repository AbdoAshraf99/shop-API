import Client from '../database';
import { Product, ProductStore } from '../models/products_model';
const productStore = new ProductStore();
export type Order = {
    id?: number;
    productQuantity?: string;
    status: string;
    created_date?: string;
    user_id: String;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not get orders. Error: ${e}`);
        }
    }
    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders where id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not get order. Error: ${e}`);
        }
    }
    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const today = new Date();
            const date =
                today.getFullYear() +
                '-' +
                (today.getMonth() + 1) +
                '-' +
                today.getDate();
            const sql =
                'INSERT INTO orders (productQuantity,status,user_id,created_date) VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [
                o.productQuantity,
                o.status,
                o.user_id,
                date,
            ]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not create order. Error: ${e}`);
        }
    }
    async delete(id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not delete order. Error: ${e}`);
        }
    }
    async getUserOrders(id: string) {
        try {
            const conn = await Client.connect();
            const sql =
                'Select id,created_date,status,user_id from orders where user_id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows;
        } catch (e) {
            throw new Error(`Could not get users orders. Error: ${e}`);
        }
    }
    async completedOrderByUser(userId: string) {
        try {
            const conn = await Client.connect();
            const sql =
                'Select id,created_date,status,user_id from orders where user_id=$1 AND status=$2';
            const result = await conn.query(sql, [userId, 'complete']);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(
                `Could not get users completed orders. Error: ${e}`
            );
        }
    }
}
