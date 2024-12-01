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
        count: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { sequelize }
);