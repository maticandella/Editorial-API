import AuthorRepository from '../repositories/authors/authorRepository.js';
import AuthorModel from '../models/authors/AuthorModel.js';

const repository = new AuthorRepository(AuthorModel);

const createAuthor = async(data) => {
    var authorInDb;
    authorInDb = await repository.getByNames(data.name, data.lastName);
    // validateAuthor({ user: data, authorInDb });
    return await repository.create(data);
};

export { createAuthor };