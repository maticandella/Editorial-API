import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const SocialMediaTypeModel = sequelize.define('SocialMediaType', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'SocialMediaType',
    timestamps: false,
});

export default SocialMediaTypeModel;