import * as editionService from '../services/editionService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse } from '../helpers/responseHelper.js';

const getEditions = async(req, res) => {
    try {
        const editions = await editionService.getAll();
        return successResponse(res, 'Tipos de edición obtenidos con éxito.', { editions }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

export {
    getEditions
};