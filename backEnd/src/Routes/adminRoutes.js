import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/addBike', (req, res) => {
    try{
        const { type, image, name, size } = req.body
        const insertBike = db.prepare(`INSERT INTO bikes (type, image, name, size) VALUES(?, ?, ?, ?)`)
        const result = insertBike.run(type, image, name, size)
        res.json({ message: "New bike added", id: result.lastInsertRowid, type, image, name, size})
    } catch (err) {
        res.status(500).json({message: "Unable to add bike"})
    }
})

router.get('/allCustomers', (req, res) => {
    const getCustomers = db.prepare(`SELECT 
    customers.customer_id, 
    customers.email, 
    COUNT(rentals.confirmation_id) AS rental_count
    FROM 
        customers
    LEFT JOIN 
        rentals 
    ON 
        customers.customer_id = rentals.customer_id
    GROUP BY 
        customers.customer_id, customers.email
    ORDER BY
        customers.customer_id;
    `) 
    const data = getCustomers.all()
    
    res.json( data )
})

// For permanently deleting a bike
router.delete('/deleteBike/:bike_id', (req, res) => {
    const { bike_id } = req.params

    try {
        // remove bike from rentals
        const addRental = db.prepare(`DELETE FROM rentals WHERE bike_id = ?`)
        addRental.run(bike_id)

        // remove from bikes
        const updateBike = db.prepare(`DELETE FROM bikes WHERE bike_id = ?`)
        updateBike.run(bike_id)

        res.status(200).json({ message: 'Bike deleted successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something went wrong, the bike could not be deleted'})
    }
})

// For permanently deleting a customer
router.delete('/deleteCustomer/:customer_id', (req, res) => { 
    const { customer_id } = req.params


    try {
        // If customer has bikes rented out, customer must return all bikes before they can be deleted
        const findCustomer = db.prepare(`SELECT * FROM rentals WHERE customer_id = ?`)
        const rentedBikes = findCustomer.all(customer_id)

        if (rentedBikes.length > 0) {
            // If there are rentals, prevent deletion
            return res.status(400).json({ error: 'Customer must return all bikes before deletion' });
        }

        const deleteCustomer = db.prepare(`DELETE FROM customers WHERE customer_id = ?`)
        deleteCustomer.run(customer_id)

        res.status(200).json({ message: 'Customer deleted successfully'})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Something went wrong, the customer could not be deleted'})
    }
})

router.get('/', (req, res) =>{
    res.json({ message: "Access Granted"})
})

export default router
