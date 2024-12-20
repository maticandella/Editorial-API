import Joi from 'joi';
import { ValidationError } from "../baseErrors.js";
import { OperationEnum } from '../../shared/enums/OperationEnum.js';

export const authorSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'El nombre es requerido.'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'El apellido es requerido.'
    }),
    nacionalityId: Joi.number().integer().required().messages({
        'any.required': 'La nacionalidad es requerida.',
        'number.base': 'La nacionalidad debe ser un número.',
        'number.integer': 'La nacionalidad debe ser un número entero.'
    }),
    photo: Joi.string().allow(null, '').optional(), //pattern(/\.(jpg|jpeg|png)$/i).messages({
    // 'string.pattern.base': 'La foto debe tener una extensión válida (.jpg, .jpeg, .png).',
    // }),
    isActive: Joi.boolean().optional(),
    note: Joi.string().allow(null, '').optional().messages({
        'string.base': 'La nota debe ser una cadena de texto.'
    })
});

export const validateAuthor = ({ author }, entityInDb, operation) => {
    if (operation !== OperationEnum.POST && entityInDb == null && entityInDb == undefined) throw new ValidationError('El autor no fue encontrado.');

    const { error } = authorSchema.validate(author, { abortEarly: false });

    if (error) throw new ValidationError(error.details.map(detail => detail.message).join(', '));
};