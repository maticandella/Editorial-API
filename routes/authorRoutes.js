import express from 'express';
import { getById, getAuthors } from '../controllers/authorController.js';

const router = express.Router();

router.get('/:id', getById);
router.get('/', getAuthors);

export default router;