import BookRepository from '../repositories/books/bookRepository.js';
import BookModel from '../models/books/BookModel.js';
import GenreModel from '../models/genres/GenreModel.js';
import EditionModel from '../models/editions/EditionModel.js';
import AuthorModel from '../models/authors/AuthorModel.js';

const repository = new BookRepository(BookModel);

const include = [];

const getById = async(id) => {
    const include = [{
            model: AuthorModel,
            as: 'author',
            attributes: ['id','name','lastName'],
        },
        {
            model: GenreModel,
            as: 'genre',
            attributes: ['description'],
        },
        {
            model: EditionModel,
            as: 'edition',
            attributes: ['description']
        }
    ];
    return await repository.getById(id, { include });
};

const getAll = async({ page = 1, limit = 10, order }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;

    const { totalItems, items } = await repository.getAllPaginated({ limit, offset, order, include });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
};

const getByAuthorId = async (authorId) => {
    return await repository.getByAuthorId(authorId);
};

export { getById, getAll, getByAuthorId };