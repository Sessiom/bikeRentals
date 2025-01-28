import jwt from 'jsonwebtoken'
import db from '../db.js'

function authAdmin(req, res, next) {
    const token = req.headers['authorization']
    
    // Check for valid token
    if (!token) { return res.status(401).json({ message: "No token provided" }) }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }
    
        req.customerId = decoded.id
    })
    // Check that user is an admin
    try {
        const admin = db.prepare(`SELECT is_admin FROM customers WHERE customer_id = ?`)
        const result = admin.get(req.customerId)
        if(result.is_admin == 1){
            next()
        } else {
            res.status(401).json({ message: "Access Denied" })
        }
    } catch (err) {
        res.status(401).json({ message: "Access Denied" })
        console.log(err)
    }
}

export default authAdmin