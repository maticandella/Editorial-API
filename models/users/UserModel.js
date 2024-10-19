import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const UserModel = sequelize.define('User', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // isActive: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    // },
}, {
    tableName: 'Users', // Nombre de la tabla en la BBDD
    timestamps: false, // No usar createdAt, updatedAt
});

export default UserModel;