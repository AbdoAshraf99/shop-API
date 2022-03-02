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
const user_model_1 = require("../../models/user_model");
const storeUser = new user_model_1.UserStore();
const request = (0, supertest_1.default)(__1.default);
describe('test order end points', () => {
    it('GET /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/orders').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g');
        expect(res.status).toBe(200);
    }));
    it('GET /orders/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/orders/1').set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g');
        expect(res.status).toBe(200);
    }));
    it('POST /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const u = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        const result = yield storeUser.create(u);
        const res = yield request
            .post('/orders')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g')
            .send({
            productQuantity: "1",
            status: "complete",
            user_id: "1",
        });
        expect(res.status).toBe(200);
    }));
    it('DELETE /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete('/orders/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g');
        expect(res.status).toBe(200);
    }));
});
