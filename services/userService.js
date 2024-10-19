import UserRepository from '../repositories/users/userRepository.js';
import UserModel from '../models/users/UserModel.js';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import { validateUser } from '../validations/users/userValidation.js';
import jwt from 'jsonwebtoken';
import { validateUserLogin } from '../validations/users/userLoginValidation.js';
dotenv.config();

const repository = new UserRepository(UserModel);

const login = async(data) => {
    data.email = normalizeEmail(data.email);
    const user = await repository.getByEmail(data.email);
    const isValid = (user !== null) ? await bcrypt.compare(data.password, user.password) : false;

    validateUserLogin({ user, isValid });

    //Quitar propiedad password y devolver DTO
    const userData = user.get({ plain: true });
    const { password, ...userDTO } = userData;

    const accessToken = jwt.sign({ id: user.id, email: user.email },
        process.env.SECRET_JWT_KEY, { expiresIn: '3h' }
    )

    const refreshToken = jwt.sign({ id: user.id, email: user.email },
        process.env.SECRET_JWT_KEY, { expiresIn: '7d' }
    )

    return { accessToken, refreshToken, userDTO };
}

const createUser = async(data) => {
    var userInDb;
    if (data.email !== undefined && data.email !== null) {
        data.email = normalizeEmail(data.email);
        userInDb = await repository.getByEmail(data.email);
    }

    validateUser({ user: data, userInDb });

    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    data.password = await bcrypt.hash(data.password, saltRounds)
    return await repository.create(data);
};

const normalizeEmail = (email) => email.trim().toLowerCase();

export { login, createUser };