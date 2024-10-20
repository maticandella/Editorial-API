import AuthorRepository from '../repositories/authors/authorRepository.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { validateAuthor } from '../validations/authors/authorValidation.js';

const repository = new AuthorRepository(AuthorModel);

const getById = async(id) => {
    return await repository.getById(id);
};

const getAll = async({ page = 1, limit = 10, order }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const { totalAuthors, authors } = await repository.getAllPaginated({ limit, offset, order });
    const totalPages = Math.ceil(totalAuthors / limit);
    return { authors, totalPages, totalAuthors };
};

const createAuthor = async(data) => {
    data.name = normalizeName(data.name);
    data.lastName = normalizeName(data.lastName);
    validateAuthor({ author: data });
    return await repository.create(data);
};

const normalizeName = (name) => name.trim().toUpperCase();

export { getById, getAll, createAuthor };