import GenericRepository from '../genericRepository.js';

export default class UserRepository extends GenericRepository {
    constructor(userModel) {
        super(userModel);
    }

    async getByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }
}