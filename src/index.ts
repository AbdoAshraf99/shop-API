import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orderHandler from './handlers/order_handler';
import userHandler from './handlers/user_handler';
import productHandler from './handlers/product_handler';
import serviceHandler from './handlers/service_handler';
const app: express.Application = express();
app.use(bodyParser.json());
app.use(cors());

app.get('', (req: Request, res: Response) => {
    return res.send('Hi');
});
userHandler(app);
orderHandler(app);
productHandler(app);
serviceHandler(app);
app.listen(3000, () => {
    console.log('start listenning on port 3000!!');
});

export default app;
