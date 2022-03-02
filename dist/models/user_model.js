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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class UserStore {
    auth(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE username=($1)';
                const result = yield conn.query(sql, [u.username]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(u.password + process.env.BCRYPT_PASSWORD, user.password)) {
                        const token = jsonwebtoken_1.default.sign(user, process.env.SECRET_TOKEN);
                        return { status: 'successful', user: user, token: token };
                    }
                    return { status: 'failed', message: 'Wrong email or password' };
                }
                return null;
            }
            catch (e) {
                return { status: 'failed', message: e };
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (e) {
                throw new Error(`Could not get users. Error: ${e}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from users where id=$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not get user. Error: ${e}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const hash = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const sql = 'INSERT INTO users (firstName,lastName,username,password) VALUES ($1,$2,$3,$4) RETURNING *';
                const result = yield conn.query(sql, [
                    u.firstname,
                    u.lastname,
                    u.username,
                    hash,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not create user. Error: ${e}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'delete from users where id=$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (e) {
                throw new Error(`Could not delete user. Error: ${e}`);
            }
        });
    }
}
exports.UserStore = UserStore;
