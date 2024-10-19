import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'

export const jsonWebTokenVerify = (req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    try {
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.session.user = data;
        next();
    } catch {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
}