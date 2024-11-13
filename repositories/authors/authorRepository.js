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

    async search({ filters = {}, limit = 10, offset = 0, include = [] }) {
        const [authors, totalAuthors] = await Promise.all([
            this.model.findAll({
                where: filters,
                limit,
                offset,
                order: [['name', 'ASC']],
                include,
            }),
             this.model.count({ where: filters }),
        ]);
        return { totalAuthors, authors };
    }
}