import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
};

export class UserStore {
    async auth(u: User) {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [u.username]);
            conn.release();

            if (result.rows.length) {
                const user = result.rows[0];
                if (
                    bcrypt.compareSync(
                        u.password + process.env.BCRYPT_PASSWORD,
                        user.password
                    )
                ) {
                    const token = jwt.sign(
                        user,
                        process.env.SECRET_TOKEN as string
                    );
                    return { status: 'successful', user: user, token: token };
                }
                return { status: 'failed', message: 'Wrong email or password' };
            }
            return null;
        } catch (e) {
            return { status: 'failed', message: e };
        }
    }

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Could not get users. Error: ${e}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from users where id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not get user. Error: ${e}`);
        }
    }
    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const hash = bcrypt.hashSync(
                u.password + process.env.BCRYPT_PASSWORD,
                parseInt(process.env.SALT_ROUNDS as string)
            );
            const sql =
                'INSERT INTO users (firstName,lastName,username,password) VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not create user. Error: ${e}`);
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'delete from users where id=$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (e) {
            throw new Error(`Could not delete user. Error: ${e}`);
        }
    }
}
