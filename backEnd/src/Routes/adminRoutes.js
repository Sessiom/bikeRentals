import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/addBike', (req, res) => {
    const { type, image, name, size } = req.body
    const insertBike = db.prepare(`INSERT INTO bikes (type, image, name, size) VALUES(?, ?, ?, ?)`)
    const result = insertBike.run(type, image, name, size)
    res.json({ message: "New bike added", id: result.lastInsertRowid, type, image, name, size})
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

export default router
/* SELECT 
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
        customers.customer_id;*/