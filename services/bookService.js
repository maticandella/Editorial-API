import BookRepository from '../repositories/books/bookRepository.js';
import BookModel from '../models/books/BookModel.js';
import GenreModel from '../models/genres/GenreModel.js';
import EditionModel from '../models/editions/EditionModel.js';
import AuthorModel from '../models/authors/AuthorModel.js';

const repository = new BookRepository(BookModel);

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

const getByAuthorId = async (authorId) => {
    return await repository.getByAuthorId(authorId);
};

export { getById, getByAuthorId };