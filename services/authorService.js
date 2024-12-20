import NationalityModel from '../models/nacionalities/NacionalityModel.js';
import SocialMediaTypeModel from '../models/socialMediaTypes/SocialMediaTypeModel.js';
import AuthorRepository from '../repositories/authors/authorRepository.js';
import AuthorSocialMediaRepository from '../repositories/authors/authorSocialMediaRepository.js';
import AuthorSocialMediaModel from '../models/authors/AuthorSocialMediaModel.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { validateAuthor } from '../validations/authors/authorValidation.js';
import { OperationEnum } from '../shared/enums/OperationEnum.js';
import { Op } from 'sequelize';
import { ErrorIdentifiers } from '../shared/Identifiers/ErrorIdentifiers.js';

const repository = new AuthorRepository(AuthorModel);
const authorSocialMediaRepository = new AuthorSocialMediaRepository(AuthorSocialMediaModel);

const include = [{
    model: NationalityModel,
    as: 'nationality',
    attributes: ['name', 'flag'],
},
{
    model: AuthorSocialMediaModel,
    as: 'socialMediaAccounts',
    attributes: ['url', 'socialMediaTypeId'],
    include: [{
        model: SocialMediaTypeModel,
        as: 'socialMediaType',
        attributes: ['icon', 'name'],
    }, ],
},
];

const getById = async(id) => {
    const include = [{
            model: NationalityModel,
            as: 'nationality',
            attributes: ['name', 'flag'],
        },
        {
            model: AuthorSocialMediaModel,
            as: 'socialMediaAccounts',
            attributes: ['url', 'socialMediaTypeId'],
            include: [
                {
                    model: SocialMediaTypeModel,
                    as: 'socialMediaType',
                    attributes: ['icon', 'name'],
                }
            ]
        }
    ];
    return await repository.getById(id, { include });
};

const getAll = async({ page = 1, limit = 10 }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const order = [['lastName', 'ASC']]

    const { totalItems, items } = await repository.getAllPaginated({ limit, offset, order, include });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
};

const search = async ({ page = 1, limit = 10, name, initial }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const filters = {};
    
    const nameSearch = name || '';
    if (nameSearch) {
        const words = nameSearch.split(' ');
        
        filters[Op.and] = words.map(word => ({
            [Op.or]: [
                { name: { [Op.iLike]: `%${word}%` } },
                { lastName: { [Op.iLike]: `%${word}%` } }
            ]
        }));
    }

    // Filtrar por inicial del apellido
    if (initial) {
        // Me aseguro de que initial es una letra válida
        const initialFilter = initial.trim()[0]?.toLowerCase(); 
        if (initialFilter) {
            filters[Op.and] = [
                ...(filters[Op.and] || []),
                { lastName: { [Op.iLike]: `${initialFilter}%` } }
            ];
        }
    }

    const order = [['lastName', 'ASC']]
    const { totalItems, items } = await repository.search({filters, limit, offset, order });
    const totalPages = Math.ceil(totalItems / limit);
    return { items, totalPages, totalItems };
}

const createAuthor = async(data) => {
    data.name = normalizeName(data.name);
    data.lastName = normalizeName(data.lastName);
    validateAuthor({ author: data }, null, OperationEnum.POST);
    return await repository.create(data);
};

const updateAuthor = async(id, data) => {
    const entityInDb = await repository.getById(id);
    data.name = normalizeName(data.name);
    data.lastName = normalizeName(data.lastName);
    validateAuthor({ author: data }, entityInDb, OperationEnum.PUT);
    return await repository.update(entityInDb, data);
};

const deleteAuthor = async(id) => {
    const entityInDb = await repository.getById(id);
    validateAuthor({ author: entityInDb }, entityInDb, OperationEnum.DELETE);

    try {
        return await repository.remove(entityInDb);
    } catch (e) {
        // Captura de error de FK
        if (e.name === 'SequelizeForeignKeyConstraintError' || e.code === '23503')
        {
            const error = new Error()
            error.message = `No se puede eliminar a ${entityInDb.name} ${entityInDb.lastName}. Posee Libros relacionados.`
            error.code = ErrorIdentifiers.FOREIGN_KEY_CONSTRAINT;
            throw error;
        }
        // Otros errores
        const error = new Error(`No se puede eliminar a ${entityInDb.name} ${entityInDb.lastName}. Ocurrió un error inesperado.`)
        error.code = ErrorIdentifiers.UNEXPECTED_ERROR;
        throw error;
    }
};

const addSocialMedia = async(authorId, data) => {
    const socialMediaData = data.map(d => ({
        authorId,
        ...d
    }));

    return await authorSocialMediaRepository.bulkCreate(socialMediaData);
};

const normalizeName = (name) => name.trim().toUpperCase();

export { addSocialMedia, getById, getAll, search, createAuthor, deleteAuthor, updateAuthor };