import Joi from 'joi';
import { ValidationError } from "../baseErrors.js";

export const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'El email debe ser válido.',
        'any.required': 'El email es requerido.'
    }),
    password: Joi.string().min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/)
        .required()
        .messages({
            'string.min': 'La contraseña debe tener al menos 6 caracteres.',
            'string.pattern.base': 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.',
            'any.required': 'La contraseña es requerida.'
        })
});

export const validateUser = ({ user, userInDb }) => {
    if (userInDb !== null && userInDb !== undefined) throw new ValidationError('El email ingresado ya existe para otro usuario.');

    const { error } = userSchema.validate(user, { abortEarly: false });;

    if (error) throw new ValidationError(error.details.map(detail => detail.message).join(', '));
};