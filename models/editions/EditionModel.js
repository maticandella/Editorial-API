import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseModel from '../BaseModel.js';

const EditionModel = sequelize.define('Genre', {
    ...BaseModel.getAttributes(), // Herencia de BaseModel
    
}, {
    tableName: 'Editions',
    timestamps: false,
});

export default EditionModel;