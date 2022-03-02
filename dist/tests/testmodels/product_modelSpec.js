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
const products_model_1 = require("../../models/products_model");
const storeProduct = new products_model_1.ProductStore();
describe('Test product model', () => {
    it('index method is defined', () => {
        expect(storeProduct.index).toBeDefined();
    });
    it('show method is defined', () => {
        expect(storeProduct.show).toBeDefined();
    });
    it('create method is defined', () => {
        expect(storeProduct.create).toBeDefined();
    });
    it('delete method is defined', () => {
        expect(storeProduct.delete).toBeDefined();
    });
    it('create method should create new product', () => __awaiter(void 0, void 0, void 0, function* () {
        const p = {
            name: 'rice',
            price: '10',
            category: 'cat1',
        };
        const result = yield storeProduct.create(p);
        expect(result).toEqual({
            id: 2,
            name: 'rice',
            price: 10,
            category: 'cat1',
        });
    }));
    it('index method return all products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.index();
        expect(result).toEqual([
            {
                id: 2,
                name: 'rice',
                price: 10,
                category: 'cat1',
            },
        ]);
    }));
    it('show method return one product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield storeProduct.show('2');
        expect(result).toEqual({
            id: 2,
            name: 'rice',
            price: 10,
            category: 'cat1',
        });
    }));
    it('delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        yield storeProduct.delete('2');
        const result = yield storeProduct.index();
        expect(result).toEqual([]);
    }));
});
