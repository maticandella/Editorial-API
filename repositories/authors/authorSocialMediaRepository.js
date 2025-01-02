import GenericRepository from '../genericRepository.js';

export default class AuthorSocialMediaRepository extends GenericRepository {
    constructor(authorSocialMediaModel) {
        super(authorSocialMediaModel);
    }

    async getByAuthorId(authorId, options = {}) {
        return await this.model.findAll({
            where: { authorId: authorId },
            ...options,
        });
    }
}