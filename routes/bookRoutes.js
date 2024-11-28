import express from 'express';
import { getById, getByAuthorId, getBooks, search } from '../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints de Libros
 */

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Buscar libros con filtros y paginación
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de la página a obtener (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número máximo de libros por página (por defecto 10)
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Búsqueda parcial por título (ej. "Harry Potter")
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         required: false
 *         description: IDs de las categorías a filtrar (ej. [1, 2, 3])
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: Número total de libros que coinciden con los filtros
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas disponibles
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       authorId:
 *                         type: integer
 *                       genreId:
 *                         type: integer
 *                       photo:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       year:
 *                         type: integer
 *       400:
 *         description: Solicitud inválida (parámetros incorrectos)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search', search);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Obtener un libro por su ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Información del libro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 authorId:
 *                   type: integer
 *                 genreId:
 *                   type: integer
 *                 editionId:
 *                   type: integer
 *                 photo:
 *                   type: string
 *                 isbn:
 *                   type: string
 *                 pagesNumber:
 *                   type: integer
 *                 year:
 *                   type: integer
 *                 review:
 *                   type: string
 *                 size:
 *                   type: integer
 *                 price:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Libro no encontrado
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/books/author/{id}:
 *   get:
 *     summary: Obtener libros por el ID del autor
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del autor
 *     responses:
 *       200:
 *         description: Lista de libros del autor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   genreId:
 *                     type: integer
 *                   editionId:
 *                     type: integer
 *                   photo:
 *                     type: string
 *                   isbn:
 *                     type: string
 *                   pagesNumber:
 *                     type: integer
 *                   year:
 *                     type: integer
 *                   review:
 *                     type: string
 *                   size:
 *                     type: integer
 *                   price:
 *                     type: number
 *                     format: float
 *       404:
 *         description: Libros no encontrados para el autor
 */
router.get('/author/:id', getByAuthorId);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Obtener una lista de libros
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número máximo de libros a devolver
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número de libros a omitir en los resultados
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         required: false
 *         description: Campo por el cual ordenar los libros
 *       - in: query
 *         name: include
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         required: false
 *         description: Relaciones a incluir en los resultados (ej., "author", "genre")
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBooks:
 *                   type: integer
 *                   description: Número total de libros disponibles
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       authorId:
 *                         type: integer
 *                       genreId:
 *                         type: integer
 *                       editionId:
 *                         type: integer
 *                       photo:
 *                         type: string
 *                       isbn:
 *                         type: string
 *                       pagesNumber:
 *                         type: integer
 *                       year:
 *                         type: integer
 *                       review:
 *                         type: string
 *                       size:
 *                         type: integer
 *                       price:
 *                         type: number
 *                         format: float
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getBooks);

export default router;