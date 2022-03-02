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
const dashboard_1 = require("../service/dashboard");
const auth_token_1 = __importDefault(require("../middlewares/auth_token"));
const Dashboard = new dashboard_1.DashboardQueries();
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Dashboard.addProductsToOrder(req.body);
        return res.json(result);
    }
    catch (e) {
        throw new Error(`Could not add this product . Error: ${e}`);
    }
});
const showAllProductsInOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Dashboard.getOrderProduct(req.params.id);
        return res.json(result);
    }
    catch (e) {
        throw new Error(`Could not get all products in this order. Error: ${e}`);
    }
});
const serviceHandler = (app) => {
    app.post('/orders/products', addProductToOrder);
    app.get('/orders/:id/products', auth_token_1.default, showAllProductsInOrder);
};
exports.default = serviceHandler;
