import express from 'express';
import { getById, getByAuthorId } from '../controllers/bookController.js';

const router = express.Router();

router.get('/:id', getById);
router.get('/author/:id', getByAuthorId);
// router.get('/', getBooks);

export default router;