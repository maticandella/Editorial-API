import SocialMediaTypeModel from '../models/socialMediaTypes/SocialMediaTypeModel.js';
import SocialMediaTypeRepository from '../repositories/socialMediaTypes/socialMediaTypeRepository.js'

const repository = new SocialMediaTypeRepository(SocialMediaTypeModel);

const getAll = async() => {
    return await repository.getAll();
};

export { getAll };