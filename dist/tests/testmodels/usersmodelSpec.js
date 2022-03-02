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
const user_model_1 = require("../../models/user_model");
const storeUser = new user_model_1.UserStore();
describe('Test user model', () => {
    it('index method is defined', () => {
        expect(storeUser.index).toBeDefined();
    });
    it('show method is defined', () => {
        expect(storeUser.show).toBeDefined();
    });
    it('create method is defined', () => {
        expect(storeUser.create).toBeDefined();
    });
    it('delete method is defined', () => {
        expect(storeUser.delete).toBeDefined();
    });
    it('auth method is defined', () => {
        expect(storeUser.auth).toBeDefined();
    });
    it('create method should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        const result = yield storeUser.create(u);
        expect(result.firstname).toEqual('Abdo');
    }));
    it('index method return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.index();
        expect(result[0].firstname).toEqual('Abdo');
    }));
    it('show method return one user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeUser.show('3');
        expect(result.firstname).toEqual('Abdo');
    }));
    it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        yield storeUser.delete('1');
        yield storeUser.delete('2');
        yield storeUser.delete('3');
        const result = yield storeUser.index();
        expect(result).toEqual([]);
    }));
});
