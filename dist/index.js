"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_handler_1 = __importDefault(require("./handlers/order_handler"));
const user_handler_1 = __importDefault(require("./handlers/user_handler"));
const product_handler_1 = __importDefault(require("./handlers/product_handler"));
const service_handler_1 = __importDefault(require("./handlers/service_handler"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('', (req, res) => {
    return res.send('Hi');
});
(0, user_handler_1.default)(app);
(0, order_handler_1.default)(app);
(0, product_handler_1.default)(app);
(0, service_handler_1.default)(app);
app.listen(3000, () => {
    console.log('start listenning on port 3000!!');
});
exports.default = app;
