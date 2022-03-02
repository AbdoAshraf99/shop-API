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
Object.defineProperty(exports, "__esModule", { value: true });
const orders_model_1 = require("../../models/orders_model");
const user_model_1 = require("../../models/user_model");
const storeUser = new user_model_1.UserStore();
const store = new orders_model_1.OrderStore();
describe('Test orders model', () => {
    it('index method is defined', () => {
        expect(store.index).toBeDefined();
    });
    it('show method is defined', () => {
        expect(store.show).toBeDefined();
    });
    it('create method is defined', () => {
        expect(store.create).toBeDefined();
    });
    it('delete method is defined', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        yield storeUser.create(u);
        const today = new Date();
        const date = today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
        const o = {
            status: 'complete',
            user_id: '2',
            created_date: date,
        };
        const result = yield store.create(o);
        expect(result.user_id).toEqual('2');
    }));
    it('index method', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result[1].status).toEqual('complete');
    }));
    it('show method ', () => __awaiter(void 0, void 0, void 0, function* () {
        const today = new Date();
        const date = today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
        const result = yield store.show('3');
        expect(result.status).toEqual('complete');
    }));
    it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        yield store.delete('2');
        yield store.delete('3');
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
