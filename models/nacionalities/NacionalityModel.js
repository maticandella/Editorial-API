import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const NationalityModel = sequelize.define('Nationality', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'Nationalities',
    timestamps: false,
});

export default NationalityModel;