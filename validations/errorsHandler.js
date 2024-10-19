import { ValidationError, ConnectionError } from './baseErrors.js';
import { errorResponse } from '../helpers/responseHelper.js';

export const handleError = (error, res) => {
    // console.error('Captured Error:', error.message);

    if (error instanceof ValidationError) {
        return errorResponse(res, [error.message], 400);
    } else if (error instanceof ConnectionError) {
        return errorResponse(res, 'Error de conexión con la base de datos.', 500);
    } else {
        return errorResponse(res, 'Error interno del servidor.', 500);
    }
};