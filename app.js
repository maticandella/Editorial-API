import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { sequelize } from './config/database.js';
import cookieParser from 'cookie-parser';
import { jsonWebTokenVerify } from './middlewares/jsonWebTokenVerify.js';
dotenv.config();

const app = express()
const port = process.env.PORT || 3000
const clientPort = process.env.CLIENT_PORT || 4200
app.use(cors({
    origin: `http://localhost:${clientPort}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())

// Rutas sin autenticación
app.use('/', authRoutes)

//Middleware para el token
app.use(jsonWebTokenVerify)

// Rutas con autenticación
app.use('/authors', authorRoutes)
app.use('/users', userRoutes)

// Sincronización con la base de datos
const initApp = async() => {
    try {
        await sequelize.authenticate()
        console.log('Connection to the database has been established successfully.')

        await sequelize.sync({ force: false }) // force: true si quiero forzar recrear las tablas
        console.log('Database synchronized.')

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.error(`Error initializing app:${error.message}`)
    }
}

initApp()