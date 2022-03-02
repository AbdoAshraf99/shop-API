import { UserStore, User } from '../../models/user_model';
const storeUser = new UserStore();

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
    it('create method should create new user', async () => {
        const u: User = {
            firstname: 'Abdo',
            lastname: 'Ashraf',
            username: 'aa123',
            password: '0',
        };
        const result = await storeUser.create(u);
        expect(result.firstname).toEqual('Abdo');
    });
    it('index method return all users', async () => {
        const result = await storeUser.index();
        expect(result[0].firstname).toEqual('Abdo');
    });
    it('show method return one user', async () => {
        const result = await storeUser.show('3');
        expect(result.firstname).toEqual('Abdo');
    });
    it('delete method', async () => {
        await storeUser.delete('1');
        await storeUser.delete('2');
        await storeUser.delete('3');
        const result = await storeUser.index();
        expect(result).toEqual([]);
    });
});
