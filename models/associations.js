import AuthorModel from './authors/AuthorModel.js';
import NationalityModel from './nacionalities/NacionalityModel.js';
import SocialMediaTypeModel from './socialMediaTypes/SocialMediaTypeModel.js';
import AuthorSocialMediaModel from './authors/AuthorSocialMediaModel.js';

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
}