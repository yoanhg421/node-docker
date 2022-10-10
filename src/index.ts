require('dotenv').config()

import session from 'express-session'
import { createClient } from 'redis'
import express from 'express'
import mongoose from 'mongoose'
import { postRouter } from './routes/postRoutes'
import { userRouter } from './routes/userRoutes'
import config from './config'
import cors from 'cors'
let RedisStore = require('connect-redis')(session)

let redisClient = createClient({
    legacyMode: true,
    url: `redis://${config.REDIS_URL}:${config.REDIS_PORT}`,
})

redisClient.on('error', (error: String) => console.log(error))

redisClient
    .connect()
    .then(() => console.log('connected to redis'))
    .catch(console.error)

const connectionString = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}`

const connectWithRetry = () => {
    mongoose
        .connect(connectionString, {
            dbName: 'app-data',
        })
        .then(() => {
            console.log('success')
        })
        .catch((err: String) => {
            console.log(err)
            setTimeout(connectWithRetry, 5000)
        })
}

connectWithRetry()

const app = express()

app.use(express.json())
app.use(cors({}))

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30000,
        },
    })
)

const port = process.env.PORT || 3000

app.get('/api/v1', (req: any, res: any) => {
    res.send('<h2>Hi there!!!!!!!</h2>')
})

app.use('/api/v1/posts', postRouter)

app.use('/api/v1/users', userRouter)

app.listen(port, () => console.log(`Listening on port ${port}`))
