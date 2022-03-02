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
const user_model_1 = require("../models/user_model");
const userStore = new user_model_1.UserStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.index();
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield userStore.show(id);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerBody = req.body;
        const result = yield userStore.create(customerBody);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const del = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield userStore.delete(id);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userStore.auth(req.body);
        return res.json(result);
    }
    catch (e) {
        return res.json(e);
    }
});
const userHandler = (app) => {
    app.get('/users', auth_token_1.default, index);
    app.get('/users/:id', auth_token_1.default, show);
    app.post('/users', create);
    app.delete('/users/:id', del);
    app.post('/users/auth', auth);
};
exports.default = userHandler;
