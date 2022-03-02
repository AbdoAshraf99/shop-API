import { Request, Response } from 'express';
import supertest from 'supertest';
import app from '../..';
import { UserStore, User } from '../../models/user_model';
const storeUser = new UserStore();
const request = supertest(app);
describe('test order end points', () => {
    it('GET /orders', async () => {
        const res = await request
            .get('/orders')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            );
        expect(res.status).toBe(200);
    });
    it('GET /orders/:id', async () => {
        const res = await request
            .get('/orders/1')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            );
        expect(res.status).toBe(200);
    });
    it('POST /orders', async () => {
        const u: User = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        const result = await storeUser.create(u);
        const res = await request
            .post('/orders')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            )
            .send({
                productQuantity: '1',
                status: 'complete',
                user_id: '1',
            });
        expect(res.status).toBe(200);
    });
    it('DELETE /orders', async () => {
        const res = await request
            .delete('/orders/1')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            );
        expect(res.status).toBe(200);
    });
});
