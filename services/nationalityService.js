import NationalityRepository from '../repositories/nationalities/nationalityRepository.js';
import NationalityModel from '../models/nacionalities/NacionalityModel.js';

const repository = new NationalityRepository(NationalityModel);

const getAll = async() => {
    return await repository.getAll();
};

export { getAll };