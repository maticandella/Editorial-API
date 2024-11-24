import express from 'express';
import { getById, getAuthors, search } from '../controllers/authorController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Endpoints de Autores
 */

/**
 * @swagger
 * /api/authors/search:
 *   get:
 *     summary: Buscar autores por nombre con paginación y filtro por inicial del apellido
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre o apellido del autor para búsqueda parcial
 *       - in: query
 *         name: initial
 *         schema:
 *           type: string
 *           maxLength: 1
 *         required: false
 *         description: Primera letra del apellido para filtrar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Número de página para paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de autores con paginación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       nacionalityId:
 *                         type: integer
 *                       note:
 *                         type: string
 *                         nullable: true
 *                       photo:
 *                         type: string
 *                         nullable: true
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles
 *                 totalAuthors:
 *                   type: integer
 *                   description: Total de autores encontrados
 *       404:
 *         description: No se encontraron autores
 */
router.get('/search', search);

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Obtener un autor por su ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Información del autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       404:
 *         description: Autor no encontrado
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Obtener una lista de todos los autores
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Lista de autores
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
 *                   lastName:
 *                     type: string
 *       404:
 *         description: Autores no encontrados
 */
router.get('/', getAuthors);

export default router;