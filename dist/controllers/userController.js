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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const hash = yield (0, bcrypt_1.hash)(password, saltRounds);
            const user = yield userModel_1.User.create({
                username,
                password: hash,
            });
            req.session.user = user;
            res.status(201).json({
                status: 'success',
                data: {
                    user,
                },
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                status: 'error',
            });
        }
    });
}
exports.signUp = signUp;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield userModel_1.User.findOne({ username });
            if (!user)
                throw 'User not found';
            const valid = yield (0, bcrypt_1.compare)(password, user.password);
            if (valid) {
                req.session.user = user;
                res.status(200).json({
                    status: 'success',
                    auth: true,
                });
            }
            else {
                res.status(200).json({
                    status: 'success',
                    auth: false,
                });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).json({
                status: 'error',
                error: e,
            });
        }
    });
}
exports.login = login;
const logout = (req, res, next) => {
    req.session.user = null;
    req.user = null;
    res.status(200).json({
        status: 'success',
        auth: false,
    });
};
exports.logout = logout;
