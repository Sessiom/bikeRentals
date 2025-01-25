import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/myBikes', (req, res) => {
    const getBikes = db.prepare(`SELECT * FROM rentals WHERE customer_id = ?`)
    const bikes = getBikes.all(req.customerId)
    res.json({bikes})
})

export default router