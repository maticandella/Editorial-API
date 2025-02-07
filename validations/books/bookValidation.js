import Joi from 'joi';
import { ValidationError } from "../baseErrors.js";
import { OperationEnum } from '../../shared/enums/OperationEnum.js';

export const bookSchema = Joi.object({
    title: Joi.string().required().min(1).max(255).messages({
        'any.required': 'El nombre es requerido.',
        'string.min': 'El título debe tener al menos {#limit} carácter.',
        'string.max': 'El título no puede exceder {#limit} caracteres.'
    }),
    authorId: Joi.number().integer().required().messages({
        'any.required': 'El autor es requerido.',
        'number.base': 'El id del autor debe ser un número.',
        'number.integer': 'El id del autor debe ser un número entero.'
    }),
    genreId: Joi.number().integer().required().messages({
        'any.required': 'El género es requerido.',
        'number.base': 'El id del género debe ser un número.',
        'number.integer': 'El id del género debe ser un número entero.'
    }),
    editionId: Joi.number().integer().required().messages({
        'any.required': 'El tipo de edición es requerido.',
        'number.base': 'El id del tipo de edición debe ser un número.',
        'number.integer': 'El id del tipo de edición debe ser un número entero.'
    }),
    photo: Joi.string().allow(null, '').optional(),
    isbn: Joi.string().required().pattern(/^(?:\d{9}[\dxX]|\d{13})$/).messages({
            'any.required': 'El ISBN es requerido.',
            'string.pattern.base': 'El ISBN debe ser válido (ISBN-10 o ISBN-13).'
    }),
    pagesNumber: Joi.number().integer().required().messages({
        'any.required': 'El número de páginas es requerido.',
        'number.base': 'El número de páginas debe ser un número.',
        'number.integer': 'El número de páginas debe ser un número entero.'
    }),
    year: Joi.number().allow(null, '').optional(),
    review: Joi.string().allow(null, '').optional(),
    size: Joi.string().allow(null, '').optional(),
    popularityScore: Joi.number().integer().default(0),
    price: Joi.number().positive().precision(2).min(0.01).required().messages({
        'number.base': 'El precio debe ser un número.',
        'number.positive': 'El precio debe ser un valor positivo.',
        'number.precision': 'El precio no puede tener más de 2 decimales.',
        'number.min': 'El precio mínimo es {#limit}.',
        'any.required': 'El precio es requerido.'
    }),
    createdAt: Joi.date().messages({
        'date.base': 'La fecha de creación debe ser válida.',
    }),
    updatedAt: Joi.date().allow(null).messages({
        'date.base': 'La fecha de actualización debe ser válida.',
    }),
    deletedAt: Joi.date().allow(null).messages({
        'date.base': 'La fecha de eliminación debe ser válida.',
    }),
});

export const validateBook = ({ book }, entityInDb, existsISBN, operation) => {
    if (operation !== OperationEnum.POST && entityInDb == null && entityInDb == undefined) throw new ValidationError('El libro no fue encontrado.');

    if (operation !== OperationEnum.DELETE) {
        const { error } = bookSchema.validate(book, { abortEarly: false }); //abortEarly en false significa que No se detiene al encontrar el primer error. Sigue validando todas las demás reglas definidas en el esquema.

        if (error) throw new ValidationError(error.details.map(detail => detail.message).join(', '));

        if (existsISBN) {
            throw new ValidationError(`El ISBN ya se encuentra registrado.`);
        }
    }
};