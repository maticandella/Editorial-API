import { ValidationError, ConnectionError } from './baseErrors.js';
import { errorResponse } from '../helpers/responseHelper.js';
import { ErrorIdentifiers } from '../shared/Identifiers/ErrorIdentifiers.js';

export const handleError = (error, res) => {
    if (error.name === 'SequelizeForeignKeyConstraintError' || error.code === '23503') {
        const customError = new ValidationError(
            'Ocurrió un problema con las llaves foráneas. Por favor, verifica los IDs ingresados.',
            ErrorIdentifiers.FOREIGN_KEY_CONSTRAINT
        );
        return errorResponse(res, [customError.message], 400);
    }

    if (error instanceof ValidationError || error instanceof Error) {
        return errorResponse(res, [error.message], 400);
    }
     else if (error instanceof ConnectionError) {
        return errorResponse(res, 'Error de conexión con la base de datos.', 500);
    } else {
        return errorResponse(res, 'Error interno del servidor.', 500);
    }
};