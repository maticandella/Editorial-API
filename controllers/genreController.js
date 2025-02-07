import * as genreService from '../services/genreService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const getGenres = async(req, res) => {
    try {
        const genres = await genreService.getAll();
        return successResponse(res, 'Géneros obtenidos con éxito.', { genres }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

export {
    getGenres
};