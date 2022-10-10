"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
//const { Post } = require('../models/postModel')
const router = (0, express_1.Router)();
router.route('/').get(authMiddleware_1.protect, postController_1.getAllPosts).post(authMiddleware_1.protect, postController_1.createPost);
router.route('/:id').get(postController_1.getPost).patch(authMiddleware_1.protect, postController_1.updatePost).delete(authMiddleware_1.protect, postController_1.deletePost);
exports.postRouter = router;
