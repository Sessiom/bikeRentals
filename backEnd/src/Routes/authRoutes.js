import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import express from 'express'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) =>{

    // Destructure customer information
    const { email, password } = req.body

    // Hash password before sending it to database
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
        const insertCustomer = db.prepare(`INSERT INTO customers (email, password) VALUES (?, ?)`)
        const customer = insertCustomer.run(email, hashedPassword)
        const customerId = customer.lastInsertRowid
        const token = jwt.sign({ id: customerId }, process.env.JWT_SECRET, { expiresIn: '24h'})

        // After creating a new customer send back a JWT
        res.json({ token, customerId, email })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/login', (req, res) =>{

    // Destructure customer information
    const { email, password } = req.body

    try {
        const getCustomer = db.prepare(`SELECT * from customers WHERE email = ?`)
        const customer = getCustomer.get(email)

        // If customer does not exist
        if(!customer){return res.status(404).send({ message: "User not found" })}
        
        // If customer does exist, validate password
        const passwordIsValid = bcrypt.compareSync(password, customer.password)

        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }

         // After authenticating send back a JWT
         const customerId = customer.customer_id
         const token = jwt.sign({ id: customerId }, process.env.JWT_SECRET, { expiresIn: '24h' })
         res.json({ token, customerId, email })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

})

export default router