import GenericRepository from '../genericRepository.js';

export default class AuthorRepository extends GenericRepository {
    constructor(authModel) {
        super(authModel);
    }
}