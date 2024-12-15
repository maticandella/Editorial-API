import * as socialMediaTypeService from '../services/socialMediaTypeService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';

const getSocialMediaTypes = async(req, res) => {
    try {
        const socialMediaTypes = await socialMediaTypeService.getAll();
        return successResponse(res, 'Redes sociales disponibles obtenidas con éxito.', { socialMediaTypes }, 200);
    } catch (e) {
        console.error(e);
        handleError(e, res);
    }
};

export {
    getSocialMediaTypes
};