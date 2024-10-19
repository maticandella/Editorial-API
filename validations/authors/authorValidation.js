import Joi from 'joi';
import { ValidationError } from "../baseErrors.js";

export const authorSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'El nombre es requerido.'
    }),
    lastName: Joi.string().required().messages({
        'any.required': 'El apellido es requerido.'
    }),
    nacionalityId: Joi.string().required().messages({
        'any.required': 'La nacionalidad es requerida.'
    }),
    // photo: Joi.pattern(/\.(jpg|jpeg|png)$/i).base64().messages({
    //     'string.pattern.base': 'La foto debe tener una extensión válida (.jpg, .jpeg, .png).',
    //     'string.base64': 'La foto debe estar en formato base64.'
    // })
});

export const validateAuthor = ({ author }) => {
    const { error } = authorSchema.validate(author, { abortEarly: false });;

    if (error) throw new ValidationError(error.details.map(detail => detail.message).join(', '));
};