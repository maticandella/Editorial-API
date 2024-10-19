import * as authorService from '../services/authorService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const create = async(req, res) => {
    try {
        const newAuthor = await authorService.createAuthor(req.body);
        return successResponse(res, 'Autor registrado con éxito.', { id: newAuthor.id }, 201);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

export {
    create
};