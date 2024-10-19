import GenericRepository from '../genericRepository.js';

export default class AuthorRepository extends GenericRepository {
    constructor(authModel) {
        super(authModel);
    }

    async getByNames(name, lastName) {
        return await this.model.findOne({ where: { name, lastName } });
    }
}