import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/myInfo', (req, res) => {
    const myInfo = db.prepare(`SELECT * FROM customers WHERE customer_id = ?`)
    const data = myInfo.get(req.customerId)
    res.json(data)
})

router.get('/myRentals', (req, res) => {
    const getRentalAndBikes = db.prepare(`SELECT * FROM rentals INNER JOIN bikes ON rentals.bike_id = bikes.bike_id WHERE rentals.customer_id = ?`)
    const rentalInfo = getRentalAndBikes.all(req.customerId)
    res.json({rentalInfo})
})

// For when a customer rents a bike (Set bike to unavailable and add bike to rentals)
router.put('/rent/:bike_id', (req, res) => {
    const { bike_id } = req.params

    try {
        // update bike to be unavailable
        const updateBike = db.prepare(`UPDATE bikes SET available = false WHERE bike_id = ?`)
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

// For when a customer returns a bike (Set bike to available and remove it from rentals)
router.delete('/return/:bike_id', (req, res) => {
    const { bike_id } = req.params

    try {
        // remove bike from rentals
        const addRental = db.prepare(`DELETE FROM rentals WHERE bike_id = ?`)
        addRental.run(bike_id)

        // update bike to be available
        const updateBike = db.prepare(`UPDATE bikes SET available = true WHERE bike_id = ?`)
        updateBike.run(bike_id)

        res.status(200).json({ message: 'Bike returned successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something when wrong, the bike could not be rented'})
    }

})

export default router