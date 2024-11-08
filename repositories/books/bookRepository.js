import GenericRepository from '../genericRepository.js';

export default class BookRepository extends GenericRepository {
    constructor(bookModel) {
        super(bookModel);
    }

    async getByAuthorId(authorId, options = {}) {
        console.error(authorId);
        return await this.model.findAll({
            where: { authorId: authorId },
            ...options,
        });
    }
}