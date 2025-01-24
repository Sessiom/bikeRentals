import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/addBike', (req, res) => {
    const { type, image, name, size } = req.body
    const insertBike = db.prepare(`INSERT INTO bikes (type, image, name, size) VALUES(?, ?, ?, ?)`)
    const result = insertBike.run(type, image, name, size)
    res.json({ message: "New bike added", id: result.lastInsertRowid, type, image, name, size})
})

router.get('/allBikes', (req, res) => {
    const getBikes = db.prepare(`SELECT * FROM bikes WHERE available = true`)
    const bikes = getBikes.all()
    res.json(bikes)
})

export default router