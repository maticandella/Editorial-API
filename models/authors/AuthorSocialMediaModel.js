import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const AuthorSocialMediaModel = sequelize.define('AuthorSocialMedia', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Authors',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    socialMediaTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'SocialMediaType',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'AuthorSocialMedia',
    timestamps: false,
});

export default AuthorSocialMediaModel;