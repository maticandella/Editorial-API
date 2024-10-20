import Joi from 'joi';
import { ValidationError } from "../baseErrors.js";

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
    photo: Joi.string().optional(), //pattern(/\.(jpg|jpeg|png)$/i).messages({
    // 'string.pattern.base': 'La foto debe tener una extensión válida (.jpg, .jpeg, .png).',
    // }),
    isActive: Joi.boolean().optional(),
    note: Joi.string().optional()
});

export const validateAuthor = ({ author }) => {
    const { error } = authorSchema.validate(author, { abortEarly: false });

    if (error) throw new ValidationError(error.details.map(detail => detail.message).join(', '));
};