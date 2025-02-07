import express from 'express';
import { addSocialMedia, create, deleteAuthor, update } from '../../controllers/authorController.js';

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

/**
 * @swagger
 * /api/admin/authors/{authorId}/socialmedia:
 *   post:
 *     summary: Asignar redes sociales a un autor existente
 *     tags: [Authors (Admin)]
 *     parameters:
 *       - name: authorId
 *         in: path
 *         required: true
 *         description: ID del autor al que se le asignarán las redes sociales
 *         schema:
 *           type: integer
 *           example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 socialMediaTypeId:
 *                   type: integer
 *                   description: ID del tipo de red social (ej. Twitter, Instagram)
 *                   example: 1
 *                 url:
 *                   type: string
 *                   format: uri
 *                   description: URL del perfil en la red social
 *                   example: https://twitter.com/usuario
 *     responses:
 *       200:
 *         description: Redes sociales asignadas exitosamente al autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Redes sociales asignadas correctamente
 *       400:
 *         description: Error en los datos enviados o en el proceso de asignación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datos inválidos. Verifique el 'socialMediaTypeId' o la 'url'."
 *       404:
 *         description: Autor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontró el autor con el ID especificado."
 */
router.post('/:id/socialmedia', addSocialMedia);

/**
 * @swagger
 * /api/admin/authors/{id}:
 *   delete:
 *     summary: Eliminar un autor existente
 *     tags: [Authors (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor a eliminar
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       204:
 *         description: Autor eliminado con éxito (sin contenido en la respuesta)
 *       404:
 *         description: Autor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontró el autor con el ID especificado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al intentar eliminar el autor."
 */
router.delete('/:id', deleteAuthor);

export default router;