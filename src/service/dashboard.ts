import Client from '../database';
export type Product_Order = {
    id?: number;
    product_id: string;
    order_id: string;
    quantity: string;
};
export class DashboardQueries {
    async addProductsToOrder(po: Product_Order) {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING * ';
            const result = await conn.query(sql, [
                po.quantity,
                po.order_id,
                po.product_id,
            ]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not add product to order Error: ${e}`);
        }
    }
    async getOrderProduct(id: string) {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT products.id,products.name,products.price,order_products.quantity FROM Products INNER JOIN order_products ON products.id=order_products.product_id WHERE order_products.order_id=$1  ';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not get Order Product Error: ${e}`);
        }
    }
}
