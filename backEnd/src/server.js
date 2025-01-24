import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import bikeRoutes from './Routes/bikeRoutes.js'
import authRoutes from './Routes/authRoutes.js'
import customerRoutes from './Routes/customerRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import authCustomer from './Middleware/authCustomer.js'
import authAdmin from './Middleware/authAdmin.js'

const app = express()
const PORT = 3000

// Allow only the frontend (Vite development server) to make api requests
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
}));

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

// Get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.static(path.join(__dirname, '../../frontEnd/dist')))
app.use(express.json())


//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontEnd/dist/index.html'))
})

app.use('/auth', authRoutes);
app.use('/bikes', bikeRoutes);
app.use('/customer', authCustomer, customerRoutes);
app.use('/admin', authAdmin, adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})