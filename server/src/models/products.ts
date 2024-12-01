import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection';

export default class Products extends Model {
    declare id: number;

    declare name: string;

    declare count: number;

    declare price: number;

    declare description: string;

    declare image: string;

    declare userId: number;
}

Products.init(
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
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize }
);