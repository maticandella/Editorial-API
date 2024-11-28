import * as bookService from '../services/bookService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const getById = async(req, res) => {
    try {
        const book = await bookService.getById(req.params.id);
        if (!book) return errorResponse(res, 'Libro no encontrado.', 404);
        return successResponse(res, 'Libro obtenido con éxito', { book }, 200);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const getBooks = async(req, res) => {
    try {
        const { page, limit, order } = req.query;
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1)
            return errorResponse(res, 'Los parámetros de paginación deben ser números positivos.', 400);

        const { items, totalPages, totalItems } = await bookService.getAll({ page, limit, order });

        return successResponse(res, 'Libros obtenidos con éxito.', { items, totalPages, totalItems }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

const getByAuthorId = async(req, res) => {
    try {
        const books = await bookService.getByAuthorId(req.params.id);
        if (!books || books.length == 0) return errorResponse(res, 'Libros no encontrados.', 404);
        return successResponse(res, 'Libros obtenidos con éxito', { books }, 200);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const search = async(req, res) => {
    try {
        const { categories, title, page = 1, limit = 10 } = req.query;
       
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1)
            return errorResponse(res, 'Los parámetros de paginación deben ser números positivos.', 400);
        
        const { items, totalPages, totalItems } = await bookService.search({ page, limit, title, categories });
        return successResponse(res, 'Libros obtenidos con éxito.', { items, totalPages, totalItems }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

export {
    getById,
    getBooks,
    getByAuthorId,
    search
};