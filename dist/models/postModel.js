"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Post must have a title"]
    },
    body: {
        type: String,
        required: [true, 'Post must have a body']
    }
});
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.Post = Post;
