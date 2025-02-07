import express from 'express';
import { getSocialMediaTypes } from '../controllers/socialMediaTypeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: SocialMediaTypes
 *   description: Endpoints de Redes Sociales
 */

/**
 * @swagger
 * /api/socialMediaTypes:
 *   get:
 *     summary: Obtener una lista de las redes sociales disponibles
 *     tags: [SocialMediaTypes]
 *     responses:
 *       200:
 *         description: Lista de redes sociales disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getSocialMediaTypes);

export default router;