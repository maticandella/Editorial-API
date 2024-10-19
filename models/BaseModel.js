import { DataTypes } from 'sequelize';
import BaseIdModel from './BaseIdModel.js';

class BaseModel {
    static getAttributes() {
        return {
            ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        };
    }
}

export default BaseModel;