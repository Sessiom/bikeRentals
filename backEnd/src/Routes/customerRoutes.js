import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/myBikes', (req, res) => {
    const getBikes = db.prepare(`SELECT * FROM rentals WHERE customer_id = ?`)
    const bikes = getBikes.all(req.customerId)
    res.json({bikes})
})

// For when a customer rents a bike (Set bike to unavailable and add bike to rentals)
router.update('/:bike_id', (req, res) => {
    const { bike_id } = req.params

    try {
        // update bike to be unavailable
        const updateBike = db.prepare(`UPDATE bikes SET available = false WHERE id = ?`)
        updateBike.run(bike_id)
  
        // add bike to rentals
        const addRental = db.prepare(`INSERT INTO rentals ( customer_id, bike_id) VALUES (?, ?)`)
        addRental.run(req.customerId, bike_id)

        res.status(200).json({ message: 'Bike rented successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something when wrong, the bike could not be rented'})
    }

})

export default router