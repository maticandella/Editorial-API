import { DataTypes } from 'sequelize';

class BaseIdModel {
    static getAttributes() {
        return {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            }
        };
    }
}

export default BaseIdModel;