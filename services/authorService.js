import AuthorRepository from '../repositories/authors/authorRepository.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { validateAuthor } from '../validations/authors/authorValidation.js';

const repository = new AuthorRepository(AuthorModel);

const createAuthor = async(data) => {
    //ver validaciones faltantes y ver mensaje de error
    validateAuthor({ user: data, authorInDb });
    return await repository.create(data);
};

export { createAuthor };