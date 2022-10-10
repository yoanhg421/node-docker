import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'User must have a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
    },
})

const User = model('User', userSchema)

export { User }
