import NationalityModel from '../models/nacionalities/NacionalityModel.js';
import AuthorSocialMediaModel from '../models/authors/AuthorSocialMediaModel.js';
import SocialMediaTypeModel from '../models/socialMediaTypes/SocialMediaTypeModel.js';
import AuthorRepository from '../repositories/authors/authorRepository.js';
import AuthorModel from '../models/authors/AuthorModel.js';
import { validateAuthor } from '../validations/authors/authorValidation.js';
import { OperationEnum } from '../shared/enums/OperationEnum.js';
import { Op } from 'sequelize';

const repository = new AuthorRepository(AuthorModel);

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

const getAll = async({ page = 1, limit = 10, order }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;

    const { totalAuthors, authors } = await repository.getAllPaginated({ limit, offset, order, include });
    const totalPages = Math.ceil(totalAuthors / limit);
    return { authors, totalPages, totalAuthors };
};

const search = async ({ page = 1, limit = 10, name }) => {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const offset = (page - 1) * limit;
    const filters = {};
    
    //Normalizo el name, para realizar búsquedas SIEMPRE en mayusculas (tal como están los registros en BBDD)
    const nameSearch = normalizeName(name || '');
    if (nameSearch) {
        filters[Op.or] = [
            { name: { [Op.like]: `%${nameSearch}%` } },
            { lastName: { [Op.like]: `%${nameSearch}%` } }
        ];
    }
    const { totalAuthors, authors } = await repository.search({filters, limit, offset });
    const totalPages = Math.ceil(totalAuthors / limit);
    return { authors, totalPages, totalAuthors };
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

const normalizeName = (name) => name.trim().toUpperCase();

export { getById, getAll, search, createAuthor, updateAuthor };