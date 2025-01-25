import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/addBike', (req, res) => {
    const { type, image, name, size } = req.body
    const insertBike = db.prepare(`INSERT INTO bikes (type, image, name, size) VALUES(?, ?, ?, ?)`)
    const result = insertBike.run(type, image, name, size)
    res.json({ message: "New bike added", id: result.lastInsertRowid, type, image, name, size})
})

export default router