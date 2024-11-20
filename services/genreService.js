import GenreRepository from '../repositories/genres/genreRepository.js';
import GenreModel from '../models/genres/GenreModel.js';

const repository = new GenreRepository(GenreModel);

const getAll = async() => {
    return await repository.getAll();
};

export { getAll };