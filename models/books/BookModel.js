import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import BaseIdModel from '../BaseIdModel.js';

const BookModel = sequelize.define('Book', {
    ...BaseIdModel.getAttributes(), // Herencia de BaseIdModel
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
        },
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    editionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pagesNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
    tableName: 'Books',
    timestamps: false,
    paranoid: true //Habilita eliminación lógica
});

export default BookModel;