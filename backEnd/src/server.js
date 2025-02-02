import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import bikeRoutes from './Routes/bikeRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import customerRoutes from './Routes/customerRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import authCustomer from './Middleware/authCustomer.js'
import authAdmin from './Middleware/authAdmin.js'

const app = express()
const PORT = process.env.PORT || 3000


// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

// Get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.static(path.join(__dirname, '../../frontEnd/dist')))
app.use(express.json())


// Render client for any path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/dist/index.html'))
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use('/api/customer', authCustomer, customerRoutes);
app.use('/api/admin', authAdmin, adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})