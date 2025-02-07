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

const requestResetPassword = async (req, res) => {
    try {
        const response = await userService.requestResetPassword(req.body.email);
        return successResponse(res, response, 200);
    } catch (e) {
        handleError(e, res);
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const response = await userService.resetPassword(token, newPassword);
        return successResponse(res, response, 200);
    } catch (e) {
        handleError(e, res);
    }
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

const validateSession = async(req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json(false); 
    }

    try {
        //Con el decoded podría verificar el rol del usuario, implementar a futuro
        // const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        // if (decoded.role !== 'admin') {
        //     return res.status(403).json({ message: 'Access forbidden' });
        // }
        // req.session = { user: decoded };
        return res.status(200).json(true)// Sesión válida
    } catch (e) {
        return res.status(401).json(false); // Token inválido o expirado
    }
}

export {
    login,
    logout,
    requestResetPassword,
    resetPassword,
    register,
    validateSession
};