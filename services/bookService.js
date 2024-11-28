import BookRepository from '../repositories/books/bookRepository.js';
import BookModel from '../models/books/BookModel.js';
import GenreModel from '../models/genres/GenreModel.js';
import EditionModel from '../models/editions/EditionModel.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { Op } from 'sequelize';

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
    const { totalItems, items } = await repository.search({filters, limit, offset, order });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
}

export { getById, getAll, getByAuthorId, search };