import express from 'express';
import { create, update } from '../../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books (Admin)
 *   description: Endpoints administrativos para la gestión de libros
 */

router.post('/', create);

router.put('/:id', update);

export default router;