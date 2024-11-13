import express from 'express';
import { logout } from '../../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestión de sesión del usuario
 */

/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 */
router.post('/logout', logout);

export default router;