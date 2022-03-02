import { OrderStore, Order } from '../../models/orders_model';
import { User, UserStore } from '../../models/user_model';
const storeUser = new UserStore();

const store = new OrderStore();
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
    it('create method', async () => {
        const u: User = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        await storeUser.create(u);
        const today = new Date();
        const date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
        const o: Order = {
            status: 'complete',
            user_id: '2',
            created_date: date,
        };
        const result = await store.create(o);
        expect(result.user_id).toEqual('2');
    });
    it('index method', async () => {
        const result = await store.index();
        expect(result[1].status).toEqual('complete');
    });
    it('show method ', async () => {
        const today = new Date();
        const date =
            today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
        const result = await store.show('3');
        expect(result.status).toEqual('complete');
    });
    it('delete method', async () => {
        await store.delete('2');
        await store.delete('3');
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
