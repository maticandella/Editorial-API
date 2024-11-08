import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseModel from '../BaseModel.js';

const GenreModel = sequelize.define('Genre', {
    ...BaseModel.getAttributes(), // Herencia de BaseModel
    
}, {
    tableName: 'Genres',
    timestamps: false,
});

export default GenreModel;