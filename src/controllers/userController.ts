import { User } from '../models/userModel'
import { hash as _hash, compare } from 'bcrypt'
const saltRounds = 10

export async function signUp(req: any, res: any) {
    try {
        const { username, password } = req.body

        const hash = await _hash(password, saltRounds)

        const user = await User.create({
            username,
            password: hash,
        })
        req.session.user = user
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 'error',
        })
    }
}

export async function login(req: any, res: any) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) throw 'User not found'

        const valid = await compare(password, user.password)

        if (valid) {
            req.session.user = user
            res.status(200).json({
                status: 'success',
                auth: true,
            })
        } else {
            res.status(200).json({
                status: 'success',
                auth: false,
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({
            status: 'error',
            error: e,
        })
    }
}

export const logout = (req: any, res: any, next: any) => {
    req.session.user = null
    req.user = null
    res.status(200).json({
        status: 'success',
        auth: false,
    })
}
