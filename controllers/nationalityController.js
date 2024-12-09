import * as nationalityService from '../services/nationalityService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const getNationalities = async(req, res) => {
    try {
        const nationalities = await nationalityService.getAll();
        return successResponse(res, 'Géneros obtenidos con éxito.', { nationalities }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

export {
    getNationalities
};