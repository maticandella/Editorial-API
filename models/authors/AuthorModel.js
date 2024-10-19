import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const AuthorModel = sequelize.define('Author', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
        },
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    nacionalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Nacionalities',
            key: 'id',
        },
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'Authors',
    timestamps: false,
    paranoid: true, //Habilita eliminación lógica
    indexes: [{
        fields: ['name', 'lastName'],
    }, ]
});

export default AuthorModel;