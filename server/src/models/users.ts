import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection';

export default class Users extends Model {
    declare id: number;

    declare name: string;

    declare email: string;

    declare password: string;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize }
);