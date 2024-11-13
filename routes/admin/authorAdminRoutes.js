import express from 'express';
import { create, update } from '../../controllers/authorController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors (Admin)
 *   description: Endpoints administrativos para la gestión de autores
 */

/**
 * @swagger
 * /api/admin/authors:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags: [Authors (Admin)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor creado exitosamente
 *       400:
 *         description: Error en la creación del autor
 */
router.post('/', create);

/**
 * @swagger
 * /api/admin/authors/{id}:
 *   put:
 *     summary: Actualizar un autor existente
 *     tags: [Authors (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autor actualizado correctamente
 *       404:
 *         description: Autor no encontrado
 */
router.put('/:id', update);

export default router;