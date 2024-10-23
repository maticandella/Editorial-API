import GenericRepository from '../genericRepository.js';

export default class AuthorRepository extends GenericRepository {
    constructor(authModel) {
        super(authModel);
    }

    async getAllPaginated({ limit, offset, order, include = [] }) {
        const [authors, totalAuthors] = await Promise.all([
            this.model.findAll({
                limit,
                offset,
                order: order || [
                    ['id', 'ASC']
                ],
                include,
            }),
            this.model.count(),
        ]);
        return { totalAuthors, authors };
    }
}