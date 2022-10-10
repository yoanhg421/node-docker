"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'User must have a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
    },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
