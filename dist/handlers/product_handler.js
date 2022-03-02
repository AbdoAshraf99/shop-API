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
const products_model_1 = require("../models/products_model");
const productStore = new products_model_1.ProductStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.index();
        return res.json(result);
    }
    catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.show(req.params.id);
        return res.json(result);
    }
    catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
});
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.create(req.body);
        return res.json(result);
    }
    catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.delete(req.params.id);
        return res.json(result);
    }
    catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
});
const getProductBycat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productStore.getProductBycat(req.params.cat);
        return res.json(result);
    }
    catch (e) {
        return res.json({ status: 'failed', msg: e });
    }
});
const productHandler = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', auth_token_1.default, addNewProduct);
    app.delete('/products/:id', auth_token_1.default, del);
    app.get('/products/category/:cat', auth_token_1.default, getProductBycat);
};
exports.default = productHandler;
