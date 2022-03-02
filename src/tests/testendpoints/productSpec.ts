import { Request, Response } from 'express';
import supertest from 'supertest';
import app from '../..';
const request = supertest(app);
describe('test products end points', () => {
    it('GET /products', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });
    it('GET /products/:id', async () => {
        const res = await request.get('/products/1');
        expect(res.status).toBe(200);
    });
    it('POST /products', async () => {
        const res = await request
            .post('/products')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            )
            .send({
                name: 'rice',
                price: '10',
                category: 'cat1',
            });
        expect(res.status).toBe(200);
    });
    it('DELETE /products', async () => {
        const res = await request
            .delete('/products/1')
            .set(
                'Authorization',
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoiYXNocmFmIiwidXNlcm5hbWUiOiJhYmRvMTIzIiwicGFzc3dvcmQiOiIkMmIkMTAkSWV5UjhELzdXa2ZmQWY4WG83V0t6T2xDR2tnWDg2cGtqWTlNQlJWaEtrS0ZSbUYxejI3VUMiLCJpYXQiOjE2NDYyMTc0ODF9.jWFffDumvNhTts-XoHli8FCPkZE-ibzfAZl3eJO6A8g'
            );
        expect(res.status).toBe(200);
    });
});
