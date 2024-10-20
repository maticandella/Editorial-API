import express from 'express';
import { create, getById, getAuthors } from '../controllers/authorController.js';

const router = express.Router();

router.get('/:id', getById);
router.get('/', getAuthors);
router.post('/', create);

export default router;