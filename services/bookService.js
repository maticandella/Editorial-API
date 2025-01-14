import BookRepository from '../repositories/books/bookRepository.js';
import BookModel from '../models/books/BookModel.js';
import GenreModel from '../models/genres/GenreModel.js';
import EditionModel from '../models/editions/EditionModel.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { validateBook } from '../validations/books/bookValidation.js';
import { OperationEnum } from '../shared/enums/OperationEnum.js';
import { Op } from 'sequelize';
import { ErrorIdentifiers } from '../shared/Identifiers/ErrorIdentifiers.js';

const repository = new BookRepository(BookModel);

const include = [{
    model: AuthorModel,
    as: 'author',
    attributes: ['id', 'name', 'lastName'],
}
];

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
    order = order || [['createdAt', 'DESC']];

    const { totalItems, items } = await repository.getAllPaginated({ limit, offset, order, include });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
};

const getByAuthorId = async (authorId) => {
    return await repository.getByAuthorId(authorId);
};

const search = async ({ page = 1, limit = 10, title = '', categories = []  }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const filters = {};
    
    const titleSearch = title || '';
    if (titleSearch) {
        const words = titleSearch.split(' ');
        
        filters[Op.and] = words.map(word => ({
            [Op.or]: [
                { title: { [Op.iLike]: `%${word}%` } }
            ]
        }));
    }

    const categoryArray = Array.isArray(categories) 
    ? categories 
    : categories.split(',').map(Number).filter(Boolean);

    // Filtrar por todas las categorias seleccionadas
    if (categoryArray.length > 0) {
        filters[Op.and] = [
            ...(filters[Op.and] || []),
            {
                genreId: { [Op.in]: categoryArray } 
            }
        ];
    }

    const order = [['createdAt', 'DESC']]
    const { totalItems, items } = await repository.search({filters, limit, offset, order, include });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
}

const createBook = async(data) => {
    const existsISBN =  await repository.getByISBN(data.isbn) > 0;
    validateBook({ book: data }, null, existsISBN, OperationEnum.POST);
    return await repository.create(data);
};

const updateBook = async(id, data) => {
    const entityInDb = await repository.getById(id);
    var existsISBN = false;

    if (data.isbn && data.isbn !== entityInDb.isbn) {
        existsISBN = await repository.getByISBN(data.isbn) > 0;
    }

    validateBook({ book: data }, entityInDb, existsISBN, OperationEnum.PUT);
    return await repository.update(entityInDb, data);
};

const deleteBook = async(id) => {
    const entityInDb = await repository.getById(id);
    validateBook({ book: entityInDb }, entityInDb, false, OperationEnum.DELETE);

    try {
        return await repository.remove(entityInDb);
    } catch (e) {
        const error = new Error(`No se pudo eliminar ${entityInDb.title}. Ocurrió un error inesperado.`)
        error.code = ErrorIdentifiers.UNEXPECTED_ERROR;
        throw error;
    }
};

export { getById, getAll, getByAuthorId, search, createBook, updateBook, deleteBook };