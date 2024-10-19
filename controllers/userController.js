import * as userService from '../services/userService.js';
import { handleError } from '../validations/errorsHandler.js';
import { successResponse, errorResponse } from '../helpers/responseHelper.js';
import cookieParser from 'cookie-parser';

const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prd',
        sameSite: 'strict',
        maxAge: 3 * 60 * 60 * 1000 // 3 horas
    }).cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prd',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
    });
};

const login = async(req, res) => {
    try {
        const { accessToken, refreshToken, userDTO } = await userService.login(req.body);
        setAuthCookies(res, accessToken, refreshToken);
        return successResponse(res, 'Login exitoso', {...userDTO }, 200);
    } catch (e) {
        return errorResponse(res, [e.message], 403);
    }
};

const logout = async(req, res) => {
    const { user } = req.session;
    if (!user) return errorResponse(res, 'Acceso no autorizado.', 403);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return successResponse(res, 'Logout exitoso', null, 200);
};

const register = async(req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        return successResponse(res, 'Usuario registrado con éxito.', { id: newUser.id }, 201);
    } catch (e) {
        console.error(e)
        handleError(e, res)
    }
};

export {
    login,
    logout,
    register
};