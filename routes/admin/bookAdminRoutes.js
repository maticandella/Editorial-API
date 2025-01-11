import express from 'express';
import { create, deleteBook, update } from '../../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books (Admin)
 *   description: Endpoints administrativos para la gestión de libros
 */

router.post('/', create);

/**
 * @swagger
 * /api/admin/books/{id}:
 *   put:
 *     summary: Actualizar un libro existente
 *     tags: [Books (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro
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
 *       204:
 *         description: Libro actualizado correctamente
 *       404:
 *         description: Autor no encontrado
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/admin/books/{id}:
 *   delete:
 *     summary: Eliminar un libro existente
 *     tags: [Books (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a eliminar
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       204:
 *         description: Libro eliminado con éxito (sin contenido en la respuesta)
 *       404:
 *         description: Libro no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontró el libro con el ID especificado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al intentar eliminar el libro."
 */
router.delete('/:id', deleteBook);

export default router;