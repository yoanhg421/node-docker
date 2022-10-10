"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const postRoutes_1 = require("./routes/postRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
let RedisStore = require('connect-redis')(express_session_1.default);
let redisClient = (0, redis_1.createClient)({
    legacyMode: true,
    url: `redis://${config_1.default.REDIS_URL}:${config_1.default.REDIS_PORT}`,
});
redisClient.on('error', (error) => console.log(error));
redisClient
    .connect()
    .then(() => console.log('connected to redis'))
    .catch(console.error);
const connectionString = `mongodb://${config_1.default.MONGO_USER}:${config_1.default.MONGO_PASSWORD}@${config_1.default.MONGO_IP}:${config_1.default.MONGO_PORT}`;
const connectWithRetry = () => {
    mongoose_1.default
        .connect(connectionString, {
        dbName: 'app-data',
    })
        .then(() => {
        console.log('success');
    })
        .catch((err) => {
        console.log(err);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
app.use((0, express_session_1.default)({
    store: new RedisStore({ client: redisClient }),
    secret: config_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000,
    },
}));
const port = process.env.PORT || 3000;
app.get('/api/v1', (req, res) => {
    res.send('<h2>Hi there!!!!!!!</h2>');
});
app.use('/api/v1/posts', postRoutes_1.postRouter);
app.use('/api/v1/users', userRoutes_1.userRouter);
app.listen(port, () => console.log(`Listening on port ${port}`));
