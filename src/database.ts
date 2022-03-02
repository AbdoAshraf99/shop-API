import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;
console.log(ENV);
let Client: Pool;
if (ENV == 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
    });
} else {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
    });
}
export default Client;
