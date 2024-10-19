import { ValidationError } from "../baseErrors.js";

export const validateUserLogin = ({ user, isValid }) => {
    if (!user) throw new ValidationError('Usuario no encontrado.');
    if (!isValid) throw new ValidationError('Contraseña incorrecta.');
};