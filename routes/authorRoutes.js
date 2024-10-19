import express from 'express';
import { create } from '../controllers/authorController.js';

const router = express.Router();
const name = 'author';

router.post('/', create);

export default router;