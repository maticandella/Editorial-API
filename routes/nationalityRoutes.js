import express from 'express';
import { getNationalities } from '../controllers/nationalityController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Nationalities
 *   description: Endpoints de Países
 */

/**
 * @swagger
 * /api/nationalities:
 *   get:
 *     summary: Obtener una lista de países
 *     tags: [Nationalities]
 *     responses:
 *       200:
 *         description: Lista de países
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
router.get('/', getNationalities);

export default router;