import EditionRepository from '../repositories/editions/editionRepository.js';
import EditionModel from '../models/editions/EditionModel.js';

const repository = new EditionRepository(EditionModel);

const getAll = async() => {
    return await repository.getAll();
};

export { getAll };