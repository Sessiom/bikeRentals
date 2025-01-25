import jwt from 'jsonwebtoken'

function authAdmin() {
        const token = req.headers['authorization']
    
        if (!token) { return res.status(401).json({ message: "No token provided" }) }
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { return res.status(401).json({ message: "Invalid token" }) }
            if (!decoded.admin) { return res.status(404).json({ message: "Forbidden" }) }
    
            req.customerId = decoded.id
            next()
        })
}

export default authAdmin