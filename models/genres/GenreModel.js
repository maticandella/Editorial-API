import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseModel from '../BaseModel.js';

const GenreModel = sequelize.define('Genre', {
    ...BaseModel.getAttributes(), // Herencia de BaseModel
    overview: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'Genres',
    timestamps: false,
});

export default GenreModel;