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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const request = (0, supertest_1.default)(__1.default);
describe('test products end points', () => {
    it('GET /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/products');
        expect(res.status).toBe(200);
    }));
    it('GET /products/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/products/1');
        expect(res.status).toBe(200);
    }));
    it('POST /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/products')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g')
            .send({
            name: 'rice',
            price: '10',
            category: 'cat1',
        });
        expect(res.status).toBe(200);
    }));
    it('DELETE /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete('/products/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g');
        expect(res.status).toBe(200);
    }));
});
