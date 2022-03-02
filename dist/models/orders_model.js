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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
const products_model_1 = require("../models/products_model");
const productStore = new products_model_1.ProductStore();
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get orders. Error: ${e}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders where id=$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not get order. Error: ${e}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const today = new Date();
                const date = today.getFullYear() +
                    '-' +
                    (today.getMonth() + 1) +
                    '-' +
                    today.getDate();
                const sql = 'INSERT INTO orders (productQuantity,status,user_id,created_date) VALUES ($1,$2,$3,$4) RETURNING *';
                const result = yield conn.query(sql, [
                    o.productQuantity,
                    o.status,
                    o.user_id,
                    date,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not create order. Error: ${e}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not delete order. Error: ${e}`);
            }
        });
    }
    getUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'Select id,created_date,status,user_id from orders where user_id=$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users orders. Error: ${e}`);
            }
        });
    }
    completedOrderByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'Select id,created_date,status,user_id from orders where user_id=$1 AND status=$2';
                const result = yield conn.query(sql, [userId, 'complete']);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users completed orders. Error: ${e}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
