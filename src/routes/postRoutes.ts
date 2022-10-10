import { Router } from 'express'
import {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
} from '../controllers/postController'

import { protect } from '../middleware/authMiddleware'
//const { Post } = require('../models/postModel')

const router = Router()

router.route('/').get(protect, getAllPosts).post(protect, createPost)

router.route('/:id').get(getPost).patch(protect, updatePost).delete(protect, deletePost)

export const postRouter = router
