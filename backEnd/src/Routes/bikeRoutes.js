import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/allBikes', (req, res) => {
    const getBikes = db.prepare(`SELECT * FROM bikes WHERE available = true`)
    const bikes = getBikes.all()
    res.json({bikes})
})

export default router