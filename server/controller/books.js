import express from 'express'
import db from '../database/connect.js'
import { adminAuth } from '../middleware/auth.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
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
        res.status(500).send('Įvyko klaida')
    }
})



Router.post('/new', adminAuth, async (req, res) => {
    try {
        await db.Books.create(req.body)
        res.send('Book added successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error cant save book')
    }
})

Router.put('/edit/:id', adminAuth, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        await book.update(req.body)
        res.send('Book updated successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error: cant save data')
    }
})

Router.delete('/delete/:id', adminAuth, async (req, res) => {
    try {
        const book = await db.Books.findByPk(req.params.id)
        await book.destroy()
        res.send('Book deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Error')
    }
})

export default Router