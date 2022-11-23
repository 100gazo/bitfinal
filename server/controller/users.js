import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'
import { registerValidator, loginValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()


router.post('/register', registerValidator, async (req, res) => {
    try {
        const userExists = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (userExists) {
            res.status(401).send('This email already used')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await db.Users.create(req.body)
        res.send('Vartotojas sėkmingai sukurtas')

    } catch (error) {

        console.log(error)
        res.status(418).send('Server error')
    }
})

router.delete('api/users/delete/:id', adminAuth, async (req, res) => {
    try {
        const user = await db.Users.findByPk(req.params.id)
        await user.destroy()
        res.send('User deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
})

router.post('/login', loginValidator, async (req, res) => {
    try {
        const user = await db.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user)
            return res.status(401).send('User not found')

        if (await bcrypt.compare(req.body.password, user.password)) {
            req.session.loggedin = true
            req.session.user = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
            res.json({ message: 'Login success', user: req.session.user })
        } else {
            res.status(401).send('Cant connect database')
        }
    } catch (error) {
        console.log(error)
        res.status(418).send('Server Error')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.send('Logout success')
})

router.get('/check-auth', auth, async (req, res) => {
    res.json(req.session.user)
})
router.get('/', async (req, res) => {
    const options = {}

    if (req.query.sort === '1') {
        options.order = [
            ['name', 'ASC']
        ]
    }

    if (req.query.sort === '2') {
        options.order = [
            ['name', 'DESC']
        ]
    }

    try {
        const books = await db.Books.findAll(options)
        res.json(books)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
})

export default router