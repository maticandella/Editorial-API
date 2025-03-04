import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { swaggerSpecs, swaggerUi } from './config/swaggerConfig.js';
import authRoutes from './routes/admin/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import authorAdminRoutes from './routes/admin/authorAdminRoutes.js';
import bookAdminRoutes from './routes/admin/bookAdminRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import editionRoutes from './routes/editionRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import nationalityRoutes from './routes/nationalityRoutes.js';
import socialMediaTypeRoutes from './routes/socialMediaTypeRoutes.js';
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
const urlDev = `http://localhost:${clientPort}`
const urlPrd = process.env.URL_PRD || `http://localhost:${clientPort}}`

const allowedOrigins = [
    urlDev, // Entorno de desarrollo
    urlPrd // Entorno de producción
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'), false); 
      }
    },
    credentials: true, // Permite el uso de credenciales (cookies, cabeceras de autenticación, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas sin autenticación (Sitio público)
const api = 'api'
app.use(`/${api}/`, authRoutes)
app.use(`/${api}/authors`, authorRoutes)
app.use(`/${api}/books`, bookRoutes)
app.use(`/${api}/editions`, editionRoutes)
app.use(`/${api}/genres`, genreRoutes)
app.use(`/${api}/nationalities`, nationalityRoutes)
app.use(`/${api}/socialMediaTypes`, socialMediaTypeRoutes)

//Middleware para el token
app.use(jsonWebTokenVerify)

// Rutas con autenticación (Sitio administrativo)
const adminSite = "admin";
app.use(`/${adminSite}/authors`, authorAdminRoutes)
app.use(`/${adminSite}/books`, bookAdminRoutes)
app.use(`/${adminSite}/users`, userRoutes)

// Sincronización con la base de datos
const initApp = async() => {
    try {
        await sequelize.authenticate()
        console.log('Connection to the database has been established successfully.')
        console.log("urlback", process.env.URL_BACK)
        await sequelize.sync({ force: false }) // force: true si quiero forzar recrear las tablas
        console.log('Database synchronized.')

        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo en ${process.env.URL_BACK}`);
            console.log(`Documentación de la API en ${process.env.URL_BACK}/api/docs`);
        })
    } catch (error) {
        console.error(`Error initializing app:${error.message}`)
    }
}

initApp()

export default app;