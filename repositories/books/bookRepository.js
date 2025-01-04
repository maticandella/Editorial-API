import GenericRepository from '../genericRepository.js';

export default class BookRepository extends GenericRepository {
    constructor(bookModel) {
        super(bookModel);
    }

    async getByAuthorId(authorId, options = {}) {
        return await this.model.findAll({
            where: { authorId: authorId },
            ...options,
        });
    }

    async getByISBN(isbn) {
        return await this.model.count({
            where: { isbn: isbn }
        });
    }
}