import express from 'express';
import { create, update } from '../../controllers/authorController.js';

const router = express.Router();

router.post('/', create);
router.put('/:id', update);

export default router;