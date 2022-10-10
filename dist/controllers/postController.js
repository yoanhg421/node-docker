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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getAllPosts = void 0;
const postModel_1 = require("../models/postModel");
function getAllPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield postModel_1.Post.find();
            res.status(200).json({
                status: 'success',
                results: posts.length,
                data: {
                    posts,
                },
            });
        }
        catch (e) {
            res.status(400).json({
                status: 'error',
            });
            console.log(e);
        }
    });
}
exports.getAllPosts = getAllPosts;
function getPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield postModel_1.Post.findById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: {
                    post,
                },
            });
        }
        catch (e) {
            res.status(400).json({
                status: 'error',
            });
            console.log(e);
        }
    });
}
exports.getPost = getPost;
function createPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, body } = req.body;
            const post = yield postModel_1.Post.create({ title, body });
            res.status(200).json({
                status: 'success',
                data: {
                    post,
                },
            });
        }
        catch (e) {
            res.status(400).json({
                status: 'error',
            });
            console.log(e);
        }
    });
}
exports.createPost = createPost;
function updatePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, body } = req.body;
            const post = yield postModel_1.Post.findByIdAndUpdate(req.params.id, { title, body }, {
                runValidators: true,
                new: true,
            });
            res.status(200).json({
                status: 'success',
                data: {
                    post,
                },
            });
        }
        catch (e) {
            res.status(400).json({
                status: 'error',
            });
            console.log(e);
        }
    });
}
exports.updatePost = updatePost;
function deletePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield postModel_1.Post.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: 'success',
            });
        }
        catch (e) {
            res.status(400).json({
                status: 'error',
            });
            console.log(e);
        }
    });
}
exports.deletePost = deletePost;
