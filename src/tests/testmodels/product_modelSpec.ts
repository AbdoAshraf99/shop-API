import { ProductStore, Product } from '../../models/products_model';

const storeProduct = new ProductStore();

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
    it('create method should create new product', async () => {
        const p: Product = {
            name: 'rice',
            price: '10',
            category: 'cat1',
        };
        const result = await storeProduct.create(p);
        expect(result).toEqual({
            id: 2,
            name: 'rice',
            price: 10,
            category: 'cat1',
        });
    });
    it('index method return all products', async () => {
        const result = await storeProduct.index();
        expect(result).toEqual([
            {
                id: 2,
                name: 'rice',
                price: 10,
                category: 'cat1',
            },
        ]);
    });
    it('show method return one product', async () => {
        const result = await storeProduct.show('2');
        expect(result).toEqual({
            id: 2,
            name: 'rice',
            price: 10,
            category: 'cat1',
        });
    });
    it('delete method', async () => {
        await storeProduct.delete('2');
        const result = await storeProduct.index();
        expect(result).toEqual([]);
    });
});
