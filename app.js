import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/admin/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import authorAdminRoutes from './routes/admin/authorAdminRoutes.js';
import userRoutes from './routes/admin/userRoutes.js';
import { sequelize } from './config/database.js';
import cookieParser from 'cookie-parser';
import { jsonWebTokenVerify } from './middlewares/jsonWebTokenVerify.js';
import defineAssociations from './models/associations.js';
dotenv.config();

defineAssociations();
const app = express()
const port = process.env.PORT || 3000
const clientPort = process.env.CLIENT_PORT || 4200
app.use(cors({
    origin: `http://localhost:${clientPort}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
}));

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())

// Rutas sin autenticación (Sitio público)
app.use('/', authRoutes)
app.use(`/authors`, authorRoutes)

//Middleware para el token
app.use(jsonWebTokenVerify)

// Rutas con autenticación (Sitio administrativo)
const adminSite = "admin";
app.use(`/${adminSite}/authors`, authorAdminRoutes)
app.use(`/${adminSite}/users`, userRoutes)

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