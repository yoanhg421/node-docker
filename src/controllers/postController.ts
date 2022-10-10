import { Post } from '../models/postModel'

export async function getAllPosts(req: any, res: any, next: any) {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: 'error',
        })
        console.log(e)
    }
}

export async function getPost(req: any, res: any, next: any) {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: 'error',
        })
        console.log(e)
    }
}

export async function createPost(req: any, res: any, next: any) {
    try {
        const { title, body } = req.body
        const post = await Post.create({ title, body })
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: 'error',
        })
        console.log(e)
    }
}

export async function updatePost(req: any, res: any, next: any) {
    try {
        const { title, body } = req.body
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, body },
            {
                runValidators: true,
                new: true,
            }
        )
        res.status(200).json({
            status: 'success',
            data: {
                post,
            },
        })
    } catch (e) {
        res.status(400).json({
            status: 'error',
        })
        console.log(e)
    }
}

export async function deletePost(req: any, res: any, next: any) {
    try {
        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
        })
    } catch (e) {
        res.status(400).json({
            status: 'error',
        })
        console.log(e)
    }
}
