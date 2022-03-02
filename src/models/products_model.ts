import { type } from 'os';
import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: String;
    category: string;
};

export class ProductStore {
    async index(): Promise<Product[] | object> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (e) {
            return { status: 'failed', msg: e };
        }
    }
    async show(id: string): Promise<Product | object> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (e) {
            return { status: 'failed', msg: e };
        }
    }
    async create(p: Product): Promise<Product | object> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO products(name,price,category) values ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();

            return result.rows[0];
        } catch (e) {
            return { status: 'failed', msg: e };
        }
    }

    async delete(id: string): Promise<Product | object> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE From products WHERE id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return {
                status: 'successful',
                msg: 'product deleted successfully',
            };
        } catch (e) {
            return { status: 'failed', msg: e };
        }
    }
    async getProductBycat(cat: string): Promise<Product | object> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=$1';
            const result = await conn.query(sql, [String(cat)]);
            conn.release();

            return {
                status: 'successful',
                msg: result.rows,
            };
        } catch (e) {
            return { status: 'failed', msg: e };
        }
    }
}
