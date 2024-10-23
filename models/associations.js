import AuthorModel from './authors/AuthorModel.js';
import NationalityModel from './nacionalities/NacionalityModel.js';

export default function defineAssociations() {
    NationalityModel.hasMany(AuthorModel, {
        foreignKey: 'nacionalityId',
        as: 'authors',
    });

    AuthorModel.belongsTo(NationalityModel, {
        foreignKey: 'nacionalityId',
        as: 'nationality',
    });
}