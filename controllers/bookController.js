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

const create = async(req, res) => {
    try {
        const newBook = await bookService.createBook(req.body);
        return successResponse(res, 'Libro registrado con éxito.', { id: newBook.id }, 201);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const update = async(req, res) => {
    try {
        const response = await bookService.updateBook(req.params.id, req.body);
        return successResponse(res, 'Libro modificado con éxito.', response, 204);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const deleteBook = async(req, res) => {
    try {
        const response = await bookService.deleteBook(req.params.id);
        return successResponse(res, 'Libro eliminado con éxito.', response, 204);
    } catch (e) {
        handleError(e, res)
    }
};

export {
    getById,
    getBooks,
    getByAuthorId,
    search,
    create,
    update,
    deleteBook
};