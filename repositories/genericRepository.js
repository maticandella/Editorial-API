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

    async create(data) {
        return await this.model.create(data);
    }

    async update(entity, data) {
        return await entity.update(data);
    }

    async remove(entity) {
        return await entity.destroy();
    }
}