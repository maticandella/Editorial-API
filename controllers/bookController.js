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

const getByAuthorId = async(req, res) => {
    try {
        const books = await bookService.getByAuthorId(req.params.id);
        if (!books) return errorResponse(res, 'Libros no encontrados.', 404);
        return successResponse(res, 'Libros obtenidos con éxito', { books }, 200);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

export {
    getById,
    getByAuthorId
};