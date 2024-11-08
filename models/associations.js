import GenreModel from './genres/GenreModel.js';
import AuthorModel from './authors/AuthorModel.js';
import NationalityModel from './nacionalities/NacionalityModel.js';
import SocialMediaTypeModel from './socialMediaTypes/SocialMediaTypeModel.js';
import AuthorSocialMediaModel from './authors/AuthorSocialMediaModel.js';

import EditionModel from './editions/EditionModel.js';
import BookModel from './books/BookModel.js';

export default function defineAssociations() {
    NationalityModel.hasMany(AuthorModel, {
        foreignKey: 'nacionalityId',
        as: 'authors',
    });

    AuthorModel.belongsTo(NationalityModel, {
        foreignKey: 'nacionalityId',
        as: 'nationality',
    });

    AuthorModel.hasMany(AuthorSocialMediaModel, {
        foreignKey: 'authorId',
        as: 'socialMediaAccounts',
    });

    AuthorSocialMediaModel.belongsTo(AuthorModel, {
        foreignKey: 'authorId',
        as: 'author',
    });

    SocialMediaTypeModel.hasMany(AuthorSocialMediaModel, {
        foreignKey: 'socialMediaTypeId',
        as: 'socialMediaEntries',
    });

    AuthorSocialMediaModel.belongsTo(SocialMediaTypeModel, {
        foreignKey: 'socialMediaTypeId',
        as: 'socialMediaType',
    });

    BookModel.belongsTo(AuthorModel, { 
        foreignKey: 'authorId', 
        as: 'author' 
    });
    AuthorModel.hasMany(BookModel, { 
        foreignKey: 'authorId', 
        as: 'books' 
    });

    BookModel.belongsTo(GenreModel, { 
        foreignKey: 'genreId', 
        as: 'genre' 
    });
    GenreModel.hasMany(BookModel, { 
        foreignKey: 'genreId', 
        as: 'books' 
    });

    BookModel.belongsTo(EditionModel, { 
        foreignKey: 'editionId', 
        as: 'edition' 
    });
    EditionModel.hasMany(BookModel, { 
        foreignKey: 'editionId', 
        as: 'books' 
    });
}