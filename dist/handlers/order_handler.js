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
const auth_token_1 = __importDefault(require("../middlewares/auth_token"));
const orders_model_1 = require("../models/orders_model");
const orderStore = new orders_model_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.index();
        res.json(result);
    }
    catch (e) {
        throw new Error(`Could not get orders. Error: ${e}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.create(req.body);
        res.json(result);
    }
    catch (e) {
        throw new Error(`Could not create order. Error: ${e}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.show(req.params.id);
        res.json(result);
    }
    catch (e) {
        throw new Error(`Could not get order. Error: ${e}`);
    }
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.delete(req.params.id);
        res.json(result);
    }
    catch (e) {
        throw new Error(`Could not delete order. Error: ${e}`);
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.getUserOrders(req.params.id);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const getCompletedOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderStore.completedOrderByUser(req.params.id);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const orderHandler = (app) => {
    app.get('/orders', auth_token_1.default, index);
    app.get('/orders/:id', auth_token_1.default, show);
    app.post('/orders', auth_token_1.default, create);
    app.delete('/orders/:id', auth_token_1.default, del);
    app.get('/users/:id/orders', auth_token_1.default, getUserOrders);
    app.get('/users/:id/orders/complete', auth_token_1.default, getCompletedOrdersByUser);
};
exports.default = orderHandler;
