export default class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id, options = {}) {
        return await this.model.findOne({
            where: { id },
            ...options,
        });
    }

    async getAllPaginated({ limit, offset, order, include = [] }) {
        const [items, totalItems] = await Promise.all([
            this.model.findAll({
                limit,
                offset,
                order: order || [['id', 'ASC']],
                include,
            }),
            this.model.count(),
        ]);
        return { totalItems, items };
    }

    async search({ filters = {}, limit = 10, offset = 0, include = [], order = [['name', 'ASC']] }) {
        const [items, totalItems] = await Promise.all([
            this.model.findAll({
                where: filters,
                limit,
                offset,
                order,
                include,
            }),
            this.model.count({ where: filters }),
        ]);
        return { totalItems, items };
    }

    async create(data) {
        return await this.model.create(data);
    }

    async bulkCreate(data) {
        return await this.model.bulkCreate(data);
    }

    async update(entity, data) {
        return await entity.update(data);
    }

    async remove(entity) {
        return await entity.destroy();
    }
}