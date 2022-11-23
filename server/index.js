import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { Users, Books } from './controller/index.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1)

app.use(session({
    secret: 'paslaptele',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 6000000
    }
}))

//Kontrolerių priskyrimas
app.use('/api/users/', Users)
app.use('/api/books/', Books)
// app.use('/api/services/', Services)
// app.use('/api/workers/', Workers)
// app.use('/api/orders/', Orders)
// app.use('/api/ratings/', Ratings)


app.listen(3000)