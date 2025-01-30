import express from 'express';
import { getGenres } from '../controllers/genreController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Genres
 *   description: Endpoints de Géneros Literarios
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Obtener una lista de géneros
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Lista de géneros disponibles
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
router.get('/', getGenres);

export default router;