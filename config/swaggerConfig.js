import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EditoriApp',
      version: '1.0.0',
      description: 'API para gestionar libros, autores, géneros y mucho más para el mundo de las Editoriales.',
    },
    servers: [
      {
        url: `${process.env.URL_BACK}/api`,
      },
    ],
  },
  apis: [
    './routes/*.js',       // Archivos de rutas principales
    './routes/admin/*.js' // Archivos de sitio administrable
    ], 
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

export { swaggerSpecs, swaggerUi };