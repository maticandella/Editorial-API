import * as authorService from '../services/authorService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const getById = async(req, res) => {
    try {
        const author = await authorService.getById(req.params.id);
        if (!author) return errorResponse(res, 'Autor no encontrado.', 404);
        return successResponse(res, 'Autor obtenido con éxito', { author }, 200);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const getAuthors = async(req, res) => {
    try {
        const { page, limit, order } = req.query;
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1)
            return errorResponse(res, 'Los parámetros de paginación deben ser números positivos.', 400);

        const { authors, totalPages, totalAuthors } = await authorService.getAll({ page, limit, order });

        return successResponse(res, 'Autores obtenidos con éxito.', { authors, totalPages, totalAuthors }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

const search = async(req, res) => {
    try {
        const { name, page = 1, limit = 10 } = req.query;
        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1)
            return errorResponse(res, 'Los parámetros de paginación deben ser números positivos.', 400);
        
        const { authors, totalPages, totalAuthors } = await authorService.search({ page, limit, name });
        return successResponse(res, 'Autores obtenidos con éxito.', { authors, totalPages, totalAuthors }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

const create = async(req, res) => {
    try {
        const newAuthor = await authorService.createAuthor(req.body);
        return successResponse(res, 'Autor registrado con éxito.', { id: newAuthor.id }, 201);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

const update = async(req, res) => {
    try {
        const response = await authorService.updateAuthor(req.params.id, req.body);
        return successResponse(res, 'Autor modificado con éxito.', response, 204);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

export {
    getById,
    getAuthors,
    search,
    create,
    update
};