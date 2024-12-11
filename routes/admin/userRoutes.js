import express from 'express';
import { logout, validateSession } from '../../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestión de sesión del usuario
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 */
router.post('/logout', logout);

/**
 * @swagger
 * /admin/users/validateSession:
 *   get:
 *     summary: Valida si la sesión del usuario es válida
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Sesión válida
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 *       401:
 *         description: Sesión no válida o expirada
 */
router.get('/validateSession', validateSession);

export default router;