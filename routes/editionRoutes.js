import express from 'express';
import { getEditions } from '../controllers/editionController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Editions
 *   description: Endpoints de Tipos de Edición
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Obtener una lista de tipos de edición
 *     tags: [Editions]
 *     responses:
 *       200:
 *         description: Lista de tipos de edición disponibles
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
router.get('/', getEditions);

export default router;