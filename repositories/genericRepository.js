export default class GenericRepository {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        return await this.model.findAll();
    }

    async getById(id) {
        return await this.model.findByPk(id);
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