"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    addProductsToOrder(po) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity,order_id,product_id) VALUES ($1,$2,$3) RETURNING * ';
                const result = yield conn.query(sql, [
                    po.quantity,
                    po.order_id,
                    po.product_id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not add product to order Error: ${e}`);
            }
        });
    }
    getOrderProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT products.id,products.name,products.price,order_products.quantity FROM Products INNER JOIN order_products ON products.id=order_products.product_id WHERE order_products.order_id=$1  ';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get Order Product Error: ${e}`);
            }
        });
    }
}
exports.DashboardQueries = DashboardQueries;
