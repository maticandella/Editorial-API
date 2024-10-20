export default class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async getAllPaginated({ limit, offset, order }) {
        const [authors, totalAuthors] = await Promise.all([
            this.model.findAll({
                limit,
                offset,
                order: order || [
                    ['id', 'ASC']
                ],
            }),
            this.model.count(),
        ]);
        return { totalAuthors, authors };
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        const entity = await this.model.findByPk(id);
        if (!entity) {
            throw new Error('Not found');
        }
        return await entity.update(data);
    }

    async remove(id) {
        const entity = await this.model.findByPk(id);
        if (!entity) {
            throw new Error('Not found');
        }
        return await entity.destroy();
    }
}